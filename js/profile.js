
const buttons = document.querySelectorAll('.btn');
console.log('Nombre de boutons trouvés :', buttons.length);

buttons.forEach( function(button) {

    button.addEventListener('click', function() {

        const profile = button.getAttribute('data-profile');

        localStorage.getItem('userProfile', profile);
        console.log('Profil choisi :', profile);

        window.location.href = 'index.html';

    });

});