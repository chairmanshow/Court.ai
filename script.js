const firebaseConfig = {
    apiKey: "AIzaSyCzDYj2dKsHc6vg_hxl32mUaHHNJPCZW3w",
    authDomain: "court-ai06.firebaseapp.com",
    projectId: "court-ai06",
    storageBucket: "court-ai06.firebasestorage.app",
    messagingSenderId: "381268585273",
    appId: "1:381268585273:web:5072bac7970bcfd2ca56e8",
    measurementId: "G-KVFSGFTD9X"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

let isLoggedIn = false;
let currentUser = null;

const constitutionArticles = [
    { id: 1, title: 'Anuched 1: Bharat ka naam aur kshetra', desc: 'Bharat, jo India bhi kahlata hai, rajyon ka ek sangh hai.', tag: 'Moolbhoot' },
    { id: 14, title: 'Anuched 14: Vidhi ke samaksh samanta', desc: 'Rajya kisi bhi vyakti ko vidhi ke samaksh samanta se vanchit nahi karega.', tag: 'Maulik Adhikar' },
    { id: 21, title: 'Anuched 21: Jeevan aur vyaktigat svatantrata ka sanrakshan', desc: 'Kisi bhi vyakti ko vidhi dwara sthapit prakriya ke alava uske jeevan ya vyaktigat svatantrata se vanchit nahi kiya jayega.', tag: 'Maulik Adhikar' }
];

function navigateTo(pageId) {
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(p) { p.classList.remove('active'); });
    var target = document.getElementById(pageId);
    if (target) target.classList.add('active');
}

function handleGoogleSignIn() {
    auth.signInWithPopup(provider)
        .then(function(result) {
            currentUser = result.user;
            isLoggedIn = true;
            sessionStorage.setItem('courtAiLoggedIn', 'true');
            sessionStorage.setItem('courtAiUser', JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid
            }));
            navigateTo('homePage');
            alert('Welcome ' + result.user.displayName + '!');
        })
        .catch(function(error) {
            alert('Login failed: ' + error.message);
        });
}

function sendMessage() {
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text) return;
    var messages = document.getElementById('chatMessages');
    var userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    messages.appendChild(userMsg);
    input.value = '';
    var botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = 'Mai aapka prashn samajh gaya. Kripya adhik jankari dein.';
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
}

function renderReels() {
    var container = document.getElementById('reelsContainer');
    if (!container) return;
    container.innerHTML = '';
    constitutionArticles.forEach(function(article) {
        var card = document.createElement('div');
        card.className = 'reel-card';
        card.innerHTML = '<h3>' + article.title + '</h3><p>' + article.desc + '</p>';
        container.appendChild(card);
    });
}

function showToast(msg) {
    var toast = document.getElementById('toast');
    var toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

window.handleGoogleSignIn = handleGoogleSignIn;
window.navigateTo = navigateTo;
window.sendMessage = sendMessage;
window.renderReels = renderReels;
window.showToast = showToast;

renderReels();
