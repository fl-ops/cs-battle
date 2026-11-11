/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Управление инвентарем игрока, продажей и сортировкой
 */

class InventoryManager {
  constructor() {
    this.items = []; // Массив объектов { uid, skinId, price, obtainedAt }
  }

  // Добавить предмет
  addItem(skinId) {
    const skin = window.SKINS_MAP[skinId];
    if (!skin) return null;

    const item = {
      uid: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      skinId: skin.id,
      name: skin.name,
      weapon: skin.weapon,
      rarity: skin.rarity,
      price: skin.price,
      image: skin.image,
      obtainedAt: Date.now()
    };

    this.items.unshift(item);
    return item;
  }

  // Удалить предмет по UID
  removeItem(uid) {
    const idx = this.items.findIndex(it => it.uid === uid);
    if (idx !== -1) {
      const removed = this.items.splice(idx, 1)[0];
      return removed;
    }
    return null;
  }

  // Получить предмет по UID
  getItem(uid) {
    return this.items.find(it => it.uid === uid);
  }

  // Общая стоимость всех предметов в инвентаре
  getTotalValue() {
    return this.items.reduce((sum, it) => sum + (it.price || 0), 0);
  }

  // Количество предметов
  getCount() {
    return this.items.length;
  }

  // Продать один предмет
  sellItem(uid) {
    const item = this.removeItem(uid);
    if (item) {
      if (window.soundManager) window.soundManager.playCoin();
      return item.price;
    }
    return 0;
  }

  // Продать все предметы
  sellAll() {
    const total = this.getTotalValue();
    this.items = [];
    if (window.soundManager && total > 0) window.soundManager.playCoin();
    return total;
  }

  // Продать дубликаты
  sellDuplicates() {
    const seen = new Set();
    const toKeep = [];
    let soldTotal = 0;

    for (const item of this.items) {
      if (!seen.has(item.skinId)) {
        seen.add(item.skinId);
        toKeep.push(item);
      } else {
        soldTotal += item.price;
      }
    }

    this.items = toKeep;
    if (window.soundManager && soldTotal > 0) window.soundManager.playCoin();
    return soldTotal;
  }

  // Загрузить из сохраненных данных
  load(itemsArray) {
    if (Array.isArray(itemsArray)) {
      this.items = itemsArray.map(it => {
        const baseSkin = window.SKINS_MAP[it.skinId];
        return {
          uid: it.uid || ('item_' + Math.random().toString(36).substr(2, 9)),
          skinId: it.skinId,
          name: baseSkin ? baseSkin.name : (it.name || 'Скин'),
          weapon: baseSkin ? baseSkin.weapon : (it.weapon || 'Оружие'),
          rarity: baseSkin ? baseSkin.rarity : (it.rarity || 'milspec'),
          price: baseSkin ? baseSkin.price : (it.price || 50),
          image: baseSkin ? baseSkin.image : '',
          obtainedAt: it.obtainedAt || Date.now()
        };
      });
    }
  }

  // Экспорт для сохранения
  export() {
    return this.items.map(it => ({
      uid: it.uid,
      skinId: it.skinId,
      price: it.price,
      obtainedAt: it.obtainedAt
    }));
  }
}

window.inventoryManager = new InventoryManager();
