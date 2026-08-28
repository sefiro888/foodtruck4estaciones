/* Intro de bienvenida de Full Track: solo se ejecuta en index.html. */
(function () {
  const overlay = document.querySelector('.ft-intro-overlay');
  if (!overlay || !document.documentElement.classList.contains('ft-intro-pending')) return;

  const skipButton = overlay.querySelector('.ft-intro-skip');
  const timers = [];
  let closed = false;

  function handleKeydown(event) {
    if (event.key === 'Escape') finishIntro(false);
  }

  function rememberIntro() {
    try {
      sessionStorage.setItem('fullTrackIntroShown', 'true');
    } catch (error) {
      // La intro se cierra igualmente si el navegador bloquea sessionStorage.
    }
  }

  function finishIntro(immediate) {
    if (closed) return;
    closed = true;
    timers.forEach(window.clearTimeout);
    rememberIntro();
    overlay.classList.remove('is-opening');
    overlay.classList.add('is-closing');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ft-intro-active');
    document.removeEventListener('keydown', handleKeydown);

    const removeOverlay = function () {
      overlay.remove();
      document.documentElement.classList.remove('ft-intro-pending');
    };

    window.setTimeout(removeOverlay, immediate ? 0 : 390);
  }

  document.body.classList.add('ft-intro-active');
  skipButton.focus({ preventScroll: true });
  timers.push(window.setTimeout(function () {
    overlay.classList.add('is-opening');
  }, 80));
  timers.push(window.setTimeout(function () {
    finishIntro(false);
  }, 2800));
  timers.push(window.setTimeout(function () {
    finishIntro(true);
  }, 4000));

  skipButton.addEventListener('click', function () {
    finishIntro(false);
  });

  document.addEventListener('keydown', handleKeydown);
}());
