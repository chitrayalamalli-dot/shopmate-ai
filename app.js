const $ = s => document.querySelector(s);
const chat = $('#chat'), form = $('#form'), input = $('#msg'), quick = $('#quick');
const money = n => '₹' + Number(n).toLocaleString('en-IN');
const CATS = ['Clothing', 'Electronics', 'Shoes', 'Accessories', 'Home Appliances', 'Beauty Products'];
const WELCOME = { role: 'bot', text: 'Hello! Welcome to Smart Shopping Assistant. How can I help you today?', quick: [...CATS, 'View cart', 'FAQ'] };

let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
const save = () => localStorage.setItem('chatHistory', JSON.stringify(history.slice(-40)));

function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;   // textContent => no HTML injection
  return e;
}
const scroll = () => { chat.scrollTop = chat.scrollHeight; };

async function api(url, body) {
  try {
    const res = await fetch(url, body === undefined ? {} : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (e) {
    return { ok: false, data: { error: 'Cannot reach the server. Is Flask running?' } };
  }
}

function productCard(p) {
  const c = h('div', 'card'), img = h('img'), b = h('div', 'body');
  img.src = p.image; img.alt = p.name; img.loading = 'lazy';
  const tag = h('span', 'tag' + (p.available ? '' : ' out'), p.available ? `✔ In stock (${p.stock})` : '✖ Out of stock');
  const btn = h('button', 'btn', p.available ? '🛒 Add to cart' : 'Unavailable');
  btn.disabled = !p.available;
  btn.onclick = async () => {
    const r = await api('/api/cart/add', { product_id: p.id, qty: 1 });
    if (r.ok) { renderCart(r.data.cart); btn.textContent = '✔ Added!'; setTimeout(() => btn.textContent = '🛒 Add to cart', 1200); }
    else addMessage({ role: 'bot', text: r.data.message || r.data.error });
  };
  b.append(h('h3', '', p.name), h('div', 'price', money(p.price)), h('p', '', p.description), tag, btn);
  c.append(img, b);
  return c;
}

function render(m) {
  const row = h('div', 'row ' + m.role);
  if (m.role === 'user') { row.append(h('div', 'bubble', m.text)); chat.append(row); return scroll(); }
  row.append(h('div', 'avatar', '🤖'), h('div', 'bubble', m.text));
  chat.append(row);
  if (m.products?.length) { const g = h('div', 'grid'); m.products.forEach(p => g.append(productCard(p))); chat.append(g); }
  if (m.recommendations?.length) {
    chat.append(h('div', 'sub', '✨ You may also like'));
    const g = h('div', 'grid'); m.recommendations.forEach(p => g.append(productCard(p))); chat.append(g);
  }
  scroll();
}

function showQuick(list = []) {
  quick.innerHTML = '';
  list.forEach(q => { const b = h('button', 'chip', q); b.onclick = () => send(q); quick.append(b); });
}

function addMessage(m) { history.push(m); save(); render(m); showQuick(m.quick); }

function typing(on) {
  $('#typing')?.remove();
  if (!on) return;
  const r = h('div', 'row bot'); r.id = 'typing';
  const t = h('div', 'typing'); t.innerHTML = '<i></i><i></i><i></i>';
  r.append(h('div', 'avatar', '🤖'), t); chat.append(r); scroll();
}

async function send(text) {
  text = (text ?? input.value).trim();
  if (!text) return;
  input.value = ''; quick.innerHTML = '';
  const u = { role: 'user', text }; history.push(u); save(); render(u);
  typing(true);
  const [r] = await Promise.all([api('/api/chat', { message: text }), new Promise(ok => setTimeout(ok, 600))]);
  typing(false);
  if (!r.ok) return addMessage({ role: 'bot', text: r.data.error || 'Something went wrong. Please try again.', quick: CATS });
  const d = r.data;
  addMessage({ role: 'bot', text: d.reply, products: d.products, recommendations: d.recommendations, quick: d.quick_replies });
  const c = await api('/api/cart'); if (c.ok) renderCart(c.data);
  if (d.open_cart) openCart(true);
}

// ---------------- cart drawer
function openCart(open) { $('#cart').classList.toggle('open', open); $('#overlay').classList.toggle('show', open); }

function renderCart(cart) {
  $('#badge').textContent = cart.count; $('#cartTotal').textContent = money(cart.total);
  const box = $('#cartItems'); box.innerHTML = '';
  if (!cart.items.length) { box.append(h('div', 'empty', '🛒 Your cart is empty')); return; }
  cart.items.forEach(i => {
    const row = h('div', 'item'), img = h('img'), info = h('div', 'info'), qty = h('div', 'qty');
    img.src = i.image; img.alt = i.name;
    const mk = (label, fn) => { const b = h('button', '', label); b.onclick = fn; return b; };
    const change = async d => { const r = await api('/api/cart/add', { product_id: i.id, qty: d }); if (r.ok) renderCart(r.data.cart); else alert(r.data.message || r.data.error); };
    qty.append(mk('−', () => change(-1)), h('span', '', i.qty), mk('+', () => change(1)));
    const rm = h('button', 'rm', 'Remove');
    rm.onclick = async () => renderCart((await api('/api/cart/remove', { product_id: i.id })).data.cart);
    info.append(h('b', '', i.name), h('span', '', money(i.price) + ' each'), qty);
    const side = h('div', 'info'); side.style.flex = 'none'; side.style.textAlign = 'right';
    side.append(h('b', '', money(i.subtotal)), rm);
    row.append(img, info, side); box.append(row);
  });
}

$('#cartBtn').onclick = () => openCart(true);
$('#closeCart').onclick = $('#overlay').onclick = () => openCart(false);
$('#emptyCart').onclick = async () => renderCart((await api('/api/cart/clear', {})).data.cart);
$('#checkout').onclick = async () => {
  const r = await api('/api/cart/checkout', {});
  if (!r.ok) return alert(r.data.error);
  renderCart(r.data.cart); openCart(false);
  addMessage({ role: 'bot', text: `🎉 Order ${r.data.order_id} placed for ${money(r.data.total)}! (demo checkout) Thank you for shopping with us.`, quick: ['Categories', 'Track my order'] });
};
$('#clearBtn').onclick = async () => {
  if (!confirm('Clear the whole chat?')) return;
  history = []; save(); chat.innerHTML = ''; await api('/api/reset', {}); addMessage(WELCOME);
};
form.onsubmit = e => { e.preventDefault(); send(); };

// ---------------- start
(async function init() {
  if (!history.length) history.push(WELCOME), save();
  history.forEach(render);
  showQuick(history[history.length - 1].quick || CATS);
  const c = await api('/api/cart'); if (c.ok) renderCart(c.data);
})();
