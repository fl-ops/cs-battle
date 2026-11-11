/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Контракты обмена (Trade-Up Contracts):
 * - Выбор от 3 до 10 скинов из инвентаря
 * - Расчет пула возможных исходов следующего уровня редкости
 * - Анимация подписания контракта и распаковки
 */

class ContractsEngine {
  constructor() {
    this.selectedUids = []; // Выбранные предметы
  }

  toggleItem(uid) {
    const idx = this.selectedUids.indexOf(uid);
    if (idx !== -1) {
      this.selectedUids.splice(idx, 1);
      return false;
    } else {
      if (this.selectedUids.length >= 10) return false;
      this.selectedUids.push(uid);
      return true;
    }
  }

  clear() {
    this.selectedUids = [];
  }

  getSelectedItems() {
    return this.selectedUids
      .map(uid => window.inventoryManager.getItem(uid))
      .filter(Boolean);
  }

  // Расчет следующего уровня редкости
  getNextRarity(currentRarity) {
    const sequence = ['consumer', 'industrial', 'milspec', 'restricted', 'classified', 'covert', 'extraordinary'];
    const currentIdx = sequence.indexOf(currentRarity);
    if (currentIdx === -1 || currentIdx >= sequence.length - 1) {
      return 'extraordinary';
    }
    return sequence[currentIdx + 1];
  }

  // Выполнение контракта
  executeContract() {
    const items = this.getSelectedItems();
    if (items.length < 3) {
      return { success: false, error: 'Нужно выбрать минимум 3 предмета' };
    }

    // Определяем доминирующую редкость
    const rarityCounts = {};
    let totalInputValue = 0;
    items.forEach(it => {
      rarityCounts[it.rarity] = (rarityCounts[it.rarity] || 0) + 1;
      totalInputValue += it.price;
    });

    let topRarity = 'consumer';
    let maxCount = 0;
    Object.keys(rarityCounts).forEach(r => {
      if (rarityCounts[r] > maxCount) {
        maxCount = rarityCounts[r];
        topRarity = r;
      }
    });

    // Целевая редкость
    const targetRarity = this.getNextRarity(topRarity);

    // Доступные скины этой редкости
    const candidateSkins = window.ALL_SKINS.filter(s => s.rarity === targetRarity);
    const pool = candidateSkins.length > 0 ? candidateSkins : window.ALL_SKINS.filter(s => s.rarity === 'covert');

    // Выбираем случайный скин из пула
    const outcomeSkin = pool[Math.floor(Math.random() * pool.length)];

    // Удаляем использованные предметы из инвентаря
    this.selectedUids.forEach(uid => {
      window.inventoryManager.removeItem(uid);
    });

    // Очищаем выбор
    this.selectedUids = [];

    // Добавляем новый предмет
    const addedItem = window.inventoryManager.addItem(outcomeSkin.id);

    if (window.soundManager) {
      window.soundManager.playDropWin(outcomeSkin.rarity);
    }

    return {
      success: true,
      rewardSkin: outcomeSkin,
      addedItem: addedItem,
      totalInputValue: totalInputValue
    };
  }
}

window.contractsEngine = new ContractsEngine();
