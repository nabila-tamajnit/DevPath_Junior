//* =============================================
//* VARIABLES GLOBALES
//* =============================================
const generateButton = document.getElementById('generateButton');
const readmePreview = document.getElementById('readmePreview');
const previewContent = document.getElementById('previewContent');
const copyButton = document.getElementById('copyButton');

let generatedMarkdown = '';

console.log('Variables initiales');

//* >>>>>>>>>>>>>>> LES FONCTIONS <<<<<<<<<<<<<<<<<<<

//* =============================================
//* FONCTION : RÉCUPÉRER LES DONNÉES DU FORMULAIRE
//* =============================================
function collectFormData() {
    console.log('Collecte des données du formulaire...');

    const data = {};

    //? >>>----- INFORMATIONS DE BASE -----<<<
    data.name = document.getElementById('userName').value;
    data.title = document.getElementById('userTitle').value;
    data.bio = document.getElementById('userBio').value;

    //? >>>----- PARCOURS & FORMATION -----<<<
    data.formation = document.getElementById('userFormation').value;
    data.school = document.getElementById('userSchool').value;
    data.formationStart = document.getElementById('userFormationStart').value;
    data.formationEnd = document.getElementById('userFormationEnd').value;

    //? >>>----- CE QUE JE RECHERCHE -----<<<
    data.searshing = document.getElementById('userSearching').value;

    //? >>>----- COMPÉTENCES TECHNIQUES -----<<<
    // Récupérer le texte
    const progLanguagesText = document.getElementById('userProgrammingLanguages').value;
    data.progLanguages = progLanguagesText ? progLanguagesText.split(',').map(progLang => progLang.trim()) : [];

    const frameworksText = document.getElementById('userFrameworks').value;
    data.frameworks = frameworksText ? frameworksText.split(',').map(fw => fw.trim()) : [];

    const toolsText = document.getElementById('userTools').value;
    data.tools = toolsText ? toolsText.split(',').map(tool => tool.trim()) : [];

    //? >>>----- EN CE MOMENT J'APPRENDS -----<<<
    data.learning = document.getElementById('userLearning').value;

    //? >>>----- LANGUES -----<<<
    const spokLanguagesText = document.getElementById('userSpokenLanguages').value;
    data.spokLanguages = spokLanguagesText ? spokLanguagesText.split(',').map(spokLang => spokLang.trim()) : [];

    //? >>>----- PROJETS -----<<<
    // créer un tableau pour 3 projets
    data.projets = [];

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

    //? >>>----- CONTACT & RÉSEAUX -----<<<
    data.github = document.getElementById('userGithub').value;
    data.linkedin = document.getElementById('userLinkedin').value;
    data.email = document.getElementById('userEmail').value;

    //? >>>----- STATS GITHUB -----<<<
    data.includeStats = document.getElementById('includeGithubStats').checked;

    //? >>>----- CHOIX DU STYLE -----<<<
    // Récuperer les classes des styles
    const styleRadios = document.querySelectorAll('input[name="readmeStyle"]');

    // Pour chaque radio, on prend la valeur de celui coché
    styleRadios.forEach( (radio) => {
        if (radio.checked) {
            data.style = radio.value;
        }
    });

    console.log('Données collectées :', data);
    return data;
}


//* =============================================
//* FONCTION : GÉNÉRER LE MARKDOWN
//* =============================================
function generateMarkdown(data) {
    console.log('Générer du markdown avec le style :', data.style);

    let markdown = '';

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


//* =============================================
//* FONCTION : STYLE PROFESSIONNEL
//* =============================================
function generateProfessionalStyle(data) {

    let md = '';

    //? >>>----- INFORMATIONS DE BASE -----<<<
    md += `# ${data.name}\n\n`;

    if (data.title) {
        md += `**${data.title}**\n\n`;
    }

    if (data.bio) {
        md += `${data.bio}\n\n`;
    }

    md += `---\n\n`;

    //? >>>----- PARCOURS & FORMATION -----<<<
    if (data.formation || data.school){
        md += `## 🎓 Parcours & formation\n\n`;

        if (data.formation) {
            md += `**${data.formation}**`;

            if (data.school) {
            md += `- ${data.school}`;
            }

            md += `\n`
        }

        if (data.formationStart || data.formationEnd) {
            md += `📅 ${data.formationStart}`;
            if (data.formationEnd) {
                md += `- ${data.formationEnd}`;
            }

            md += '\n\n';
        }
    }

    //? >>>----- CE QUE JE RECHERCHE -----<<<
    if (data.searshing) {
        md += `## 🎯 Recherche\n\n`
        md += `${data.searshing}\n\n`
    }

    //? >>>----- COMPÉTENCES TECHNIQUES -----<<<
    // Si l'un des 3 input a au moin 1 élément
    if (data.progLanguages.length > 0 || data.frameworks.length > 0 || data.tools.length > 0) {
        md += `## 💻 Stack Technique\n\n`;

        // Si y a un élément ET que le premier n'est pas vide
        if (data.progLanguages.length > 0 && data.progLanguages[0] !== '') {
            md += `### Languages\n`;

            // pour chaque élément
            data.progLanguages.forEach( (progLang) => {
                md += `- ${progLang}\n`;
            });

            md += `\n`;
        }

        if (data.frameworks.length > 0 && data.frameworks[0] !== '') {
            md += `### Frameworks & Librairies\n`;

            data.frameworks.forEach( (fw) => {
                md += `- ${fw}\n`;
            });

            md += `\n`;
        }

        if (data.tools.length > 0 && data.tools[0] !== '') {
            md += `### Outils & Technologies\n`;

            data.tools.forEach( (tool) => {
                md += `- ${tool}\n`;
            });

            md += `\n`;
        }
    }

    //? >>>----- EN CE MOMENT J'APPRENDS -----<<<
    if (data.learning) {
        md += `## 📚 Actuellement en apprentissage\n\n`;
        md += `${data.learning}\n\n`
    }
    //? >>>----- LANGUES -----<<<
    if (data.spokLanguages.length > 0 && data.spokLanguages[0] !== '') {
        md += `## 🌍 Langues\n\n`;

        data.spokLanguages.forEach( (spokLang) => {
            md += `- ${spokLang}\n`;
        });

        md += `\n`
    }

    //? >>>----- PROJETS -----<<<
    if (data.projets.length > 0) {
        md += `## 🚀 Projets\n\n`;

        data.projets.forEach( (project) => {
            md += `### ${project.name}\n\n`;
            md += `${project.desc}\n\n`;

            if (project.link) {
                md += `[Voir le projet](${project.link})\n\n`;
            }
        })
    }
    //? >>>----- CONTACT & RÉSEAUX -----<<<
    md += `## 📫 Contact\n\n`;

    if (data.email) {
        md += `📧 ${data.email}\n\n`;
    }

    if (data.github || data.linkedin) {
        
        if (data.github) {
            md += `[GitHub](https://github.com/${data.github})`;
        }

        if (data.github && data.linkedin) {
            md += ' | ';
        }

        if (data.linkedin) {
            md += `[LinkedIn](${data.linkedin})`;
        }

        md += '\n\n';
    }

    //? >>>----- STATS GITHUB -----<<<
    if (data.includeStats && data.github) {
        // https://streak-stats.demolab.com/?user=${data.github}&theme=dark
        // https://kasroudra-stats-card.onrender.com/user?user=${data.github}&layout=compact
        md += `## 📊 Statistiques GitHub\n\n`

        md += `![Stats GitHub](https://github-readme-stats.zcy.dev/api?username=${data.github})\n\n`;
    }

    return md;
}


//* =============================================
//* FONCTION : STYLE CRÉATIF
//* =============================================
function generateCreativeStyle(data) {

    let md = '';

    //? >>>----- INFORMATIONS DE BASE -----<<<
    md += `# 👋 Salut, moi c'est ${data.name} !\n\n`;

    if (data.title) {
        md += `### ${data.title} 🚀\n\n`;
    }

    if (data.bio) {
        md += `> ${data.bio}\n\n`;
    }

    //? >>>----- PARCOURS & FORMATION -----<<<
    if (data.formation || data.school){
        md += `## 🎓 Mon parcours\n\n`;

        if (data.formation) {
            md += `🎯 **${data.formation}**`;

            if (data.school) {
            md += ` chez *${data.school}*`;
            }

            md += `\n`
        }

        if (data.formationStart || data.formationEnd) {
            md += `📆 De ${data.formationStart || '...'} à ${data.formationEnd || 'aujourd\'hui'}\n\n`;
        }
    }

    //? >>>----- CE QUE JE RECHERCHE -----<<<
    if (data.searshing) {
        md += `## 🎯 Ce que je cherche\n\n`
        md += `${data.searshing}\n\n`
    }

    //? >>>----- COMPÉTENCES TECHNIQUES -----<<<
    // Si l'un des 3 input a au moin 1 élément
    if (data.progLanguages.length > 0 || data.frameworks.length > 0 || data.tools.length > 0) {
        md += `## 💪 Ma stack technique\n\n`;

        // Si y a un élément ET que le premier n'est pas vide
        if (data.progLanguages.length > 0 && data.progLanguages[0] !== '') {
            md += `**Langages :** `;

            // pour chaque élément
            data.progLanguages.forEach( (progLang) => {
                md += `\`${progLang}\` `;
            });

            md += `\n\n`;
        }

        if (data.frameworks.length > 0 && data.frameworks[0] !== '') {
            md += `**Frameworks:** `;

            data.frameworks.forEach( (fw) => {
                md += `\`${fw}\` `;
            });

            md += `\n\n`;
        }

        if (data.tools.length > 0 && data.tools[0] !== '') {
            md += `**Outils:** `;

            data.tools.forEach( (tool) => {
                md += `\`${tool}\` `;
            });

            md += `\n\n`;
        }
    }

    //? >>>----- EN CE MOMENT J'APPRENDS -----<<<
    if (data.learning) {
        md += `## 🌱 En ce moment, j'explore...\n\n`;
        md += `${data.learning}\n\n`
    }
    //? >>>----- LANGUES -----<<<
    if (data.spokLanguages.length > 0 && data.spokLanguages[0] !== '') {
        md += `## 🗣️ Langues\n\n`;

        data.spokLanguages.forEach( (spokLang) => {
            md += `🌐 ${spokLang}  `;
        });

        md += `\n\n`
    }

    //? >>>----- PROJETS -----<<<
    if (data.projets.length > 0) {
        md += `## 🎨 Mes créations\n\n`;

        data.projets.forEach( (project, index) => {
            md += `### ${index + 1}. ${project.name} 🚀\n\n`;
            md += `${project.desc}\n\n`;

            if (project.link) {
                md += `👉 [Découvrir le projet](${project.link})\n\n`;
            }
        })
    }
    //? >>>----- CONTACT & RÉSEAUX -----<<<
    md += `## 📬 On reste en contact ?\n\n`;

    if (data.email) {
        md += `📧 ${data.email}\n\n`;
    }

    if (data.github || data.linkedin) {
        
        md += `🔗 `;
        if (data.github) {
            md += `[GitHub](https://github.com/${data.github}) `;
        }
        if (data.linkedin) {
            md += `[LinkedIn](${data.linkedin})`;
        }
        md += `\n\n`;
    }

    //? >>>----- STATS GITHUB -----<<<
    if (data.includeStats && data.github) {
        md += `## 📊 Mes stats GitHub\n\n`;

        md += `![Mes stats](https://github-readme-stats.zcy.dev/api?username=${data.github})\n\n`;
    }

    md += `---\n\n`;
    md += `💙 Merci d'être passé(e) sur mon profil !\n`;

    return md;
}


//* =============================================
//* FONCTION : STYLE MINIMALISTE
//* =============================================
function generateMinimalistStyle(data) {

    let md = '';

    //? >>>----- INFORMATIONS DE BASE -----<<<
    md += `# ${data.name}\n\n`;

    if (data.title) {
        md += `${data.title}\n\n`;
    }

    if (data.bio) {
        md += `${data.bio}\n\n`;
    }

    //? >>>----- PARCOURS & FORMATION -----<<<
    if (data.formation || data.school){
        md += `${data.formation} — ${data.school}`;
        if (data.formationEnd) {
            md += ` (${data.formationEnd})`;
        }
        md += `\n\n`;
    }

    //? >>>----- CE QUE JE RECHERCHE -----<<<
    if (data.searshing) {
        md += `${data.searching}\n\n`;
    }

    //? >>>----- COMPÉTENCES TECHNIQUES -----<<<
    // Si l'un des 3 input a au moin 1 élément
    if (data.progLanguages.length > 0 || data.frameworks.length > 0 || data.tools.length > 0) {
        md += `**Stack:** `;

        // Un tableau pour toutes les competences pour en une ligne
        const allSkills = [];

        // Si y a un élément ET que le premier n'est pas vide
        if (data.progLanguages.length > 0 && data.progLanguages[0] !== '') {
            // ... = ajoute tout les élément du tableau
            allSkills.push(...data.progLanguages);
        }

        if (data.frameworks.length > 0 && data.frameworks[0] !== '') {
            allSkills.push(...data.frameworks);
        }

        if (data.tools.length > 0 && data.tools[0] !== '') {
            allSkills.push(...data.tools);
        }

        // Joindre tout avec " • " entre
        md += allSkills.join(' • ');
        md += `\n\n`;
    }

    //? >>>----- EN CE MOMENT J'APPRENDS -----<<<
    if (data.learning) {
        md += `**Learning:** ${data.learning}\n\n`;
    }
    //? >>>----- LANGUES -----<<<
    if (data.spokLanguages.length > 0 && data.spokLanguages[0] !== '') {
        md += `**Languages:** `;
        md += data.spokLanguages.join(' • ');
        md += `\n\n`;
    }

    //? >>>----- PROJETS -----<<<
    if (data.projets.length > 0) {
        md += `**Projects:**\n\n`;

        data.projets.forEach( (project) => {
            md += `- **${project.name}**: ${project.desc}`;

            if (project.link) {
                md += ` [→](${project.link})`;
            }
            md += `\n`;
        });

        md += `\n`;
    }
    //? >>>----- CONTACT & RÉSEAUX -----<<<
    if (data.github || data.linkedin || data.email) {
        md += `**Contact:** `;
        
        // Tableau de contacts
        const contacts = [];
        
        if (data.github) {
            contacts.push(`[GitHub](https://github.com/${data.github})`);
        }
        if (data.linkedin) {
            contacts.push(`[LinkedIn](${data.linkedin})`);
        }
        if (data.email) {
            contacts.push(data.email);
        }
        
        // On colle tout avec " • "
        md += contacts.join(' • ');
        md += `\n\n`;
    }

    //? >>>----- STATS GITHUB -----<<<
    if (data.includeStats && data.github) {
        md += `## 📊 Statistiques GitHub\n\n`

        md += `![Stats GitHub](https://github-readme-stats.zcy.dev/api?username=${data.github})\n\n`;
    }

    return md;
}


//* =============================================
//* FONCTION : AFFICHER LA PREVIEW
//* =============================================
function displayPreview(markdown){
    console.log('Affichage de la preview...');

    // Convertir le markdown en HTML avec Marked.js
    const html = marked.parse(markdown);

    // Injecter le HTML dans la div preview-content
    previewContent.innerHTML = html;

    // Afficher la section preview (qui était cachée)
    readmePreview.style.display = 'flex';

    // Scroll automatique vers la preview
    readmePreview.scrollIntoView({ behavior: 'smooth', block: 'start' });

    console.log('Preview affichée !');
}


//* =============================================
//* FONCTION : COPIER LE MARKDOWN
//* =============================================
function copyMarkdown() {
    console.log('Copie du markdown...');

    // Si pas de markdown généré
    if (!generatedMarkdown) {
        alert('⚠️ Génère d\'abord ton README avant de le copier !');
        return; // Arrète la fontion
    }

    // Copier avec l'API du navigateur
    navigator.clipboard.writeText(generatedMarkdown)

    .then(function() {
        console.log('Markdown copié !');

        const originalText = copyButton.textContent;
        copyButton.textContent = `✓ Copié !`;

        // Remettre le texte d'origine après 2 secondes
        setTimeout(function() {
            copyButton.textContent = originalText;
        }, 2000);
    })

    .catch(function(error) {
        console.error('Erreur de copie :', error);
        alert('❌ Erreur lors de la copie. Essaie de copier manuellement.');
    });
}


//* >>>>>>>>>>>>>>> LES ÉVÉNEMENTS <<<<<<<<<<<<<<<<<

//* =============================================
//* ÉVÉNEMENT : CLIC SUR "GÉNÉRER MON README"
//* =============================================

generateButton.addEventListener('click', function(){
    console.log('Bouton "Générer" cliqué');

    const userData = collectFormData();

    // Si pas au moins le nom, pas de readme
    if (!userData.name) {
        alert('⚠️ Remplis au moins ton nom pour générer le README !');
        return;
    }

    // Générer le markdown du le style choisi
    generatedMarkdown = generateMarkdown(userData);

    displayPreview(generatedMarkdown);

    console.log('README généré avec succès !');
})

//* =============================================
//* ÉVÉNEMENT : CLIC SUR "COPIER LE CODE"
//* =============================================

copyButton.addEventListener('click', function() {
    console.log('Bouton "Copier" cliqué');

    copyMarkdown();
})

//* =============================================
//* ÉVÉNEMENT : CHANGEMENT DE STYLE
//* =============================================

// On récupère tous les radio buttons de style
const styleRadios = document.querySelectorAll('input[name="readmeStyle"]');

styleRadios.forEach( (radio) => {
    radio.addEventListener('change', function() {
        console.log('Style changé :', radio.value);

        // Si README généré
        if (generateMarkdown) {
            // Collecter les données
            const userData = collectFormData();
            // Généré le markdown avec style choisi
            generatedMarkdown = generateMarkdown(userData);
            // Afficher avec le bon style
            displayPreview(generatedMarkdown);
        }

    })
})