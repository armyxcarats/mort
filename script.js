const loginScreen = document.getElementById('login-screen');
const inviteScreen = document.getElementById('invite-screen');
const planScreen = document.getElementById('plan-screen');
const outfitScreen = document.getElementById('outfit-screen');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noBtnShards = document.getElementById('no-btn-shards');
const heartBurst = document.getElementById('heart-burst');
const spinBtn = document.getElementById('spin-btn');
const loveDateBtn = document.getElementById('love-date-btn');
const finalizeBtn = document.getElementById('finalize-btn');
const wheel = document.getElementById('wheel');
const wheelResult = document.getElementById('wheel-result');
const finalMessage = document.getElementById('final-message');
const datePicker = document.getElementById('date-picker');
const timePicker = document.getElementById('time-picker');
const selectedDateText = document.getElementById('selected-date-text');
const selectedTimeText = document.getElementById('selected-time-text');
const wheelLabels = document.getElementById('wheel-labels');
const outfitCards = document.querySelectorAll('.outfit-card');
const outfitPreviewPlaceholder = document.getElementById('outfit-preview-placeholder');
const outfitPreviewImage = document.getElementById('outfit-preview-image');
const outfitPreviewName = document.getElementById('outfit-preview-name');
const catTipYes = document.getElementById('cat-tip-yes');
const catTipNo = document.getElementById('cat-tip-no');
const pixelHearts = document.querySelectorAll('.pixel-heart');
const loginForm = document.getElementById('login-form');
const nicknameInput = document.getElementById('nickname-input');
const passwordInput = document.getElementById('password-input');
const loginMessage = document.getElementById('login-message');
const siteMusic = document.getElementById('site-music');
const musicToggle = document.getElementById('music-toggle');
const musicPanelToggle = document.getElementById('music-panel-toggle');
const musicSettings = document.getElementById('music-settings');
const musicVolume = document.getElementById('music-volume');

const noMessages = [
  'Nope?',
  'Are you sure, cutie?',
  'Think again, handsome?',
  'Pretty please?',
  'I made this cute just for you ❤️',
  'I miss you baby 😘',
  'I even planned this for us..',
  'you still choose no? 🥺',
  'rlly baby?...',
  'The button broke... so is my heart 😭'
];

siteMusic.volume = Number(musicVolume.value);

function updateMusicButton() {
  const isPlaying = !siteMusic.paused;
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
  musicToggle.textContent = isPlaying ? '🔊' : '🔇';
  musicPanelToggle.textContent = isPlaying ? 'Pause music' : 'Play music';
}

function startMusic() {
  siteMusic.play().then(updateMusicButton).catch(updateMusicButton);
}

const dateIdeas = [
  'Movie Date',
  'Cafe Date',
  'Museum Date',
  'Arcade Date',
  'Aquarium Date',
  'Picnic Date',
  'Sunset Walk',
  'Board Game Night',
  'Beach Date',
  'Ice Cream Date'
];

const wheelSegments = dateIdeas.length;
let noCount = 0;
let wheelRotation = 0;
let selectedDateIdea = '';
let selectedOutfit = '';
let noScale = 1; // shrinks each No click
let yesScale = 1; // grows each No click

function buildWheelLabels() {
  const segmentAngle = 360 / dateIdeas.length;

  dateIdeas.forEach((idea, index) => {
    const label = document.createElement('span');
    label.className = 'wheel-label';
    label.textContent = idea;

    const angle = index * segmentAngle + segmentAngle / 2;
    label.dataset.angle = angle;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-102px) rotate(${-angle - wheelRotation}deg)`;

    wheelLabels.appendChild(label);
  });
}

function keepWheelLabelsReadable() {
  wheelLabels.querySelectorAll('.wheel-label').forEach((label) => {
    const angle = Number(label.dataset.angle);
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-102px) rotate(${-angle - wheelRotation}deg)`;
  });
}

function showScreen(screen) {
  [loginScreen, inviteScreen, planScreen, outfitScreen].forEach((element) => {
    element.classList.toggle('active', element === screen);
  });

  if (screen === inviteScreen) {
    requestAnimationFrame(positionCats);
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nickname = nicknameInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (nickname && password === '6767') {
    loginMessage.textContent = '';
    startMusic();
    showScreen(inviteScreen);
    return;
  }

  loginMessage.textContent = 'Wrong password, either ur not my baby or u just a hacker';
  passwordInput.select();
});

musicToggle.addEventListener('click', () => {
  if (siteMusic.paused) {
    startMusic();
  } else {
    siteMusic.pause();
    updateMusicButton();
  }
});

musicPanelToggle.addEventListener('click', () => {
  if (siteMusic.paused) {
    startMusic();
  } else {
    siteMusic.pause();
    updateMusicButton();
  }
});

musicToggle.addEventListener('click', () => {
  const isOpen = musicSettings.classList.toggle('open');
  musicSettings.setAttribute('aria-hidden', String(!isOpen));
});

musicVolume.addEventListener('input', () => {
  siteMusic.volume = Number(musicVolume.value);
});

siteMusic.addEventListener('play', updateMusicButton);
siteMusic.addEventListener('pause', updateMusicButton);

document.addEventListener('pointerdown', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

function moveNoButton() {
  const container = noBtn.parentElement;
  const bounds = container.getBoundingClientRect();
  const btnW = Math.max(40, noBtn.offsetWidth * noScale);
  const btnH = Math.max(28, noBtn.offsetHeight * noScale);

  // increase how far the button can jump each time (faster growth)
  const distanceMultiplier = 1 + noCount * 0.6;

  const maxX = Math.max(12, bounds.width - btnW - 18);
  const maxY = Math.max(16, bounds.height - btnH - 16);

  // pick a random angle and distance biased to be farther as count increases
  const angle = Math.random() * Math.PI * 2;
  const baseDist = Math.min(maxX, maxY) * 0.22;
  const dist = baseDist * distanceMultiplier + Math.random() * (Math.min(maxX, maxY) * 0.28 * distanceMultiplier);
  const centerX = bounds.width / 2;
  const centerY = bounds.height / 2;

  let x = centerX + Math.cos(angle) * dist;
  let y = centerY + Math.sin(angle) * dist;

  // clamp into container padding-safe area
  x = Math.max(12 + btnW / 2, Math.min(bounds.width - btnW - 12 + btnW / 2, x));
  y = Math.max(12 + btnH / 2, Math.min(bounds.height - btnH - 12 + btnH / 2, y));

  // avoid landing in the central band between the two buttons — prefer left/right sides
  const bandMin = bounds.width * 0.38;
  const bandMax = bounds.width * 0.62;
  if (x > bandMin && x < bandMax) {
    const rightSpace = bounds.width - x;
    const leftSpace = x;
    if (rightSpace > leftSpace) {
      x = Math.min(bounds.width - btnW / 2 - 12, bandMax + 24);
    } else {
      x = Math.max(btnW / 2 + 12, bandMin - 24);
    }
  }

  // ensure the No button doesn't land on top of the Yes button — push it farther away if needed
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const yesCenterX = yesRect.left + yesRect.width / 2 - containerRect.left;
  const yesCenterY = yesRect.top + yesRect.height / 2 - containerRect.top;
  const dx = x - yesCenterX;
  const dy = y - yesCenterY;
  const sep = Math.hypot(dx, dy) || 1;
  const minDist = (btnW + yesRect.width) / 2 + 48; // increased safe separation
  if (sep < minDist) {
    const factor = (minDist / sep);
    x = yesCenterX + dx * factor;
    y = yesCenterY + dy * factor;
    // re-clamp after pushing
    x = Math.max(12 + btnW / 2, Math.min(bounds.width - btnW - 12 + btnW / 2, x));
    y = Math.max(12 + btnH / 2, Math.min(bounds.height - btnH - 12 + btnH / 2, y));
  }

  // position using left/top and center with translate
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = 'auto';
  // removed bump animation toggling to avoid bounce effect
  noBtn.style.transform = `translate(-50%, -50%) scale(${noScale})`;

  // update each cat-tip to sit above its button
  requestAnimationFrame(() => {
    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const yesCenterX = yesRect.left + yesRect.width / 2 - containerRect.left;
    const noCenterX = noRect.left + noRect.width / 2 - containerRect.left;

    // resize the No cat to match the No button width so it scales when the button shrinks
    if (catTipNo) {
      const desired = Math.round(Math.max(56, Math.min(84, noRect.width * 0.95)));
      catTipNo.style.width = `${desired}px`;
    }

    // place the cat slightly overlapping the button and rotate to look like it's hitting it
    const catYesH = (catTipYes && catTipYes.offsetHeight) ? catTipYes.offsetHeight : 60;
    const catNoH = (catTipNo && catTipNo.offsetHeight) ? catTipNo.offsetHeight : 78;
    const gap = -20; // lower more so the cat 'hits' the button
    const yesTop = yesRect.top - containerRect.top - catYesH - gap;
    const noTop = noRect.top - containerRect.top - catNoH - gap;
    const yesOffsetX = -10; // nudge left so paw hits the left side
    const noOffsetX = 10; // nudge right so paw hits the right side

    if (catTipYes) {
      catTipYes.style.left = `${yesCenterX}px`;
      catTipYes.style.top = `${yesTop}px`;
      catTipYes.style.opacity = '1';
      catTipYes.style.visibility = 'visible';
      catTipYes.style.zIndex = '31';
      catTipYes.style.transformOrigin = '50% 100%';
      catTipYes.style.transform = `translateX(calc(-50% + ${yesOffsetX}px)) rotate(-14deg)`;
    }

    if (catTipNo) {
      catTipNo.style.left = `${noCenterX}px`;
      catTipNo.style.top = `${noTop}px`;
      catTipNo.style.opacity = '1';
      catTipNo.style.visibility = 'visible';
      catTipNo.style.zIndex = '31';
      catTipNo.style.transformOrigin = '50% 100%';
      catTipNo.style.transform = `translateX(calc(-50% + ${noOffsetX}px)) rotate(-14deg)`;
    }
  });
}

function damagePixelHeart(clickNumber) {
  const heartIndex = Math.floor((clickNumber - 1) / 2);
  const heart = pixelHearts[heartIndex];
  if (!heart) return;

  heart.classList.add('damaged');
  if (clickNumber % 2 === 1) {
    heart.querySelector('.pixel-heart-half.left').classList.add('gone');
  } else {
    heart.querySelector('.pixel-heart-half.right').classList.add('gone');
    heart.classList.add('gone');
  }
}

function restorePixelHearts() {
  pixelHearts.forEach((heart) => {
    heart.classList.remove('damaged', 'gone');
    heart.querySelectorAll('.pixel-heart-half').forEach((half) => {
      half.classList.remove('gone');
    });
  });
}

function positionCats() {
  const container = noBtn.parentElement;
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const yesCenterX = yesRect.left + yesRect.width / 2 - containerRect.left;
  const noCenterX = noRect.left + noRect.width / 2 - containerRect.left;
  // resize No cat to match No button width on initial layout
  if (catTipNo) {
    const desired = Math.round(Math.max(56, Math.min(84, noRect.width * 0.95)));
    catTipNo.style.width = `${desired}px`;
  }
  // place the cat slightly overlapping and rotated so it looks like it's hitting the button
    const catYesH = (catTipYes && catTipYes.offsetHeight) ? catTipYes.offsetHeight : 84;
    const catNoH = (catTipNo && catTipNo.offsetHeight) ? catTipNo.offsetHeight : 78;
    const gap = -20;
  const yesTop = yesRect.top - containerRect.top - catYesH - gap;
  const noTop = noRect.top - containerRect.top - catNoH - gap;
  const yesOffsetX = -10;
  const noOffsetX = 10;

  if (catTipYes) {
    catTipYes.style.left = `${yesCenterX}px`;
    catTipYes.style.top = `${yesTop}px`;
    catTipYes.style.opacity = '1';
    catTipYes.style.visibility = 'visible';
    catTipYes.style.zIndex = '31';
    catTipYes.style.transformOrigin = '50% 100%';
    catTipYes.style.transform = `translateX(calc(-50% + ${yesOffsetX}px)) rotate(-14deg)`;
  }

  if (catTipNo) {
    catTipNo.style.left = `${noCenterX}px`;
    catTipNo.style.top = `${noTop}px`;
    catTipNo.style.opacity = '1';
    catTipNo.style.visibility = 'visible';
    catTipNo.style.zIndex = '31';
    catTipNo.style.transformOrigin = '50% 100%';
    catTipNo.style.transform = `translateX(calc(-50% + ${noOffsetX}px)) rotate(-14deg)`;
  }
}

function shatterNoButton() {
  noBtnShards.innerHTML = '';
  noBtnShards.classList.remove('active');

  for (let i = 0; i < 18; i += 1) {
    const shard = document.createElement('span');
    shard.className = 'no-btn-shard';
    shard.style.left = '50%';
    shard.style.top = '50%';
    shard.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
    shard.style.setProperty('--dy', `${(Math.random() - 0.5) * 180 - 30}px`);
    shard.style.setProperty('--rot', `${(Math.random() - 0.5) * 300}deg`);
    noBtnShards.appendChild(shard);
  }

  noBtnShards.classList.add('active');
  noBtn.classList.add('broken');
  noBtn.disabled = true;
  noBtn.style.pointerEvents = 'none';
  noBtn.textContent = '💥';

  // hide the No cat when No shatters
  if (catTipNo) {
    catTipNo.style.opacity = '0';
    catTipNo.style.visibility = 'hidden';
  }

  setTimeout(() => {
    noBtn.style.opacity = '0';
    noBtn.style.visibility = 'hidden';
    yesBtn.textContent = 'Yes, obviously 💖';
    yesBtn.style.transform = 'translate(-50%, -50%) scale(1.08)';
  }, 200);
}

function handleNoClick() {
  noCount += 1;
  damagePixelHeart(noCount);
  const message = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
  noBtn.textContent = message;

  // shrink No button gradually but keep it readable (don't go below 0.7)
  noScale = Math.max(0.7, noScale - 0.06);
  // grow Yes button slightly as encouragement
  yesScale = Math.min(1.35, yesScale + 0.06);
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  moveNoButton();

  // when small enough or after too many tries, shatter
  if (noScale <= 0.18 || noCount >= noMessages.length) {
    shatterNoButton();
  }
}

function spinWheel() {
  if (spinBtn.disabled) return;

  const segmentDegrees = 360 / wheelSegments;
  const targetIndex = Math.floor(Math.random() * dateIdeas.length);
  const targetCenter = targetIndex * segmentDegrees + segmentDegrees / 2;
  const currentAngle = ((wheelRotation % 360) + 360) % 360;
  const targetAngle = (360 - targetCenter - currentAngle + 360) % 360;
  const extraSpins = 6;
  const finalRotation = wheelRotation + extraSpins * 360 + targetAngle;

  wheelRotation = finalRotation;
  wheel.style.transform = `rotate(${finalRotation}deg)`;
  keepWheelLabelsReadable();

  const landedAngle = ((360 - (finalRotation % 360)) + 360) % 360;
  const landedIndex = Math.floor(landedAngle / segmentDegrees) % wheelSegments;
  selectedDateIdea = dateIdeas[landedIndex];

  spinBtn.disabled = true;
  wheelResult.textContent = 'Spinning...';

  setTimeout(() => {
    wheelResult.textContent = `Our date vibe: ${selectedDateIdea}`;
    loveDateBtn.classList.remove('hidden');
    spinBtn.disabled = false;
  }, 2600);
}

datePicker.addEventListener('input', () => {
  const formattedDate = datePicker.value ? new Date(datePicker.value + 'T00:00:00').toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'No date picked yet';

  selectedDateText.textContent = formattedDate;
});

timePicker.addEventListener('input', () => {
  if (!timePicker.value) {
    selectedTimeText.textContent = 'No time picked yet';
    return;
  }

  const [hours, minutes] = timePicker.value.split(':').map(Number);
  const time = new Date();
  time.setHours(hours, minutes, 0, 0);
  selectedTimeText.textContent = time.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  });
});

yesBtn.addEventListener('click', () => {
  restorePixelHearts();
  heartBurst.classList.remove('active');
  void heartBurst.offsetWidth;
  heartBurst.classList.add('active');

  const hearts = ['💖', '✨', '🌷', '💞'];
  heartBurst.innerHTML = '';

  hearts.forEach((emoji, index) => {
    const particle = document.createElement('span');
    particle.textContent = emoji;
    particle.style.position = 'absolute';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.fontSize = `${22 + index * 8}px`;
    particle.style.setProperty('--x', `${(index - 1.5) * 58}px`);
    particle.style.setProperty('--y', `${-30 - index * 18}px`);
    particle.style.setProperty('--r', `${(index - 1.5) * 28}deg`);
    particle.style.animation = 'floatHeart 1.2s ease-out forwards';
    heartBurst.appendChild(particle);
  });

  heartBurst.classList.add('active');

  setTimeout(() => {
    showScreen(planScreen);
  }, 320);
});

noBtn.addEventListener('click', handleNoClick);
spinBtn.addEventListener('click', spinWheel);
loveDateBtn.addEventListener('click', () => {
  showScreen(outfitScreen);
});

outfitCards.forEach((card) => {
  card.addEventListener('click', () => {
    outfitCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    selectedOutfit = card.dataset.outfit;
    outfitPreviewImage.src = encodeURI(card.dataset.image);
    outfitPreviewImage.alt = `${selectedOutfit} outfit preview`;
    outfitPreviewName.textContent = selectedOutfit;
    outfitPreviewPlaceholder.classList.add('hidden');
    outfitPreviewImage.classList.remove('hidden');
  });
});

finalizeBtn.addEventListener('click', () => {
  if (!selectedOutfit) {
    finalMessage.textContent = 'Choose an outfit first so our date looks perfect.';
    return;
  }

  finalMessage.textContent = `Perfect choice! We’re doing a ${selectedDateIdea || 'date'} and wearing ${selectedOutfit}. I’m already excited.`;
  finalizeBtn.textContent = 'Date locked in!';
  finalizeBtn.disabled = true;
  finalizeBtn.style.opacity = '0.85';
});

window.addEventListener('DOMContentLoaded', () => {
  buildWheelLabels();

  noBtn.style.left = '50%';
  noBtn.style.top = '50%';
  noBtn.style.left = '68%';
  noBtn.style.transform = `translate(-50%, -50%) scale(${noScale})`;
  noBtn.style.right = 'auto';

  yesBtn.style.left = '40%';
  yesBtn.style.left = '32%';
  yesBtn.style.top = '50%';
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
  // Position cats after the invitation screen becomes visible.
  if (inviteScreen.classList.contains('active')) {
    positionCats();
  }

  // hide No cat automatically if the No button becomes hidden or transparent
  if (noBtn && catTipNo) {
    const hideIfButtonHidden = () => {
      const cs = window.getComputedStyle(noBtn);
      if (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) {
        catTipNo.style.opacity = '0';
        catTipNo.style.visibility = 'hidden';
      }
    };

    const obs = new MutationObserver(() => hideIfButtonHidden());
    obs.observe(noBtn, { attributes: true, attributeFilter: ['style', 'class'] });
    // also check once on load
    hideIfButtonHidden();
  }
});

window.addEventListener('resize', () => {
  if (inviteScreen.classList.contains('active')) {
    positionCats();
  }
});
