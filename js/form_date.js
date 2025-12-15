document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("event-date");

  // 1. Au chargement, on s'assure que c'est bien un champ de texte pour le placeholder
  if (dateInput.type !== "date") {
    dateInput.setAttribute("type", "text");
  }

  // 2. Quand l'utilisateur clique ou focus, on bascule en type="date"
  dateInput.addEventListener("focus", function () {
    dateInput.setAttribute("type", "date");
  });

  // 3. Quand l'utilisateur quitte le champ sans valeur, on rebascule en type="text"
  dateInput.addEventListener("blur", function () {
    if (!dateInput.value) {
      dateInput.setAttribute("type", "text");
    }
  });
});
