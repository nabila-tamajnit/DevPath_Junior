//* =============================================
//* VARIABLES GLOBALES
//* =============================================

// ------ Éléments qui évolues -----
let allCards = [];
let currentIndex = 0;
let totalQuestions = 0;
let maxSeconds = 20;
let seconds = maxSeconds;

// ----- Éléments HTML ------
const profileTitle = document.getElementById('profileTitle');
// Démarage
const challengeStart = document.getElementById('challengeStart');
const startTotalQuestions = document.getElementById('startTotalQuestions');
const startButton = document.getElementById('startButton');
// Zone jeu
const challengeGame = document.getElementById('challengeGame');
// Timer
const timerCircle = document.getElementById('timerCircle');
const timerText = document.getElementById('timerText');
// Question - Reponses
const questionTerm = document.getElementById('questionTerm');
const answersList = document.getElementById('answersList');
// Progression
const progressFill = document.getElementById('progressFill');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
// Message fin
const challengeFinished = document.getElementById('challengeFinished');
const restartBtn = document.getElementById('restartChallenge');



//* =============================================
//* CHARGER LES CARTES DEPUIS LE JSON
//* =============================================







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

