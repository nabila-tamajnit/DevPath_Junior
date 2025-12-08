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

console.log('Navbar chargée');


// ============== AFFICHER LE PROFIL ==============

// Récupérer le profil depuis localStorage
let currentProfile = localStorage.getItem('userProfile');

// Si aucun profil, mettre Frontend au cas ou
if (!currentProfile) {
    currentProfile = 'frontend';
    localStorage.setItem('userProfile', 'frontend');
}

// Afficher le bon nom dans la navbar
if (currentProfile === 'frontend') {
    profileName.textContent = 'Frontend';
}
else if (currentProfile === 'backend') {
    profileName.textContent = 'Backend';
}
else if (currentProfile === 'fullstack') {
    profileName.textContent = 'Fullstack';
}

console.log('Profil affiché :', currentProfile);


// ============== CRÉER LE MENU ==============

// Div du menu profil
const dropdown = document.createElement('div');
dropdown.className = 'profile-dropdown';
dropdown.id = 'profileDropdown';

// Créer les bouttons si pas celui sauvegardé
if (currentProfile !== 'frontend') {
    const btnFrontend = document.createElement('button');
    btnFrontend.className = 'profile-option';
    btnFrontend.textContent = 'Frontend';
    dropdown.appendChild(btnFrontend);
}

if (currentProfile !== 'backend') {
    const btnBackend = document.createElement('button');
    btnBackend.className = 'profile-option';
    btnBackend.textContent = 'Backend';
    dropdown.appendChild(btnBackend);
}

if (currentProfile !== 'fullstack') {
    const btnFullstack = document.createElement('button');
    btnFullstack.className = 'profile-option';
    btnFullstack.textContent = 'Fullstack';
    dropdown.appendChild(btnFullstack);
}

// Mettre le menu dans le badge
profileBadge.appendChild(dropdown);

console.log('Menu créé');


// ============== OUVRIR LE MENU ==============

changeButton.addEventListener('click', () => {

    // Ouvrir le menu avec la classe active
    dropdown.classList.toggle('active');
    console.log('Menu toggled');
});


// ============== CHANGER DE PROFIL ==============

// Récupérer tous les boutons du menu
const profileOptions = document.querySelectorAll('.profile-option');

profileOptions.forEach((button) => {

    button.addEventListener('click', () => {

        // Récupérer le texte du bouton cliqué comme minuscule sur localstorage
        const newProfileLabel = button.textContent;
        console.log('Nouveau profil choisi :', newProfileLabel);

        // Mettre tout en minuscules pour localStorage sinon fonctionne pas
        let newProfile = '';

        if (newProfileLabel === 'Frontend') {
            newProfile = 'frontend';
        }
        else if (newProfileLabel === 'Backend') {
            newProfile = 'backend';
        }
        else if (newProfileLabel === 'Fullstack') {
            newProfile = 'fullstack';
        }

        // Sauvegarder dans localStorage
        localStorage.setItem('userProfile', newProfile);

        // Affichager dans la navbar
        profileName.textContent = newProfileLabel;

        // Fermer le menu plus de classe active
        dropdown.classList.remove('active');
        console.log('Profil changé !');

        // Recharger la page pour tout mettre à jour
        window.location.reload();
    });
});


//* =============================================
//* MODE SOMBRE
//* =============================================

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;


function loadDarkMode() {

    const darkModeEnabled = localStorage.getItem('darkMode');
    console.log('Préférence de mode :', darkModeEnabled);

    if (darkModeEnabled === 'enabled') {
        body.classList.add('dark-mode');

    }

    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-label', 'Désactiver le mode sombre');
    }
}


darkModeToggle.addEventListener('click', () => {

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {

        localStorage.setItem('darkMode', 'Enabled');

    }
    else {

        localStorage.setItem('darkMode', 'disabled')
    }

})

loadDarkMode();


// Ajouter mode sombre : au click sur sombre, ajouter la class dark a body, puis faire toutes les modifications en css, pour les hero dans l'index, vaut mieux mettre non repeat pour l'image bg et aussi chager la couleur de l'image bg