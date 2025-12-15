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

    let currentVideoIndex = 1;

    let preloadedVideoSrc = null;
    function preloadNextVideo() {
        // Déterminer l'index de la vidéo SUIVANTE
        const nextIndex = (currentVideoIndex + 1) % playlist.length;
        preloadedVideoSrc = playlist[nextIndex];

        // 1. Créer un élément vidéo temporaire en mémoire
        const tempVideo = document.createElement('video');
        
        // 2. Définir la source et les attributs de préchargement
        tempVideo.src = preloadedVideoSrc;
        tempVideo.setAttribute('preload', 'auto'); // Demander au navigateur de précharger
        tempVideo.setAttribute('muted', ''); // Assurez-vous d'avoir 'muted'

        // 3. Demander le chargement
        tempVideo.load();
        
        console.log(`[Préchargement] Démarrage du préchargement de : ${preloadedVideoSrc}`);
        
        // Nous n'avons pas besoin d'ajouter tempVideo au DOM, il fait son travail en mémoire.
    }
    
    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
        
        const nextVideoSrc = playlist[currentVideoIndex];
        
        // 🔑 Utiliser la source qui a déjà été téléchargée (ou est en cours)
        video.src = nextVideoSrc; 
        
        video.play().catch(error => {
            console.error("Erreur lors du lancement de la vidéo:", error);
        });

        // 🔑 Immédiatement après avoir lancé la vidéo, on précharge la suivante
        preloadNextVideo();
    }

    video.addEventListener('timeupdate', function() {
        // Précharge la vidéo suivante quand la vidéo actuelle arrive à 80% de sa durée
        if (video.currentTime >= video.duration * 0.8 && preloadedVideoSrc === null) {
            preloadNextVideo();
        }
    });

    // Ancien événement 'ended' est désormais un simple déclencheur si 'timeupdate' échoue
    video.addEventListener('ended', playNextVideo);
    
    // Démarrer la première vidéo et précharger la deuxième
    video.load();
    video.play();
    
    // 🔑 Précharger la deuxième vidéo dès que la première commence à jouer (ou est mise en cache)
    preloadNextVideo(); 
});