//temps d'attente en secondes
let timeLeft = 2 * 60 * 60;

const countdownEl = document.getElementById('countdown');

function updateCountdown() {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    countdownEl.innerText = `${hours}:${minutes}:${seconds}`;

    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateCountdown, 1000);
    } else {
        //quand le temps est écoulé, redirige vers le chapitre suivant
        window.location.href = 'chapt2p1.html';
    }
}

updateCountdown();

//bouton pour débloquer maintenant (simulation)
document.getElementById('payNow').onclick = () => {
    alert('Paiement simulé ! Vous accédez maintenant au chapitre suivant.');
    window.location.href = 'chapt2p1.html';
};