/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Движок рулетки открытия кейсов:
 * - Поддержка открытия 1x, 2x, 3x, 4x, 5x
 * - Плавная анимация прокрутки с кривой замедления cubic-bezier
 * - Звуковые щелчки при прохождении каждого предмета
 * - Режим быстрого открытия (Fast Open)
 * - Эффекты подсветки выпавшего скина
 */

class RouletteEngine {
  constructor() {
    this.isSpinning = false;
    this.fastOpen = false;
    this.multiCount = 1; // 1, 2, 3, 4, 5
    this.currentCase = null;
    this.itemWidth = 140; // Ширина карточки скина в рулетке
    this.itemGap = 12; // Отступ
    this.totalItems = 42; // Всего скинов на полосе
    this.winIndex = 36; // Индекс победного предмета
    this.lastDropResults = [];
  }

  setFastOpen(enabled) {
    this.fastOpen = enabled;
  }

  setMultiCount(count) {
    this.multiCount = Math.max(1, Math.min(5, count));
  }

  // Сгенерировать ленту предметов для одной дорожки
  generateStrip(caseData, winningSkin) {
    const items = [];
    const possibleSkins = caseData.drops.map(d => window.SKINS_MAP[d.skinId]).filter(Boolean);

    for (let i = 0; i < this.totalItems; i++) {
      if (i === this.winIndex) {
        items.push(winningSkin);
      } else {
        // Случайный скин из кейса для заполнения ленты
        const randSkin = possibleSkins[Math.floor(Math.random() * possibleSkins.length)];
        items.push(randSkin);
      }
    }
    return items;
  }

  // Отрисовка HTML полосы рулетки
  renderStripHtml(items, stripId) {
    let cardsHtml = items.map((skin, idx) => {
      const rarity = window.SKINS_RARITY[skin.rarity] || window.SKINS_RARITY.milspec;
      const isWinner = idx === this.winIndex;
      return `
        <div class="roulette-card ${isWinner ? 'winner-target' : ''}" data-idx="${idx}" style="border-bottom: 3px solid ${rarity.color}">
          <div class="card-bg" style="background: ${rarity.bg};"></div>
          <div class="card-glow" style="box-shadow: 0 0 15px ${rarity.color}33;"></div>
          <div class="card-img-wrap">
            <img src="${skin.image}" alt="${skin.name}" loading="lazy"/>
          </div>
          <div class="card-info">
            <div class="card-weapon">${skin.weapon}</div>
            <div class="card-name" title="${skin.name}">${skin.name.split('|')[1] || skin.name}</div>
            <div class="card-price">🪙 ${skin.price.toLocaleString()}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="roulette-track-container" id="${stripId}">
        <div class="roulette-pointer"></div>
        <div class="roulette-track">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  // Запуск открытия
  async spin(caseId, onComplete) {
    if (this.isSpinning) return;
    const c = window.CASES_MAP[caseId];
    if (!c) return;

    this.currentCase = c;
    this.isSpinning = true;
    this.lastDropResults = [];

    const wrapper = document.getElementById('roulette-wheels-wrapper');
    if (!wrapper) return;

    // Определяем выигрыши для каждого потока (1x - 5x)
    const spinsData = [];
    for (let i = 0; i < this.multiCount; i++) {
      const winningSkin = window.rollCaseDrop(caseId);
      const stripItems = this.generateStrip(c, winningSkin);
      spinsData.push({
        index: i,
        winner: winningSkin,
        items: stripItems,
        id: `roulette-strip-${i}`
      });
      this.lastDropResults.push(winningSkin);
    }

    // Рендерим дорожки
    wrapper.innerHTML = spinsData.map(s => this.renderStripHtml(s.items, s.id)).join('');

    if (window.soundManager) {
      window.soundManager.playOpen();
    }

    // Запускаем анимацию прокрутки
    const duration = this.fastOpen ? 1.2 : 5.5; // Секунды
    const cardStep = this.itemWidth + this.itemGap;

    // Звуковые щелчки с замедлением
    this.startTickAudio(duration);

    // Рассчитываем смещение
    // Дожидаемся кадра для применения стилей
    await new Promise(r => requestAnimationFrame(r));

    spinsData.forEach(s => {
      const container = document.getElementById(s.id);
      if (!container) return;
      const track = container.querySelector('.roulette-track');
      const containerWidth = container.offsetWidth || 800;

      // Центрируем выигрышный элемент + небольшой случайный сдвиг (-25px..+25px)
      const randomJitter = (Math.random() - 0.5) * 50;
      const targetPos = (this.winIndex * cardStep) - (containerWidth / 2) + (this.itemWidth / 2) + randomJitter;

      track.style.transition = `transform ${duration}s cubic-bezier(0.12, 0.82, 0.25, 1)`;
      track.style.transform = `translateX(-${targetPos}px)`;
    });

    // Ожидание завершения вращения
    setTimeout(() => {
      this.isSpinning = false;

      // Подсвечиваем победителей
      spinsData.forEach(s => {
        const container = document.getElementById(s.id);
        if (container) {
          const winnerCard = container.querySelector('.winner-target');
          if (winnerCard) {
            winnerCard.classList.add('winner-active');
          }
        }
      });

      // Звук выигрыша по наивысшей редкости
      let highestRarity = 'consumer';
      let maxOrder = 0;
      this.lastDropResults.forEach(skin => {
        const rInfo = window.SKINS_RARITY[skin.rarity];
        if (rInfo && rInfo.order > maxOrder) {
          maxOrder = rInfo.order;
          highestRarity = skin.rarity;
        }
      });

      if (window.soundManager) {
        window.soundManager.playDropWin(highestRarity);
      }

      if (onComplete) {
        onComplete(this.lastDropResults);
      }
    }, duration * 1000 + 150);
  }

  // Генерация щелчков в такт замедляющейся рулетке
  startTickAudio(durationSec) {
    if (this.fastOpen) {
      // Для быстрого открытия - короткая очередь щелчков
      let clicks = 8;
      let interval = (durationSec * 1000) / clicks;
      let c = 0;
      const timer = setInterval(() => {
        if (window.soundManager) window.soundManager.playTick();
        c++;
        if (c >= clicks) clearInterval(timer);
      }, interval);
      return;
    }

    // Для полного вращения - реалистичное замедление
    const startTime = Date.now();
    const durationMs = durationSec * 1000;
    let nextDelay = 35; // начальная частота щелчков

    const tickStep = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs - 400 || !this.isSpinning) return;

      if (window.soundManager) {
        window.soundManager.playTick();
      }

      // Прогресс от 0 до 1
      const progress = elapsed / durationMs;
      // Экспоненциальное увеличение задержки (замедление рулетки)
      nextDelay = 35 + Math.pow(progress, 3) * 380;

      setTimeout(tickStep, nextDelay);
    };

    setTimeout(tickStep, 40);
  }
}

window.rouletteEngine = new RouletteEngine();
