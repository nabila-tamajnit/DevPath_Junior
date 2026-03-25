
//* ============================================
//* AFFICHER LA PROGRESSION SUR INDEX.HTML
//* ============================================

// Charge les données et affiche la progression
function displayChecklistProgress() {
    
    const progressElement = document.getElementById('progressPercentage');
    
    if (!progressElement) {
        // Pas sur la page d'accueil, on arrête
        return;
    }
    
    const savedDataString = localStorage.getItem('checklistData');
    
    if (!savedDataString) {
        // Pas de données sauvegardées, on charge le JSON
        loadChecklistData();
        return;
    }
    
    const checklistData = JSON.parse(savedDataString);
    updateProgressDisplay(checklistData);
}


//* ============================================
//* CHARGER LE JSON (si pas de sauvegarde de localStorage)
//* ============================================

// Comme dans Checklist.js
function loadChecklistData() {
    
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


//* ============================================
//* METTRE À JOUR L'AFFICHAGE
//* ============================================

// Comme dans checklist.js
function updateProgressDisplay(checklistData) {
    
    let total = 0;
    let completed = 0;
    
    checklistData.categories.forEach( (category) => {
        category.tasks.forEach( (task) => {
            total++;
            if (task.completed) {
                completed++;
            }
        });
    });
    
    let percentage = 0;
    
    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }
    
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


//* ============================================
//* LANCER AU CHARGEMENT
//* ============================================

    displayChecklistProgress();