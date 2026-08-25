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
    toastEl._hideTimer = setTimeout(function() {
        toastEl.classList.remove('show');
    }, 2500);
}

function updateStatusTime() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
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
    pages.forEach(function(p) {
        p.classList.remove('active');
    });
    var target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
    }
    navItems.forEach(function(item) {
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    if (pageId === 'knowledgePage') renderReels();
    if (pageId === 'homePage') {
        setTimeout(function() {
            chatInput.focus();
        }, 300);
    }
    if (pageId === 'settingsPage' && currentUser) updateUserUI(currentUser);
}

// ================================================================
// GOOGLE SIGN-IN FUNCTION
// ================================================================
function handleGoogleSignIn() {
    console.log('Google Sign-In button clicked!');
    var loginError = document.getElementById('loginError');
    var googleBtn = document.getElementById('googleSignInBtn');
    
    loginError.style.display = 'none';
    googleBtn.disabled = true;
    googleBtn.innerHTML = 'Loading...';
    
    auth.signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            console.log('Login Success:', user.displayName);
            currentUser = user;
            isLoggedIn = true;
            sessionStorage.setItem('courtAiLoggedIn', 'true');
            sessionStorage.setItem('courtAiUser', JSON.stringify({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }));
            showToast('Welcome ' + user.displayName + '!');
            updateUserUI(user);
            navigateTo('homePage');
            document.getElementById('reelBadge').textContent = constitutionArticles.length;
            googleBtn.disabled = false;
            googleBtn.innerHTML = 'Google Sign In';
        })
        .catch(function(error) {
            console.error('Login Error:', error);
            loginError.style.display = 'block';
            loginError.textContent = 'Error: ' + error.message;
            googleBtn.disabled = false;
            googleBtn.innerHTML = 'Google Sign In';
            showToast('Login failed: ' + error.message);
        });
}

function handleLogout() {
    auth.signOut().then(function() {
        isLoggedIn = false;
        currentUser = null;
        sessionStorage.removeItem('courtAiLoggedIn');
        sessionStorage.removeItem('courtAiUser');
        navigateTo('loginPage');
        showToast('Logged out');
    }).catch(function(error) {
        showToast('Logout error: ' + error.message);
    });
}

function updateUserUI(user) {
    if (!user) {
        var saved = sessionStorage.getItem('courtAiUser');
        if (saved) {
            try {
                var data = JSON.parse(saved);
                user = data;
            } catch(e) {}
        }
    }
    if (!user) return;
    
    var name = user.displayName || user.name || 'User';
    var email = user.email || '';
    var photo = user.photoURL || '';
    
    var avatarImg = document.getElementById('avatarImg');
    var userNameShort = document.getElementById('userNameShort');
    if (avatarImg) {
        avatarImg.src = photo || '';
    }
    if (userNameShort) {
        userNameShort.textContent = name.split(' ')[0] || name.substring(0, 6);
    }
    
    var settingsAvatar = document.getElementById('settingsAvatar');
    var settingsName = document.getElementById('settingsName');
    var settingsEmail = document.getElementById('settingsEmail');
    if (settingsAvatar) settingsAvatar.src = photo || '';
    if (settingsName) settingsName.textContent = name;
    if (settingsEmail) settingsEmail.textContent = email || 'email@example.com';
}

// ================================================================
// CHATBOT FUNCTIONS
// ================================================================
function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    var typingMsg = document.createElement('div');
    typingMsg.className = 'msg bot';
    typingMsg.id = 'typingIndicator';
    typingMsg.innerHTML = 'Thinking...';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(function() {
        var typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
        var response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 600 + Math.random() * 500);
}

function sendQuickQuery(text) {
    chatInput.value = text;
    sendMessage();
}

function addMessage(text, sender) {
    var div = document.createElement('div');
    div.className = 'msg ' + sender;
    if (sender === 'bot') {
        div.innerHTML = text.replace(/\n/g, '<br>');
    } else {
        div.textContent = text;
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(query) {
    var q = query.toLowerCase().trim();
    var legalKnowledge = {
        'fir': 'FIR (First Information Report) police mein apradh ki suchna hai. FIR darj karane ke liye:\n1. Nazdeeki police thane mein jayen\n2. Apni shikayat likhit mein den\n3. Police FIR register karegi\nSection 154 CrPC ke tahat FIR darj karna police ka kartavya hai.',
        'bel': 'Bel ek kanuni prakriya hai jisme aropi ko adalat mein pesh hone ke vachan par riha kiya jata hai.\nBel ke prakar: Jamantiya aur A-jamantiya',
        'anuchchhed 21': 'Anuchchhed 21: Kisi bhi vyakti ko vidhi dwara sthapit prakriya ke alava uske jeevan ya vyaktigat svatantrata se vanchit nahi kiya jayega.'
    };
    for (var key in legalKnowledge) {
        if (q.includes(key)) return legalKnowledge[key];
    }
    var articleMatch = q.match(/(anuchchhed|article)\s*(\d+)/i);
    if (articleMatch) {
        var num = parseInt(articleMatch[2]);
        var article = constitutionArticles.find(function(a) { return a.id === num; });
        if (article) return article.title + '\n\n' + article.desc;
    }
    return 'Mai aapke prashn ko samajh gaya hu. Kripya adhik vishisht jankari den.\n\nSuggestions: FIR, Bel, Anuchchhed 21, Dhokhadhadi, Vakil, Adalat, Kanoon';
}

function clearChat() {
    chatMessages.innerHTML = 'Chat cleared.';
    showToast('Chat history deleted');
}

// ================================================================
// REELS FUNCTION
// ================================================================
function renderReels() {
    if (!reelsContainer) return;
    reelsContainer.innerHTML = '';
    constitutionArticles.forEach(function(article) {
        var card = document.createElement('div');
        card.className = 'reel-card';
        card.innerHTML = article.title + ' - ' + article.desc;
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
    var dots = document.querySelectorAll('.color-picker .dot');
    dots.forEach(function(d) { d.classList.remove('active'); });
    el.classList.add('active');
    showToast('Theme updated');
    localStorage.setItem('courtAiTheme', color);
}

function toggleDarkMode(el) {
    el.classList.toggle('active');
    var isDark = el.classList.contains('active');
    if (isDark) {
        document.documentElement.style.setProperty('--primary', '#0a1628');
        document.documentElement.style.setProperty('--primary-dark', '#050d1a');
    } else {
        document.documentElement.style.setProperty('--primary', '#1a1a2e');
        document.documentElement.style.setProperty('--primary-dark', '#0f0f1a');
    }
    showToast(isDark ? 'Dark mode ON' : 'Dark mode OFF');
    localStorage.setItem('courtAiDarkMode', isDark ? 'true' : 'false');
}

// ================================================================
// LOAD SETTINGS
// ================================================================
function loadSettings() {
    var savedTheme = localStorage.getItem('courtAiTheme');
    if (savedTheme) {
        document.documentElement.style.setProperty('--primary', savedTheme);
        document.documentElement.style.setProperty('--primary-dark', savedTheme);
        var dots = document.querySelectorAll('.color-picker .dot');
        dots.forEach(function(d) {
            if (d.style.backgroundColor === savedTheme) {
                d.classList.add('active');
            }
        });
    }
    var darkMode = localStorage.getItem('courtAiDarkMode');
    if (darkMode === 'true') {
        var toggle = document.querySelector('.toggle');
        if (toggle) toggle.classList.add('active');
        document.documentElement.style.setProperty('--primary', '#0a1628');
        document.documentElement.style.setProperty('--primary-dark', '#050d1a');
    }
}

// ================================================================
// AUTH STATE LISTENER
// ================================================================
auth.onAuthStateChanged(function(user) {
    console.log('Auth state changed:', user ? 'User logged in' : 'No user');
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
    var saved = sessionStorage.getItem('courtAiLoggedIn');
    var userData = sessionStorage.getItem('courtAiUser');
    if (saved === 'true' && userData) {
        try {
            var user = JSON.parse(userData);
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
document.addEventListener('keydown', function(e) {
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
console.log('Court AI v3.0 Loading...');
loadSettings();
renderReels();

if (!checkAuthState()) {
    console.log('No session found, showing login page');
    navigateTo('loginPage');
} else {
    console.log('Session found, user logged in');
}

setTimeout(function() {
    if (isLoggedIn) chatInput.focus();
}, 500);

console.log('Court AI v3.0 Loaded Successfully!');
console.log(constitutionArticles.length + ' articles available');
