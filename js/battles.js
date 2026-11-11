/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Полноценный режим КЕЙС БАТЛОВ (PvP / PvBot) в стиле оригинального CS Battle:
 * - Форматы 1v1, 1v1v1, 2v2
 * - Обычный режим (побеждает наибольший суммарный банк)
 * - Сумасшедший режим "Crazy Mode" (побеждает наименьший суммарный банк)
 * - Синхронная пошаговая прокрутка раундов с живым табло
 * - Победитель забирает весь дроп всех участников!
 */

class CaseBattleEngine {
  constructor() {
    this.selectedCases = []; // Массив ID кейсов для раундов: ['case_farm', 'case_drop_battle', ...]
    this.mode = 'normal'; // 'normal' или 'crazy'
    this.playerCount = 2; // 2 (1v1) или 3 (1v1v1)
    this.isPlaying = false;
    this.currentRound = 0;
    this.participants = []; // [{ id, name, isUser, drops: [], totalValue: 0 }]
    this.botNames = [
      's1mple_king', 'm0NESY_sniper', 'ZywOo_god', 'NiKo_deagle',
      'DragonSlayer', 'Biceps_Pump', 'DropMaster', 'LuckyStrike_777',
      'CS_Warrior', 'Phoenix_Risen', 'Shadow_Ninja', 'Viper_Strike'
    ];
  }

  // Добавить кейс в стек батла
  addCase(caseId) {
    if (this.selectedCases.length >= 8) return false; // максимум 8 раундов
    this.selectedCases.push(caseId);
    return true;
  }

  // Удалить кейс по индексу
  removeCase(index) {
    if (index >= 0 && index < this.selectedCases.length) {
      this.selectedCases.splice(index, 1);
      return true;
    }
    return false;
  }

  // Очистить выбранные кейсы
  clearCases() {
    this.selectedCases = [];
  }

  // Общая стоимость участия в батле
  getTotalCost() {
    return this.selectedCases.reduce((sum, cid) => {
      const c = window.CASES_MAP[cid];
      return sum + (c ? c.price : 0);
    }, 0);
  }

  // Начать батл
  startBattle(userCoins, onBattleStart, onRoundUpdate, onBattleEnd) {
    if (this.selectedCases.length === 0) {
      return { success: false, error: 'Выберите хотя бы 1 кейс для батла' };
    }

    const totalCost = this.getTotalCost();
    if (userCoins < totalCost) {
      return { success: false, error: 'Недостаточно 🪙 Дропов для создания батла' };
    }

    this.isPlaying = true;
    this.currentRound = 0;

    // Инициализируем участников
    this.participants = [];

    // Пользователь
    this.participants.push({
      id: 'player_user',
      name: 'Вы (Игрок)',
      isUser: true,
      avatar: '👑',
      drops: [],
      totalValue: 0
    });

    // Боты
    const shuffledBots = [...this.botNames].sort(() => Math.random() - 0.5);
    for (let i = 1; i < this.playerCount; i++) {
      this.participants.push({
        id: `bot_${i}`,
        name: shuffledBots[i - 1] || `Бот #${i}`,
        isUser: false,
        avatar: ['🤖', '⚡', '🔥', '🎯'][i % 4],
        drops: [],
        totalValue: 0
      });
    }

    if (onBattleStart) {
      onBattleStart({
        totalCost,
        roundsCount: this.selectedCases.length,
        participants: this.participants,
        mode: this.mode
      });
    }

    // Запускаем последовательность раундов
    this.runRoundSequence(onRoundUpdate, onBattleEnd);
    return { success: true, cost: totalCost };
  }

  // Пошаговое выполнение каждого раунда батла
  async runRoundSequence(onRoundUpdate, onBattleEnd) {
    const totalRounds = this.selectedCases.length;

    for (let r = 0; r < totalRounds; r++) {
      this.currentRound = r + 1;
      const caseId = this.selectedCases[r];
      const caseData = window.CASES_MAP[caseId];

      if (window.soundManager) {
        window.soundManager.playOpen();
      }

      // Генерируем дроп для каждого участника
      const roundDrops = [];
      this.participants.forEach(p => {
        const drop = window.rollCaseDrop(caseId);
        p.drops.push(drop);
        p.totalValue += drop.price;
        roundDrops.push({
          participantId: p.id,
          drop: drop,
          totalValue: p.totalValue
        });
      });

      // Оповещаем UI об анимации раунда
      if (onRoundUpdate) {
        onRoundUpdate({
          round: this.currentRound,
          totalRounds: totalRounds,
          caseData: caseData,
          roundDrops: roundDrops,
          participants: this.participants
        });
      }

      // Звуковые щелчки
      let ticks = 6;
      for (let t = 0; t < ticks; t++) {
        await new Promise(res => setTimeout(res, 200));
        if (window.soundManager) window.soundManager.playTick();
      }

      // Звук дропа
      if (window.soundManager) {
        const userDrop = this.participants[0].drops[r];
        window.soundManager.playDropWin(userDrop ? userDrop.rarity : 'milspec');
      }

      // Пауза перед следующим раундом для драматизма
      await new Promise(res => setTimeout(res, 1400));
    }

    // Все раунды завершены - определяем победителя
    this.finishBattle(onBattleEnd);
  }

  // Финал батла и распределение лута
  finishBattle(onBattleEnd) {
    this.isPlaying = false;

    let winner = null;
    if (this.mode === 'crazy') {
      // Сумасшедший режим: побеждает наименьшая сумма!
      winner = this.participants.reduce((prev, curr) => (curr.totalValue < prev.totalValue ? curr : prev));
    } else {
      // Обычный режим: побеждает наибольшая сумма
      winner = this.participants.reduce((prev, curr) => (curr.totalValue > prev.totalValue ? curr : prev));
    }

    // Победитель забирает ВСЕ скины всех участников!
    const allLoot = [];
    this.participants.forEach(p => {
      p.drops.forEach(d => allLoot.push(d));
    });

    const totalLootValue = allLoot.reduce((sum, d) => sum + d.price, 0);

    const isUserWinner = winner.isUser;

    if (isUserWinner && window.soundManager) {
      window.soundManager.playBattleVictory();
    } else if (!isUserWinner && window.soundManager) {
      window.soundManager.playDefeat();
    }

    if (onBattleEnd) {
      onBattleEnd({
        winner: winner,
        isUserWinner: isUserWinner,
        allLoot: allLoot,
        totalLootValue: totalLootValue,
        participants: this.participants,
        mode: this.mode
      });
    }
  }
}

window.caseBattleEngine = new CaseBattleEngine();
