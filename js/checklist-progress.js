/**
 * CALCUL DE PROGRESSION DE LA CHECKLIST
 * Fichier partagé pour afficher la progression sur index.html
 */

// ============================================
// AFFICHER LA PROGRESSION SUR INDEX.HTML
// ============================================

/**
 * Charge les données et affiche la progression
 * Uniquement pour la page d'accueil
 */
function displayChecklistProgressOnHome() {
    
    // Vérifier qu'on est bien sur la page d'accueil
    const progressElement = document.getElementById('progressPercentage');
    
    if (!progressElement) {
        // Pas sur la page d'accueil, on arrête
        return;
    }
    
    // Essayer de charger les données sauvegardées
    const savedDataString = localStorage.getItem('checklistData');
    
    if (!savedDataString) {
        // Pas de données sauvegardées, on charge le JSON
        loadChecklistDataForHome();
        return;
    }
    
    // Il y a des données sauvegardées, les utiliser
    const checklistData = JSON.parse(savedDataString);
    updateProgressDisplay(checklistData);
}


// ============================================
// CHARGER LE JSON (si pas de données sauvegardées)
// ============================================

function loadChecklistDataForHome() {
    
    fetch('data/checklist.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            updateProgressDisplay(data);
        })
        .catch(function(error) {
            console.error('Erreur chargement checklist:', error);
        });
}


// ============================================
// METTRE À JOUR L'AFFICHAGE
// ============================================

function updateProgressDisplay(checklistData) {
    
    let total = 0;
    let completed = 0;
    
    // Compter les tâches
    checklistData.categories.forEach(function(category) {
        category.tasks.forEach(function(task) {
            total++;
            if (task.completed) {
                completed++;
            }
        });
    });
    
    // Calculer le pourcentage
    let percentage = 0;
    
    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }
    
    // Mettre à jour l'affichage
    const progressElement = document.getElementById('progressPercentage');
    
    if (progressElement) {
        progressElement.textContent = percentage + '%';
    }

    
    const completedElement = document.getElementById('homeCompletedCount');
    const totalElement = document.getElementById('homeTotalCount');
    
    if (completedElement) {
        completedElement.textContent = completed;
    }
    
    if (totalElement) {
        totalElement.textContent = total;
    }
}


// ============================================
// LANCER AU CHARGEMENT
// ============================================

// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {
    displayChecklistProgressOnHome();
});