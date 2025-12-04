//* =============================================
//* VARIABLES GLOBALES
//* =============================================
// Stocker les données de la checklist (vide pour l'instant)
let checklistData = null;

// -- Barre de progression --
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// -- Compteurs --
const completedCount = document.getElementById('completedCount');
const totalCount = document.getElementById('totalCount');

// -- Container principal de la checklist --
const checklistContainer = document.getElementById('checklistContainer');

console.log('Variables initialisées');


//* =============================================
//* CHARGER LES DONNÉES DEPUIS LE JSON 
//* =============================================

function loadChecklist() {
    console.log('Chargement de la checklist...');

    // Télécharger le fichier JSON
    fetch('../data/checklist.json')

        // Quand le fichier est chargé, le transformer en objet JS
        .then(function (response) {
            console.log('Fichier chargé !');
            return response.json();
        })

        // Utiliser les données
        .then(function (data) {
            console.log('Données reçues :', data);

            // Stocker les données dans la variable globale
            checklistData = data;

            // Charger les données sauvegardées
            loadSavedData();

            // Afficher la checklist
            displayChecklist();
        })

        // En cas d'erreur
        .catch(function (error) {
            console.error('Erreur de chargement :', error);
            checklistContainer.textContent = 'Erreur de chargement.';
        });
}


//* =============================================
//* AFFICHER LA CHECKLIST
//* =============================================

function displayChecklist() {
    console.log('Affichage de la checklist');

    // Vider le container avant de le remplir
    checklistContainer.textContent = '';

    // Pour chaque catégorie
    checklistData.categories.forEach(function (category) {

        // Créer la div de la catégorie
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        // Créer le titre de la catégorie
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;

        categoryDiv.appendChild(categoryTitle);


        // Pour chaque tâche de cette catégorie
        category.tasks.forEach(function (task) {

            // Créer la tâche
            const taskDiv = createTaskElement(task);

            categoryDiv.appendChild(taskDiv);
        });

        // Ajouter dans le container principal
        checklistContainer.appendChild(categoryDiv);
    });

    // Calculer la progression après l'affichage
    calculateProgress();
}


//* =============================================
//* CRÉER UNE TÂCHE
//* =============================================

function createTaskElement(task) {

    // Créer la div principale de la tâche
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = task.id;

    // Si la tâche est déjà complétée, ajouter la classe CSS
    if (task.completed) {
        taskDiv.classList.add('completed');
    }

    //? >>>----- TYPE CHECKBOX -----<<<
    if (task.type === 'checkbox') {

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        // Écouter le clic pour cocher/décocher
        checkbox.addEventListener('change', function () {
            toggleTask(task.id);
        });

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = task.text;

        // Ajouter checkbox + label dans la div
        taskDiv.append(checkbox, label);
    }

    //? >>>----- TYPE TEXT -----<<<
    else if (task.type === 'text') {

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function () {
            toggleTask(task.id);
        });

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = task.text;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.value || '';
        input.placeholder = task.placeholder;

        // Sauvegarder à chaque caractère tapé
        input.addEventListener('input', function () {
            saveInputValue(task.id, input.value);
        });

        taskDiv.append(checkbox, label, input);
    }

    //? >>>----- TYPE DATE -----<<<
    else if (task.type === 'date') {

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function () {
            toggleTask(task.id);
        });

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = task.text;

        const input = document.createElement('input');
        input.type = 'date';
        input.value = task.value || '';

        // Sauvegarder quand on sélectionne une date
        input.addEventListener('change', function () {
            saveInputValue(task.id, input.value);
        });

        taskDiv.append(checkbox, label, input);
    }

    return taskDiv;
}


//* =============================================
//* COCHER/DÉCOCHER UNE TÂCHE
//* =============================================

function toggleTask(taskId) {
    console.log('Inverser la tâche :', taskId);

    // Parcourir toutes les catégories et tâches
    checklistData.categories.forEach(function (category) {

        category.tasks.forEach(function (task) {

            // Si c'est la bonne tâche
            if (task.id === taskId) {

                // Inverser l'état
                task.completed = !task.completed;

                // Trouver la div
                const taskDiv = document.getElementById(taskId);

                // Ajouter ou enlever la classe
                if (task.completed) {
                    taskDiv.classList.add('completed');
                }
                else {
                    taskDiv.classList.remove('completed');
                }
            }
        });
    });

    // Sauvegarder dans localStorage
    saveData();

    // Recalculer la progression
    calculateProgress();
}

//! \/\/\/\/\/\/\/ EXPLICATION PRÉSENTATION \/\/\/\/\/\/\/\/\/
//* =============================================
//* SAUVEGARDER DANS LOCALSTORAGE
//* =============================================

function saveData() {

    // Transformer l'objet en texte JSON
    const dataString = JSON.stringify(checklistData);

    // Sauvegarder dans localStorage
    localStorage.setItem('checklistData', dataString);

    console.log('Données sauvegardées !');
}
//! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//* =============================================
//* SAUVEGARDER LA VALEUR D'UN INPUT
//* =============================================

function saveInputValue(taskId, value) {
    console.log('Input sauvegardé :', taskId, value);

    // Trouver la tâche et mettre à jour sa valeur
    checklistData.categories.forEach(function (category) {
        category.tasks.forEach(function (task) {

            if (task.id === taskId) {
                task.value = value;
            }
        });
    });

    // Sauvegarder
    saveData();
}

//! \/\/\/\/\/\/\/ EXPLICATION PRÉSENTATION \/\/\/\/\/\/\/\/\/
//* =============================================
//* CHARGER LES DONNÉES SAUVEGARDÉES
//* =============================================

function loadSavedData() {

    // Récupérer le texte depuis localStorage
    const savedDataString = localStorage.getItem('checklistData');

    // Si rien n'est sauvegardé, arrêter
    if (!savedDataString) {
        console.log('Pas de données sauvegardées');
        return;
    }

    console.log('Données sauvegardées trouvées !');

    // Transformer le texte en objet
    const savedData = JSON.parse(savedDataString);

    // Fusionner : garder les tâches du JSON, mais récupérer les sauvegardes
    checklistData.categories.forEach(function (category, catIndex) {
        category.tasks.forEach(function (task, taskIndex) {

            // Trouver la même tâche dans les données sauvegardées
            const savedTask = savedData.categories[catIndex].tasks[taskIndex];

            // Si elle existe et a le même ID
            if (savedTask && savedTask.id === task.id) {
                // Récupérer l'état coché
                task.completed = savedTask.completed;

                // Récupérer la valeur (pour les inputs)
                if (savedTask.value !== undefined) {
                    task.value = savedTask.value;
                }
            }
        });
    });
}
//! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//* =============================================
//* CALCULER LA PROGRESSION
//* =============================================

function calculateProgress() {

    let total = 0;  // total de tâches
    let completed = 0;  // de tâches complétées

    // Compter toutes les tâches
    checklistData.categories.forEach(function (category) {
        category.tasks.forEach(function (task) {

            total++;

            if (task.completed) {
                completed++;
            }
        });
    });

    // Calculer le pourcentage
    let percentage = 0;

    if (total > 0) {
        percentage = (completed / total) * 100;
        percentage = Math.round(percentage); // Arrondir
    }

    console.log('Progression : ' + completed + '/' + total + ' = ' + percentage + '%');

    // Mettre à jour la barre de progression
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';

    // Mettre à jour les compteurs
    completedCount.textContent = completed;
    totalCount.textContent = total;
}


//* =============================================
//* LANCER AU CHARGEMENT DE LA PAGE
//* =============================================
loadChecklist();