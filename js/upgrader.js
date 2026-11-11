/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Движок Апгрейдера в точности как на CS Battle (CS Battle Style Upgrader):
 * - Апгрейд ТОЛЬКО скинов из инвентаря (без ставок монетами)
 * - Круговая Retina-рулетка со светящимся сектором выигрыша
 * - Выбор процента шанса (5%, 10%, 25%, 50%, 75%)
 * - Выбор множителя цены (x1.5, x2, x3, x5, x10, x20, x50)
 * - Плавная кривая замедления стрелки и реалистичный звук тикера
 */

class UpgraderEngine {
  constructor() {
    this.betItem = null;            // выбранный предмет из инвентаря { uid, id, name, price, rarity, image, weapon }
    this.targetSkin = null;         // выбранный целевой скин
    this.addedCoins = 0;            // дополнительные монеты к ставке (макс. +25% от цены скина)
    this.addedCoinsPercent = 0;     // текущий процент буста монетами (0..25)
    this.isSpinning = false;
    this.currentNeedleRad = Math.PI; // стрелка изначально указывает на 6 часов (0% на циферблате)
  }

  // Максимально допустимое добавление монет (не более 25% цены скина и не более баланса игрока)
  getMaxAddedCoins() {
    if (!this.betItem || !this.betItem.price || this.betItem.price <= 0) return 0;
    const maxBySkin = Math.floor(this.betItem.price * 0.25);
    const playerCoins = (window.app && typeof window.app.coins === 'number') ? window.app.coins : 0;
    return Math.max(0, Math.min(maxBySkin, playerCoins));
  }

  // Установка добавленных монет в штуках
  setAddedCoins(coins) {
    const maxCoins = this.getMaxAddedCoins();
    const clamped = Math.max(0, Math.min(maxCoins, Math.floor(coins || 0)));
    this.addedCoins = clamped;
    this.addedCoinsPercent = (this.betItem && this.betItem.price > 0)
      ? Math.round((clamped / this.betItem.price) * 100)
      : 0;
    return this.addedCoins;
  }

  // Установка добавленных монет по проценту (0..25%)
  setAddedCoinsPercent(percent) {
    const clampedPct = Math.max(0, Math.min(25, Number(percent) || 0));
    this.addedCoinsPercent = clampedPct;
    if (!this.betItem || !this.betItem.price) {
      this.addedCoins = 0;
      return 0;
    }
    const desiredCoins = Math.floor(this.betItem.price * (clampedPct / 100));
    return this.setAddedCoins(desiredCoins);
  }

  // Сброс буста монет
  resetAddedCoins() {
    this.addedCoins = 0;
    this.addedCoinsPercent = 0;
  }

  // Итоговая стоимость ставки (скин + добавленные монеты)
  getBetValue() {
    const skinPrice = this.betItem ? (this.betItem.price || 0) : 0;
    return skinPrice + (this.addedCoins || 0);
  }

  // Расчет честного шанса на выигрыш (95% RTP как на CS Battle)
  calculateChance(betValue, targetPrice) {
    if (!betValue || !targetPrice || betValue <= 0 || targetPrice <= 0) return 0;
    let chance = (betValue / targetPrice) * 95;
    if (chance > 85) chance = 85; // максимум 85%
    if (chance < 1) chance = 1;   // минимум 1%
    return parseFloat(chance.toFixed(2));
  }

  // Расчет множителя (multiplier)
  calculateMultiplier(betValue, targetPrice) {
    if (!betValue || !targetPrice || betValue <= 0 || targetPrice <= 0) return 1.0;
    return parseFloat((targetPrice / betValue).toFixed(2));
  }

  // Поиск подходящего скина по шансу
  findClosestSkinByChance(targetChancePercent) {
    const betVal = this.getBetValue();
    if (!betVal || betVal <= 0) return null;

    const idealPrice = Math.round((betVal / (targetChancePercent / 100)) * 0.95);

    let bestSkin = null;
    let minDiff = Infinity;

    for (const skin of window.ALL_SKINS) {
      if (skin.price <= betVal && targetChancePercent < 80) continue;
      const diff = Math.abs(skin.price - idealPrice);
      if (diff < minDiff) {
        minDiff = diff;
        bestSkin = skin;
      }
    }

    return bestSkin || window.ALL_SKINS[0];
  }

  // Поиск подходящего скина по множителю (x1.5, x2, x3, x5, x10, etc.)
  findClosestSkinByMultiplier(multiplier) {
    const betVal = this.getBetValue();
    if (!betVal || betVal <= 0) return null;

    const idealPrice = Math.round(betVal * multiplier);

    let bestSkin = null;
    let minDiff = Infinity;

    for (const skin of window.ALL_SKINS) {
      if (skin.price < betVal) continue;
      const diff = Math.abs(skin.price - idealPrice);
      if (diff < minDiff) {
        minDiff = diff;
        bestSkin = skin;
      }
    }

    return bestSkin || window.ALL_SKINS[window.ALL_SKINS.length - 1];
  }

  // Кэшированный фоновый холст для устранения любых лагов при вращении
  getBaseDial(cssSize, dpr) {
    const key = `${cssSize}_${dpr}`;
    if (this._cachedBaseDial && this._cachedBaseDialKey === key) {
      return this._cachedBaseDial;
    }

    const offCanvas = document.createElement('canvas');
    offCanvas.width = cssSize * dpr;
    offCanvas.height = cssSize * dpr;
    const ctx = offCanvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const centerX = cssSize / 2;
    const centerY = cssSize / 2;

    // 1. Внешние радиальные риски (72 риски)
    const peripheralTickCount = 72;
    for (let i = 0; i < peripheralTickCount; i++) {
      const angle = (i / peripheralTickCount) * 2 * Math.PI;
      const isCardinal = (i % 18 === 0);
      const isMajor = (i % 6 === 0);

      const rInner = isCardinal ? 120 : (isMajor ? 123 : 125);
      const rOuter = isCardinal ? 138 : (isMajor ? 134 : 130);

      const x1 = centerX + rInner * Math.cos(angle);
      const y1 = centerY + rInner * Math.sin(angle);
      const x2 = centerX + rOuter * Math.cos(angle);
      const y2 = centerY + rOuter * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isCardinal ? '#6d82a3' : (isMajor ? '#475770' : '#263042');
      ctx.lineWidth = isCardinal ? 2.0 : (isMajor ? 1.4 : 1.0);
      ctx.stroke();
    }

    // 2. Внешний безель
    ctx.beginPath();
    ctx.arc(centerX, centerY, 118, 0, Math.PI * 2);
    ctx.strokeStyle = '#222b3d';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 3. Метки 100%, 50%, 0%, 50%
    ctx.fillStyle = '#5f718d';
    ctx.font = '900 11px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100%', centerX, centerY - 106);
    ctx.fillText('50%', centerX + 106, centerY);
    ctx.fillText('0%', centerX, centerY + 106);
    ctx.fillText('50%', centerX - 106, centerY);

    // 4. Границы кругового паза (радиус 97 и 77)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 97, 0, Math.PI * 2);
    ctx.strokeStyle = '#161c28';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 77, 0, Math.PI * 2);
    ctx.strokeStyle = '#161c28';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Паз фоновый
    ctx.beginPath();
    ctx.arc(centerX, centerY, 87, 0, Math.PI * 2);
    ctx.strokeStyle = '#0e131c';
    ctx.lineWidth = 18;
    ctx.stroke();

    // 5. Центральный диск
    const centerPlateRadius = 76;
    const plateGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, centerPlateRadius);
    plateGrad.addColorStop(0, '#1a2232');
    plateGrad.addColorStop(0.65, '#111622');
    plateGrad.addColorStop(1, '#0a0d14');

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerPlateRadius, 0, Math.PI * 2);
    ctx.fillStyle = plateGrad;
    ctx.fill();

    ctx.strokeStyle = '#18202d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Перфорированная сетка (micro-dot mesh)
    ctx.fillStyle = 'rgba(100, 140, 190, 0.14)';
    for (let dy = -65; dy <= 65; dy += 5) {
      for (let dx = -65; dx <= 65; dx += 5) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 68) {
          ctx.beginPath();
          ctx.arc(centerX + dx, centerY + dy, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 6. Керамбит
    this.drawEmbossedKarambit(ctx, centerX, centerY - 6);

    this._cachedBaseDial = offCanvas;
    this._cachedBaseDialKey = key;
    return offCanvas;
  }

  // Отрисовка тактической рулетки CS Battle с равномерным симметричным сектором
  drawWheel(canvas, chance, needleAngleRad = Math.PI, isWinState = null) {
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssSize = 280;

    if (canvas.width !== cssSize * dpr || canvas.height !== cssSize * dpr) {
      canvas.width = cssSize * dpr;
      canvas.height = cssSize * dpr;
      canvas.style.width = `${cssSize}px`;
      canvas.style.height = `${cssSize}px`;
    }

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);

    const width = cssSize;
    const height = cssSize;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // 1. Отрисовка кэшированного статического безеля и Керамбита (мгновенно, без лагов)
    const baseDial = this.getBaseDial(cssSize, dpr);
    ctx.drawImage(baseDial, 0, 0, cssSize, cssSize);

    // 2. Равномерный симметричный сектор выигрыша по обе стороны от 0% (внизу)
    const clampedChance = Math.max(0, Math.min(100, chance));
    const halfAngleRad = (clampedChance / 100) * Math.PI;

    // Сектор расширяется симметрично от 6 часов (Math.PI / 2):
    // Вправо к 3 часам (startAngle) и влево к 9 часам (endAngle)
    const startAngle = Math.PI / 2 - halfAngleRad;
    const endAngle = Math.PI / 2 + halfAngleRad;

    if (clampedChance > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 87, startAngle, endAngle);

      // Симметричный неоновый градиент: яркий бирюзовый на концах и изумрудный по центру внизу
      const winGrad = ctx.createLinearGradient(centerX - 87, centerY, centerX + 87, centerY);
      winGrad.addColorStop(0, '#00f5d4');
      winGrad.addColorStop(0.5, '#00ff88');
      winGrad.addColorStop(1, '#00f5d4');

      ctx.strokeStyle = winGrad;
      ctx.lineWidth = 18;
      ctx.lineCap = 'butt';
      ctx.shadowColor = isWinState === false ? '#ff3b5c' : '#00f5d4';
      ctx.shadowBlur = isWinState === true ? 20 : 12;
      ctx.stroke();
      ctx.restore();

      // Центральная точка сектора на 0% (внизу)
      ctx.beginPath();
      ctx.arc(centerX, centerY + 87, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Симметричные концевые маркеры сектора по бокам
      const startX = centerX + 87 * Math.cos(startAngle);
      const startY = centerY + 87 * Math.sin(startAngle);
      const endX = centerX + 87 * Math.cos(endAngle);
      const endY = centerY + 87 * Math.sin(endAngle);

      ctx.beginPath();
      ctx.arc(startX, startY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f5d4';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(endX, endY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f5d4';
      ctx.fill();
    }

    // 3. Пакетная быстрая отрисовка делений шкалы внутри паза (без лагов на 60-120 FPS)
    const grooveTickCount = 72;
    const inactiveTicks = [];
    const activeTicks = [];

    for (let i = 0; i < grooveTickCount; i++) {
      const tickAngle = (i / grooveTickCount) * 2 * Math.PI;
      const x1 = centerX + 80 * Math.cos(tickAngle);
      const y1 = centerY + 80 * Math.sin(tickAngle);
      const x2 = centerX + 94 * Math.cos(tickAngle);
      const y2 = centerY + 94 * Math.sin(tickAngle);

      let inWin = false;
      if (clampedChance > 0) {
        // Угловое расстояние от 6 часов (Math.PI / 2)
        const diff = Math.abs(((tickAngle - Math.PI / 2) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
        if (diff <= halfAngleRad + 0.02) {
          inWin = true;
        }
      }

      if (inWin) {
        activeTicks.push({ x1, y1, x2, y2 });
      } else {
        inactiveTicks.push({ x1, y1, x2, y2 });
      }
    }

    // Неактивные риски (1 draw call)
    if (inactiveTicks.length > 0) {
      ctx.beginPath();
      for (let j = 0; j < inactiveTicks.length; j++) {
        const t = inactiveTicks[j];
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    // Активные светящиеся риски (1 draw call с мягким свечением)
    if (activeTicks.length > 0) {
      ctx.save();
      ctx.beginPath();
      for (let k = 0; k < activeTicks.length; k++) {
        const t = activeTicks[k];
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.3;
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Тактический информационный HUD
    if (!this.betItem) {
      ctx.fillStyle = '#6c7d96';
      ctx.font = '800 10px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ВЫБЕРИТЕ СКИН', centerX, centerY + 36);

      ctx.fillStyle = '#3a4659';
      ctx.font = '900 18px Montserrat, sans-serif';
      ctx.fillText('0.00%', centerX, centerY + 53);
    } else if (!this.targetSkin) {
      ctx.fillStyle = '#00f5d4';
      ctx.font = '800 10px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ВЫБЕРИТЕ ЦЕЛЬ', centerX, centerY + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 18px Montserrat, sans-serif';
      ctx.fillText('0.00%', centerX, centerY + 53);
    } else {
      // Множитель вверху
      const multVal = this.calculateMultiplier(this.getBetValue(), this.targetSkin.price);
      ctx.fillStyle = '#ffd700';
      ctx.font = '900 11px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`x${multVal.toFixed(2)}`, centerX, centerY - 52);

      // Шанс внизу
      ctx.fillStyle = '#7a8ba3';
      ctx.font = '800 9px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ШАНС', centerX, centerY + 35);

      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 20px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 8;
      ctx.fillText(`${clampedChance.toFixed(2)}%`, centerX, centerY + 52);
      ctx.restore();
    }

    // 5. Высокоточная золотая стрелка CS Battle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(needleAngleRad);

    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10;

    // Стержень золотой стрелки
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -96);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Наконечник стрелки
    ctx.beginPath();
    ctx.moveTo(0, -101);
    ctx.lineTo(7, -86);
    ctx.lineTo(-7, -86);
    ctx.closePath();
    ctx.fillStyle = '#ffd700';
    ctx.fill();

    // Белое световое ядро
    ctx.beginPath();
    ctx.moveTo(0, -98);
    ctx.lineTo(3.5, -88);
    ctx.lineTo(-3.5, -88);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Центральный золотой поворотный штифт
    ctx.beginPath();
    ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#111622';
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  // Отрисовка детализированного рельефного Керамбита (Karambit)
  drawEmbossedKarambit(ctx, kx, ky) {
    ctx.save();

    if (!this._karambitPath) {
      this._karambitPath = new Path2D(`
        M ${kx + 26} ${ky - 29}
        A 11 11 0 0 1 ${kx + 37} ${ky - 18}
        C ${kx + 37} ${ky - 10} ${kx + 32} ${ky - 2} ${kx + 26} ${ky + 4}
        C ${kx + 22} ${ky + 8} ${kx + 16} ${ky + 12} ${kx + 10} ${ky + 14}
        C ${kx + 8} ${ky + 14} ${kx + 5} ${ky + 12} ${kx + 3} ${ky + 10}
        C ${kx - 6} ${ky + 11} ${kx - 18} ${ky + 15} ${kx - 28} ${ky + 17}
        C ${kx - 34} ${ky + 18} ${kx - 38} ${ky + 15} ${kx - 37} ${ky + 11}
        C ${kx - 36} ${ky + 8} ${kx - 32} ${ky + 2} ${kx - 24} ${ky - 4}
        C ${kx - 16} ${ky - 9} ${kx - 6} ${ky - 10} ${kx + 2} ${ky - 5}
        C ${kx + 5} ${ky - 4} ${kx + 8} ${ky - 7} ${kx + 12} ${ky - 12}
        C ${kx + 15} ${ky - 16} ${kx + 18} ${ky - 21} ${kx + 21} ${ky - 26}
        A 11 11 0 0 1 ${kx + 26} ${ky - 29}
        Z
        M ${kx + 26} ${ky - 23.5}
        A 5.5 5.5 0 1 0 ${kx + 26} ${ky - 12.5}
        A 5.5 5.5 0 1 0 ${kx + 26} ${ky - 23.5}
        Z
      `);
    }

    // 1. Глубокая тень рельефа на сетчатую пластину
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3.5;

    // 2. Темно-металлический градиент корпуса керамбита
    const metalGrad = ctx.createLinearGradient(kx - 35, ky - 30, kx + 35, ky + 20);
    metalGrad.addColorStop(0, '#3b485e');
    metalGrad.addColorStop(0.45, '#222b3b');
    metalGrad.addColorStop(1, '#141a24');

    ctx.fillStyle = metalGrad;
    ctx.fill(this._karambitPath, 'evenodd');

    // 3. Тонкая фаска и контур лезвия
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#435269';
    ctx.lineWidth = 1.2;
    ctx.stroke(this._karambitPath);

    // 4. Ребро спуска клинка (Blade Grind Line)
    ctx.beginPath();
    ctx.moveTo(kx + 2, ky - 4);
    ctx.bezierCurveTo(kx - 10, ky - 2, kx - 22, ky + 4, kx - 37, ky + 11);
    ctx.strokeStyle = 'rgba(130, 160, 205, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 5. Тактические насечки рукояти (Grip Grooves)
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#10151f';

    ctx.beginPath();
    ctx.moveTo(kx + 19, ky - 10);
    ctx.lineTo(kx + 27, ky - 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(kx + 14, ky - 3);
    ctx.lineTo(kx + 22, ky + 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(kx + 8, ky + 4);
    ctx.lineTo(kx + 15, ky + 10);
    ctx.stroke();

    // 6. Винты крепления накладок рукояти (Torx Screws)
    const screws = [
      [kx + 23, ky - 2],
      [kx + 16, ky + 5]
    ];
    screws.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#141822';
      ctx.fill();
      ctx.strokeStyle = '#50617a';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    ctx.restore();
  }

  // Запуск динамического вращения рулетки
  spinUpgrade(betValue, targetSkin, canvas, onComplete) {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const chance = this.calculateChance(betValue, targetSkin.price);
    const halfAngleDeg = (chance / 100) * 180;

    // Честный розыгрыш: число от 0 до 100
    const roll = Math.random() * 100;
    const isWin = roll <= chance;

    // Сектор выигрыша расположен симметрично относительно 6 часов (180° на циферблате):
    // [180 - halfAngleDeg, 180 + halfAngleDeg]
    let finalAngleDeg = 0;
    if (isWin) {
      const winSpread = 2 * halfAngleDeg;
      const margin = Math.min(2.5, winSpread * 0.08);
      finalAngleDeg = (180 - halfAngleDeg + margin) + Math.random() * Math.max(0.5, winSpread - margin * 2);
    } else {
      // Сектор проигрыша (верхняя дуга циферблата)
      const loseSpread = 360 - 2 * halfAngleDeg;
      const margin = Math.min(2.5, loseSpread * 0.08);
      finalAngleDeg = (180 + halfAngleDeg + margin) + Math.random() * Math.max(0.5, loseSpread - margin * 2);
    }

    // 5-6 полных эффектных оборотов
    const fullSpins = 5 + Math.floor(Math.random() * 2);
    const totalRotationDeg = (fullSpins * 360) + finalAngleDeg;
    const targetRad = (totalRotationDeg * Math.PI) / 180;

    const startTime = performance.now();
    const durationMs = 4800; // 4.8 секунды красивого замедления

    if (window.soundManager) window.soundManager.playOpen();

    let lastTickDeg = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Плавная физическая кривая замедления Ease-Out Quartic
      const easeOut = 1 - Math.pow(1 - progress, 4.2);
      const currentRad = targetRad * easeOut;
      const currentDeg = (currentRad * 180) / Math.PI;

      // Щелчки при прохождении делений
      const tickStep = progress < 0.7 ? 25 : (progress < 0.9 ? 15 : 8);
      if (Math.abs(currentDeg - lastTickDeg) >= tickStep && progress < 0.985) {
        lastTickDeg = currentDeg;
        if (window.soundManager) window.soundManager.playTick();
      }

      this.currentNeedleRad = currentRad;
      this.drawWheel(canvas, chance, currentRad);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.drawWheel(canvas, chance, targetRad, isWin);

        if (isWin) {
          if (window.soundManager) window.soundManager.playDropWin(targetSkin.rarity);
        } else {
          if (window.soundManager) window.soundManager.playDefeat();
        }

        if (onComplete) {
          onComplete({
            isWin: isWin,
            targetSkin: targetSkin,
            roll: roll,
            chance: chance,
            betValue: betValue
          });
        }
      }
    };

    requestAnimationFrame(animate);
  }
}

window.upgraderEngine = new UpgraderEngine();
