/**
 * ShopMate AI – Smart Shopping Assistant Chatbot
 * Promax Edition - Pure Client-Side Architecture (HTML, CSS, JS)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CATALOG DATA & KNOWLEDGE BASE
     ========================================================================== */
  const CATEGORIES = [
    'Clothing',
    'Electronics',
    'Shoes',
    'Accessories',
    'Home Appliances',
    'Beauty Products'
  ];

  const PRODUCTS = [
    // Clothing
    { id: 1, name: 'Cotton Crewneck T-Shirt', category: 'Clothing', price: 499, description: '100% breathable combed cotton, tailored slim fit.', stock: 25, emoji: '👕', rating: 4.5 },
    { id: 2, name: 'Slim Fit Denim Jeans', category: 'Clothing', price: 1299, description: 'Premium stretch denim with washed aesthetic and 5 pockets.', stock: 18, emoji: '👖', rating: 4.6 },
    { id: 3, name: 'Fleece Hooded Sweatshirt', category: 'Clothing', price: 999, description: 'Cozy brushed fleece hoodie with front kangaroo pocket.', stock: 12, emoji: '🧥', rating: 4.7 },
    { id: 4, name: 'Summer Floral Maxi Dress', category: 'Clothing', price: 1499, description: 'Breathable rayon floral printed dress with tie-up belt.', stock: 8, emoji: '👗', rating: 4.4 },
    { id: 5, name: 'Oversized Streetwear Tee', category: 'Clothing', price: 699, description: 'Drop-shoulder aesthetic graphic tee in pure organic cotton.', stock: 20, emoji: '👕', rating: 4.6 },

    // Electronics
    { id: 6, name: 'True Wireless Earbuds Pro', category: 'Electronics', price: 1999, description: 'Bluetooth 5.3, active noise cancellation, 32hr playback.', stock: 30, emoji: '🎧', rating: 4.8 },
    { id: 7, name: 'Smart Fitness Watch AMOLED', category: 'Electronics', price: 2999, description: 'SpO2 sensor, 24/7 heart-rate monitor, waterproof IP68.', stock: 14, emoji: '⌚', rating: 4.7 },
    { id: 8, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 1499, description: '16W powerful bass output, waterproof, 12hr battery life.', stock: 16, emoji: '🔊', rating: 4.5 },
    { id: 9, name: 'Power Bank 20000mAh Fast-Charge', category: 'Electronics', price: 999, description: '22.5W dual USB-C fast charging for phones and tablets.', stock: 40, emoji: '🔋', rating: 4.6 },
    { id: 10, name: 'Wireless Over-Ear Headphones', category: 'Electronics', price: 2499, description: 'Deep bass drivers, plush memory foam ear cushions, 40hr battery.', stock: 10, emoji: '🎧', rating: 4.8 },

    // Shoes
    { id: 11, name: 'Air-Cushioned Running Sneakers', category: 'Shoes', price: 899, description: 'Shock-absorbing sole, breathable mesh upper for daily runs.', stock: 22, emoji: '👟', rating: 4.6 },
    { id: 12, name: 'Classic White Canvas Sneakers', category: 'Shoes', price: 699, description: 'Timeless low-top canvas casual sneakers for all outfits.', stock: 26, emoji: '👟', rating: 4.4 },
    { id: 13, name: 'Handcrafted Leather Formal Shoes', category: 'Shoes', price: 1999, description: 'Genuine leather derby shoes for business and formal events.', stock: 7, emoji: '👞', rating: 4.7 },
    { id: 14, name: 'Orthopedic Comfort Slides', category: 'Shoes', price: 499, description: 'Soft contoured EVA footbed, anti-skid water-resistant design.', stock: 35, emoji: '🩴', rating: 4.5 },
    { id: 15, name: 'Suede Penny Loafers', category: 'Shoes', price: 1299, description: 'Breathable suede leather slip-ons with cushioned insole.', stock: 11, emoji: '👞', rating: 4.6 },

    // Accessories
    { id: 16, name: 'Genuine Leather RFID Wallet', category: 'Accessories', price: 449, description: 'Bifold wallet with 8 card slots, coin pocket & RFID block.', stock: 28, emoji: '👛', rating: 4.6 },
    { id: 17, name: 'Polarized Aviator Sunglasses', category: 'Accessories', price: 599, description: 'UV400 metal frame aviators with glare-reduction lenses.', stock: 24, emoji: '🕶️', rating: 4.7 },
    { id: 18, name: 'Water-Resistant Travel Backpack 30L', category: 'Accessories', price: 1199, description: 'Padded 15.6" laptop sleeve, luggage strap & USB charge port.', stock: 15, emoji: '🎒', rating: 4.8 },
    { id: 19, name: 'Adjustable Cotton Baseball Cap', category: 'Accessories', price: 299, description: 'Breathable cotton twill with brass buckle closure.', stock: 50, emoji: '🧢', rating: 4.3 },
    { id: 20, name: 'Reversible Formal Leather Belt', category: 'Accessories', price: 499, description: 'Black and brown 2-in-1 leather strap with zinc alloy buckle.', stock: 30, emoji: '🥋', rating: 4.5 },

    // Home Appliances
    { id: 21, name: 'Cordless Electric Kettle 1.8L', category: 'Home Appliances', price: 799, description: 'Food-grade stainless steel with automatic boil-dry cut-off.', stock: 18, emoji: '☕', rating: 4.5 },
    { id: 22, name: '750W Heavy-Duty Mixer Grinder', category: 'Home Appliances', price: 2499, description: '3 stainless steel jars with flow breakers & copper motor.', stock: 9, emoji: '🍹', rating: 4.7 },
    { id: 23, name: 'Non-Stick Steam Iron 1600W', category: 'Home Appliances', price: 1199, description: 'Continuous vertical steam boost with ceramic soleplate.', stock: 14, emoji: '♨️', rating: 4.4 },
    { id: 24, name: 'Digital Touch Air Fryer 4.5L', category: 'Home Appliances', price: 3499, description: 'Rapid 360° air circulation for 90% less oil healthy cooking.', stock: 6, emoji: '🍟', rating: 4.9 },
    { id: 25, name: 'Compact Espresso Coffee Maker', category: 'Home Appliances', price: 1899, description: '15-bar pressure pump for rich cafe-style crema espresso.', stock: 8, emoji: '☕', rating: 4.6 },

    // Beauty Products
    { id: 26, name: 'Velvet Matte Liquid Lipstick', category: 'Beauty Products', price: 349, description: '12-hour transfer-proof lightweight formula enriched with Vitamin E.', stock: 42, emoji: '💄', rating: 4.7 },
    { id: 27, name: 'Hydrating Gel Moisturizer 100ml', category: 'Beauty Products', price: 449, description: 'Oil-free hyaluronic acid & ceramide complex for glowing skin.', stock: 35, emoji: '🧴', rating: 4.8 },
    { id: 28, name: 'French Eau de Parfum 50ml', category: 'Beauty Products', price: 899, description: 'Long-lasting oriental woody floral notes with amber undertones.', stock: 15, emoji: '🌸', rating: 4.6 },
    { id: 29, name: 'Ionic Hair Dryer 1400W', category: 'Beauty Products', price: 799, description: 'Fast-drying negative ion technology with cool shot trigger.', stock: 12, emoji: '💇', rating: 4.5 },
    { id: 30, name: 'Vitamin C Brightening Face Serum', category: 'Beauty Products', price: 549, description: '15% pure Vitamin C with ferulic acid to fade dark spots.', stock: 28, emoji: '✨', rating: 4.8 }
  ];

  const KEYWORD_MAP = {
    'Clothing': ['clothing', 'clothes', 'shirt', 'tshirt', 't-shirt', 'jeans', 'hoodie', 'sweatshirt', 'dress', 'jacket', 'outfit', 'top', 'pants', 'trousers', 'wear'],
    'Electronics': ['electronics', 'electronic', 'earbud', 'earbuds', 'headphone', 'headphones', 'watch', 'smartwatch', 'speaker', 'power bank', 'charger', 'gadget', 'bluetooth', 'audio'],
    'Shoes': ['shoe', 'shoes', 'sneaker', 'sneakers', 'footwear', 'sandal', 'sandals', 'slides', 'boots', 'loafers', 'formal shoes', 'runners'],
    'Accessories': ['accessories', 'accessory', 'wallet', 'sunglass', 'sunglasses', 'backpack', 'bag', 'cap', 'hat', 'belt', 'travel bag', 'cardholder'],
    'Home Appliances': ['appliance', 'appliances', 'kettle', 'mixer', 'grinder', 'iron', 'air fryer', 'coffee', 'kitchen', 'home', 'oven'],
    'Beauty Products': ['beauty', 'skincare', 'makeup', 'lipstick', 'moisturizer', 'perfume', 'fragrance', 'dryer', 'serum', 'lotion', 'cream']
  };

  const FAQS = [
    {
      keywords: ['payment', 'upi', 'card', 'credit card', 'debit card', 'cash on delivery', 'cod', 'pay'],
      answer: 'We support all major payment options: **UPI** (Google Pay, PhonePe, Paytm), **Credit/Debit Cards** (Visa, Mastercard, RuPay), **Net Banking**, and **Cash on Delivery (COD)** on eligible pin codes.'
    },
    {
      keywords: ['return', 'refund', 'exchange', 'replacement', 'money back'],
      answer: 'We offer an easy **7-day return & exchange window** on all items from the date of delivery. Items must be unused, unwashed with original tags and packaging. Refunds are processed back to your original source within **5–7 working days**.'
    },
    {
      keywords: ['track', 'tracking', 'order status', 'where is my order', 'status'],
      answer: 'You can check your order anytime! Go to **My Orders** in the menu or use the tracking link sent via SMS and email. Standard orders include live transit milestones.'
    },
    {
      keywords: ['shipping', 'delivery', 'charges', 'delivery fee', 'shipping fee', 'free delivery', 'how long'],
      answer: '🎉 **FREE Delivery** applies on all orders above ₹499! For orders below ₹499, a nominal flat delivery charge of ₹49 is added. Standard delivery reaches most metro cities within **3 to 5 business days**.'
    },
    {
      keywords: ['discount', 'coupon', 'offer', 'promo', 'deal', 'sale'],
      answer: '🔥 Current offers: Use coupon code **SHOPMATE10** for an instant 10% discount on your first order! Plus, get 5% cashback when paying via UPI.'
    }
  ];

  /* Supported External Stores */
  const STORES = [
    {
      id: 'amazon',
      name: 'Amazon India',
      badge: 'Amazon',
      cls: 'amazon-card',
      getUrl: (q, budget) => {
        let url = `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
        if (budget) url += `&rh=p_36%3A-${Math.round(budget * 100)}`;
        return url;
      }
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      badge: 'Flipkart',
      cls: 'flipkart-card',
      getUrl: (q, budget) => {
        let url = `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`;
        if (budget) url += `&p%5B%5D=facets.price_range.from%3D0%26facets.price_range.to%3D${budget}`;
        return url;
      }
    },
    {
      id: 'myntra',
      name: 'Myntra Fashion',
      badge: 'Myntra',
      cls: 'myntra-card',
      getUrl: (q) => `https://www.myntra.com/${encodeURIComponent(q.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`
    },
    {
      id: 'ajio',
      name: 'Ajio Trends',
      badge: 'Ajio',
      cls: 'ajio-card',
      getUrl: (q) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`
    },
    {
      id: 'meesho',
      name: 'Meesho Best Value',
      badge: 'Meesho',
      cls: 'meesho-card',
      getUrl: (q) => `https://www.meesho.com/search?q=${encodeURIComponent(q)}`
    }
  ];

  /* ==========================================================================
     2. APPLICATION STATE & PERSISTENCE
     ========================================================================== */
  const STORAGE_KEYS = {
    CONVERSATIONS: 'shopmate_conversations',
    ACTIVE_ID: 'shopmate_active_id',
    CART: 'shopmate_cart',
    THEME: 'shopmate_theme',
    SIDEBAR: 'shopmate_sidebar'
  };

  let state = {
    conversations: [],
    activeConversationId: null,
    cart: [],
    theme: 'dark',
    attachedImage: null, // { dataUrl, name, size }
    context: {
      category: null,
      budget: null,
      lastQuery: '',
      lastProduct: null
    }
  };

  /* Helper to format Currency */
  const formatMoney = num => '₹' + Number(num || 0).toLocaleString('en-IN');

  /* Helper to format Timestamps */
  function formatTime(timestamp) {
    const d = new Date(timestamp || Date.now());
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function getGroupDateLabel(timestamp) {
    const now = new Date();
    const d = new Date(timestamp);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000;

    if (timestamp >= startOfToday) return 'Today';
    if (timestamp >= startOfYesterday) return 'Yesterday';
    return 'Previous Days';
  }

  /* Safe localStorage helper with Quota Handling */
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[ShopMate AI] Storage quota reached while saving ${key}. Trimming older data...`, e);
      if (key === STORAGE_KEYS.CONVERSATIONS && Array.isArray(value)) {
        // If conversations fail due to image size, keep last 10 only and strip old image data
        try {
          const trimmed = value.slice(0, 10).map(c => ({
            ...c,
            messages: c.messages.map(m => m.image ? { ...m, image: null } : m)
          }));
          localStorage.setItem(key, JSON.stringify(trimmed));
          return true;
        } catch (e2) {
          console.error('[ShopMate AI] Could not save even after trimming', e2);
        }
      }
      return false;
    }
  }

  function loadFromStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`[ShopMate AI] Error reading ${key}`, e);
      return fallback;
    }
  }

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */
  const DOM = {
    // Layout
    appContainer: document.getElementById('appContainer'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
    closeSidebarBtn: document.getElementById('closeSidebarBtn'),

    // Conversations / Sidebar
    newChatBtn: document.getElementById('newChatBtn'),
    headerNewChatBtn: document.getElementById('headerNewChatBtn'),
    searchHistoryInput: document.getElementById('searchHistoryInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    chatHistoryContainer: document.getElementById('chatHistoryContainer'),
    activeChatTitle: document.getElementById('activeChatTitle'),
    offlineBanner: document.getElementById('offlineBanner'),
    headerInstallBtn: document.getElementById('headerInstallBtn'),
    modalInstallBtn: document.getElementById('modalInstallBtn'),

    // Chat Viewport
    chatViewport: document.getElementById('chatViewport'),
    chatMessages: document.getElementById('chatMessages'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    messagesFlow: document.getElementById('messagesFlow'),
    typingIndicator: document.getElementById('typingIndicator'),
    photoTriggerCard: document.getElementById('photoTriggerCard'),

    // Input Controls
    chatForm: document.getElementById('chatForm'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    clearInputBtn: document.getElementById('clearInputBtn'),
    attachImageBtn: document.getElementById('attachImageBtn'),
    imageFileInput: document.getElementById('imageFileInput'),
    attachmentPreviewBar: document.getElementById('attachmentPreviewBar'),
    attachmentPreviewImg: document.getElementById('attachmentPreviewImg'),
    attachmentName: document.getElementById('attachmentName'),
    removeAttachmentBtn: document.getElementById('removeAttachmentBtn'),
    quickChipsContainer: document.getElementById('quickChipsContainer'),

    // Cart Drawer
    openCartBtn: document.getElementById('openCartBtn'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartBackdrop: document.getElementById('cartBackdrop'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    cartDrawerItemCount: document.getElementById('cartDrawerItemCount'),
    cartDrawerItems: document.getElementById('cartDrawerItems'),
    cartDrawerTotal: document.getElementById('cartDrawerTotal'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
    cartClearBtn: document.getElementById('cartClearBtn'),

    // Modals
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsModalBtn: document.getElementById('closeSettingsModalBtn'),
    themeDarkBtn: document.getElementById('themeDarkBtn'),
    themeLightBtn: document.getElementById('themeLightBtn'),
    themeQuickToggle: document.getElementById('themeQuickToggle'),
    storageSummaryText: document.getElementById('storageSummaryText'),
    exportHistoryBtn: document.getElementById('exportHistoryBtn'),
    clearAllHistoryBtn: document.getElementById('clearAllHistoryBtn'),

    helpFaqBtn: document.getElementById('helpFaqBtn'),
    helpModal: document.getElementById('helpModal'),
    closeHelpModalBtn: document.getElementById('closeHelpModalBtn'),

    imageLightbox: document.getElementById('imageLightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    closeLightboxBtn: document.getElementById('closeLightboxBtn'),

    checkoutModal: document.getElementById('checkoutModal'),
    confirmedOrderId: document.getElementById('confirmedOrderId'),
    confirmedTotal: document.getElementById('confirmedTotal'),
    confirmedDate: document.getElementById('confirmedDate'),
    closeCheckoutSuccessBtn: document.getElementById('closeCheckoutSuccessBtn')
  };

  /* ==========================================================================
     4. IMAGE COMPRESSION UTILITY (Canvas)
     ========================================================================== */
  function compressImage(file, maxDimension = 600, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Image decode error'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsDataURL(file);
    });
  }

  /* ==========================================================================
     5. CONVERSATION MANAGEMENT
     ========================================================================== */
  function createNewChat() {
    const newId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newConvo = {
      id: newId,
      title: 'New Shopping Chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
      context: { category: null, budget: null, lastQuery: '', lastProduct: null }
    };

    state.conversations.unshift(newConvo);
    state.activeConversationId = newId;
    state.context = { category: null, budget: null, lastQuery: '', lastProduct: null };

    saveConversations();
    renderConversation(newConvo);
    renderHistory();
    closeMobileSidebar();
    DOM.messageInput.focus();
  }

  function getActiveConversation() {
    return state.conversations.find(c => c.id === state.activeConversationId);
  }

  function saveConversations() {
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, state.conversations);
    saveToStorage(STORAGE_KEYS.ACTIVE_ID, state.activeConversationId);
    updateStorageStats();
  }

  function switchConversation(id) {
    const convo = state.conversations.find(c => c.id === id);
    if (!convo) return;
    state.activeConversationId = id;
    state.context = convo.context || { category: null, budget: null, lastQuery: '', lastProduct: null };
    saveToStorage(STORAGE_KEYS.ACTIVE_ID, id);
    renderConversation(convo);
    renderHistory();
    closeMobileSidebar();
  }

  function renameConversation(id, currentTitle) {
    const newTitle = prompt('Rename this shopping conversation:', currentTitle);
    if (newTitle && newTitle.trim()) {
      const convo = state.conversations.find(c => c.id === id);
      if (convo) {
        convo.title = newTitle.trim();
        saveConversations();
        renderHistory();
        if (state.activeConversationId === id) {
          DOM.activeChatTitle.textContent = convo.title;
        }
      }
    }
  }

  function deleteConversation(id, e) {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this conversation?')) return;

    state.conversations = state.conversations.filter(c => c.id !== id);
    if (state.activeConversationId === id) {
      if (state.conversations.length > 0) {
        switchConversation(state.conversations[0].id);
      } else {
        createNewChat();
      }
    } else {
      saveConversations();
      renderHistory();
    }
  }

  function clearAllConversations() {
    if (!confirm('Are you sure you want to clear ALL chat history? This cannot be undone.')) return;
    state.conversations = [];
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    createNewChat();
    if (DOM.settingsModal) DOM.settingsModal.style.display = 'none';
  }

  /* Render Sidebar History grouped by Today, Yesterday, Previous Days */
  function renderHistory(filterKeyword = '') {
    const container = DOM.chatHistoryContainer;
    container.innerHTML = '';

    const term = (filterKeyword || '').toLowerCase().trim();
    const filtered = state.conversations.filter(c => {
      if (!term) return true;
      if (c.title.toLowerCase().includes(term)) return true;
      return c.messages && c.messages.some(m => (m.text || '').toLowerCase().includes(term));
    });

    if (filtered.length === 0) {
      const notice = document.createElement('div');
      notice.className = 'empty-history-notice';
      notice.innerHTML = `
        <span class="empty-icon">💬</span>
        <p>${term ? 'No conversations match your search.' : 'No recent chats yet.<br>Start shopping anytime!'}</p>
      `;
      container.appendChild(notice);
      return;
    }

    // Grouping
    const groups = { 'Today': [], 'Yesterday': [], 'Previous Days': [] };
    filtered.forEach(c => {
      const label = getGroupDateLabel(c.updatedAt || c.createdAt);
      if (groups[label]) groups[label].push(c);
      else groups['Previous Days'].push(c);
    });

    ['Today', 'Yesterday', 'Previous Days'].forEach(groupName => {
      const list = groups[groupName];
      if (!list || list.length === 0) return;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'history-group-title';
      groupHeader.textContent = groupName;
      container.appendChild(groupHeader);

      const ul = document.createElement('ul');
      ul.className = 'history-list';

      list.forEach(c => {
        const li = document.createElement('li');
        li.className = `history-item ${c.id === state.activeConversationId ? 'active' : ''}`;
        li.onclick = () => switchConversation(c.id);

        li.innerHTML = `
          <svg class="chat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="chat-item-title" title="${escapeHtml(c.title)}">${escapeHtml(c.title)}</span>
          <div class="chat-actions">
            <button class="chat-action-btn rename-btn" title="Rename" aria-label="Rename conversation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <button class="chat-action-btn delete-btn" title="Delete" aria-label="Delete conversation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `;

        li.querySelector('.rename-btn').onclick = (e) => {
          e.stopPropagation();
          renameConversation(c.id, c.title);
        };

        li.querySelector('.delete-btn').onclick = (e) => {
          deleteConversation(c.id, e);
        };

        ul.appendChild(li);
      });

      container.appendChild(ul);
    });
  }

  /* ==========================================================================
     6. CHAT RENDERING & MESSAGE STREAM
     ========================================================================== */
  function renderConversation(convo) {
    DOM.messagesFlow.innerHTML = '';
    DOM.activeChatTitle.textContent = convo.title || 'ShopMate AI';

    if (!convo.messages || convo.messages.length === 0) {
      DOM.welcomeScreen.style.display = 'flex';
      setQuickChips(['Clothing', 'Electronics', 'Shoes', 'Accessories', 'Home Appliances', 'Beauty Products']);
    } else {
      DOM.welcomeScreen.style.display = 'none';
      convo.messages.forEach(msg => appendMessageUI(msg));
      const lastMsg = convo.messages[convo.messages.length - 1];
      if (lastMsg.quickChips && lastMsg.quickChips.length > 0) {
        setQuickChips(lastMsg.quickChips);
      } else {
        setQuickChips(['View Cart', 'Shop on Budget', 'Categories', 'Search Stores']);
      }
    }
    scrollToBottom();
  }

  function appendMessage(msg) {
    const convo = getActiveConversation();
    if (!convo) return;

    convo.messages.push(msg);
    convo.updatedAt = Date.now();

    // Generate smart conversation title from the first user message
    if (convo.messages.length === 1 && msg.role === 'user') {
      let title = msg.text.trim();
      if (title.length > 32) title = title.substring(0, 30) + '…';
      convo.title = title.charAt(0).toUpperCase() + title.slice(1);
      DOM.activeChatTitle.textContent = convo.title;
    }

    saveConversations();
    renderHistory();
    appendMessageUI(msg);
    DOM.welcomeScreen.style.display = 'none';
    scrollToBottom();

    if (msg.quickChips && msg.quickChips.length > 0) {
      setQuickChips(msg.quickChips);
    }
  }

  function appendMessageUI(msg) {
    const row = document.createElement('div');
    row.className = `message-row ${msg.role}`;

    let avatarHtml = '';
    if (msg.role === 'bot') {
      avatarHtml = `
        <div class="message-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
      `;
    }

    const contentWrap = document.createElement('div');
    contentWrap.className = 'message-content-wrap';

    // If message includes attached photo
    let imageHtml = '';
    if (msg.image) {
      imageHtml = `<img class="user-attached-image" src="${msg.image}" alt="Attached item photo" title="Click to view full photo">`;
    }

    // Text Bubble
    let bubbleHtml = '';
    if (msg.text) {
      bubbleHtml = `<div class="message-bubble">${formatMarkdown(msg.text)}</div>`;
    }

    // Product Cards inside bot message
    let productsHtml = '';
    if (msg.products && msg.products.length > 0) {
      productsHtml = renderProductsGrid(msg.products);
    }

    // External Store Cards inside bot message
    let storesHtml = '';
    if (msg.storeQuery) {
      storesHtml = renderStoresGrid(msg.storeQuery, msg.budget);
    }

    // Timestamp & Copy
    const metaHtml = `
      <div class="message-meta">
        <span class="message-time">${formatTime(msg.timestamp)}</span>
        ${msg.role === 'bot' && msg.text ? `
          <button class="copy-msg-btn" title="Copy text">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        ` : ''}
      </div>
    `;

    contentWrap.innerHTML = imageHtml + bubbleHtml + productsHtml + storesHtml + metaHtml;

    // Attach copy button action
    const copyBtn = contentWrap.querySelector('.copy-msg-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(msg.text).then(() => {
          copyBtn.innerHTML = `<span>✔ Copied!</span>`;
          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            `;
          }, 1400);
        });
      };
    }

    // Attach image click lightbox
    const imgEl = contentWrap.querySelector('.user-attached-image');
    if (imgEl) {
      imgEl.onclick = () => openLightbox(msg.image);
    }

    // Attach Product Card buttons
    contentWrap.querySelectorAll('.product-add-btn').forEach(btn => {
      btn.onclick = () => {
        const pid = parseInt(btn.getAttribute('data-pid'), 10);
        addToCart(pid, 1);
        btn.textContent = '✔ Added!';
        btn.style.background = '#10b981';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.innerHTML = `<span>🛒 Add to Cart</span>`;
          btn.style.background = '';
          btn.style.color = '';
        }, 1200);
      };
    });

    if (msg.role === 'bot') {
      row.innerHTML = avatarHtml;
      row.appendChild(contentWrap);
    } else {
      row.appendChild(contentWrap);
    }

    DOM.messagesFlow.appendChild(row);
  }

  function renderProductsGrid(products) {
    const cards = products.map(p => {
      const isAvailable = p.stock > 0;
      return `
        <div class="product-card">
          <div class="product-thumb-container">
            <span class="product-cat-tag">${escapeHtml(p.category)}</span>
            <span class="product-thumb-emoji">${p.emoji || '🛍️'}</span>
          </div>
          <div class="product-body">
            <h4 class="product-name">${escapeHtml(p.name)}</h4>
            <div class="product-price-row">
              <span class="product-price">${formatMoney(p.price)}</span>
            </div>
            <p class="product-desc">${escapeHtml(p.description)}</p>
            <div class="product-stock-tag ${isAvailable ? 'in-stock' : 'out-stock'}">
              ${isAvailable ? `✔ In Stock (${p.stock})` : '✖ Out of Stock'}
            </div>
            <button class="product-add-btn" data-pid="${p.id}" ${!isAvailable ? 'disabled' : ''}>
              <span>${isAvailable ? '🛒 Add to Cart' : 'Unavailable'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `<div class="products-grid">${cards}</div>`;
  }

  function renderStoresGrid(query, budget) {
    const cards = STORES.map(s => {
      const url = s.getUrl(query, budget);
      const budgetText = budget ? ` under ${formatMoney(budget)}` : '';
      return `
        <a class="store-card ${s.cls}" href="${url}" target="_blank" rel="noopener noreferrer">
          <div class="store-head">
            <div class="store-brand">
              <span class="store-logo-badge">${s.badge.charAt(0)}</span>
              <span class="store-name">${s.name}</span>
            </div>
            <span class="external-arrow">↗</span>
          </div>
          <div class="store-query-desc">
            Search <strong>"${escapeHtml(query)}"</strong>${budgetText}
          </div>
          <div class="store-search-btn">
            Search on ${s.badge} ↗
          </div>
        </a>
      `;
    }).join('');

    return `
      <div style="margin-top: 14px;">
        <span style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;">
          Explore Across Major Stores:
        </span>
        <div class="shopping-stores-grid">${cards}</div>
      </div>
    `;
  }

  function setQuickChips(chips = []) {
    DOM.quickChipsContainer.innerHTML = '';
    chips.forEach(chipText => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'quick-chip';
      chip.textContent = chipText;
      chip.onclick = () => {
        handleUserSend(chipText);
      };
      DOM.quickChipsContainer.appendChild(chip);
    });
  }

  function setTyping(visible) {
    DOM.typingIndicator.style.display = visible ? 'flex' : 'none';
    if (visible) scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      DOM.chatViewport.scrollTop = DOM.chatViewport.scrollHeight;
    }, 50);
  }

  /* Simple safe HTML & Markdown parsing */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMarkdown(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);
    // Bold: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text* or _text_
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullet lists: lines starting with • or -
    escaped = escaped.replace(/(?:^|\n)[•\-]\s*(.*)/g, '<br>• $1');
    // Line breaks
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  /* ==========================================================================
     7. NATURAL LANGUAGE & SHOPPING ENGINE (Rule-Based & Context-Aware)
     ========================================================================== */
  function extractBudget(text) {
    const patterns = [
      /(?:under|below|less than|within|upto|up to|max|maximum|budget(?: is| of)?|rs\.?|₹|inr)\s*₹?\s*(\d[\d,]*)/i,
      /(\d[\d,]*)\s*(?:rs|rupees|₹|inr)/i,
      /^\s*₹?\s*(\d[\d,]*)\s*$/
    ];
    for (const p of patterns) {
      const match = text.match(p);
      if (match) {
        const val = parseInt(match[1].replace(/,/g, ''), 10);
        if (!isNaN(val) && val > 0 && val < 500000) return val;
      }
    }
    return null;
  }

  function detectCategory(text) {
    const lower = text.toLowerCase();
    for (const cat of CATEGORIES) {
      if (lower.includes(cat.toLowerCase())) return cat;
    }
    for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
      for (const kw of keywords) {
        const reg = new RegExp(`\\b${kw}\\b`, 'i');
        if (reg.test(lower)) return cat;
      }
    }
    return null;
  }

  function searchProducts(query, category = null, maxPrice = null, limit = 6) {
    let pool = PRODUCTS;
    if (category) {
      pool = pool.filter(p => p.category === category);
    }
    if (maxPrice !== null) {
      pool = pool.filter(p => p.price <= maxPrice);
    }
    if (query) {
      const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
      if (terms.length > 0) {
        pool = pool.filter(p => {
          const hay = (p.name + ' ' + p.description + ' ' + p.category).toLowerCase();
          return terms.some(t => hay.includes(t));
        });
      }
    }
    return pool.slice(0, limit);
  }

  async function processUserQuery(userText, attachedImage = null) {
    const raw = (userText || '').trim();
    const lower = raw.toLowerCase();
    const ctx = state.context;

    // Simulate smart thinking delay (400 - 800ms)
    setTyping(true);
    await new Promise(res => setTimeout(res, 550));
    setTyping(false);

    // 1. IMAGE SEARCH INTENT
    if (attachedImage) {
      const cat = detectCategory(lower) || ctx.category || 'Clothing';
      const budget = extractBudget(lower) || ctx.budget;
      ctx.category = cat;
      if (budget) ctx.budget = budget;
      ctx.lastQuery = raw.replace(/\b(image|photo|pic|picture|find|search|similar)\b/gi, '').trim() || 'trending outfit';

      const matchedProds = searchProducts(ctx.lastQuery, cat, budget, 3);
      const budgetStr = budget ? ` under ${formatMoney(budget)}` : '';

      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `📸 **Photo Analyzed Successfully!**\n\nI've inspected the image style. Based on your prompt, here are matching **${cat}** picks${budgetStr}, along with instant visual match searches on major shopping stores:`,
        products: matchedProds,
        storeQuery: ctx.lastQuery || `${cat} stylish outfit`,
        budget: budget,
        quickChips: [
          'Find similar on Amazon',
          'Search on Myntra',
          'Show cheaper ones',
          'Add first item to cart'
        ]
      };
    }

    // 2. GREETINGS
    if (/^(hi+|hello|hey|good (morning|afternoon|evening)|namaste|whats up|sup)\b/i.test(lower)) {
      ctx.category = null;
      ctx.budget = null;
      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `Hello! 👋 I'm **ShopMate AI**, your smart shopping assistant.\n\nI can help you:\n• Find top products across electronics, fashion, footwear & more\n• Filter by your exact budget\n• Compare prices across **Amazon, Flipkart, Myntra, Ajio & Meesho**\n• Manage your shopping cart\n\nWhat are you looking to buy today?`,
        quickChips: CATEGORIES
      };
    }

    // 3. FAQS MATCHING
    for (const faq of FAQS) {
      if (faq.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lower))) {
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: faq.answer,
          quickChips: ['Categories', 'Payment methods', 'Return policy', 'Delivery charges', 'View Cart']
        };
      }
    }

    // 4. CART INTENTS
    if (/\b(view|show|open|my)\b.*\bcart\b/i.test(lower) || lower === 'cart') {
      openCartDrawer();
      const cartTotal = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
      const count = state.cart.reduce((s, i) => s + i.qty, 0);
      if (count === 0) {
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `🛒 Your shopping cart is currently empty. Browse our categories or tell me what product you'd like!`,
          quickChips: CATEGORIES
        };
      }
      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `🛒 **Shopping Cart (${count} items)**\n\nYour current cart total is **${formatMoney(cartTotal)}** with **FREE delivery**. The cart drawer is opened on your right.`,
        quickChips: ['Proceed to Checkout', 'Empty Cart', 'Continue Shopping']
      };
    }

    if (/\b(clear|empty)\b.*\bcart\b/i.test(lower)) {
      clearCart();
      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `🗑️ Your shopping cart has been emptied. What would you like to explore next?`,
        quickChips: CATEGORIES
      };
    }

    if (/\b(checkout|buy now|place order|order now)\b/i.test(lower)) {
      if (state.cart.length === 0) {
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Your cart is empty! Please add some products before checking out.`,
          quickChips: CATEGORIES
        };
      }
      handleCheckout();
      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `🎉 Order placed successfully! The demo checkout receipt has been opened.`,
        quickChips: ['Continue Shopping', 'Categories']
      };
    }

    // Direct Add to Cart by Chat
    const addMatch = lower.match(/^(?:add|buy)\s+(.+?)(?:\s+to\s+(?:my\s+)?cart)?$/i);
    if (addMatch) {
      const q = addMatch[1].replace(/^(a|an|the|this|it)\s+/i, '').trim();
      let targetProduct = null;
      if (q === 'it' || q === 'this') {
        targetProduct = ctx.lastProduct;
      } else {
        const found = searchProducts(q, null, null, 1);
        if (found.length > 0) targetProduct = found[0];
      }

      if (targetProduct) {
        addToCart(targetProduct.id, 1);
        ctx.lastProduct = targetProduct;
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `✔ **Added ${targetProduct.name}** (${formatMoney(targetProduct.price)}) to your shopping cart!`,
          quickChips: ['View Cart', 'Proceed to Checkout', 'Categories']
        };
      }
    }

    // 5. STORE SPECIFIC SEARCHES (e.g. "search on myntra", "what about amazon?")
    for (const store of STORES) {
      if (lower.includes(store.id) || lower.includes(store.name.toLowerCase())) {
        const query = ctx.lastQuery || ctx.category || 'trending products';
        const url = store.getUrl(query, ctx.budget);
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Here is the direct search link on **${store.name}** for **"${query}"**${ctx.budget ? ` within ${formatMoney(ctx.budget)}` : ''}:\n\n🔗 [Open on ${store.name}](${url})`,
          storeQuery: query,
          budget: ctx.budget,
          quickChips: ['Compare on Flipkart', 'Check on Amazon', 'Show all stores']
        };
      }
    }

    // 6. COMPARISON INTENT
    if (/\b(compare|versus|vs|difference between)\b/i.test(lower)) {
      const compProducts = searchProducts(lower.replace(/\b(compare|vs|versus)\b/gi, ''), null, null, 2);
      if (compProducts.length >= 2) {
        const [p1, p2] = compProducts;
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `⚖️ **Product Comparison:**\n\n• **${p1.name}** (${formatMoney(p1.price)}): ${p1.description} · ⭐ ${p1.rating}\n• **${p2.name}** (${formatMoney(p2.price)}): ${p2.description} · ⭐ ${p2.rating}\n\nBoth are highly rated! Would you like to add one to your cart or compare across online stores?`,
          products: [p1, p2],
          storeQuery: `${p1.name} vs ${p2.name}`,
          quickChips: [`Add ${p1.name}`, `Add ${p2.name}`, 'Search Stores']
        };
      }
    }

    // 7. CONTEXTUAL FOLLOW-UP: "cheaper ones", "under 1000", "show more"
    if (/\b(cheaper|lower price|less price|more affordable)\b/i.test(lower)) {
      const cat = ctx.category || 'Clothing';
      const currentBudget = ctx.budget || 2000;
      const lowerBudget = Math.max(500, Math.round(currentBudget * 0.7));
      ctx.budget = lowerBudget;
      const prods = searchProducts(ctx.lastQuery, cat, lowerBudget, 4);

      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `Got it! Filtering for **cheaper ${cat.toLowerCase()}** within **${formatMoney(lowerBudget)}**:`,
        products: prods,
        storeQuery: ctx.lastQuery || cat,
        budget: lowerBudget,
        quickChips: ['Under ₹500', 'View Cart', 'All Categories']
      };
    }

    // 8. CATEGORY BROWSE OR EXPLICIT CATEGORY INTENT
    const detectedCat = detectCategory(lower);
    const detectedBudget = extractBudget(lower);
    const noLimit = /\b(no limit|any budget|all|everything|show all)\b/i.test(lower);

    if (detectedCat) {
      ctx.category = detectedCat;
      if (detectedBudget) ctx.budget = detectedBudget;
      else if (noLimit) ctx.budget = null;

      ctx.lastQuery = raw.replace(new RegExp(`\\b(${detectedCat}|show|find|need|want|buy)\\b`, 'gi'), '').trim() || detectedCat;

      if (!detectedBudget && !noLimit && !ctx.budget) {
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Great choice! I have lots of quality options in **${detectedCat}**.\n\nWhat is your preferred budget range?`,
          quickChips: ['Under ₹500', 'Under ₹1000', 'Under ₹2000', 'Show All / No Limit']
        };
      }

      const budgetVal = ctx.budget;
      const results = searchProducts(ctx.lastQuery, detectedCat, budgetVal, 4);
      if (results.length > 0) ctx.lastProduct = results[0];

      const whereText = budgetVal ? ` within **${formatMoney(budgetVal)}**` : '';
      return {
        role: 'bot',
        timestamp: Date.now(),
        text: `Here are top **${detectedCat}** recommendations${whereText}:`,
        products: results,
        storeQuery: ctx.lastQuery || detectedCat,
        budget: budgetVal,
        quickChips: ['Show cheaper ones', 'Search on Amazon', 'Search on Myntra', 'View Cart']
      };
    }

    // Budget specified without explicit category -> check context
    if (detectedBudget !== null) {
      ctx.budget = detectedBudget;
      if (ctx.category) {
        const results = searchProducts(ctx.lastQuery, ctx.category, detectedBudget, 4);
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Here are **${ctx.category}** picks within **${formatMoney(detectedBudget)}**:`,
          products: results,
          storeQuery: ctx.lastQuery || ctx.category,
          budget: detectedBudget,
          quickChips: ['Show cheaper ones', 'Search on Amazon', 'View Cart']
        };
      } else {
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Got your budget of **${formatMoney(detectedBudget)}**! Which category would you like to shop for?`,
          quickChips: CATEGORIES
        };
      }
    }

    // 9. GENERAL PRODUCT KEYWORD SEARCH
    const searchTerms = raw.replace(/\b(i|want|need|a|an|the|find|search|show|me|for|some|products?|items?|please)\b/gi, '').trim();
    if (searchTerms.length > 1) {
      ctx.lastQuery = searchTerms;
      const results = searchProducts(searchTerms, null, ctx.budget, 4);
      if (results.length > 0) {
        ctx.lastProduct = results[0];
        ctx.category = results[0].category;
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `Here is what I found for **"${searchTerms}"**:`,
          products: results,
          storeQuery: searchTerms,
          budget: ctx.budget,
          quickChips: ['Under ₹1000', 'Search on Amazon', 'Search on Flipkart', 'View Cart']
        };
      } else {
        // Fallback with external search cards
        return {
          role: 'bot',
          timestamp: Date.now(),
          text: `I couldn't find an exact in-catalog match for **"${searchTerms}"**, but I've prepared direct search links across top stores:`,
          storeQuery: searchTerms,
          budget: ctx.budget,
          quickChips: ['Categories', 'Budget options', 'View Cart']
        };
      }
    }

    // 10. DEFAULT FALLBACK
    return {
      role: 'bot',
      timestamp: Date.now(),
      text: `I'm not quite sure about that query, but I'm ready to help you shop! You can ask for products, set a budget, or browse a category:`,
      quickChips: [...CATEGORIES, 'Help & FAQs']
    };
  }

  /* ==========================================================================
     8. USER INPUT HANDLING & ATTACHMENT
     ========================================================================== */
  async function handleUserSend(overrideText = null) {
    const text = overrideText !== null ? overrideText : DOM.messageInput.value.trim();
    const image = state.attachedImage ? state.attachedImage.dataUrl : null;

    if (!text && !image) return;

    // Reset input fields
    DOM.messageInput.value = '';
    DOM.messageInput.style.height = 'auto';
    DOM.sendBtn.disabled = true;
    DOM.clearInputBtn.style.display = 'none';

    // Clear attached image preview
    if (state.attachedImage) {
      removeAttachedImage();
    }

    // Append User Message
    const userMsg = {
      role: 'user',
      timestamp: Date.now(),
      text: text || 'Find similar products for this photo',
      image: image
    };
    appendMessage(userMsg);

    // Bot Response
    const botResponse = await processUserQuery(text, image);
    appendMessage(botResponse);
  }

  function handleImageAttachment(file) {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPG, PNG, or WEBP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      alert('Image file is too large (max 12MB). Please select a smaller photo.');
      return;
    }

    compressImage(file, 640, 0.72)
      .then(dataUrl => {
        state.attachedImage = {
          dataUrl: dataUrl,
          name: file.name,
          size: file.size
        };

        DOM.attachmentPreviewImg.src = dataUrl;
        DOM.attachmentName.textContent = file.name;
        DOM.attachmentPreviewBar.style.display = 'flex';
        DOM.sendBtn.disabled = false;
        DOM.messageInput.focus();
      })
      .catch(err => {
        console.error('[ShopMate AI] Compression error', err);
        alert('Could not process this image. Please try another one.');
      });
  }

  function removeAttachedImage() {
    state.attachedImage = null;
    DOM.attachmentPreviewBar.style.display = 'none';
    DOM.attachmentPreviewImg.src = '';
    DOM.imageFileInput.value = '';
    if (!DOM.messageInput.value.trim()) {
      DOM.sendBtn.disabled = true;
    }
  }

  function openLightbox(imgSrc) {
    DOM.lightboxImg.src = imgSrc;
    DOM.imageLightbox.style.display = 'flex';
  }

  /* ==========================================================================
     9. SHOPPING CART SYSTEM
     ========================================================================== */
  function loadCart() {
    state.cart = loadFromStorage(STORAGE_KEYS.CART, []);
    updateCartUI();
  }

  function saveCart() {
    saveToStorage(STORAGE_KEYS.CART, state.cart);
    updateCartUI();
  }

  function addToCart(productId, qty = 1) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const existing = state.cart.find(i => i.product.id === productId);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, prod.stock);
    } else {
      state.cart.push({ product: prod, qty: Math.min(qty, prod.stock) });
    }

    saveCart();

    // Visual bump animation on badge
    DOM.cartCountBadge.classList.remove('bump');
    void DOM.cartCountBadge.offsetWidth;
    DOM.cartCountBadge.classList.add('bump');
  }

  function updateCartQty(productId, delta) {
    const idx = state.cart.findIndex(i => i.product.id === productId);
    if (idx === -1) return;

    const item = state.cart[idx];
    const newQty = item.qty + delta;

    if (newQty <= 0) {
      state.cart.splice(idx, 1);
    } else {
      item.qty = Math.min(newQty, item.product.stock);
    }
    saveCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.product.id !== productId);
    saveCart();
  }

  function clearCart() {
    state.cart = [];
    saveCart();
  }

  function updateCartUI() {
    const count = state.cart.reduce((s, i) => s + i.qty, 0);
    const total = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);

    DOM.cartCountBadge.textContent = count;
    DOM.cartDrawerItemCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    DOM.cartDrawerTotal.textContent = formatMoney(total);

    const container = DOM.cartDrawerItems;
    container.innerHTML = '';

    if (state.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <span class="cart-empty-icon">🛒</span>
          <h3>Your Cart is Empty</h3>
          <p>Add some awesome items from chat recommendations!</p>
        </div>
      `;
      DOM.cartCheckoutBtn.disabled = true;
      DOM.cartCheckoutBtn.style.opacity = '0.5';
      DOM.cartClearBtn.style.display = 'none';
      return;
    }

    DOM.cartCheckoutBtn.disabled = false;
    DOM.cartCheckoutBtn.style.opacity = '1';
    DOM.cartClearBtn.style.display = 'block';

    state.cart.forEach(item => {
      const p = item.product;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-thumb">${p.emoji || '🛍️'}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(p.name)}</div>
          <div class="cart-item-price">${formatMoney(p.price)}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn dec-btn" title="Decrease quantity">−</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn inc-btn" title="Increase quantity">+</button>
        </div>
        <button class="cart-item-remove-btn" title="Remove item">✕</button>
      `;

      row.querySelector('.dec-btn').onclick = () => updateCartQty(p.id, -1);
      row.querySelector('.inc-btn').onclick = () => updateCartQty(p.id, 1);
      row.querySelector('.cart-item-remove-btn').onclick = () => removeFromCart(p.id);

      container.appendChild(row);
    });
  }

  function openCartDrawer() {
    DOM.cartDrawer.classList.add('open');
    DOM.cartBackdrop.classList.add('show');
  }

  function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('open');
    DOM.cartBackdrop.classList.remove('show');
  }

  function handleCheckout() {
    if (state.cart.length === 0) return;

    const total = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
    const orderId = 'ORD-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Delivery date calculation (3-4 days ahead)
    const delDate = new Date();
    delDate.setDate(delDate.getDate() + 4);
    const dateStr = delDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    DOM.confirmedOrderId.textContent = orderId;
    DOM.confirmedTotal.textContent = formatMoney(total);
    DOM.confirmedDate.textContent = dateStr;

    // Clear cart after checkout
    clearCart();
    closeCartDrawer();

    DOM.checkoutModal.style.display = 'flex';
  }

  /* ==========================================================================
     10. THEME & SETTINGS
     ========================================================================== */
  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (DOM.themeLightBtn) DOM.themeLightBtn.classList.add('active');
      if (DOM.themeDarkBtn) DOM.themeDarkBtn.classList.remove('active');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (DOM.themeDarkBtn) DOM.themeDarkBtn.classList.add('active');
      if (DOM.themeLightBtn) DOM.themeLightBtn.classList.remove('active');
    }
    saveToStorage(STORAGE_KEYS.THEME, theme);
  }

  function toggleTheme() {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function updateStorageStats() {
    const convoCount = state.conversations.length;
    const msgCount = state.conversations.reduce((sum, c) => sum + (c.messages ? c.messages.length : 0), 0);
    if (DOM.storageSummaryText) {
      DOM.storageSummaryText.textContent = `${convoCount} conversations (${msgCount} messages) saved locally.`;
    }
  }

  function exportHistoryAsJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.conversations, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `ShopMate_ChatHistory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  }

  /* Mobile Sidebar Toggle */
  function toggleMobileSidebar() {
    DOM.sidebar.classList.toggle('open');
    DOM.sidebarOverlay.classList.toggle('active');
  }

  function closeMobileSidebar() {
    DOM.sidebar.classList.remove('open');
    DOM.sidebarOverlay.classList.remove('active');
  }

  /* ==========================================================================
     11. EVENT LISTENERS & SETUP
     ========================================================================== */
  function bindEvents() {
    // New Chat buttons
    DOM.newChatBtn.onclick = createNewChat;
    if (DOM.headerNewChatBtn) DOM.headerNewChatBtn.onclick = createNewChat;

    // Keyboard shortcut for New Chat (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        createNewChat();
      }
    });

    // Sidebar Toggles
    DOM.toggleSidebarBtn.onclick = () => {
      if (window.innerWidth <= 900) {
        toggleMobileSidebar();
      } else {
        DOM.sidebar.classList.toggle('collapsed');
      }
    };
    DOM.closeSidebarBtn.onclick = closeMobileSidebar;
    DOM.sidebarOverlay.onclick = closeMobileSidebar;

    // Search History Filter
    DOM.searchHistoryInput.oninput = e => {
      const val = e.target.value;
      DOM.clearSearchBtn.style.display = val ? 'block' : 'none';
      renderHistory(val);
    };
    DOM.clearSearchBtn.onclick = () => {
      DOM.searchHistoryInput.value = '';
      DOM.clearSearchBtn.style.display = 'none';
      renderHistory('');
      DOM.searchHistoryInput.focus();
    };

    // Chat Form & Auto-expanding Textarea
    DOM.messageInput.oninput = () => {
      DOM.messageInput.style.height = 'auto';
      DOM.messageInput.style.height = Math.min(DOM.messageInput.scrollHeight, 160) + 'px';
      const hasContent = DOM.messageInput.value.trim().length > 0 || state.attachedImage !== null;
      DOM.sendBtn.disabled = !hasContent;
      DOM.clearInputBtn.style.display = DOM.messageInput.value.length > 0 ? 'flex' : 'none';
    };

    DOM.messageInput.onkeydown = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!DOM.sendBtn.disabled) {
          handleUserSend();
        }
      }
    };

    DOM.clearInputBtn.onclick = () => {
      DOM.messageInput.value = '';
      DOM.messageInput.style.height = 'auto';
      DOM.clearInputBtn.style.display = 'none';
      DOM.sendBtn.disabled = state.attachedImage === null;
      DOM.messageInput.focus();
    };

    DOM.chatForm.onsubmit = e => {
      e.preventDefault();
      handleUserSend();
    };

    // Welcome Screen Suggestion Cards
    document.querySelectorAll('.suggestion-card').forEach(card => {
      card.onclick = () => {
        if (card.id === 'photoTriggerCard') {
          DOM.imageFileInput.click();
        } else {
          const prompt = card.getAttribute('data-prompt');
          if (prompt) handleUserSend(prompt);
        }
      };
    });

    // Image Upload triggers
    DOM.attachImageBtn.onclick = () => DOM.imageFileInput.click();
    DOM.imageFileInput.onchange = e => {
      const file = e.target.files[0];
      if (file) handleImageAttachment(file);
    };
    DOM.removeAttachmentBtn.onclick = removeAttachedImage;

    // Cart Drawer triggers
    DOM.openCartBtn.onclick = openCartDrawer;
    DOM.closeCartBtn.onclick = closeCartDrawer;
    DOM.cartBackdrop.onclick = closeCartDrawer;
    DOM.cartCheckoutBtn.onclick = handleCheckout;
    DOM.cartClearBtn.onclick = () => {
      if (confirm('Are you sure you want to empty your cart?')) clearCart();
    };

    // Settings Modal
    DOM.settingsBtn.onclick = () => {
      updateStorageStats();
      DOM.settingsModal.style.display = 'flex';
    };
    DOM.closeSettingsModalBtn.onclick = () => { DOM.settingsModal.style.display = 'none'; };
    DOM.themeDarkBtn.onclick = () => applyTheme('dark');
    DOM.themeLightBtn.onclick = () => applyTheme('light');
    DOM.themeQuickToggle.onclick = toggleTheme;
    DOM.exportHistoryBtn.onclick = exportHistoryAsJSON;
    DOM.clearAllHistoryBtn.onclick = clearAllConversations;

    // Help & FAQ Modal
    DOM.helpFaqBtn.onclick = () => { DOM.helpModal.style.display = 'flex'; };
    DOM.closeHelpModalBtn.onclick = () => { DOM.helpModal.style.display = 'none'; };

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.onclick = () => {
        const item = btn.parentElement;
        item.classList.toggle('active');
      };
    });

    // Lightbox & Checkout Modal closes
    DOM.closeLightboxBtn.onclick = () => { DOM.imageLightbox.style.display = 'none'; };
    DOM.imageLightbox.onclick = e => {
      if (e.target === DOM.imageLightbox) DOM.imageLightbox.style.display = 'none';
    };
    DOM.closeCheckoutSuccessBtn.onclick = () => { DOM.checkoutModal.style.display = 'none'; };

    // Close modals on Escape key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        DOM.settingsModal.style.display = 'none';
        DOM.helpModal.style.display = 'none';
        DOM.imageLightbox.style.display = 'none';
        DOM.checkoutModal.style.display = 'none';
        closeCartDrawer();
      }
    });

    // ---------------- PWA Installation Prompt Handling ----------------
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      if (DOM.headerInstallBtn) DOM.headerInstallBtn.style.display = 'flex';
      if (DOM.modalInstallBtn) DOM.modalInstallBtn.style.display = 'block';
    });

    const triggerInstall = async () => {
      if (!deferredPrompt) {
        alert('To install ShopMate AI as an app on your phone:\n\n1. In Chrome, tap the top-right ⋮ menu (or Safari Share icon on iOS)\n2. Tap "Install App" or "Add to Home screen"\n3. ShopMate AI will install directly on your home screen!');
        return;
      }
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log('[ShopMate AI] PWA Install Choice:', choice);
      deferredPrompt = null;
      if (DOM.headerInstallBtn) DOM.headerInstallBtn.style.display = 'none';
    };

    if (DOM.headerInstallBtn) DOM.headerInstallBtn.onclick = triggerInstall;
    if (DOM.modalInstallBtn) DOM.modalInstallBtn.onclick = triggerInstall;

    window.addEventListener('appinstalled', () => {
      console.log('[ShopMate AI] App was installed successfully');
      if (DOM.headerInstallBtn) DOM.headerInstallBtn.style.display = 'none';
      deferredPrompt = null;
    });

    // ---------------- Online / Offline Status Detection ----------------
    function updateOnlineStatus() {
      if (DOM.offlineBanner) {
        DOM.offlineBanner.style.display = navigator.onLine ? 'none' : 'flex';
      }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  /* ==========================================================================
     12. INITIALIZATION
     ========================================================================== */
  function init() {
    // 1. Theme setup
    const savedTheme = loadFromStorage(STORAGE_KEYS.THEME, 'dark');
    applyTheme(savedTheme);

    // 2. Load Cart
    loadCart();

    // 3. Load Conversations
    state.conversations = loadFromStorage(STORAGE_KEYS.CONVERSATIONS, []);
    const activeId = loadFromStorage(STORAGE_KEYS.ACTIVE_ID, null);

    if (state.conversations.length > 0) {
      const found = state.conversations.find(c => c.id === activeId);
      state.activeConversationId = found ? found.id : state.conversations[0].id;
      renderConversation(getActiveConversation());
      renderHistory();
    } else {
      createNewChat();
    }

    // 4. Bind events
    bindEvents();

    // 5. Register Service Worker for PWA & Offline Support
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then(reg => {
            console.log('[ShopMate AI] ServiceWorker registered with scope:', reg.scope);
          })
          .catch(err => {
            console.warn('[ShopMate AI] ServiceWorker registration notice:', err);
          });
      });
    }

    console.log('%c ShopMate AI ', 'background: #6366f1; color: #fff; font-weight: bold; border-radius: 4px; padding: 2px 6px;', 'Promax UI/UX Initialized');
  }

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
