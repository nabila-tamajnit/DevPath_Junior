//* =============================================
//* MODE SOMBRE PROFIL PAGE
//* =============================================

const body = document.body;

function getDarkModeToggle() {
    return document.getElementById('darkModeToggle')
}

console.log('Initialisation du mode sombre...');


// ============== CHARGER ==============

function loadDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode');
    console.log('État du mode sombre sauvegardé :', darkModeEnabled);

    // Appliquer le mode sombre au body
    if (darkModeEnabled === 'enabled') {
        body.classList.add('dark-mode');
        console.log('Mode sombre appliqué au body');
    } else {
        body.classList.remove('dark-mode');
        console.log('Mode clair appliqué au body');
    }
    
    // Mettre à jour la checkbox après un petit délai
    setTimeout(() => {
        const darkModeToggle = getDarkModeToggle();
        
        if (darkModeToggle) {
            if (darkModeEnabled === 'enabled') {
                darkModeToggle.checked = true;
                console.log('Checkbox cochée (mode sombre)');
            } else {
                darkModeToggle.checked = false;
                console.log('Checkbox décochée (mode clair)');
            }
        } else {
            console.warn('Checkbox non trouvée sur cette page');
        }
    }, 50);
}


// ============== BASCULER LE MODE ==============

function setupDarkModeToggle() {
    const darkModeToggle = getDarkModeToggle();
    
    if (!darkModeToggle) {
        console.warn('Impossible de trouver la checkbox du mode sombre');
        return;
    }
    
    console.log('Checkbox trouvée:', darkModeToggle.id);
    
    darkModeToggle.addEventListener('change', function() {
        console.log('Toggle cliqué, état:', this.checked);
        
        // Basculer le mode
        if (this.checked) {
            // Activer le mode sombre
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            console.log('Mode sombre activé et sauvegardé');
        } else {
            // Activer le mode clair
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            console.log('Mode clair activé et sauvegardé');
        }
    });
}


// ============== INITIALISATION ==============

// Charger l'état
loadDarkMode();

// Attacher l'événement après que le DOM soit prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDarkModeToggle);
} else {
    setupDarkModeToggle();
}