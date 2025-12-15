document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.btn-read-more');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 1. Trouver l'ID de la cible (le div du texte)
                const targetId = button.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // 2. Basculer la classe 'expanded'
                    targetElement.classList.toggle('expanded');
                    
                    // 3. Mettre à jour le texte du bouton
                    if (targetElement.classList.contains('expanded')) {
                        button.textContent = 'Voir moins ←';
                    } else {
                        button.textContent = 'Voir plus →';
                    }
                }
            });
        });
    });