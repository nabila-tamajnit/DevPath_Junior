//* =============================================
//* VARIABLES GLOBALES
//* =============================================

// ------ Éléments qui évolues -----
let allCards = [];
let currentIndex = 0;
let totalQuestions = 0;

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

