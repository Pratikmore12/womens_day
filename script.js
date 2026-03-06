(function () {
  'use strict';

  const CONTAINER_ID = 'rainContainer';
  const BATCH_SIZE = 20;
  const WELCOME_BATCH_SIZE = 55;
  const FALL_DURATION_MIN = 4;
  const FALL_DURATION_MAX = 8;
  const WELCOME_DURATION_MIN = 5;
  const WELCOME_DURATION_MAX = 10;
  const SIZE_MIN = 18;
  const SIZE_MAX = 40;
  const WELCOME_SIZE_MIN = 22;
  const WELCOME_SIZE_MAX = 48;

  const RAIN_TYPES = {
    flowers: ['🌸', '🌺', '💮', '🏵️', '💐', '🪷', '✿', '❀', '✾', '⁕'],
    candy: ['🍬', '🍭', '🍫', '🧁', '🎀', '💝', '🩷', '🍩', '🎂', '💖'],
    hearts: ['💕', '❤️', '💗', '💖', '💓', '💞', '🩷', '♥', '💘', '💝'],
    stars: ['✨', '⭐', '🌟', '💫', '✧', '⁺', '˚', '＊', '✶', '✦'],
    butterflies: ['🦋', '🦋', '🦋', '💮', '🌸', '✿', '🦋', '🌸', '🦋', '✿'],
    welcome: [
      '🌸', '🌺', '💮', '🏵️', '💐', '🪷', '✿', '❀', '✾', '⁕', '🌷', '🌼',
      '💕', '❤️', '💗', '💖', '💓', '♥', '💘', '💝',
      '✨', '⭐', '🌟', '💫', '✧', '＊', '✦',
      '🦋', '🌹', '🌻', '💮'
    ]
  };

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  function startRain(type, options) {
    type = type || 'flowers';
    options = options || {};
    const count = options.count !== undefined ? options.count : BATCH_SIZE;
    const sizeMin = options.sizeMin !== undefined ? options.sizeMin : SIZE_MIN;
    const sizeMax = options.sizeMax !== undefined ? options.sizeMax : SIZE_MAX;
    const durationMin = options.durationMin !== undefined ? options.durationMin : FALL_DURATION_MIN;
    const durationMax = options.durationMax !== undefined ? options.durationMax : FALL_DURATION_MAX;

    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const item = createRainItem(type, {
        sizeMin: sizeMin,
        sizeMax: sizeMax,
        durationMin: durationMin,
        durationMax: durationMax
      });
      container.appendChild(item);
      item.addEventListener('animationend', function handler() {
        item.removeEventListener('animationend', handler);
        item.remove();
      });
    }
  }

  function createRainItem(type, options) {
    options = options || {};
    const chars = RAIN_TYPES[type] || RAIN_TYPES.flowers;
    const item = document.createElement('span');
    item.className = 'rain-item rain-' + type;
    item.textContent = chars[Math.floor(Math.random() * chars.length)];
    item.setAttribute('aria-hidden', 'true');

    const sizeMin = options.sizeMin !== undefined ? options.sizeMin : SIZE_MIN;
    const sizeMax = options.sizeMax !== undefined ? options.sizeMax : SIZE_MAX;
    const durationMin = options.durationMin !== undefined ? options.durationMin : FALL_DURATION_MIN;
    const durationMax = options.durationMax !== undefined ? options.durationMax : FALL_DURATION_MAX;

    const size = getRandom(sizeMin, sizeMax);
    item.style.fontSize = size + 'px';
    item.style.left = getRandom(0, 100) + 'vw';
    item.style.animationDuration = getRandom(durationMin, durationMax) + 's';
    item.style.animationDelay = getRandom(0, 1.2) + 's';
    item.style.opacity = getRandom(0.7, 1);

    return item;
  }

  function startWelcomeRain() {
    startRain('welcome', {
      count: WELCOME_BATCH_SIZE,
      sizeMin: WELCOME_SIZE_MIN,
      sizeMax: WELCOME_SIZE_MAX,
      durationMin: WELCOME_DURATION_MIN,
      durationMax: WELCOME_DURATION_MAX
    });
  }

  function openSurprise() {
    var landing = document.getElementById('landing');
    var mainWrap = document.getElementById('mainWrap');
    if (!landing || !mainWrap) return;

    startWelcomeRain();
    landing.classList.add('hidden');
    mainWrap.classList.remove('hidden');
  }

  function init() {
    var openBtn = document.getElementById('openSurprise');
    if (openBtn) {
      openBtn.addEventListener('click', openSurprise);
    }

    var rainButtons = document.querySelectorAll('[data-rain]');
    rainButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type = btn.getAttribute('data-rain');
        if (type) startRain(type);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
