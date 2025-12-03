//* =============================================
//* VARIABLES GLOBALES
//* =============================================

// Données du jeu
let allCards = [];  // Toutes les cartes
let currentIndex = 0;  // Position actuelle
let score = 0;   // Nombre de bonnes réponses
let totalQuestions = 0;  // Nombre total de questions

// Timer
const MAX_SECONDS = 20;
let seconds = MAX_SECONDS;
let timer;

// Éléments HTML
const profileTitle = document.getElementById('profileTitle');
const startTotalQuestions = document.getElementById('startTotalQuestions');
const challengeStart = document.getElementById('challengeStart');
const startButton = document.getElementById('startButton');
const progressFill = document.getElementById('progressFill');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const timerText = document.getElementById('timerText');
const timerCircle = document.getElementById('timerCircle');
const questionTerm = document.getElementById('questionTerm');
const answersList = document.getElementById('answersList');
const challengeGame = document.getElementById('challengeGame');
const challengeFinished = document.getElementById('challengeFinished');
const restartBtn = document.getElementById('restartChallenge');


//* =============================================
//* CHARGER LES DONNÉES DEPUIS LE JSON
//* =============================================

function loadChallengeData() {
    console.log('Chargement des données...');

    // Récupérer le profil choisi
    const userProfile = localStorage.getItem('userProfile') || 'frontend';
    console.log('Profil :', userProfile);

    // Télécharger le fichier JSON
    fetch('../data/flashcards.json')
        .then(function(response) {
            // Transformer le JSON en objet
            return response.json();
        })
        .then(function(data) {
            console.log('Données chargées');

            // Récupérer les cartes du profil
            allCards = data[userProfile];
            totalQuestions = allCards.length;
            console.log('Nombre de questions :', totalQuestions);

            // Afficher le nom du profil
            let profileName = '';
            if (userProfile === 'frontend') {
                profileName = 'Frontend';
            } else if (userProfile === 'backend') {
                profileName = 'Backend';
            } else {
                profileName = 'Fullstack';
            }

            // Mettre le nom dans le titre
            if (profileTitle) {
                profileTitle.textContent = profileName;
            }

            // Afficher le nombre total de questions
            if (startTotalQuestions) {
                startTotalQuestions.textContent = totalQuestions;
            }

            if (totalQuestionsEl) {
                totalQuestionsEl.textContent = totalQuestions;
            }
        })
        .catch(function(error) {
            console.error('❌ Erreur :', error);
        });
}


//* =============================================
//* DÉMARRER LE JEU
//* =============================================

function startGame() {
    console.log('Démarrage du jeu');

    // Cacher l'écran de démarrage
    challengeStart.style.display = 'none';

    // Afficher le jeu
    challengeGame.style.display = 'flex';

    // Afficher la première question
    displayQuestion();
}


//* =============================================
//* AFFICHER UNE QUESTION
//* =============================================

function displayQuestion() {
    console.log('Question n°', currentIndex + 1);

    // Si on a fini toutes les questions
    if (currentIndex >= totalQuestions) {
        showResults();
        return;
    }

    // Réinitialiser le temps
    seconds = MAX_SECONDS;
    
    // Récupérer la carte actuelle
    const currentCard = allCards[currentIndex];
    
    // Afficher le terme à deviner
    questionTerm.textContent = currentCard.term;
    
    // Créer 3 réponses (1 bonne + 2 fausses)
    const answers = generateAnswers(currentCard);
    
    // Afficher les 3 boutons de réponses
    displayAnswers(answers);
    
    // Mettre à jour la barre de progression
    updateProgress();
    
    // Lancer le timer
    startTimer();
    
    console.log('Question affichée :', currentCard.term);
}


//* =============================================
//* GÉNÉRER 3 RÉPONSES (1 BONNE + 2 FAUSSES)
//* =============================================

function generateAnswers(correctCard) {
    console.log('Génération des réponses...');
    
    // Tableau vide pour stocker les 3 réponses
    const answers = [];
    
    // AJOUTER LA BONNE RÉPONSE
    answers.push({
        text: correctCard.definition, // La vraie définition
        isCorrect: true // Marquer comme correcte
    });
    
    // TROUVER 2 AUTRES CARTES POUR FAUSSES RÉPONSES
    // filter() = garder seulement les cartes avec un ID différent
    const otherCards = allCards.filter(function(card) {
        return card.id !== correctCard.id;
    });
    
    // MÉLANGER LES AUTRES CARTES
    const shuffledOthers = shuffleArray(otherCards);
    
    // PRENDRE LES 2 PREMIÈRES COMME FAUSSES RÉPONSES
    answers.push({
        text: shuffledOthers[0].definition,
        isCorrect: false
    });
    
    answers.push({
        text: shuffledOthers[1].definition,
        isCorrect: false
    });
    
    // MÉLANGER LES 3 RÉPONSES Pour que la bonne réponse ne soit pas toujours en 1er
    const shuffledAnswers = shuffleArray(answers);
    console.log('3 réponses créées et mélangées');
    
    return shuffledAnswers;
}


//* =============================================
//* MÉLANGER UN TABLEAU
//* =============================================
// Algorithme de Fisher-Yates : mélange vraiment aléatoire

function shuffleArray(array) {
    // Créer une copie pour ne pas modifier l'original
    const newArray = [...array];
    
    // Parcourir le tableau de la fin vers le début
    for (let i = newArray.length - 1; i > 0; i--) {
        // Choisir un index aléatoire entre 0 et i
        const randomIndex = Math.floor(Math.random() * (i + 1));
        
        // Échanger les deux éléments
        const temp = newArray[i];
        newArray[i] = newArray[randomIndex];
        newArray[randomIndex] = temp;
    }
    
    return newArray;
}


//* =============================================
//* AFFICHER LES 3 BOUTONS DE RÉPONSES
//* =============================================

function displayAnswers(answers) {
    // Vider la liste
    answersList.innerHTML = '';
    
    // Pour chaque réponse
    answers.forEach(function(answer) {
        // Créer un button
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        
        // Stocker si c'est la bonne réponse
        button.dataset.correct = answer.isCorrect; // dataset.correct crée l'attribut data-correct dans le HTML
        
        // Ajouter l'événement de clic
        button.addEventListener('click', function() {
            handleAnswer(button);
        });
        
        // Ajouter le bouton dans la liste
        answersList.appendChild(button);
    });
}


//* =============================================
//* GÉRER LA RÉPONSE CLIQUÉE
//* =============================================

function handleAnswer(clickedButton) {
    console.log('Réponse cliquée');
    
    // Arrêter le timer
    stopTimer();
    
    // Vérifier si c'est la bonne réponse
    const isCorrect = clickedButton.dataset.correct === 'true';
    
    if (isCorrect) {
        console.log('Bonne réponse !');
        clickedButton.classList.add('correct'); // vert
        score++;
    } else {
        console.log('Mauvaise réponse');
        clickedButton.classList.add('incorrect'); // rouge
        
        // Et montrer la bonne réponse en vert
        const allButtons = answersList.querySelectorAll('.answer-btn');
        allButtons.forEach(function(btn) {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });
    }
    
    // Désactiver les boutons
    const allButtons = answersList.querySelectorAll('.answer-btn');
    allButtons.forEach(function(btn) {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });
    
    // Passer à la question suivante après 1.5 sec
    setTimeout(function() {
        currentIndex++; // Passer à la suivante
        displayQuestion(); // Afficher la nouvelle question
    }, 1500);
}


//* =============================================
//* DÉMARRER LE TIMER
//* =============================================

function startTimer() {
    console.log('Timer démarré');
    
    // Réinitialiser
    seconds = MAX_SECONDS;
    
    // Enlever les couleurs sinon reste au relancement
    timerCircle.classList.remove('warning', 'danger');
    
    // Lancer le compte à rebours
    timer = setInterval(() => {
        seconds--; // Enlever 1 sec
        
        timerText.textContent = seconds.toString().padStart(2, '0');
        
        // Changer la couleur selon le temps restant
        if (seconds <= 5) {
            timerCircle.classList.add('danger');   // Rouge
            timerCircle.classList.remove('warning');
        } else if (seconds <= 10) {
            timerCircle.classList.add('warning');  // Orange
            timerCircle.classList.remove('danger');
        }
        
        // Si le temps est écoulé
        if (seconds <= 0) {
            console.log('Temps écoulé !');
            stopTimer();
            handleTimeout();
        }
    }, 1000); // Répéter toutes les 1sec
}


//* =============================================
//* ARRÊTER LE TIMER
//* =============================================

function stopTimer() {
    clearInterval(timer); // Arrêter le setInterval
    console.log('Timer arrêté');
}


//* =============================================
//* GÉRER LE TEMPS ÉCOULÉ
//* =============================================

function handleTimeout() {
    console.log('Passage automatique à la suivante');
    
    // Montrer la bonne réponse en vert
    const allButtons = answersList.querySelectorAll('.answer-btn');
    allButtons.forEach(function(btn) {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        }
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });
    
    // Passer à la question suivante après 1.5 sec
    setTimeout(function() {
        currentIndex++;
        displayQuestion();
    }, 1500);
}


//* =============================================
//* METTRE À JOUR LA BARRE DE PROGRESSION
//* =============================================

function updateProgress() {
    // Mettre à jour le compteur
    currentQuestionEl.textContent = currentIndex + 1;
    
    // Calculer le pourcentage
    const percentage = ((currentIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = percentage + '%';
    
    console.log('Progression :', currentIndex + 1, '/', totalQuestions);
}


//* =============================================
//* AFFICHER LES RÉSULTATS FINAUX
//* =============================================

function showResults() {
    console.log('Affichage des résultats');
    
    // Cacher le jeu
    challengeGame.style.display = 'none';
    
    // Afficher les résultats
    challengeFinished.style.display = 'block';
    
    // Calculer le pourcentage
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Afficher le score
    document.getElementById('finalScore').textContent = score + ' / ' + totalQuestions;
    document.getElementById('percentage').textContent = percentage + '%';
    
    // Message personnalisé selon le score
    let title = '';
    let message = '';
    
    if (percentage === 100) {
        title = '🏆 Parfait !';
        message = 'Tu maîtrises parfaitement le vocabulaire !';
    } else if (percentage >= 80) {
        title = '🎉 Excellent !';
        message = 'Tu as une très bonne maîtrise !';
    } else if (percentage >= 60) {
        title = '👍 Bien joué !';
        message = 'Continue à réviser !';
    } else if (percentage >= 40) {
        title = '💪 Pas mal !';
        message = 'Encore quelques révisions !';
    } else {
        title = '📚 Continue !';
        message = 'Revois les flashcards et réessaye !';
    }
    
    // Afficher le titre et le message
    document.getElementById('finishedTitle').textContent = title;
    document.getElementById('finishedMessage').textContent = message;
    
    console.log('Score final :', score, '/', totalQuestions, '=', percentage + '%');
}


//* =============================================
//* RECOMMENCER LE JEU
//* =============================================

function restartChallenge() {
    console.log('Recommencer le challenge');
    
    // Réinitialiser
    currentIndex = 0;
    score = 0;
    
    // Cacher les résultats
    challengeFinished.style.display = 'none';
    
    // Afficher l'écran de démarrage
    challengeStart.style.display = 'block';
}


//* =============================================
//* ÉVÉNEMENTS
//* =============================================

if (startButton) {
    startButton.addEventListener('click', function() {
        startGame();
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', function() {
        restartChallenge();
    });
}


//* =============================================
//* LANCER AU CHARGEMENT DE LA PAGE
//* =============================================

loadChallengeData();



//Todo timer
//const MAX_SECONDS = 20
//let seconds = MAX_SECONDS;
// créer une variable pour stocker le timer 
// let timer
// Lancer le timer chaque fois que l'utilisateur arrive sur la question
// timer = setInterval(() => { 
    // seconds--
    // (00:)XX
// seconds.toString().padStart(2, '0')
//  }, 1000)
// clearInterval(timer) quand joueur répond ou temps écoulé

