
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

if (burgerBtn && navMenu) {

    burgerBtn.addEventListener('click', function() {

        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');

    navLinks.forEach(function(link) {

        link.addEventListener('click', function() {

            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}