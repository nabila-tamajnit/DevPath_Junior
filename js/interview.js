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

const entretienFinished = document.getElementById('entretienFinished')
const restart = document.getElementById('restart');

console.log('Interview JS chargé');

//* =============================================
//* CHARGER LES QUESTIONS DEPUIS LE JSON
//* =============================================

function loadQuestions() {
    console.log('chargement des question...');

    const userProfile = localStorage.getItem('userProfile') || 'frontend';
    console.log('profil utilisateur :', userProfile);

    fetch('../data/interview.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('JSON chargé :', data);

        questionsProfil = data[userProfile];
        console.log('Questons de profil :', questionsProfil);

        allQuestions = [...data.general, ...data.motivation, ...questionsProfil, ...data.practical];
        console.log('Autres questions :', allQuestions);

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

    .catch(function(error) {
            console.error('Erreur de chargement :', error);
        });
}


//* =============================================
//* AFFICHER UNE QUESTION/REPONSE
//* =============================================

function displayQuestion() {
    console.log('Affichage de la question', currentQuestion + 1);

    if (currentQuestion >= allQuestions.length) {
        showCompletion();
        return;
    }

    const question = allQuestions[currentQuestion];

    questionText.textContent = question.question;
    answerText.textContent = question.guidance;
    console.log('question affiché :', question.question);
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
    console.log('Compteur :', currentQuestion + 1, '/', allQuestions.length);
}

//* =============================================
//* AFFICHER LE MESSAGE DE FIN
//* =============================================
function showCompletion() {
    console.log('Toutes les questions ont été vues !');

    if (prevQuestion && nextQuestion) {
        prevQuestion.style.display = 'none';
        nextQuestion.style.display = 'none';
    }
    else if (entretienFinished) {
        entretienFinished.style.display = 'flex';
    }
}


//* =============================================
//* QUESTION PRÉCÉDENTE
//* =============================================

function goToPrevious() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgressDisplay();
    }
}


//* =============================================
//* QUESTION SUIVANTE
//* =============================================

function goToNext() {
    if (currentQuestion < allQuestions.length - 1) {
        currentQuestion++
        displayQuestion();
        updateProgressDisplay();
    }
}

//* =============================================
//* RECOMMENCER
//* =============================================

function restartInterview() {
    console.log('Recommencer l\'entretien...');

    currentQuestion = 0;

    if (prevQuestion && nextQuestion) {
        prevQuestion.style.display = 'inline-block';
        nextQuestion.style.display = 'inline-block';
    }

    if (entretienFinished) {
        entretienFinished.style.display = 'none';
    }

    displayQuestion();
    updateProgressDisplay();
}


//* =============================================
//* ÉVÉNEMENTS
//* =============================================

if (prevQuestion) {
    prevQuestion.addEventListener('click', function() {
        goToPrevious();
    });
}

if (nextQuestion) {
    nextQuestion.addEventListener('click', function() {
        goToNext();
    })
}

if (restart) {
    restart.addEventListener('click', function() {
        restartInterview();
    })
}



//* =============================================
//* LANCER AU CHARGEMENT
//* =============================================

loadQuestions();