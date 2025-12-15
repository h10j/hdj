document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bg-video');
    
    // Récupérer la playlist à partir de l'attribut data-playlist
    // JSON.parse convertit la chaîne de caractères HTML en tableau JS
    const playlistString = video.getAttribute('data-playlist');
    let playlist = [];

    try {
        playlist = JSON.parse(playlistString);
    } catch (e) {
        console.error("Erreur de parsing de la playlist vidéo :", e);
        return; // Arrête l'exécution si la playlist n'est pas un JSON valide
    }

    let currentVideoIndex = 0;

    function playNextVideo() {
        // Incrémenter l'index, puis revenir à 0 si c'est la fin du tableau
        currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
        
        const nextVideoSrc = playlist[currentVideoIndex];
        
        // Mettre à jour la source de la vidéo
        // Note: Cette méthode simple utilise une seule source, la première dans le HTML. 
        // Si vous utilisiez plusieurs types de fichiers (webm, mp4), ce serait plus complexe.
        video.src = nextVideoSrc; 
        
        // Relancer la vidéo
        video.play().catch(error => {
            // Gérer l'erreur si autoplay est bloqué (bien que 'muted' devrait aider)
            console.error("Erreur lors du lancement de la vidéo:", error);
        });
    }

    // Événement déclenché lorsque la vidéo actuelle est terminée
    video.addEventListener('ended', playNextVideo);

    // Démarrer la première vidéo au chargement (si l'autoplay ne le fait pas)
    video.load();
    video.play();
});