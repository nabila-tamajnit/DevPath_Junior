//* =============================================
//* MENU BURGER
//* =============================================

const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

if (burgerBtn && navMenu) {

    burgerBtn.addEventListener('click', () => {

        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');

    navLinks.forEach((link) => {

        link.addEventListener('click', () => {

            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


//* =============================================
//* GESTION DU PROFIL
//* =============================================

const profileName = document.getElementById('profileName');
const changeButton = document.getElementById('changeProfile');
const profileBadge = document.getElementById('profileBadge');

// Récupérer le profil
let currentProfile = localStorage.getItem('userProfile') || 'frontend';
profileName.textContent = currentProfile.charAt(0).toUpperCase() + currentProfile.slice(1);

// Créer le menu dropdown
const dropdown = document.createElement('div');
dropdown.className = 'profile-dropdown';
dropdown.id = 'profileDropdown';
profileBadge.appendChild(dropdown);

// Fonction pour changer de profil
function setProfile(newProfile) {
    localStorage.setItem('userProfile', newProfile);
    window.location.reload();
}

// Générer les options dynamiquement
const options = ['frontend', 'backend', 'fullstack'];
options.forEach(opt => {
    if (opt !== currentProfile) {
        const btn = document.createElement('button');
        btn.className = 'profile-option';
        btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
        btn.onclick = () => setProfile(opt);
        dropdown.appendChild(btn);
    }
});

// Bouton Retour aux Profils
const btnProfile = document.createElement('button');
btnProfile.className = 'profile-return';
btnProfile.textContent = 'Profils';
btnProfile.onclick = () => { window.location.href = "index.html"; };
dropdown.appendChild(btnProfile);

// Ouvrir/Fermer au clic sur le bouton
changeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
});

// FERMER EN CLIQUANT AILLEURS
window.addEventListener('click', (e) => {

    if (dropdown.classList.contains('active')) {
        if (!dropdown.contains(e.target) && e.target !== changeButton) {
            dropdown.classList.remove('active');
            console.log('Menu fermé par clic extérieur');
        }
    }
});




//* =============================================
//* MODE SOMBRE
//* =============================================

const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle')
console.log('Checkbox trouvée :', darkModeToggle);


// ============== CHARGER L'ÉTAT AU DÉMARRAGE ==============

function loadDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode');
    console.log('État du mode sombre :', darkModeEnabled);

    if (darkModeEnabled === 'enabled') {
        body.classList.add('dark-mode');
        
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
        
        console.log('Mode sombre activé');
    } else {
        body.classList.remove('dark-mode');

        if (darkModeToggle) {
            darkModeToggle.checked = false;
        }
        
        console.log('Mode clair activé');
    }
}


// ============== BASCULER LE MODE ==============

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        console.log('Toggle cliqué');
        
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            console.log('Mode sombre enregistré');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            console.log('Mode clair enregistré');
        }
    });
}


// ============== LANCER AU CHARGEMENT ==============

loadDarkMode();