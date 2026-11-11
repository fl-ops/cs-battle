/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * Интеграция Yandex Games SDK v2 со всеми требованиями платформы:
 * 1. Инициализация YaGames.init()
 * 2. LoadingAPI.ready()
 * 3. Полноэкранная реклама (Interstitial Adv) с остановкой звука
 * 4. Реклама за вознаграждение (Rewarded Video) с бонусом
 * 5. Сохранение данных в облако Yandex Cloud Save (player.setData / getData)
 * 6. Лидерборды Yandex (рейтинг по стоимости инвентаря и открытым кейсам)
 * 7. Безопасная эмуляция для локальной разработки и отладки
 */

class YandexSDKService {
  constructor() {
    this.ysdk = null;
    this.player = null;
    this.leaderboard = null;
    this.isInitialized = false;
    this.isAuthorized = false;
    this.isAdShowing = false;
    this.lastInterstitialTime = 0;
    this.interstitialCooldown = 60000; // Минимальный кулдаун между авто-рекламами (1 мин)
  }

  // 1. Инициализация SDK
  async init() {
    try {
      if (typeof YaGames !== 'undefined') {
        this.ysdk = await YaGames.init();
        console.log('[Yandex SDK] Успешно инициализирован');

        // Инициализация игрока
        await this.initPlayer();

        // Уведомляем платформу, что игра готова
        this.notifyGameReady();

        this.isInitialized = true;
        return true;
      } else {
        console.warn('[Yandex SDK] YaGames не найден, включен локальный режим разработчика');
        this.isInitialized = false;
        return false;
      }
    } catch (e) {
      console.error('[Yandex SDK] Ошибка инициализации:', e);
      this.isInitialized = false;
      return false;
    }
  }

  // Оповещение платформы о загрузке
  notifyGameReady() {
    if (this.ysdk && this.ysdk.features && this.ysdk.features.LoadingAPI) {
      try {
        this.ysdk.features.LoadingAPI.ready();
        console.log('[Yandex SDK] LoadingAPI.ready() вызван');
      } catch (e) {
        console.warn('[Yandex SDK] Ошибка вызова LoadingAPI.ready():', e);
      }
    }
  }

  // Инициализация профиля игрока Yandex
  async initPlayer() {
    if (!this.ysdk) return null;
    try {
      this.player = await this.ysdk.getPlayer({ scopes: false });
      this.isAuthorized = this.player.getMode() !== 'lite';
      console.log('[Yandex SDK] Игрок получен, статус авторизации:', this.isAuthorized);
      return this.player;
    } catch (e) {
      console.warn('[Yandex SDK] Не удалось инициализировать игрока:', e);
      return null;
    }
  }

  // Сохранение данных (Cloud Save + LocalStorage fallback)
  async saveData(data) {
    const jsonStr = JSON.stringify(data);
    try {
      localStorage.setItem('drop_drop_savedata', jsonStr);
    } catch (e) {}

    if (this.player) {
      try {
        await this.player.setData({
          gameData: jsonStr,
          timestamp: Date.now()
        }, true);
        console.log('[Yandex SDK] Данные успешно сохранены в Yandex Cloud Save');
      } catch (e) {
        console.warn('[Yandex SDK] Ошибка сохранения в облако:', e);
      }
    }
  }

  // Загрузка сохраненных данных
  async loadData() {
    let cloudData = null;
    if (this.player) {
      try {
        const res = await this.player.getData(['gameData', 'timestamp']);
        if (res && res.gameData) {
          cloudData = JSON.parse(res.gameData);
        }
      } catch (e) {
        console.warn('[Yandex SDK] Ошибка чтения из облака:', e);
      }
    }

    // Читаем из localStorage
    let localData = null;
    try {
      const localStr = localStorage.getItem('drop_drop_savedata');
      if (localStr) {
        localData = JSON.parse(localStr);
      }
    } catch (e) {}

    // Возвращаем облачные данные или локальные
    return cloudData || localData;
  }

  // Полноэкранная реклама (Interstitial)
  showInterstitial(onCloseCallback) {
    const now = Date.now();
    if (now - this.lastInterstitialTime < this.interstitialCooldown) {
      if (onCloseCallback) onCloseCallback(false);
      return;
    }

    if (!this.ysdk || !this.ysdk.adv) {
      console.log('[Yandex SDK] Локальный режим: Полноэкранная реклама пропущена');
      if (onCloseCallback) onCloseCallback(false);
      return;
    }

    this.isAdShowing = true;
    if (window.soundManager) {
      window.soundManager.setMuted(true);
    }

    this.ysdk.adv.showFullscreenAdv({
      callbacks: {
        onOpen: () => {
          console.log('[Yandex SDK] Interstitial ad opened');
          this.isAdShowing = true;
        },
        onClose: (wasShown) => {
          console.log('[Yandex SDK] Interstitial ad closed, wasShown:', wasShown);
          this.isAdShowing = false;
          this.lastInterstitialTime = Date.now();
          if (window.soundManager && !window.soundManager.userMuted) {
            window.soundManager.setMuted(false);
          }
          if (onCloseCallback) onCloseCallback(wasShown);
        },
        onError: (error) => {
          console.warn('[Yandex SDK] Interstitial ad error:', error);
          this.isAdShowing = false;
          if (window.soundManager && !window.soundManager.userMuted) {
            window.soundManager.setMuted(false);
          }
          if (onCloseCallback) onCloseCallback(false);
        }
      }
    });
  }

  // Видеореклама за вознаграждение (Rewarded Video)
  showRewarded(onRewardedCallback, onDismissCallback, onErrorCallback) {
    if (this.isAdShowing) {
      console.warn('[Yandex SDK] Реклама уже отображается или ожидает ответа');
      return;
    }

    if (!this.ysdk || !this.ysdk.adv) {
      console.log('[Yandex SDK] Демо-режим (без YaGames SDK): Награда выдана для тестирования');
      if (onRewardedCallback) onRewardedCallback(true);
      return;
    }

    this.isAdShowing = true;
    if (window.soundManager) {
      window.soundManager.setMuted(true);
    }

    let rewarded = false;

    this.ysdk.adv.showRewardedVideo({
      callbacks: {
        onOpen: () => {
          console.log('[Yandex SDK] Rewarded ad opened');
        },
        onRewarded: () => {
          console.log('[Yandex SDK] Rewarded ad watched completely');
          rewarded = true;
        },
        onClose: () => {
          console.log('[Yandex SDK] Rewarded ad closed, status rewarded =', rewarded);
          this.isAdShowing = false;
          if (window.soundManager && !window.soundManager.userMuted) {
            window.soundManager.setMuted(false);
          }
          if (rewarded) {
            if (onRewardedCallback) onRewardedCallback(false);
          } else {
            if (onDismissCallback) onDismissCallback();
          }
        },
        onError: (err) => {
          console.warn('[Yandex SDK] Rewarded ad error:', err);
          this.isAdShowing = false;
          if (window.soundManager && !window.soundManager.userMuted) {
            window.soundManager.setMuted(false);
          }
          if (onErrorCallback) {
            onErrorCallback(err);
          } else if (onDismissCallback) {
            onDismissCallback(err);
          }
        }
      }
    });
  }

  // Обновление очков в таблице лидеров
  async updateLeaderboard(score) {
    if (!this.ysdk) return;
    try {
      const lb = await this.ysdk.getLeaderboards();
      await lb.setLeaderboardScore('top_drop_rich', Math.floor(score));
      console.log('[Yandex SDK] Лидерборд обновлен:', score);
    } catch (e) {
      console.warn('[Yandex SDK] Ошибка обновления таблицы лидеров:', e);
    }
  }

  // Проверка возможности оценить игру
  async requestReview() {
    if (this.ysdk && this.ysdk.feedback) {
      try {
        const canReview = await this.ysdk.feedback.canReview();
        if (canReview.value) {
          await this.ysdk.feedback.requestReview();
        }
      } catch (e) {
        console.warn('[Yandex SDK] Ошибка запроса отзыва:', e);
      }
    }
  }
}

window.yandexSDK = new YandexSDKService();
