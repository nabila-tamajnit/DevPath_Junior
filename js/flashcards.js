//* =============================================
//* VARIABLES GLOBALES
//* =============================================

// ------ Éléments qui évolues -----
let deck = []; // tableau cartes
let currentIndex = 0; // Index carte actuelle
let totalReviewed = 0; // cartes révisées
let knowCount = 0; // cartes Je connais
let reviewCount = 0; // cartes À revoir

// ----- Éléments HTML -----
const profileTitle = document.getElementById('profileTitle');
// Progression
const progressCountElement = document.getElementById('progressCount');
const totalCardsElement = document.getElementById('totalCards');
const knowCountElement = document.getElementById('knowCount');
const reviewCountElement = document.getElementById('reviewCount');
const remainingCountElement = document.getElementById('remainingCount');
// Zone jeu
const flashcard = document.getElementById('flashcard');
const cardInner = document.getElementById('cardInner');
const cardTerm = document.getElementById('cardTerm');
// carte verso
const versoTerm = document.getElementById('versoTerm');
const cardDefinition = document.getElementById('cardDefinition');
const btnKnow = document.getElementById('btnKnow');
const btnReview = document.getElementById('btnReview');
// message fin
const completionMessage = document.getElementById('completionMessage');
const reviewedCountElement = document.getElementById('reviewedCount');
const btnRestart = document.getElementById('btnRestart');


//* =============================================
//* CHARGER LES CARTES DEPUIS LE JSON
//* =============================================

function loadFlashcards() {
    console.log('Chargement des flashcards...');

    // Récupérer le profil depuis localStorage
    const userProfile = localStorage.getItem('userProfile') || 'frontend';

    console.log('Profil utilisateur :', userProfile);

    // Charger le fichier JSON
    fetch('../data/flashcards.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('JSON chargé :', data);

            // Récupérer les cartes du profil
            deck = data[userProfile];

            // Sauvegarder le total de cartes
            totalCards = deck.length;

            console.log('Nombre de cartes :', deck.length);

            // Afficher le profil dans le titre
            let profileName = '';
            if (userProfile === 'frontend') {
                profileName = 'Frontend';
            }
            else if (userProfile === 'backend') {
                profileName = 'Backend';
            }
            else if (userProfile === 'fullstack') {
                profileName = 'Fullstack';
            }

            if (profileTitle) {
                profileTitle.textContent = profileName;
            }

            // Afficher la première carte
            displayCard();
            // Mettre à jour les stats
            updateStats();
        })
        .catch(function (error) {
            console.error('Erreur de chargement :', error);
        });
}


//* =============================================
//* AFFICHER UNE CARTE
//* =============================================

function displayCard() {
    console.log('Affichage de la carte', currentIndex + 1);

    // Si le deck est vide, afficher le message de fin
    if (deck.length === 0) {
        showCompletion();
        return;
    }

    // Récupérer la carte actuelle
    const card = deck[currentIndex];

    // Afficher le terme et la définition
    cardTerm.textContent = card.term;
    versoTerm.textContent = card.term;
    cardDefinition.textContent = card.definition;

    console.log('Carte affichée :', card.term);
}


//* =============================================
//* METTRE À JOUR LES STATS
//* =============================================

function updateStats() {

    if (progressCountElement) {
        progressCountElement.textContent = knowCount;
    }

    if (totalCardsElement) {
        totalCardsElement.textContent = totalCards;
    }

    if (knowCountElement) {
        knowCountElement.textContent = knowCount;
    }

    if (reviewCountElement) {
        reviewCountElement.textContent = reviewCount;
    }

    if (remainingCountElement) {
        remainingCountElement.textContent = deck.length;
    }

    console.log('Stats : ', progressCount, '/', totalCards, '| Je connais:', knowCount, '| À revoir:', reviewCount, '| Restantes:', deck.length);
}


//* =============================================
//* RETOURNER LA CARTE
//* =============================================

function flipCard() {
    console.log('Flip de la carte');

    // Ajouter la classe "flipped"
    cardInner.classList.toggle('flipped');
}


//* =============================================
//* "JE CONNAIS" - RETIRER LA CARTE
//* =============================================

function knowCard() {
    console.log('Carte connue, on la retire du deck');

    // Retirer la carte du deck
    deck.splice(currentIndex, 1);

    // Augmenter le compteur de cartes révisées
    knowCount++;

    // Si on était sur la dernière carte, revenir à l'index 0
    if (currentIndex >= deck.length && deck.length > 0) {
        currentIndex = 0;
    }

    // Retourner la carte avant d'afficher la suivante
    cardInner.classList.remove('flipped');

    // mettre a jour les stats
    updateStats();
    // Afficher la carte suivante avec petit délai pour l'animation
    setTimeout(function () {
        displayCard();
    }, 300);
}


//* =============================================
//* "À REVOIR" - REMETTRE LA CARTE À LA FIN
//* =============================================

function reviewCard() {
    console.log('Carte à revoir, on la remet à la fin');

    // Prendre la carte actuelle
    const currentCard = deck[currentIndex];

    // La retirer du deck
    deck.splice(currentIndex, 1);

    // La remettre à la fin
    deck.push(currentCard);

    // Augmenter le compteur "À revoir"
    reviewCount++;
    console.log('compteur review augmenté :', reviewCount)

    // Si on était sur la dernière carte, revenir à l'index 0
    if (currentIndex >= deck.length && deck.length > 0) {
        currentIndex = 0;
    }

    // Retourner la carte avant d'afficher la suivante
    cardInner.classList.remove('flipped');

    // mettre a jour les stats
    updateStats();
    // Afficher la carte suivante avec délai pour l'animation
    setTimeout(function () {
        displayCard();
    }, 300);
}


//* =============================================
//* AFFICHER LE MESSAGE DE FIN
//* =============================================

function showCompletion() {
    console.log('Toutes les cartes sont révisées !');

    // Cacher la carte
    flashcard.style.display = 'none';

    // Afficher le message de félicitations
    completionMessage.style.display = 'block';

    // Afficher le nombre de cartes révisées
    if (reviewedCountElement) {
        reviewedCountElement.textContent = totalCards;
    }
}


//* =============================================
//* RECOMMENCER LE JEU
//* =============================================

function restartGame() {
    console.log('Redémarrage du jeu...');

    // Recharger la page pour tout réinitialiser
    window.location.reload();
}


//* =============================================
//* ÉVÉNEMENTS
//* =============================================

// Clic sur la carte pour la retourner
if (flashcard) {
    flashcard.addEventListener('click', function (event) {

        // Ne pas retourner si on clique sur un bouton
        if (event.target.tagName === 'BUTTON') {
            return;
        }

        flipCard();
    });
}

// Bouton "Je connais"
if (btnKnow) {
    btnKnow.addEventListener('click', function (event) {
        event.stopPropagation();  // Empêcher le flip de la carte
        knowCard();
    });
}

// Bouton "À revoir"
if (btnReview) {
    btnReview.addEventListener('click', function (event) {
        event.stopPropagation();  // Empêcher le flip de la carte
        reviewCard();
    });
}

// Bouton "Recommencer"
if (btnRestart) {
    btnRestart.addEventListener('click', function () {
        restartGame();
    });
}


//* =============================================
//* LANCER AU CHARGEMENT
//* =============================================

loadFlashcards();