// ================================================================
// 🔥 FIREBASE CONFIG
// ================================================================
const firebaseConfig = {
    apiKey: "AIzaSyCzDYj2dKsHc6vg_hxl32mUaHHNJPCZW3w",
    authDomain: "court-ai06.firebaseapp.com",
    projectId: "court-ai06",
    storageBucket: "court-ai06.firebasestorage.app",
    messagingSenderId: "381268585273",
    appId: "1:381268585273:web:5072bac7970bcfd2ca56e8",
    measurementId: "G-KVFSGFTD9X"
};

// ================================================================
// INIT FIREBASE
// ================================================================
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ================================================================
// CONSTITUTION DATA
// ================================================================
const constitutionArticles = [
    { id: 1, title: 'अनुच्छेद 1: भारत का नाम और क्षेत्र', desc: 'भारत, जो इंडिया भी कहलाता है, राज्यों का एक संघ है।', tag: 'मूलभूत' },
    { id: 14, title: 'अनुच्छेद 14: विधि के समक्ष समानता', desc: 'राज्य किसी भी व्यक्ति को विधि के समक्ष समानता से वंचित नहीं करेगा।', tag: 'मौलिक अधिकार' },
    { id: 15, title: 'अनुच्छेद 15: धर्म, जाति आदि के आधार पर भेदभाव का निषेध', desc: 'राज्य किसी भी नागरिक के विरुद्ध धर्म, जाति, लिंग आदि के आधार पर भेदभाव नहीं करेगा।', tag: 'मौलिक अधिकार' },
    { id: 16, title: 'अनुच्छेद 16: लोक नियोजन में अवसर की समानता', desc: 'राज्य के अधीन किसी पद या नियोजन के संबंध में सभी नागरिकों को अवसर की समानता होगी।', tag: 'मौलिक अधिकार' },
    { id: 19, title: 'अनुच्छेद 19: वाक् एवं अभिव्यक्ति की स्वतंत्रता', desc: 'सभी नागरिकों को वाक् और अभिव्यक्ति की स्वतंत्रता, शांतिपूर्वक सम्मेलन करने, संघ बनाने आदि के अधिकार प्राप्त हैं।', tag: 'मौलिक अधिकार' },
    { id: 21, title: 'अनुच्छेद 21: जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण', desc: 'किसी भी व्यक्ति को विधि द्वारा स्थापित प्रक्रिया के अलावा उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।', tag: 'मौलिक अधिकार' },
    { id: 21A, title: 'अनुच्छेद 21A: शिक्षा का अधिकार', desc: 'राज्य 6 से 14 वर्ष की आयु के सभी बच्चों को मुफ्त और अनिवार्य शिक्षा प्रदान करेगा।', tag: 'मौलिक अधिकार' },
    { id: 25, title: 'अनुच्छेद 25: धर्म की स्वतंत्रता', desc: 'सभी व्यक्ति समान रूप से अंतःकरण की स्वतंत्रता और स्वतंत्र रूप से अपने धर्म का प्रचार, आचरण और प्रसार करने के अधिकार के हकदार हैं।', tag: 'मौलिक अधिकार' },
    { id: 32, title: 'अनुच्छेद 32: संवैधानिक उपचारों का अधिकार', desc: 'मौलिक अधिकारों के प्रवर्तन के लिए उच्चतम न्यायालय में रिट याचिका दायर करने का अधिकार।', tag: 'मौलिक अधिकार' }
];

// ================================================================
// STATE
// ================================================================
let isLoggedIn = false;
let currentUser = null;
const botName = 'Court AI';

// ================================================================
// DOM REFS
// ================================================================
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const reelsContainer = document.getElementById('reelsContainer');
const toastEl = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// ================================================================
// UTILITY FUNCTIONS
// ================================================================
function showToast(msg) {
    toastMsg.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._hideTimer);
    toastEl._hideTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

function updateStatusTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('statusTime').textContent = h + ':' + m;
}
updateStatusTime();
setInterval(updateStatusTime, 30000);

// ================================================================
// NAVIGATION FUNCTION
// ================================================================
function navigateTo(pageId) {
    console.log('Navigating to:', pageId);
    if (!isLoggedIn && pageId !== 'loginPage') {
        showToast('कृपया पहले Google से साइन इन करें');
        return;
    }
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
    }
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
    });
    if (pageId === 'knowledgePage') renderReels();
    if (pageId === 'homePage') setTimeout(() => chatInput.focus(), 300);
    if (pageId === 'settingsPage' && currentUser) updateUserUI(currentUser);
}

// ================================================================
// GOOGLE SIGN-IN FUNCTION
// ================================================================
function handleGoogleSignIn() {
    console.log('🟢 Google Sign-In button clicked!');
    const loginError = document.getElementById('loginError');
    const googleBtn = document.getElementById('googleSignInBtn');
    
    loginError.style.display = 'none';
    googleBtn.disabled = true;
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> कृपया प्रतीक्षा करें...';
    
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('✅ Login Success:', user.displayName);
            currentUser = user;
            isLoggedIn = true;
            sessionStorage.setItem('courtAiLoggedIn', 'true');
            sessionStorage.setItem('courtAiUser', JSON.stringify({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }));
            showToast('✅ स्वागत है ' + user.displayName + '!');
            updateUserUI(user);
            navigateTo('homePage');
            document.getElementById('reelBadge').textContent = constitutionArticles.length;
            googleBtn.disabled = false;
            googleBtn.innerHTML = `<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" /> Google के साथ साइन इन करें`;
        })
        .catch((error) => {
            console.error('❌ Login Error:', error);
            loginError.style.display = 'block';
            loginError.textContent = '❌ ' + error.message;
            googleBtn.disabled = false;
            googleBtn.innerHTML = `<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" /> Google के साथ साइन इन करें`;
            showToast('लॉगिन विफल: ' + error.message);
        });
}

function handleLogout() {
    auth.signOut().then(() => {
        isLoggedIn = false;
        currentUser = null;
        sessionStorage.removeItem('courtAiLoggedIn');
        sessionStorage.removeItem('courtAiUser');
        navigateTo('loginPage');
        showToast('🔒 लॉगआउट कर दिया गया');
    }).catch((error) => {
        showToast('लॉगआउट में त्रुटि: ' + error.message);
    });
}

function updateUserUI(user) {
    if (!user) {
        const saved = sessionStorage.getItem('courtAiUser');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                user = data;
            } catch(e) {}
        }
    }
    if (!user) return;
    
    const name = user.displayName || user.name || 'उपयोगकर्ता';
    const email = user.email || '';
    const photo = user.photoURL || '';
    
    const avatarImg = document.getElementById('avatarImg');
    const userNameShort = document.getElementById('userNameShort');
    if (avatarImg) {
        avatarImg.src = photo || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23c9a84c"/%3E%3Ctext x="50" y="68" font-size="50" text-anchor="middle" fill="%230a1628" font-family="Arial"%3E⚖%3C/text%3E%3C/svg%3E';
    }
    if (userNameShort) {
        userNameShort.textContent = name.split(' ')[0] || name.substring(0, 6);
    }
    
    const settingsAvatar = document.getElementById('settingsAvatar');
    const settingsName = document.getElementById('settingsName');
    const settingsEmail = document.getElementById('settingsEmail');
    if (settingsAvatar) settingsAvatar.src = photo || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23c9a84c"/%3E%3Ctext x="50" y="68" font-size="50" text-anchor="middle" fill="%230a1628" font-family="Arial"%3E⚖%3C/text%3E%3C/svg%3E';
    if (settingsName) settingsName.textContent = name;
    if (settingsEmail) settingsEmail.textContent = email || 'email@example.com';
}

// ================================================================
// CHATBOT FUNCTIONS
// ================================================================
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    const typingMsg = document.createElement('div');
    typingMsg.className = 'msg bot';
    typingMsg.id = 'typingIndicator';
    typingMsg.innerHTML = `<div class="msg-label"><i class="fas fa-gavel"></i> ${botName}</div><span class="shimmer" style="padding:4px 12px;border-radius:8px;">...</span>`;
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
        const response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 600 + Math.random() * 500);
}

function sendQuickQuery(text) {
    chatInput.value = text;
    sendMessage();
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    if (sender === 'bot') {
        div.innerHTML = `<div class="msg-label"><i class="fas fa-gavel"></i> ${botName}</div>${text.replace(/\n/g, '<br>')}`;
    } else {
        div.textContent = text;
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(query) {
    const q = query.toLowerCase().trim();
    const legalKnowledge = {
        'fir': 'FIR (First Information Report) पुलिस में अपराध की सूचना है। FIR दर्ज कराने के लिए:\n1. नजदीकी पुलिस थाने में जाएं\n2. अपनी शिकायत लिखित में दें\n3. पुलिस FIR रजिस्टर करेगी\n📜 धारा 154 CrPC के तहत FIR दर्ज करना पुलिस का कर्तव्य है।',
        'बेल': 'बेल एक कानूनी प्रक्रिया है जिसमें आरोपी को अदालत में पेश होने के वचन पर रिहा किया जाता है।\n📌 बेल के प्रकार: जमानतीय और अ-जमानतीय',
        'अनुच्छेद 21': 'अनुच्छेद 21: "किसी भी व्यक्ति को विधि द्वारा स्थापित प्रक्रिया के अलावा उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।"'
    };
    for (const [key, value] of Object.entries(legalKnowledge)) {
        if (q.includes(key)) return value;
    }
    const articleMatch = q.match(/(अनुच्छेद|article)\s*(\d+)/i);
    if (articleMatch) {
        const num = parseInt(articleMatch[2]);
        const article = constitutionArticles.find(a => a.id === num);
        if (article) return `📜 ${article.title}\n\n${article.desc}`;
    }
    return 'मैं आपके प्रश्न को समझ गया हूँ। कृपया अधिक विशिष्ट जानकारी दें।\n\n💡 सुझाव: FIR, बेल, अनुच्छेद 21, धोखाधड़ी, वकील, अदालत, कानून';
}

function clearChat() {
    chatMessages.innerHTML = `
        <div class="msg bot">
            <div class="msg-label"><i class="fas fa-gavel"></i> ${botName}</div>
            नमस्ते! मैं <strong>Court AI</strong> हूँ, आपका भारतीय कानूनी सहायक।
        </div>
    `;
    showToast('🗑️ चैट हिस्ट्री हटा दी गई');
}

// ================================================================
// REELS FUNCTION
// ================================================================
function renderReels() {
    if (!reelsContainer) return;
    reelsContainer.innerHTML = '';
    constitutionArticles.forEach((article) => {
        const card = document.createElement('div');
        card.className = 'reel-card';
        card.innerHTML = `
            <div class="reel-number">${article.id}</div>
            <div class="reel-badge"><i class="fas fa-bookmark"></i> अनुच्छेद ${article.id}</div>
            <div class="reel-title">${article.title}</div>
            <div class="reel-desc">${article.desc}</div>
            <div class="reel-footer">
                <span class="reel-tag"><i class="fas fa-tag"></i> ${article.tag}</span>
                <div class="reel-actions">
                    <i class="fas fa-share-alt" onclick="showToast('शेयर लिंक कॉपी किया गया')"></i>
                    <i class="fas fa-bookmark" onclick="showToast('सेव किया गया')"></i>
                </div>
            </div>
        `;
        reelsContainer.appendChild(card);
    });
    document.getElementById('reelBadge').textContent = constitutionArticles.length;
}

// ================================================================
// THEME FUNCTIONS
// ================================================================
function changeTheme(color, el) {
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-dark', color);
    document.querySelectorAll('.color-picker .dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    showToast('🎨 थीम अपडेट कर दी गई');
    localStorage.setItem('courtAiTheme', color);
}

function toggleDarkMode(el) {
    el.classList.toggle('active');
    const isDark = el.classList.contains('active');
    if (isDark) {
        document.documentElement.style.setProperty('--primary', '#0a1628');
        document.documentElement.style.setProperty('--primary-dark', '#050d1a');
    } else {
        document.documentElement.style.setProperty('--primary', '#1a1a2e');
        document.documentElement.style.setProperty('--primary-dark', '#0f0f1a');
    }
    showToast(isDark ? '🌙 डार्क मोड ऑन' : '☀️ डार्क मोड ऑफ');
    localStorage.setItem('courtAiDarkMode', isDark ? 'true' : 'false');
}

// ================================================================
// LOAD SETTINGS
// ================================================================
function loadSettings() {
    const savedTheme = localStorage.getItem('courtAiTheme');
    if (savedTheme) {
        document.documentElement.style.setProperty('--primary', savedTheme);
        document.documentElement.style.setProperty('--primary-dark', savedTheme);
        document.querySelectorAll('.color-picker .dot').forEach(d => {
            d.classList.toggle('active', d.style.backgroundColor === savedTheme);
        });
    }
    const darkMode = localStorage.getItem('courtAiDarkMode');
    if (darkMode === 'true') {
        const toggle = document.querySelector('.toggle');
        if (toggle) toggle.classList.add('active');
        document.documentElement.style.setProperty('--primary', '#0a1628');
        document.documentElement.style.setProperty('--primary-dark', '#050d1a');
    }
}

// ================================================================
// AUTH STATE LISTENER
// ================================================================
auth.onAuthStateChanged((user) => {
    console.log('🔵 Auth state changed:', user ? 'User logged in' : 'No user');
    if (user) {
        currentUser = user;
        isLoggedIn = true;
        sessionStorage.setItem('courtAiLoggedIn', 'true');
        sessionStorage.setItem('courtAiUser', JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
        }));
        updateUserUI(user);
        if (document.getElementById('loginPage').classList.contains('active')) {
            navigateTo('homePage');
        }
        document.getElementById('reelBadge').textContent = constitutionArticles.length;
    } else {
        if (isLoggedIn) {
            isLoggedIn = false;
            currentUser = null;
            sessionStorage.removeItem('courtAiLoggedIn');
            sessionStorage.removeItem('courtAiUser');
        }
    }
});

// ================================================================
// CHECK SESSION
// ================================================================
function checkAuthState() {
    const saved = sessionStorage.getItem('courtAiLoggedIn');
    const userData = sessionStorage.getItem('courtAiUser');
    if (saved === 'true' && userData) {
        try {
            const user = JSON.parse(userData);
            currentUser = user;
            isLoggedIn = true;
            updateUserUI(user);
            navigateTo('homePage');
            document.getElementById('reelBadge').textContent = constitutionArticles.length;
            return true;
        } catch(e) {}
    }
    return false;
}

// ================================================================
// KEYBOARD SHORTCUTS
// ================================================================
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '1') { e.preventDefault(); navigateTo('homePage'); }
    if (e.ctrlKey && e.key === '2') { e.preventDefault(); navigateTo('knowledgePage'); }
    if (e.ctrlKey && e.key === '3') { e.preventDefault(); navigateTo('settingsPage'); }
});

// ================================================================
// EXPOSE GLOBALS
// ================================================================
window.handleGoogleSignIn = handleGoogleSignIn;
window.handleLogout = handleLogout;
window.navigateTo = navigateTo;
window.sendMessage = sendMessage;
window.sendQuickQuery = sendQuickQuery;
window.clearChat = clearChat;
window.changeTheme = changeTheme;
window.toggleDarkMode = toggleDarkMode;
window.showToast = showToast;
window.renderReels = renderReels;

// ================================================================
// INIT
// ================================================================
console.log('🏛️ Court AI v3.0 Loading...');
loadSettings();
renderReels();

if (!checkAuthState()) {
    console.log('🔴 No session found, showing login page');
    navigateTo('loginPage');
} else {
    console.log('🟢 Session found, user logged in');
}

setTimeout(() => {
    if (isLoggedIn) chatInput.focus();
}, 500);

console.log('✅ Court AI v3.0 Loaded Successfully!');
console.log(`📚 ${constitutionArticles.length} अनुच्छेद उपलब्ध`);
