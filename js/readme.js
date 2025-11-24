
// ========= VARIABLES GLOBALES ==========
const generateButton = document.getElementById('generateButton');
const readmePreview = document.getElementById('readmePreview');
const previewContent = document.getElementById('previewContent');
const copyButton = document.getElementById('copyButton');

let generatedMarkdown = '';

console.log('Variables initiales');


// ========= RÉCUPÉRER LES DONNÉES DU FORMULAIRE ============

function CollectFormData() {
    console.log('Collecte des données du formulaire...');

    // Objet des infos (vide pour l'instant)
    const data = {};

    // Remplir l'objet
    // ---- INFORMATIONS DE BASE ----
    data.name = document.getElementById('userName').value;
    data.title = document.getElementById('userTitle').value;
    data.bio = document.getElementById('userBio').value;

    // ---- PARCOURS & FORMATION ----
    data.formation = document.getElementById('userFormation').value;
    data.school = document.getElementById('userSchool').value;
    data.formationStart = document.getElementById('userFormationStart').value;
    data.formationEnd = document.getElementById('userFormationEnd').value;

    // ---- CE QUE JE RECHERCHE ----
    data.searshing = document.getElementById('userSearching').value;

    // ---- COMPÉTENCES TECHNIQUES ----
    // Récupérer le text
    const skillsText = document.getElementById('userSkills').value;
    // transformer en tableau + enlever les espaces
    data.skills = skillsText.split(',').map(skill => skill.trim());

    //---- EN CE MOMENT J'APPRENDS ---
    data.learning = document.getElementById('userLearning').value;

    // ---- LANGUES ----
    data.languages = document.getElementById('userLanguages').value;

    // ---- PROJETS ----
    // créer un tableau pour 3 projets
    data.projets = [];

    // Prendre les données
    const project1Name = document.getElementById('project1Name').value;

    // S'il a un nom, l'ajouter en objet
    if (project1Name) {
        data.projets.push({
            name: project1Name,
            desc: document.getElementById('project1Desc').value,
            link: document.getElementById('project1Link').value
        });
    }

    const project2Name = document.getElementById('project2Name').value;

    if (project2Name) {
        data.projets.push({
            name: project2Name,
            desc: document.getElementById('project2Desc').value,
            link: document.getElementById('project2Link').value
        });
    }

    const project3Name = document.getElementById('project3Name').value;

    if (project3Name) {
        data.projets.push({
            name: project3Name,
            desc: document.getElementById('project3Desc').value,
            link: document.getElementById('project3Link').value
        });
    }

    // ---- CONTACT & RÉSEAUX ----
    data.github = document.getElementById('userGithub').value;
    data.linkedin = document.getElementById('userLinkedin').value;
    data.email = document.getElementById('userEmail').value;

    // ---- STATS GITHUB ----
    data.includeStats = document.getElementById('includeGithubStats').checked;

    // ---- CHOIX DU STYLE ----
    // Récuperer les classes des styles
    const styleRadios = document.querySelectorAll('input[name="readmeStyle"]');

    // Pour chaque radio, on prend la valeur de celui coché
    styleRadios.forEach(function(radio){
        if (radio.checked) {
            data.style = radio.value;
        }
    });

    console.log('Données collectées :', data);
    return data;
}


// =========== GÉNÉRER LE MARKDOWN ===========
function generateMarkdown() {
    console.log('Générer du markdown avec le style :', data.style);

    // Variable vide
    let markdown = '';

    // Pour celui coché, ajouter la fonction du style
    if (data.style === 'professionnel') {
        markdown = generateProfessionalStyle(data);
    }

    else if (data.style === 'creatif') {
        markdown = generateCreativeStyle(data);
    }

    else if (data.style === 'minimaliste') {
        markdown = generateMinimalistStyle(data);
    }

    return markdown;
}

// ============ STYLE PROFESSIONNEL ============
