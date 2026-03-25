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

    fetch('../data/checklist.json')

        .then(function (response) {
            console.log('Fichier chargé !');
            return response.json();
        })

        .then(function (data) {
            console.log('Données reçues :', data);

            checklistData = data;

            loadSavedData();

            displayChecklist();
        })

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

    checklistContainer.textContent = '';

    checklistData.categories.forEach( (category) => {

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;

        categoryDiv.appendChild(categoryTitle);


        category.tasks.forEach( (task) => {

            const taskDiv = createTaskElement(task);

            categoryDiv.appendChild(taskDiv);
        });

        checklistContainer.appendChild(categoryDiv);
    });

    calculateProgress();
}


//* =============================================
//* CRÉER UNE TÂCHE
//* =============================================

function createTaskElement(task) {

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = task.id;

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

    checklistData.categories.forEach( (category) => {

        category.tasks.forEach( (task) => {

            if (task.id === taskId) {

                task.completed = !task.completed;

                const taskDiv = document.getElementById(taskId);

                if (task.completed) {
                    taskDiv.classList.add('completed');
                }
                else {
                    taskDiv.classList.remove('completed');
                }
            }
        });
    });

    saveData();

    // Recalculer la progression
    calculateProgress();
}

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

//* =============================================
//* SAUVEGARDER LA VALEUR D'UN INPUT
//* =============================================

function saveInputValue(taskId, value) {
    console.log('Input sauvegardé :', taskId, value);

    // Trouver la tâche et mettre à jour sa valeur
    checklistData.categories.forEach( (category) => {
        category.tasks.forEach( (task) => {

            if (task.id === taskId) {
                task.value = value;
            }
        });
    });

    // Sauvegarder
    saveData();
}

//* =============================================
//* CHARGER LES DONNÉES SAUVEGARDÉES
//* =============================================

function loadSavedData() {

    // Récupérer le texte depuis localStorage
    const savedDataString = localStorage.getItem('checklistData');

    if (!savedDataString) {
        console.log('Pas de données sauvegardées');
        return;
    }

    console.log('Données sauvegardées trouvées !');

    // Transformer le texte en objet
    const savedData = JSON.parse(savedDataString);

    // Fusionner : garder les tâches du JSON, mais récupérer les sauvegardes
    checklistData.categories.forEach( (category, catIndex) => {
        category.tasks.forEach( (task, taskIndex) => {

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

//* =============================================
//* CALCULER LA PROGRESSION
//* =============================================

function calculateProgress() {

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

    // Calculer le pourcentage
    let percentage = 0;

    if (total > 0) {
        percentage = (completed / total) * 100;
        percentage = Math.round(percentage);
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