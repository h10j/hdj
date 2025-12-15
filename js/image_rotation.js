document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Ciblez tous les éléments que vous voulez animer (votre image)
    const imagesToAnimate = document.querySelectorAll('.image');

    // 2. Définissez les options de l'observateur
    const observerOptions = {
        root: null, // Regarde le viewport (la fenêtre du navigateur)
        rootMargin: '0px',
        threshold: 0.1 // Déclenche si 10% de l'élément est visible
    };

    // 3. Créez la fonction de rappel (callback)
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément est dans la zone visible (isIntersecting est vrai)
            if (entry.isIntersecting) {
                // Ajoutez la classe qui déclenche l'animation CSS
                entry.target.classList.add('is-visible'); 
            
                // Arrêtez d'observer cet élément (l'animation ne se jouera qu'une fois)
                observer.unobserve(entry.target);
            }
        });
    };

    // 4. Initialisez l'observateur
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 5. Commencez à observer chaque image
    imagesToAnimate.forEach(image => {
        observer.observe(image);
    });
});