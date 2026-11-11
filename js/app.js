/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Главный контроллер приложения и состояния игрока
 */

class DropDropApp {
  constructor() {
    this.coins = 1500; // Стартовый баланс в 🪙 Дропах
    this.xp = 0;
    this.level = 1;
    this.stats = {
      openedCases: 0,
      battlesPlayed: 0,
      battlesWon: 0,
      upgradesWon: 0,
      bestDropPrice: 0,
      bestDropName: '—'
    };
    this.lastDailyBonus = 0;
    this.usedPromoCodes = [];
    this.currentCaseId = null;
    this.activeTab = 'cases';
    this.inventoryFilter = 'all';

    // Промокоды
    this.validPromoCodes = {
      'DROP': 1000,
      'CSBATTLE': 2500,
      'YANDEX': 1500,
      'LORE': 5000,
      'START': 1000,
      'LUCKY': 2000
    };
  }

  // Запуск игры
  async start() {
    console.log('[ДРОП ДРОП] Запуск игры...');

    try {
      // Инициализация SDK с защитой от зависания
      await Promise.race([
        window.yandexSDK.init(),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);
    } catch (e) {
      console.warn('[ДРОП ДРОП] Предупреждение SDK:', e);
    }

    try {
      // Загрузка сохраненных данных игрока
      await this.loadGameState();
    } catch (e) {
      console.warn('[ДРОП ДРОП] Ошибка загрузки сохранений:', e);
    }

    // Настройка интерфейса и слушателей (всегда выполняется)
    try {
      this.initUI();
      this.renderHeader();
      this.renderCasesList('all');
      this.renderInventory();
      this.renderBattlesSetup();
      this.renderUpgrader();
      this.renderContracts();
    } catch (e) {
      console.error('[ДРОП ДРОП] Критическая ошибка рендера интерфейса:', e);
    }

    // Запуск автосохранения каждые 30 секунд
    setInterval(() => {
      this.saveGameState();
    }, 30000);

    console.log('[ДРОП ДРОП] Игра успешно инициализирована!');
  }

  // Обновление баланса и опыта
  addCoins(amount) {
    this.coins = Math.max(0, this.coins + amount);
    this.renderHeader();
    this.saveGameState();
    window.yandexSDK.updateLeaderboard(this.coins + window.inventoryManager.getTotalValue());
  }

  spendCoins(amount) {
    if (this.coins < amount) return false;
    this.coins -= amount;
    this.addXp(Math.floor(amount / 5));
    this.renderHeader();
    this.saveGameState();
    return true;
  }

  addXp(points) {
    this.xp += points;
    const requiredXp = this.level * 500;
    if (this.xp >= requiredXp) {
      this.xp -= requiredXp;
      this.level += 1;
      this.showToast(`🎉 Поздравляем! Новый Уровень ${this.level}! Получено +500 🪙`);
      this.coins += 500;
      if (window.soundManager) window.soundManager.playBattleVictory();
    }
  }

  // Загрузка состояния
  async loadGameState() {
    try {
      const data = await window.yandexSDK.loadData();
      if (data) {
        if (typeof data.coins === 'number') this.coins = data.coins;
        if (typeof data.xp === 'number') this.xp = data.xp;
        if (typeof data.level === 'number') this.level = data.level;
        if (data.stats) this.stats = Object.assign(this.stats, data.stats);
        if (data.lastDailyBonus) this.lastDailyBonus = data.lastDailyBonus;
        if (Array.isArray(data.usedPromoCodes)) this.usedPromoCodes = data.usedPromoCodes;
        if (Array.isArray(data.inventory)) window.inventoryManager.load(data.inventory);
      }
    } catch (e) {
      console.warn('Ошибка загрузки данных игрока:', e);
    }
  }

  // Сохранение состояния
  async saveGameState() {
    const saveData = {
      coins: this.coins,
      xp: this.xp,
      level: this.level,
      stats: this.stats,
      lastDailyBonus: this.lastDailyBonus,
      usedPromoCodes: this.usedPromoCodes,
      inventory: window.inventoryManager.export()
    };
    await window.yandexSDK.saveData(saveData);
  }

  // Шапка игры
  renderHeader() {
    const coinsEl = document.getElementById('user-coins-val');
    if (coinsEl) coinsEl.textContent = this.coins.toLocaleString();

    const invValEl = document.getElementById('user-inv-val');
    if (invValEl) invValEl.textContent = window.inventoryManager.getTotalValue().toLocaleString();

    const levelEl = document.getElementById('user-level-badge');
    if (levelEl) levelEl.textContent = `LVL ${this.level}`;
  }

  // Всплывающие уведомления (Toast)
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `game-toast toast-${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fade');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // =================== ВКЛАДКА: КЕЙСЫ ===================
  renderCasesList(category = 'all') {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;

    let cases = window.ALL_CASES;
    if (category !== 'all') {
      cases = cases.filter(c => c.category === category);
    }

    grid.innerHTML = cases.map(c => {
      const isFree = c.price === 0;
      const badgeHtml = c.badge ? `<div class="case-badge badge-${c.badge.toLowerCase()}">${c.badge}</div>` : '';
      return `
        <div class="case-card" onclick="window.app.openCaseModal('${c.id}')">
          ${badgeHtml}
          <div class="case-img-wrap">
            <img src="${c.image}" alt="${c.name}"/>
          </div>
          <div class="case-title">${c.name}</div>
          <div class="case-subtitle">${c.subname}</div>
          <div class="case-price-tag ${isFree ? 'price-free' : ''}">
            ${isFree ? 'БЕСПЛАТНО' : `🪙 ${c.price.toLocaleString()}`}
          </div>
        </div>
      `;
    }).join('');
  }

  // Открыть модальное окно кейса для открытия
  openCaseModal(caseId) {
    const c = window.CASES_MAP[caseId];
    if (!c) return;

    this.currentCaseId = caseId;
    const modal = document.getElementById('case-open-modal');
    if (!modal) return;

    document.getElementById('modal-case-title').textContent = c.name;
    document.getElementById('modal-case-subtitle').textContent = c.subname;
    document.getElementById('modal-case-price').textContent = c.price === 0 ? 'БЕСПЛАТНО' : `🪙 ${c.price.toLocaleString()}`;

    // Обновляем кнопку открытия
    this.updateOpenButtonPrice();

    // Очищаем рулетку
    const wrapper = document.getElementById('roulette-wheels-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="roulette-track-container placeholder-track">
          <div class="roulette-pointer"></div>
          <div class="roulette-placeholder-case">
            <img src="${c.image}" alt="${c.name}" class="pulse-case-art"/>
            <div class="placeholder-hint">Нажмите «Открыть кейс», чтобы запустить рулетку</div>
          </div>
        </div>
      `;
    }

    // Рендерим содержимое кейса (список всех возможных дропов с ценами и редкостями)
    const dropsContainer = document.getElementById('case-possible-drops');
    if (dropsContainer) {
      // Сортируем дропы от дорогих к дешевым
      const sortedDrops = [...c.drops].sort((a, b) => {
        const sA = window.SKINS_MAP[a.skinId];
        const sB = window.SKINS_MAP[b.skinId];
        return (sB ? sB.price : 0) - (sA ? sA.price : 0);
      });

      dropsContainer.innerHTML = sortedDrops.map(d => {
        const skin = window.SKINS_MAP[d.skinId];
        if (!skin) return '';
        const rarity = window.SKINS_RARITY[skin.rarity] || window.SKINS_RARITY.milspec;
        return `
          <div class="drop-preview-item" style="border-bottom: 2px solid ${rarity.color}">
            <div class="preview-item-glow" style="background: radial-gradient(circle, ${rarity.color}33 0%, transparent 70%);"></div>
            <img src="${skin.image}" alt="${skin.name}" loading="lazy"/>
            <div class="preview-item-name">${skin.name}</div>
            <div class="preview-item-price">🪙 ${skin.price.toLocaleString()}</div>
          </div>
        `;
      }).join('');
    }

    modal.classList.add('modal-active');
  }

  closeCaseModal() {
    if (window.rouletteEngine.isSpinning) return;
    const modal = document.getElementById('case-open-modal');
    if (modal) modal.classList.remove('modal-active');
  }

  // Обновление цены на кнопке открытия при выборе x1 - x5
  updateOpenButtonPrice() {
    const c = window.CASES_MAP[this.currentCaseId];
    if (!c) return;

    const count = window.rouletteEngine.multiCount;
    const totalPrice = c.price * count;
    const btn = document.getElementById('btn-spin-case');
    if (btn) {
      btn.innerHTML = totalPrice === 0 ? `ОТКРЫТЬ БЕСПЛАТНО` : `ОТКРЫТЬ ${count}X ЗА 🪙 ${totalPrice.toLocaleString()}`;
    }
  }

  // Запуск открытия кейса
  async triggerCaseSpin() {
    if (window.rouletteEngine.isSpinning) return;
    const c = window.CASES_MAP[this.currentCaseId];
    if (!c) return;

    const count = window.rouletteEngine.multiCount;
    const totalPrice = c.price * count;

    // Проверка баланса
    if (this.coins < totalPrice) {
      this.showToast('❌ Недостаточно монет 🪙! Посмотрите рекламу для бонуса.', 'error');
      return;
    }

    // Списание баланса
    if (totalPrice > 0) {
      this.spendCoins(totalPrice);
    }

    this.stats.openedCases += count;

    // Блокируем кнопки
    const spinBtn = document.getElementById('btn-spin-case');
    if (spinBtn) spinBtn.disabled = true;

    // Вращение рулетки
    window.rouletteEngine.spin(this.currentCaseId, (results) => {
      if (spinBtn) spinBtn.disabled = false;

      // Добавляем выпавшие предметы в инвентарь
      const addedItems = [];
      results.forEach(skin => {
        const item = window.inventoryManager.addItem(skin.id);
        if (item) addedItems.push(item);

        // Обновляем рекорд
        if (skin.price > this.stats.bestDropPrice) {
          this.stats.bestDropPrice = skin.price;
          this.stats.bestDropName = skin.name;
        }
      });

      this.renderHeader();
      this.renderInventory();
      this.saveGameState();

      // Показываем окно награды
      this.showDropResultModal(results, addedItems);

      // Периодический показ межстраничной рекламы Yandex каждые несколько открытий
      if (this.stats.openedCases % 4 === 0) {
        window.yandexSDK.showInterstitial();
      }
    });
  }

  // Окно полученного дропа
  showDropResultModal(skins, addedItems) {
    const modal = document.getElementById('drop-result-modal');
    if (!modal) return;

    const totalSellPrice = skins.reduce((s, it) => s + it.price, 0);

    const itemsGrid = document.getElementById('result-items-grid');
    if (itemsGrid) {
      itemsGrid.innerHTML = skins.map(skin => {
        const rarity = window.SKINS_RARITY[skin.rarity] || window.SKINS_RARITY.milspec;
        return `
          <div class="result-skin-card" style="border: 2px solid ${rarity.color}">
            <div class="result-glow" style="background: radial-gradient(circle, ${rarity.color}55 0%, transparent 70%);"></div>
            <img src="${skin.image}" alt="${skin.name}" class="result-skin-img"/>
            <div class="result-skin-rarity" style="color: ${rarity.color}">${rarity.name}</div>
            <div class="result-skin-weapon">${skin.weapon}</div>
            <div class="result-skin-name">${skin.name.split('|')[1] || skin.name}</div>
            <div class="result-skin-price">🪙 ${skin.price.toLocaleString()}</div>
          </div>
        `;
      }).join('');
    }

    const sellBtn = document.getElementById('btn-sell-result-drop');
    if (sellBtn) {
      sellBtn.textContent = `ПРОДАТЬ ВСЁ ЗА 🪙 ${totalSellPrice.toLocaleString()}`;
      sellBtn.onclick = () => {
        // Продаем только что выпавшие предметы
        addedItems.forEach(it => {
          window.inventoryManager.removeItem(it.uid);
        });
        this.addCoins(totalSellPrice);
        if (window.soundManager) window.soundManager.playCoin();
        this.showToast(`💰 Вы успешно продали дроп за +${totalSellPrice.toLocaleString()} 🪙`, 'success');
        this.renderInventory();
        modal.classList.remove('modal-active');
      };
    }

    const keepBtn = document.getElementById('btn-keep-result-drop');
    if (keepBtn) {
      keepBtn.onclick = () => {
        this.showToast('✅ Предметы сохранены в инвентарь!', 'success');
        modal.classList.remove('modal-active');
      };
    }

    const upgradeBtn = document.getElementById('btn-upgrade-result-drop');
    if (upgradeBtn) {
      upgradeBtn.onclick = () => {
        modal.classList.remove('modal-active');
        this.closeCaseModal();
        this.switchTab('upgrader');
      };
    }

    modal.classList.add('modal-active');
  }

  // =================== ВКЛАДКА: ИНВЕНТАРЬ ===================
  renderInventory() {
    const grid = document.getElementById('inventory-grid');
    if (!grid) return;

    let items = window.inventoryManager.items;

    // Фильтрация
    if (this.inventoryFilter !== 'all') {
      items = items.filter(it => it.rarity === this.inventoryFilter);
    }

    const countEl = document.getElementById('inv-count-badge');
    if (countEl) countEl.textContent = `${items.length} шт.`;

    const totalValEl = document.getElementById('inv-total-price');
    if (totalValEl) totalValEl.textContent = `🪙 ${window.inventoryManager.getTotalValue().toLocaleString()}`;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-inventory-message">
          <div class="empty-icon">🎒</div>
          <div class="empty-title">Инвентарь пуст</div>
          <div class="empty-desc">Открывайте кейсы или побеждайте в Батлах, чтобы наполнить инвентарь скинами!</div>
          <button class="btn btn-primary" onclick="window.app.switchTab('cases')">Перейти к кейсам</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(it => {
      const rarity = window.SKINS_RARITY[it.rarity] || window.SKINS_RARITY.milspec;
      return `
        <div class="inventory-card" style="border-bottom: 3px solid ${rarity.color}">
          <div class="inv-card-glow" style="background: radial-gradient(circle, ${rarity.color}22 0%, transparent 70%);"></div>
          <div class="inv-img-wrap">
            <img src="${it.image}" alt="${it.name}"/>
          </div>
          <div class="inv-details">
            <div class="inv-weapon">${it.weapon}</div>
            <div class="inv-name" title="${it.name}">${it.name.split('|')[1] || it.name}</div>
            <div class="inv-price">🪙 ${it.price.toLocaleString()}</div>
          </div>
          <div class="inv-actions">
            <button class="btn-inv-sell" onclick="window.app.sellSingleItem('${it.uid}')" title="Продать за ${it.price} 🪙">Продать</button>
          </div>
        </div>
      `;
    }).join('');
  }

  sellSingleItem(uid) {
    const price = window.inventoryManager.sellItem(uid);
    if (price > 0) {
      this.addCoins(price);
      this.showToast(`Продано за +${price.toLocaleString()} 🪙`);
      this.renderInventory();
    }
  }

  sellAllInventory() {
    const total = window.inventoryManager.sellAll();
    if (total > 0) {
      this.addCoins(total);
      this.showToast(`💰 Все скины проданы за +${total.toLocaleString()} 🪙`, 'success');
      this.renderInventory();
    } else {
      this.showToast('Инвентарь уже пуст', 'info');
    }
  }

  sellDuplicateItems() {
    const total = window.inventoryManager.sellDuplicates();
    if (total > 0) {
      this.addCoins(total);
      this.showToast(`💰 Дубликаты проданы за +${total.toLocaleString()} 🪙`, 'success');
      this.renderInventory();
    } else {
      this.showToast('Дубликатов не найдено', 'info');
    }
  }

  // =================== ВКЛАДКА: КЕЙС БАТЛЫ ===================
  renderBattlesSetup() {
    const container = document.getElementById('battle-cases-selector');
    if (!container) return;

    // Список доступных кейсов для добавления в батл
    container.innerHTML = window.ALL_CASES.filter(c => c.price > 0).map(c => `
      <div class="battle-case-chip" onclick="window.app.addCaseToBattle('${c.id}')">
        <img src="${c.image}" alt="${c.name}"/>
        <div class="chip-info">
          <span class="chip-name">${c.name}</span>
          <span class="chip-price">🪙 ${c.price.toLocaleString()}</span>
        </div>
        <button class="chip-add-btn">+</button>
      </div>
    `).join('');

    this.renderSelectedBattleCases();
  }

  addCaseToBattle(caseId) {
    if (window.caseBattleEngine.isPlaying) return;
    const added = window.caseBattleEngine.addCase(caseId);
    if (!added) {
      this.showToast('Максимум 8 кейсов в одном батле!', 'info');
      return;
    }
    if (window.soundManager) window.soundManager.playClick();
    this.renderSelectedBattleCases();
  }

  removeBattleCase(idx) {
    if (window.caseBattleEngine.isPlaying) return;
    window.caseBattleEngine.removeCase(idx);
    if (window.soundManager) window.soundManager.playClick();
    this.renderSelectedBattleCases();
  }

  renderSelectedBattleCases() {
    const listEl = document.getElementById('selected-battle-rounds');
    if (!listEl) return;

    const cases = window.caseBattleEngine.selectedCases;
    const totalCost = window.caseBattleEngine.getTotalCost();

    const costEl = document.getElementById('battle-total-entry-cost');
    if (costEl) costEl.textContent = `🪙 ${totalCost.toLocaleString()}`;

    if (cases.length === 0) {
      listEl.innerHTML = `<div class="empty-rounds-hint">Выберите кейсы из списка выше, чтобы составить раунды батла</div>`;
      return;
    }

    listEl.innerHTML = cases.map((cid, idx) => {
      const c = window.CASES_MAP[cid];
      if (!c) return '';
      return `
        <div class="selected-round-card">
          <div class="round-num">#${idx + 1}</div>
          <img src="${c.image}" alt="${c.name}"/>
          <div class="round-info">
            <div class="round-name">${c.name}</div>
            <div class="round-price">🪙 ${c.price.toLocaleString()}</div>
          </div>
          <button class="round-del-btn" onclick="window.app.removeBattleCase(${idx})">✕</button>
        </div>
      `;
    }).join('');
  }

  triggerStartBattle() {
    if (window.caseBattleEngine.isPlaying) return;

    const res = window.caseBattleEngine.startBattle(
      this.coins,
      // onBattleStart
      (data) => {
        this.spendCoins(data.totalCost);
        this.stats.battlesPlayed += 1;
        this.setupBattleArenaUI(data);
      },
      // onRoundUpdate
      (roundData) => {
        this.updateBattleArenaRound(roundData);
      },
      // onBattleEnd
      (endData) => {
        this.finishBattleArenaUI(endData);
      }
    );

    if (!res.success) {
      this.showToast(res.error, 'error');
    }
  }

  setupBattleArenaUI(data) {
    const arena = document.getElementById('battle-arena-view');
    const lobby = document.getElementById('battle-lobby-view');
    if (arena && lobby) {
      lobby.style.display = 'none';
      arena.style.display = 'block';
    }

    const participantsGrid = document.getElementById('battle-players-grid');
    if (participantsGrid) {
      participantsGrid.innerHTML = data.participants.map(p => `
        <div class="battle-player-column" id="battle-col-${p.id}">
          <div class="player-header">
            <div class="player-avatar">${p.avatar}</div>
            <div class="player-name">${p.name}</div>
            <div class="player-score" id="score-${p.id}">🪙 0</div>
          </div>
          <div class="player-current-slot" id="slot-${p.id}">
            <div class="slot-idle">Ожидание раунда 1...</div>
          </div>
          <div class="player-history-drops" id="history-${p.id}"></div>
        </div>
      `).join('');
    }
  }

  updateBattleArenaRound(roundData) {
    const roundTitle = document.getElementById('battle-round-indicator');
    if (roundTitle) {
      roundTitle.textContent = `РАУНД ${roundData.round} ИЗ ${roundData.totalRounds} — ${roundData.caseData.name}`;
    }

    roundData.roundDrops.forEach(rd => {
      const skin = rd.drop;
      const rarity = window.SKINS_RARITY[skin.rarity] || window.SKINS_RARITY.milspec;

      // Обновляем текущий слот
      const slot = document.getElementById(`slot-${rd.participantId}`);
      if (slot) {
        slot.innerHTML = `
          <div class="battle-drop-card bounce-in" style="border-bottom: 3px solid ${rarity.color}">
            <img src="${skin.image}" alt="${skin.name}"/>
            <div class="battle-drop-name">${skin.name}</div>
            <div class="battle-drop-price">🪙 ${skin.price.toLocaleString()}</div>
          </div>
        `;
      }

      // Обновляем общий счет
      const scoreEl = document.getElementById(`score-${rd.participantId}`);
      if (scoreEl) {
        scoreEl.textContent = `🪙 ${rd.totalValue.toLocaleString()}`;
      }

      // Добавляем в историю дропов участника
      const history = document.getElementById(`history-${rd.participantId}`);
      if (history) {
        const mini = document.createElement('div');
        mini.className = 'history-mini-item';
        mini.style.borderLeft = `3px solid ${rarity.color}`;
        mini.innerHTML = `<span>${skin.name.split('|')[1] || skin.name}</span><b>🪙 ${skin.price.toLocaleString()}</b>`;
        history.prepend(mini);
      }
    });
  }

  finishBattleArenaUI(endData) {
    if (endData.isUserWinner) {
      this.stats.battlesWon += 1;
      this.showToast(`🏆 ПОБЕДА В БАТЛЕ! Вы выиграли весь лут на 🪙 ${endData.totalLootValue.toLocaleString()}!`, 'success');

      // Добавляем все выигранные скины в инвентарь
      endData.allLoot.forEach(skin => {
        window.inventoryManager.addItem(skin.id);
      });
      this.renderInventory();
    } else {
      this.showToast(`💀 Поражение в батле! Победитель: ${endData.winner.name}`, 'error');
    }

    // Показываем кнопку выхода обратно в лобби
    const footer = document.getElementById('battle-arena-actions');
    if (footer) {
      footer.innerHTML = `
        <div class="battle-end-summary ${endData.isUserWinner ? 'summary-win' : 'summary-loss'}">
          <h2>${endData.isUserWinner ? '🎉 ВЫ ПОБЕДИТЕЛЬ!' : '💀 ПОРАЖЕНИЕ'}</h2>
          <p>Всего раундов: ${window.caseBattleEngine.selectedCases.length} | Суммарный банк: 🪙 ${endData.totalLootValue.toLocaleString()}</p>
          <button class="btn btn-primary" onclick="window.app.returnToBattleLobby()">Вернуться в лобби батлов</button>
        </div>
      `;
    }

    this.renderHeader();
    this.saveGameState();

    // Межстраничная реклама Yandex после завершения батла
    window.yandexSDK.showInterstitial();
  }

  returnToBattleLobby() {
    const arena = document.getElementById('battle-arena-view');
    const lobby = document.getElementById('battle-lobby-view');
    if (arena && lobby) {
      arena.style.display = 'none';
      lobby.style.display = 'block';
    }
  }

  // =================== ВКЛАДКА: АПГРЕЙДЕР (CS BATTLE ITEM-ONLY) ===================
  focusUpgraderInventory() {
    const invEl = document.getElementById('upgrader-my-inv-list');
    if (invEl) {
      invEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  selectUpgraderSourceItem(itemUid) {
    const item = window.inventoryManager.getItem(itemUid);
    if (!item) return;

    window.upgraderEngine.betItem = item;

    const slot = document.getElementById('upgrader-source-item-card');
    if (slot) {
      const rarity = window.SKINS_RARITY[item.rarity] || window.SKINS_RARITY.milspec;
      slot.innerHTML = `
        <div class="target-chosen-box" style="border: 2px solid ${rarity.color}">
          <button class="btn-unselect-source" onclick="event.stopPropagation(); window.app.clearUpgraderSourceItem()" title="Убрать скин">✕</button>
          <img src="${item.image}" alt="${item.name}"/>
          <div class="chosen-wep">${item.weapon}</div>
          <div class="chosen-name">${item.name}</div>
          <div class="chosen-price">🪙 ${item.price.toLocaleString()}</div>
        </div>
      `;
    }

    // Если цель еще не выбрана — подбираем скин с шансом 50%
    if (!window.upgraderEngine.targetSkin) {
      const defaultTarget = window.upgraderEngine.findClosestSkinByChance(50);
      if (defaultTarget) window.upgraderEngine.targetSkin = defaultTarget;
    }

    // Сбрасываем буст монетами при смене исходного скина
    window.upgraderEngine.resetAddedCoins();
    this.updateUpgraderCoinBoostUI();

    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  clearUpgraderSourceItem() {
    window.upgraderEngine.betItem = null;
    window.upgraderEngine.resetAddedCoins();

    const slot = document.getElementById('upgrader-source-item-card');
    if (slot) {
      slot.innerHTML = `
        <div class="slot-placeholder">
          <span class="slot-icon">🎒</span>
          <span class="slot-text">Выберите скин из инвентаря ниже 👇</span>
        </div>
      `;
    }

    this.updateUpgraderCoinBoostUI();
    this.updateUpgraderChance();
  }

  // Установка буста ставки монетами по нажатию на кнопку (+0%, +5%, +10%, etc.)
  setUpgraderCoinBoost(percent) {
    if (!window.upgraderEngine.betItem) {
      this.showToast('Сначала выберите скин для апгрейда!', 'info');
      return;
    }

    const maxAllowed = window.upgraderEngine.getMaxAddedCoins();
    if (percent > 0 && maxAllowed <= 0) {
      this.showToast('Недостаточно монет на балансе для буста ставки!', 'info');
      return;
    }

    window.upgraderEngine.setAddedCoinsPercent(percent);
    this.updateUpgraderCoinBoostUI();
    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
    if (window.soundManager) window.soundManager.playClick();
  }

  // Изменение буста ставки через ползунок (0..25%)
  onCoinBoostSliderChange(percentVal) {
    if (!window.upgraderEngine.betItem) return;
    window.upgraderEngine.setAddedCoinsPercent(percentVal);
    this.updateUpgraderCoinBoostUI();
    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  // Обновление интерфейса панели буста монетами
  updateUpgraderCoinBoostUI() {
    const panel = document.getElementById('upgrader-coin-boost-panel');
    const range = document.getElementById('coin-boost-range');
    const skinValEl = document.getElementById('boost-skin-val');
    const pctLabelEl = document.getElementById('boost-pct-label');
    const coinsValEl = document.getElementById('boost-coins-val');
    const chips = document.querySelectorAll('#coin-boost-chips .boost-chip');

    const item = window.upgraderEngine.betItem;
    if (!item) {
      if (panel) panel.classList.add('disabled');
      if (range) {
        range.disabled = true;
        range.value = 0;
      }
      if (skinValEl) skinValEl.textContent = '🪙 0';
      if (pctLabelEl) pctLabelEl.textContent = '+0%';
      if (coinsValEl) coinsValEl.textContent = '+0 🪙';
      chips.forEach(c => c.classList.toggle('active', c.dataset.pct === '0'));
      return;
    }

    if (panel) panel.classList.remove('disabled');
    if (range) {
      range.disabled = false;
      range.value = window.upgraderEngine.addedCoinsPercent;
    }

    if (skinValEl) skinValEl.textContent = `🪙 ${item.price.toLocaleString()}`;
    if (pctLabelEl) pctLabelEl.textContent = `+${window.upgraderEngine.addedCoinsPercent}%`;
    if (coinsValEl) coinsValEl.textContent = `+${window.upgraderEngine.addedCoins.toLocaleString()} 🪙`;

    chips.forEach(c => {
      const p = parseInt(c.dataset.pct, 10);
      c.classList.toggle('active', p === window.upgraderEngine.addedCoinsPercent);
    });
  }

  selectUpgraderChance(chancePercent) {
    // Если скин не выбран — пробуем выбрать первый из инвентаря
    if (!window.upgraderEngine.betItem) {
      const items = window.inventoryManager.items;
      if (items.length > 0) {
        this.selectUpgraderSourceItem(items[0].uid);
      } else {
        this.showToast('В вашем инвентаре нет скинов! Откройте кейс для апгрейда.', 'info');
        return;
      }
    }

    const skin = window.upgraderEngine.findClosestSkinByChance(chancePercent);
    if (skin) {
      window.upgraderEngine.targetSkin = skin;
    }

    // Подсветка кнопки шанса
    document.querySelectorAll('#upgrader-chance-pills .pill-btn').forEach(btn => {
      const val = parseFloat(btn.dataset.chance);
      btn.classList.toggle('active', val === chancePercent);
    });

    // Сброс подсветки множителя
    document.querySelectorAll('#upgrader-multiplier-pills .pill-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  selectUpgraderMultiplier(multiplier) {
    if (!window.upgraderEngine.betItem) {
      const items = window.inventoryManager.items;
      if (items.length > 0) {
        this.selectUpgraderSourceItem(items[0].uid);
      } else {
        this.showToast('В вашем инвентаре нет скинов! Откройте кейс для апгрейда.', 'info');
        return;
      }
    }

    const skin = window.upgraderEngine.findClosestSkinByMultiplier(multiplier);
    if (skin) {
      window.upgraderEngine.targetSkin = skin;
    }

    // Подсветка кнопки множителя
    document.querySelectorAll('#upgrader-multiplier-pills .pill-btn').forEach(btn => {
      const val = parseFloat(btn.dataset.mult);
      btn.classList.toggle('active', val === multiplier);
    });

    // Сброс подсветки шанса
    document.querySelectorAll('#upgrader-chance-pills .pill-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  selectUpgradeTarget(skinId) {
    const skin = window.SKINS_MAP[skinId];
    if (!skin) return;

    window.upgraderEngine.targetSkin = skin;

    // Сбрасываем активные пресеты при ручном выборе
    document.querySelectorAll('#upgrader-chance-pills .pill-btn, #upgrader-multiplier-pills .pill-btn').forEach(b => b.classList.remove('active'));

    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  updateUpgraderTargetCard() {
    const target = window.upgraderEngine.targetSkin;
    const preview = document.getElementById('upgrader-selected-target');
    const profitEl = document.getElementById('upgrader-profit-badge');

    if (!preview) return;

    if (!target) {
      preview.innerHTML = `
        <div class="target-chosen-box" style="border: 1px dashed var(--border-color); color: var(--text-muted);">
          Выберите желаемый скин из каталога справа 👉
        </div>
      `;
      if (profitEl) profitEl.innerHTML = `Выгода: <b style="color: var(--accent-cyan)">+0 🪙</b>`;
      return;
    }

    const rarity = window.SKINS_RARITY[target.rarity] || window.SKINS_RARITY.milspec;
    preview.innerHTML = `
      <div class="target-chosen-box" style="border: 2px solid ${rarity.color}">
        <img src="${target.image}" alt="${target.name}"/>
        <div class="chosen-wep">${target.weapon}</div>
        <div class="chosen-name">${target.name}</div>
        <div class="chosen-price">🪙 ${target.price.toLocaleString()}</div>
      </div>
    `;

    const betVal = window.upgraderEngine.getBetValue();
    const profit = Math.max(0, target.price - betVal);
    if (profitEl) {
      profitEl.innerHTML = `Выгода: <b style="color: var(--accent-cyan)">+${profit.toLocaleString()} 🪙</b>`;
    }
  }

  updateUpgraderChance() {
    const canvas = document.getElementById('upgrader-canvas');
    const betVal = window.upgraderEngine.getBetValue();
    const target = window.upgraderEngine.targetSkin;

    const betDisplay = document.getElementById('upgrader-current-bet-display');
    if (betDisplay) {
      betDisplay.textContent = `🪙 ${betVal.toLocaleString()}`;
    }

    const chance = (betVal > 0 && target) ? window.upgraderEngine.calculateChance(betVal, target.price) : 0;

    if (canvas) {
      window.upgraderEngine.drawWheel(canvas, chance, window.upgraderEngine.currentNeedleRad || 0);
    }

    const btn = document.getElementById('btn-spin-upgrader');
    if (btn) {
      if (!window.upgraderEngine.betItem) {
        btn.textContent = 'ВЫБЕРИТЕ СКИН';
        btn.disabled = true;
      } else if (!target) {
        btn.textContent = 'ВЫБЕРИТЕ ЦЕЛЬ';
        btn.disabled = true;
      } else {
        btn.textContent = `⚡ АПГРЕЙД (${chance.toFixed(2)}%)`;
        btn.disabled = false;
      }
    }

    this.renderUpgraderInventory();
    this.renderUpgraderCatalog();
  }

  renderUpgrader() {
    this.updateUpgraderCoinBoostUI();

    const canvas = document.getElementById('upgrader-canvas');
    if (canvas) {
      window.upgraderEngine.drawWheel(canvas, 0, Math.PI);
    }

    // Если скин еще не выбран, автоматически выбираем первый из инвентаря
    if (!window.upgraderEngine.betItem) {
      const items = window.inventoryManager.items;
      if (items.length > 0) {
        this.selectUpgraderSourceItem(items[0].uid);
        return;
      }
    }

    this.updateUpgraderTargetCard();
    this.updateUpgraderChance();
  }

  renderUpgraderInventory() {
    const list = document.getElementById('upgrader-my-inv-list');
    const countBadge = document.getElementById('upgrader-my-inv-count');
    if (!list) return;

    const items = window.inventoryManager.items;
    if (countBadge) {
      countBadge.textContent = `${items.length} предметов`;
    }

    if (items.length === 0) {
      list.innerHTML = `
        <div class="upgrader-empty-inv-card">
          <div class="empty-inv-icon">📦</div>
          <div class="empty-inv-title">В инвентаре пока нет предметов</div>
          <div class="empty-inv-text">Откройте кейсы, чтобы получить скины для апгрейда!</div>
          <button class="btn btn-primary btn-sm" onclick="window.app.switchTab('cases')">Перейти к кейсам</button>
        </div>
      `;
      return;
    }

    const selectedUid = window.upgraderEngine.betItem ? window.upgraderEngine.betItem.uid : null;

    list.innerHTML = items.map(it => {
      const rarity = window.SKINS_RARITY[it.rarity] || window.SKINS_RARITY.milspec;
      const isSelected = it.uid === selectedUid;
      return `
        <div class="upgrader-inv-skin-card ${isSelected ? 'selected-source' : ''}" onclick="window.app.selectUpgraderSourceItem('${it.uid}')" style="border-bottom: 2px solid ${rarity.color}">
          ${isSelected ? '<div class="source-card-badge">ВЫБРАН</div>' : ''}
          <img src="${it.image}" alt="${it.name}" loading="lazy"/>
          <div class="target-name">${it.name}</div>
          <div class="target-price">🪙 ${it.price.toLocaleString()}</div>
        </div>
      `;
    }).join('');
  }

  renderUpgraderCatalog() {
    const catalog = document.getElementById('upgrader-targets-catalog');
    const countBadge = document.getElementById('upgrader-catalog-count');
    if (!catalog) return;

    const betVal = window.upgraderEngine.getBetValue();
    const searchVal = (document.getElementById('upgrader-search-input')?.value || '').toLowerCase().trim();
    const rarityVal = document.getElementById('upgrader-rarity-filter')?.value || 'all';
    const sortVal = document.getElementById('upgrader-sort-filter')?.value || 'price_asc';

    let targets = window.ALL_SKINS.filter(s => {
      // Исключаем скины, если они существенно дешевле ставки
      if (betVal > 0 && s.price < betVal * 0.9) return false;

      if (searchVal) {
        const matchesName = s.name.toLowerCase().includes(searchVal);
        const matchesEn = s.nameEn ? s.nameEn.toLowerCase().includes(searchVal) : false;
        const matchesWep = s.weapon.toLowerCase().includes(searchVal);
        if (!matchesName && !matchesEn && !matchesWep) return false;
      }

      if (rarityVal !== 'all' && s.rarity !== rarityVal) return false;

      return true;
    });

    if (sortVal === 'price_asc') {
      targets.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price_desc') {
      targets.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'chance_desc') {
      targets.sort((a, b) => window.upgraderEngine.calculateChance(betVal, b.price) - window.upgraderEngine.calculateChance(betVal, a.price));
    } else if (sortVal === 'chance_asc') {
      targets.sort((a, b) => window.upgraderEngine.calculateChance(betVal, a.price) - window.upgraderEngine.calculateChance(betVal, b.price));
    }

    if (countBadge) {
      countBadge.textContent = `${targets.length} скинов`;
    }

    const currentTargetId = window.upgraderEngine.targetSkin ? window.upgraderEngine.targetSkin.id : null;

    catalog.innerHTML = targets.map(s => {
      const rarity = window.SKINS_RARITY[s.rarity] || window.SKINS_RARITY.milspec;
      const ch = betVal > 0 ? `${window.upgraderEngine.calculateChance(betVal, s.price)}%` : '--%';
      const isSelected = s.id === currentTargetId;
      return `
        <div class="upgrader-target-card ${isSelected ? 'selected-target' : ''}" onclick="window.app.selectUpgradeTarget('${s.id}')" style="border-bottom: 2px solid ${rarity.color}">
          <div class="target-card-chance">${ch}</div>
          <img src="${s.image}" alt="${s.name}" loading="lazy"/>
          <div class="target-name">${s.name}</div>
          <div class="target-price">🪙 ${s.price.toLocaleString()}</div>
        </div>
      `;
    }).join('');
  }

  triggerUpgradeSpin() {
    if (window.upgraderEngine.isSpinning) return;

    const srcItem = window.upgraderEngine.betItem;
    if (!srcItem) {
      this.showToast('Выберите скин из вашего инвентаря для апгрейда!', 'info');
      return;
    }

    // Проверяем, что предмет все еще в инвентаре
    const realItem = window.inventoryManager.getItem(srcItem.uid);
    if (!realItem) {
      this.showToast('Выбранный скин больше не находится в инвентаре!', 'error');
      this.clearUpgraderSourceItem();
      return;
    }

    const target = window.upgraderEngine.targetSkin;
    if (!target) {
      this.showToast('Выберите желаемый скин для апгрейда!', 'info');
      return;
    }

    // Проверяем баланс монет для выбранного буста
    const addedCoins = window.upgraderEngine.addedCoins || 0;
    if (addedCoins > 0) {
      if (this.coins < addedCoins) {
        this.showToast('Недостаточно монет на балансе для буста ставки!', 'error');
        return;
      }
    }

    // Забираем исходный скин из инвентаря
    window.inventoryManager.removeItem(srcItem.uid);
    this.renderInventory();

    // Списываем добавленные монеты с баланса
    if (addedCoins > 0) {
      this.spendCoins(addedCoins);
      this.renderHeader();
    }

    const canvas = document.getElementById('upgrader-canvas');
    const btn = document.getElementById('btn-spin-upgrader');
    if (btn) btn.disabled = true;

    const totalBetVal = window.upgraderEngine.getBetValue();

    window.upgraderEngine.spinUpgrade(totalBetVal, target, canvas, (res) => {
      if (btn) btn.disabled = false;

      // Сбрасываем буст монет после завершения вращения
      window.upgraderEngine.resetAddedCoins();
      this.updateUpgraderCoinBoostUI();

      if (res.isWin) {
        this.stats.upgradesWon += 1;
        const wonItem = window.inventoryManager.addItem(res.targetSkin.id);
        this.renderInventory();
        this.showToast(`🎉 УСПЕШНЫЙ АПГРЕЙД! Вы выиграли ${res.targetSkin.name}!`, 'success');

        // Автоматически ставим выигранный скин для следующего апгрейда!
        if (wonItem) {
          this.selectUpgraderSourceItem(wonItem.uid);
        } else {
          this.clearUpgraderSourceItem();
        }
      } else {
        const extraNote = addedCoins > 0 ? ` (и +${addedCoins} 🪙 буста)` : '';
        this.showToast(`💔 Апгрейд не удался. Предмет${extraNote} сгорел!`, 'error');
        this.clearUpgraderSourceItem();
      }

      this.updateUpgraderChance();
      this.renderHeader();
      this.saveGameState();
    });
  }

  // =================== ВКЛАДКА: КОНТРАКТЫ ===================
  renderContracts() {
    const list = document.getElementById('contracts-inventory-list');
    if (!list) return;

    const items = window.inventoryManager.items;
    if (items.length === 0) {
      list.innerHTML = `<div class="contracts-empty">В инвентаре нет предметов для контракта</div>`;
      return;
    }

    list.innerHTML = items.map(it => {
      const isSelected = window.contractsEngine.selectedUids.includes(it.uid);
      const rarity = window.SKINS_RARITY[it.rarity] || window.SKINS_RARITY.milspec;
      return `
        <div class="contract-inv-item ${isSelected ? 'selected' : ''}" onclick="window.app.toggleContractItem('${it.uid}')" style="border-bottom: 2px solid ${rarity.color}">
          <img src="${it.image}" alt="${it.name}"/>
          <div class="contract-item-name">${it.name}</div>
          <div class="contract-item-price">🪙 ${it.price.toLocaleString()}</div>
        </div>
      `;
    }).join('');

    const countEl = document.getElementById('contract-selected-count');
    if (countEl) countEl.textContent = `${window.contractsEngine.selectedUids.length} / 10 предметов`;
  }

  toggleContractItem(uid) {
    window.contractsEngine.toggleItem(uid);
    if (window.soundManager) window.soundManager.playClick();
    this.renderContracts();
  }

  triggerSignContract() {
    const res = window.contractsEngine.executeContract();
    if (!res.success) {
      this.showToast(res.error, 'error');
      return;
    }

    this.showToast(`📜 Контракт выполнен! Вы получили ${res.rewardSkin.name}!`, 'success');
    this.renderContracts();
    this.renderInventory();
    this.renderHeader();
    this.saveGameState();
  }

  // =================== БОНУСЫ И ПРОМОКОДЫ ===================
  claimDailyBonus() {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - this.lastDailyBonus < oneDay) {
      const remainingHours = Math.ceil((oneDay - (now - this.lastDailyBonus)) / (1000 * 60 * 60));
      this.showToast(`Ежедневный бонус будет доступен через ${remainingHours} ч.`, 'info');
      return;
    }

    this.lastDailyBonus = now;
    const bonusAmount = 1000;
    this.addCoins(bonusAmount);
    this.showToast(`🎁 Получен ежедневный бонус: +${bonusAmount} 🪙!`, 'success');
    if (window.soundManager) window.soundManager.playCoin();
  }

  watchRewardedForCoins() {
    const btnHeader = document.getElementById('btn-header-rewarded');
    const btnBonus = document.getElementById('btn-bonus-rewarded');

    const setButtonsLoading = (loading) => {
      if (btnHeader) {
        btnHeader.disabled = loading;
        btnHeader.classList.toggle('btn-loading', loading);
      }
      if (btnBonus) {
        btnBonus.disabled = loading;
        btnBonus.classList.toggle('btn-loading', loading);
        btnBonus.textContent = loading ? 'Загрузка...' : 'Смотреть (+1,500 🪙)';
      }
    };

    setButtonsLoading(true);

    window.yandexSDK.showRewarded(
      (isLocalDemo) => {
        setButtonsLoading(false);
        const reward = 1500;
        this.addCoins(reward);
        const prefix = isLocalDemo ? '🛠️ (Тест) ' : '💎 ';
        this.showToast(`${prefix}Награда за просмотр рекламы получена: +${reward} 🪙!`, 'success');
        if (window.soundManager) window.soundManager.playCoin();
        this.renderHeader();
        this.saveGameState();
      },
      () => {
        setButtonsLoading(false);
        this.showToast('Просмотр рекламы был прерван. Досмотрите ролик до конца, чтобы получить 🪙!', 'info');
      },
      (err) => {
        setButtonsLoading(false);
        console.warn('[Ad Error]', err);
        this.showToast('Реклама сейчас загружается или временно недоступна. Попробуйте через пару секунд!', 'info');
      }
    );
  }

  activatePromoCode(code) {
    if (!code) return;
    const cleanCode = code.trim().toUpperCase();

    if (this.usedPromoCodes.includes(cleanCode)) {
      this.showToast('Этот промокод уже был активирован!', 'info');
      return;
    }

    const reward = this.validPromoCodes[cleanCode];
    if (reward) {
      this.usedPromoCodes.push(cleanCode);
      this.addCoins(reward);
      this.showToast(`🎟️ Промокод активирован! Начислено +${reward.toLocaleString()} 🪙!`, 'success');
      if (window.soundManager) window.soundManager.playCoin();
      const input = document.getElementById('promocode-input');
      if (input) input.value = '';
    } else {
      this.showToast('Неверный промокод!', 'error');
    }
  }

  // =================== НАВИГАЦИЯ ПО ВКЛАДКАМ ===================
  switchTab(tabId) {
    this.activeTab = tabId;

    // Скрываем все страницы
    document.querySelectorAll('.tab-view').forEach(view => {
      view.style.display = 'none';
    });

    // Деактивируем кнопки меню
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Показываем нужную страницу
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.style.display = 'block';

    const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    if (window.soundManager) window.soundManager.playClick();

    if (tabId === 'inventory') this.renderInventory();
    if (tabId === 'upgrader') this.renderUpgrader();
    if (tabId === 'contracts') this.renderContracts();
  }

  // =================== НАСТРОЙКА UI И СЛУШАТЕЛЕЙ ===================
  initUI() {
    // Навигация
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });

    // Фильтры кейсов
    document.querySelectorAll('.case-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.case-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        this.renderCasesList(cat);
      });
    });

    // Кнопка звука
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isMuted = window.soundManager.toggleMute();
        soundBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Выбор множителя рулетки (1x - 5x)
    document.querySelectorAll('.multi-spin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.multi-spin-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const count = parseInt(btn.getAttribute('data-count'), 10) || 1;
        window.rouletteEngine.setMultiCount(count);
        this.updateOpenButtonPrice();
      });
    });

    // Переключатель быстрого открытия
    const fastOpenCheckbox = document.getElementById('checkbox-fast-open');
    if (fastOpenCheckbox) {
      fastOpenCheckbox.addEventListener('change', (e) => {
        window.rouletteEngine.setFastOpen(e.target.checked);
      });
    }

    // Слушатели поиска и фильтра в каталоге апгрейдера
    const upgSearch = document.getElementById('upgrader-search-input');
    if (upgSearch) {
      upgSearch.addEventListener('input', () => {
        this.renderUpgraderCatalog();
      });
    }

    const upgRarity = document.getElementById('upgrader-rarity-filter');
    if (upgRarity) {
      upgRarity.addEventListener('change', () => {
        this.renderUpgraderCatalog();
      });
    }

    const upgSort = document.getElementById('upgrader-sort-filter');
    if (upgSort) {
      upgSort.addEventListener('change', () => {
        this.renderUpgraderCatalog();
      });
    }

    // Фильтр инвентаря
    const invFilterSelect = document.getElementById('inventory-rarity-filter');
    if (invFilterSelect) {
      invFilterSelect.addEventListener('change', (e) => {
        this.inventoryFilter = e.target.value;
        this.renderInventory();
      });
    }
  }
}

window.app = new DropDropApp();

// Автозапуск при загрузке документа
window.addEventListener('DOMContentLoaded', () => {
  window.app.start();
});
