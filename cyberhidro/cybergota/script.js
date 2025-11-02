// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);


// Play ambient audio when user interacts (autoplay policies require a user gesture)
(function() {
  const audio = document.getElementById('sonido-ambiental');
  if (!audio) return;
  // Ensure not muted
  audio.muted = false;
  // Try to play and silently catch errors
  const playAudio = () => {
    audio.play().catch((err) => {
      // Autoplay blocked or other error — keep silent but log for debugging
      console.warn('No se pudo reproducir el audio automáticamente:', err);
    });
  };
  // Play on first user gesture
  document.addEventListener('click', playAudio, { once: true });
  document.addEventListener('touchstart', playAudio, { once: true });
  // Also play when AR button is used or model-viewer is interacted with
  const arButton = document.getElementById('ar-button');
  if (arButton) arButton.addEventListener('click', playAudio);
  const mv = document.querySelector('model-viewer');
  if (mv) {
    mv.addEventListener('click', playAudio);
    mv.addEventListener('ar-status', (e) => {
      if (e.detail && e.detail.status === 'presenting') playAudio();
    });
  }
})();