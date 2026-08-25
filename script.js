// ================================================================
// DATA: INDIAN CONSTITUTION ARTICLES
// ================================================================
const constitutionArticles = [
    { id: 1, title: 'अनुच्छेद 1: भारत का नाम और क्षेत्र', desc: 'भारत, जो इंडिया भी कहलाता है, राज्यों का एक संघ है। इसके क्षेत्र में राज्यों और केंद्र शासित प्रदेशों का समावेश है।', tag: 'मूलभूत' },
    { id: 14, title: 'अनुच्छेद 14: विधि के समक्ष समानता', desc: 'राज्य किसी भी व्यक्ति को विधि के समक्ष समानता या विधियों के समान संरक्षण से वंचित नहीं करेगा।', tag: 'मौलिक अधिकार' },
    { id: 15, title: 'अनुच्छेद 15: धर्म, जाति आदि के आधार पर भेदभाव का निषेध', desc: 'राज्य किसी भी नागरिक के विरुद्ध केवल धर्म, मूलवंश, जाति, लिंग, जन्मस्थान या इनमें से किसी के आधार पर भेदभाव नहीं करेगा।', tag: 'मौलिक अधिकार' },
    { id: 16, title: 'अनुच्छेद 16: लोक नियोजन में अवसर की समानता', desc: 'राज्य के अधीन किसी पद या नियोजन के संबंध में सभी नागरिकों को अवसर की समानता होगी।', tag: 'मौलिक अधिकार' },
    { id: 19, title: 'अनुच्छेद 19: वाक् एवं अभिव्यक्ति की स्वतंत्रता', desc: 'सभी नागरिकों को वाक् और अभिव्यक्ति की स्वतंत्रता, शांतिपूर्वक सम्मेलन करने, संघ या सहकारिता बनाने, भारत के किसी भी भाग में स्वतंत्र रूप से घूमने आदि के अधिकार प्राप्त हैं।', tag: 'मौलिक अधिकार' },
    { id: 21, title: 'अनुच्छेद 21: जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण', desc: 'किसी भी व्यक्ति को विधि द्वारा स्थापित प्रक्रिया के अलावा उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।', tag: 'मौलिक अधिकार' },
    { id: 21A, title: 'अनुच्छेद 21A: शिक्षा का अधिकार', desc: 'राज्य 6 से 14 वर्ष की आयु के सभी बच्चों को मुफ्त और अनिवार्य शिक्षा इस प्रकार प्रदान करेगा जैसा राज्य विधि द्वारा निर्धारित करे।', tag: 'मौलिक अधिकार' },
    { id: 25, title: 'अनुच्छेद 25: धर्म की स्वतंत्रता', desc: 'सभी व्यक्ति समान रूप से अंतःकरण की स्वतंत्रता और स्वतंत्र रूप से अपने धर्म का प्रचार, आचरण और प्रसार करने के अधिकार के हकदार हैं।', tag: 'मौलिक अधिकार' },
    { id: 32, title: 'अनुच्छेद 32: संवैधानिक उपचारों का अधिकार', desc: 'मौलिक अधिकारों के प्रवर्तन के लिए उच्चतम न्यायालय में रिट याचिका दायर करने का अधिकार। डॉ. अंबेडकर ने इसे "संविधान की आत्मा" कहा है।', tag: 'मौलिक अधिकार' },
    { id: 44, title: 'अनुच्छेद 44: समान नागरिक संहिता', desc: 'राज्य पूरे भारत में नागरिकों के लिए एक समान नागरिक संहिता सुनिश्चित करने का प्रयास करेगा।', tag: 'नीति निर्देशक' },
    { id: 51A, title: 'अनुच्छेद 51A: मौलिक कर्तव्य', desc: 'प्रत्येक नागरिक का कर्तव्य है कि वह संविधान का पालन करे, राष्ट्रीय ध्वज और राष्ट्रगान का सम्मान करे, और भारत की संप्रभुता और अखंडता की रक्षा करे।', tag: 'मौलिक कर्तव्य' },
    { id: 72, title: 'अनुच्छेद 72: राष्ट्रपति की क्षमादान शक्ति', desc: 'राष्ट्रपति को किसी भी अपराध के दोषी व्यक्ति की सजा को क्षमा, राहत या दंड-विराम देने की शक्ति है।', tag: 'कार्यपालिका' },
    { id: 124, title: 'अनुच्छेद 124: उच्चतम न्यायालय की स्थापना', desc: 'भारत का उच्चतम न्यायालय स्थापित किया जाएगा, जिसमें एक मुख्य न्यायाधीश और संसद द्वारा निर्धारित संख्या के अन्य न्यायाधीश होंगे।', tag: 'न्यायपालिका' },
    { id: 226, title: 'अनुच्छेद 226: उच्च न्यायालयों की शक्ति', desc: 'प्रत्येक उच्च न्यायालय को किसी भी व्यक्ति, प्राधिकारी या सरकार के विरुद्ध रिट जारी करने की शक्ति है, जो मौलिक अधिकारों सहित किसी भी अधिकार को लागू करने के लिए आवश्यक हो।', tag: 'न्यायपालिका' },
    { id: 356, title: 'अनुच्छेद 356: राष्ट्रपति शासन', desc: 'यदि राष्ट्रपति को यह संतोष हो जाता है कि किसी राज्य में ऐसी स्थिति उत्पन्न हो गई है जिसमें राज्य की सरकार संविधान के अनुसार नहीं चलाई जा सकती है, तो वह राज्य में राष्ट्रपति शासन लागू कर सकता है।', tag: 'आपातकाल' },
    { id: 368, title: 'अनुच्छेद 368: संविधान का संशोधन', desc: 'संसद अपनी संविधान संशोधन शक्ति का उपयोग करके संविधान में किसी भी प्रावधान को जोड़, बदल या निरस्त कर सकती है, लेकिन मूल ढांचे को बदला नहीं जा सकता।', tag: 'संविधान संशोधन' },
    { id: 370, title: 'अनुच्छेद 370: जम्मू-कश्मीर के लिए विशेष प्रावधान', desc: 'जम्मू-कश्मीर को विशेष दर्जा प्रदान करने वाला यह अनुच्छेद 2019 में निरस्त कर दिया गया था। अब जम्मू-कश्मीर और लद्दाख केंद्र शासित प्रदेश हैं।', tag: 'विशेष प्रावधान' },
    { id: 39A, title: 'अनुच्छेद 39A: समान न्याय और मुफ्त विधिक सहायता', desc: 'राज्य यह सुनिश्चित करेगा कि आर्थिक या अन्य अक्षमताओं के कारण किसी भी नागरिक को न्याय प्राप्त करने के अवसर से वंचित न किया जाए, और मुफ्त विधिक सहायता प्रदान करेगा।', tag: 'नीति निर्देशक' }
];

// ================================================================
// STATE
// ================================================================
let currentPage = 'loginPage';
let isLoggedIn = false;
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
// UTILITY
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
// NAVIGATION
// ================================================================
function navigateTo(pageId) {
    if (!isLoggedIn && pageId !== 'loginPage') {
        showToast('कृपया पहले लॉगिन करें');
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
    currentPage = pageId;
    if (pageId === 'knowledgePage') renderReels();
    if (pageId === 'homePage') setTimeout(() => chatInput.focus(), 300);
}

// ================================================================
// LOGIN
// ================================================================
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value.trim();
    if (!email || !pass) {
        showToast('कृपया ईमेल और पासवर्ड दोनों भरें');
        return;
    }
    isLoggedIn = true;
    sessionStorage.setItem('courtAiLoggedIn', 'true');
    showToast('✅ स्वागत है! Court AI आपकी मदद के लिए तैयार है।');
    navigateTo('homePage');
    document.getElementById('reelBadge').textContent = constitutionArticles.length;
}

document.getElementById('loginPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
});
document.getElementById('loginEmail').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
});

// ================================================================
// CHATBOT
// ================================================================
const legalKnowledge = {
    'fir': 'FIR (First Information Report) पुलिस में अपराध की सूचना है। FIR दर्ज कराने के लिए:\n1. नजदीकी पुलिस थाने में जाएं\n2. अपनी शिकायत लिखित में दें\n3. पुलिस FIR रजिस्टर करेगी और आपको FIR की एक प्रति देगी\n4. यदि पुलिस FIR दर्ज नहीं करती तो आप उच्च अधिकारी या अदालत का सहारा ले सकते हैं।\n📜 धारा 154 CrPC के तहत FIR दर्ज करना पुलिस का कर्तव्य है।',
    'बेल': 'बेल एक कानूनी प्रक्रिया है जिसमें आरोपी व्यक्ति को अदालत में पेश होने के वचन पर हिरासत से रिहा किया जाता है।\n📌 बेल के प्रकार:\n• जमानतीय अपराध (Bailable Offence) - आरोपी को बेल मिलना स्वतः अधिकार है\n• अ-जमानतीय अपराध (Non-Bailable Offence) - बेल अदालत के विवेक पर निर्भर\n⚖️ धारा 436-450 CrPC में बेल के प्रावधान हैं।',
    'अनुच्छेद 21': 'अनुच्छेद 21: "किसी भी व्यक्ति को विधि द्वारा स्थापित प्रक्रिया के अलावा उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।"\n\nयह भारतीय संविधान का सबसे महत्वपूर्ण मौलिक अधिकार है। इसमें शामिल हैं:\n✓ जीवन का अधिकार\n✓ गरिमा के साथ जीने का अधिकार\n✓ स्वास्थ्य का अधिकार\n✓ प्रदूषण मुक्त वातावरण का अधिकार\n✓ शीघ्र विचारण का अधिकार\n\n🏛️ मानवाधिकारों का आधार स्तंभ।',
    'धोखाधड़ी': 'धोखाधड़ी (Fraud) से बचने के उपाय:\n1. किसी भी अनजान व्यक्ति को अपनी निजी जानकारी (बैंक, पासवर्ड, OTP) न दें\n2. किसी भी लिंक पर तब तक क्लिक न करें जब तक उसकी प्रामाणिकता सुनिश्चित न हो\n3. बैंक कभी भी फोन पर पिन या पासवर्ड नहीं माँगता\n4. किसी भी योजना में पैसे लगाने से पहले RBI या SEBI से जाँच करें\n⚖️ IPC धारा 420 में धोखाधड़ी के लिए सजा का प्रावधान है।'
};

function getBotResponse(query) {
    const q = query.toLowerCase().trim();
    for (const [key, value] of Object.entries(legalKnowledge)) {
        if (q.includes(key)) return value;
    }
    const articleMatch = q.match(/(अनुच्छेद|article)\s*(\d+)/i);
    if (articleMatch) {
        const num = parseInt(articleMatch[2]);
        const article = constitutionArticles.find(a => a.id === num);
        if (article) return `📜 **${article.title}**\n\n${article.desc}\n\n🏷️ ${article.tag}`;
        else return `मुझे अनुच्छेद ${num} के बारे में जानकारी नहीं है। कृपया अन्य अनुच्छेदों के बारे में पूछें।`;
    }
    if (q.includes('नमस्ते') || q.includes('हैलो') || q.includes('hi'))
        return 'नमस्ते! मैं Court AI हूँ। मुझे अपनी कानूनी समस्या बताएं, मैं भारतीय कानूनों के अनुसार मार्गदर्शन दूंगा।';
    if (q.includes('कानून') || q.includes('law'))
        return 'भारतीय कानून व्यापक और विविध हैं। मैं आपको संविधान, IPC, CrPC और अन्य कानूनों के बारे में बता सकता हूँ। कृपया कोई विशिष्ट प्रश्न पूछें।';
    if (q.includes('अदालत') || q.includes('court'))
        return 'भारत में न्यायालयों का पदानुक्रम: उच्चतम न्यायालय → उच्च न्यायालय → जिला न्यायालय → तहसील न्यायालय। आप अपने मामले की प्रकृति के अनुसार उपयुक्त न्यायालय में जा सकते हैं।';
    if (q.includes('वकील') || q.includes('lawyer'))
        return 'वकील चुनने के लिए:\n✓ बार काउंसिल में पंजीकृत वकील को चुनें\n✓ अपने केस के प्रकार में अनुभवी वकील चुनें\n✓ फीस और सेवाओं के बारे में पहले चर्चा करें\n✓ मुफ्त कानूनी सहायता के लिए जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।';
    return `मैं आपके प्रश्न को समझ गया हूँ। कृपया अधिक विशिष्ट जानकारी दें ताकि मैं भारतीय कानूनों के अनुसार सटीक मार्गदर्शन दे सकूँ।\n\n💡 सुझाव: FIR, बेल, अनुच्छेद 21, धोखाधड़ी, वकील, अदालत, कानून, IPC, CrPC, संविधान आदि पर प्रश्न पूछें।`;
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

function clearChat() {
    chatMessages.innerHTML = `
        <div class="msg bot">
            <div class="msg-label"><i class="fas fa-gavel"></i> ${botName}</div>
            नमस्ते! मैं <strong>Court AI</strong> हूँ, आपका भारतीय कानूनी सहायक।<br />
            मुझे अपनी कानूनी समस्या बताएं, मैं आपको भारतीय कानूनों और संविधान के अनुसार मार्गदर्शन दूंगा।<br />
            <span style="font-size:12px;color:var(--gray);">💡 उदाहरण: "मुझे FIR कैसे दर्ज कराएं?"</span>
        </div>
    `;
    showToast('🗑️ चैट हिस्ट्री हटा दी गई');
}

// ================================================================
// REELS
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
                    <i class="fas fa-chevron-down" onclick="showToast('अधिक जानकारी के लिए अनुच्छेद ${article.id} पूछें')"></i>
                </div>
            </div>
        `;
        reelsContainer.appendChild(card);
    });
    document.getElementById('reelBadge').textContent = constitutionArticles.length;
}

// ================================================================
// THEME
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
        document.documentElement.style.setProperty('--primary-light', '#132240');
    } else {
        document.documentElement.style.setProperty('--primary', '#1a1a2e');
        document.documentElement.style.setProperty('--primary-dark', '#0f0f1a');
        document.documentElement.style.setProperty('--primary-light', '#2a2a4a');
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
        document.documentElement.style.setProperty('--primary-light', '#132240');
    }
}

// ================================================================
// AUTO-LOGIN
// ================================================================
function autoLogin() {
    if (sessionStorage.getItem('courtAiLoggedIn') === 'true') {
        isLoggedIn = true;
        navigateTo('homePage');
        document.getElementById('reelBadge').textContent = constitutionArticles.length;
    }
}

// ================================================================
// INIT
// ================================================================
loadSettings();
renderReels();
autoLogin();
if (!isLoggedIn) navigateTo('loginPage');
setTimeout(() => { if (isLoggedIn) chatInput.focus(); }, 500);

// ================================================================
// KEYBOARD SHORTCUTS
// ================================================================
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '1') { e.preventDefault();
        navigateTo('homePage'); }
    if (e.ctrlKey && e.key === '2') { e.preventDefault();
        navigateTo('knowledgePage'); }
    if (e.ctrlKey && e.key === '3') { e.preventDefault();
        navigateTo('settingsPage'); }
});

// ================================================================
// EXPOSE GLOBALS
// ================================================================
window.handleLogin = handleLogin;
window.navigateTo = navigateTo;
window.sendMessage = sendMessage;
window.sendQuickQuery = sendQuickQuery;
window.clearChat = clearChat;
window.changeTheme = changeTheme;
window.toggleDarkMode = toggleDarkMode;
window.showToast = showToast;
window.renderReels = renderReels;
