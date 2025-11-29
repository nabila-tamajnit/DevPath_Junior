//* =============================================
//* VARIABLES GLOBALES
//* =============================================

let questionsProfil = [];
let allQuestions = [];
let currentQuestion = 0;

const profileSubTitle = document.getElementById('profileSubTitle');

const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');

const prevQuestion = document.getElementById('prevQuestion');
const nextQuestion = document.getElementById('nextQuestion');

const progressQuestionCount = document.getElementById('progressQuestionCount');
const totalQuestionCount = document.getElementById('totalQuestionCount');

const interviewFinished = document.getElementById('interviewFinished')
const restart = document.getElementById('restart');

console.log('Interview JS chargé');

//* =============================================
//* CHARGER LES QUESTIONS DEPUIS LE JSON
//* =============================================

function loadQuestions() {
    console.log('Chargement des questions...');

    const userProfile = localStorage.getItem('userProfile') || 'frontend';
    console.log('Profil utilisateur :', userProfile);

    fetch('data/interview.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('JSON chargé :', data);

            questionsProfil = data[userProfile];
            console.log('Questions de profil :', questionsProfil);

            allQuestions = [...data.general, ...data.motivation, ...questionsProfil, ...data.practical];
            console.log('Toutes les questions :', allQuestions);

            let profileInterviewName = '';
            if (userProfile === 'frontend') {
                profileInterviewName = 'Frontend';
            }
            else if (userProfile === 'backend') {
                profileInterviewName = 'Backend';
            }
            else if (userProfile === 'fullstack') {
                profileInterviewName = 'Fullstack';
            }

            if (profileSubTitle) {
                profileSubTitle.textContent = profileInterviewName;
            }

            displayQuestion();
            updateProgressDisplay();
        })
        .catch(function (error) {
            console.error('Erreur de chargement :', error);
        });
}


//* =============================================
//* AFFICHER UNE QUESTION/RÉPONSE
//* =============================================

function displayQuestion() {
    console.log('Affichage de la question', currentQuestion + 1);

    // Récupérer la question actuelle
    const question = allQuestions[currentQuestion];

    // Afficher la question et réponse
    questionText.textContent = question.question;
    answerText.textContent = question.guidance;

    updateButtonsAppearance();

    console.log('Question affichée :', question.question);
}


//* =============================================
//* METTRE À JOUR LE COMPTEUR
//* =============================================
function updateProgressDisplay() {
    if (progressQuestionCount) {
        progressQuestionCount.textContent = currentQuestion + 1;
    }

    if (totalQuestionCount) {
        totalQuestionCount.textContent = allQuestions.length;
    }

    updateButtonsAppearance();

    console.log('Compteur :', currentQuestion + 1, '/', allQuestions.length);
}


//* =============================================
//* METTRE À JOUR L'APPARENCE DES BOUTONS
//* =============================================
function updateButtonsAppearance() {
    console.log('Mise à jour des boutons');

    // --- BOUTON PRÉCÉDENT ---
    if (currentQuestion === 0) {
        // Première question : bouton désactivé
        prevQuestion.classList.remove('btn-primary');
        prevQuestion.classList.add('btn-secondary');
        prevQuestion.disabled = true;
        prevQuestion.style.opacity = '0.5';
        prevQuestion.style.cursor = 'not-allowed'; // Change le curseur
    } else {
        // Questions avant : bouton actif
        prevQuestion.classList.remove('btn-secondary');
        prevQuestion.classList.add('btn-primary');
        prevQuestion.disabled = false;
        prevQuestion.style.opacity = '1';
        prevQuestion.style.cursor = 'pointer';
    }

    // --- BOUTON SUIVANT ---
    if (currentQuestion === allQuestions.length - 1) {
        // Dernière question : bouton désactivé
        nextQuestion.classList.remove('btn-primary');
        nextQuestion.classList.add('btn-secondary');
        nextQuestion.disabled = true;
        nextQuestion.style.opacity = '0.5';
        nextQuestion.style.cursor = 'not-allowed';

        // Afficher le bouton Recommencer
        if (interviewFinished) {
            interviewFinished.style.display = 'flex';
        }
    } else {
        // Encore des questions : bouton actif
        nextQuestion.classList.remove('btn-secondary');
        nextQuestion.classList.add('btn-primary');
        nextQuestion.disabled = false;
        nextQuestion.style.opacity = '1';
        nextQuestion.style.cursor = 'pointer';

        // Cacher le bouton Recommencer
        if (interviewFinished) {
            interviewFinished.style.display = 'none';
        }
    }
}

//* =============================================
//* ÉVÉNEMENTS
//* =============================================
// BOUTTON PRÉCÈDENT
if (prevQuestion) {
    prevQuestion.addEventListener('click', function () {
        // Si plus que 0, on peut repasser à la précédente
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
            updateProgressDisplay();
        }
    });
}

// BOUTTON SUIVANT
if (nextQuestion) {
    nextQuestion.addEventListener('click', function () {
        // Si moins que la dèrnière, on peut passer à la suivante
        if (currentQuestion < allQuestions.length - 1) {
            currentQuestion++;
            displayQuestion();
            updateProgressDisplay();
        }
    });
}

// BOUTTON RESTART
if (restart) {
    restart.addEventListener('click', function () {
        // Revenir à la première question
        currentQuestion = 0;

        // Cacher le boutton restart
        if (interviewFinished) {
            interviewFinished.style.display = 'none';
        }

        // Afficher la première question
        displayQuestion();
        updateProgressDisplay();
    });
}


//* =============================================
//* LANCER AU CHARGEMENT
//* =============================================

loadQuestions();