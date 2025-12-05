
const buttons = document.querySelectorAll('.btn');
console.log('Nombre de boutons trouvés :', buttons.length);

// Pour chaque boutton
buttons.forEach( (button) => {

    // Au click
    button.addEventListener('click', function() {

        // Ajouter l'attribut
        const profile = button.getAttribute('data-profile');

        // Sauvegarder le profil dans le navigateur
        localStorage.setItem('userProfile', profile);
        console.log('Profil choisi :', profile);

        // Ouvrir la page index
        window.location.href = 'index.html';

    });

});