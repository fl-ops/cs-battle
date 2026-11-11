/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * База данных всех кейсов в стиле CS Battle с реальными 3D-моделями кейсов
 */

// Вспомогательный генератор SVG иконок кейсов для резервного отображения
function createCaseSvg(mainColor, accentColor, iconSymbol = 'BOX') {
  let innerArt = '';
  if (iconSymbol === 'KNIFE') {
    innerArt = `<path d="M45 65 L75 35 L85 45 L55 75 Z" fill="${accentColor}"/><path d="M75 35 L95 15 L105 25 L85 45 Z" fill="#ffffff"/>`;
  } else if (iconSymbol === 'AWP') {
    innerArt = `<path d="M25 60 L115 40 L115 45 L50 62 Z" fill="${accentColor}"/><circle cx="70" cy="45" r="5" fill="#fff"/>`;
  } else if (iconSymbol === 'DRAGON') {
    innerArt = `<path d="M50 70 Q70 30 90 60 T110 40" stroke="${accentColor}" stroke-width="6" fill="none"/><circle cx="95" cy="45" r="4" fill="#ff0"/>`;
  } else if (iconSymbol === '5050') {
    innerArt = `<text x="70" y="62" font-size="28" font-weight="900" fill="${accentColor}" text-anchor="middle" font-family="sans-serif">50/50</text>`;
  } else if (iconSymbol === 'SKULL') {
    innerArt = `<circle cx="70" cy="50" r="16" fill="${accentColor}"/><circle cx="64" cy="48" r="4" fill="#111"/><circle cx="76" cy="48" r="4" fill="#111"/><rect x="66" y="60" width="8" height="6" fill="${accentColor}"/>`;
  } else {
    innerArt = `<rect x="55" y="45" width="30" height="24" rx="4" fill="${accentColor}"/><path d="M62 45 V36 A8 8 0 0 1 78 36 V45" fill="none" stroke="${accentColor}" stroke-width="3"/>`;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
      <defs>
        <linearGradient id="caseGrad_${mainColor.replace('#','')}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${mainColor}" />
          <stop offset="100%" stop-color="#0e121a" />
        </linearGradient>
      </defs>
      <path d="M20 35 L70 15 L120 35 L120 85 L70 105 L20 85 Z" fill="url(#caseGrad_${mainColor.replace('#','')})" stroke="${accentColor}" stroke-width="2.5"/>
      <line x1="70" y1="15" x2="70" y2="105" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
      <line x1="20" y1="35" x2="70" y2="55" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
      <line x1="120" y1="35" x2="70" y2="55" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
      ${innerArt}
    </svg>
  `.trim();

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// 15 ключевых кейсов, вдохновленных CS Battle
window.ALL_CASES = [
  // 1. Бесплатный ежедневный
  {
    id: 'case_free_daily',
    name: 'Ежедневный Дроп',
    subname: 'Бесплатный кейс каждые 24ч',
    price: 0,
    category: 'budget',
    badge: 'FREE',
    image: 'assets/cases/case_free_daily.png',
    drops: [
      { skinId: 'skin_berettas_colony', weight: 400 },
      { skinId: 'skin_p90_storm', weight: 300 },
      { skinId: 'skin_nova_polar_mesh', weight: 200 },
      { skinId: 'skin_p250_sandstorm', weight: 100 },
      { skinId: 'skin_glock_clear_polymer', weight: 40 },
      { skinId: 'skin_ak47_uncharted', weight: 20 },
      { skinId: 'skin_ak47_slate', weight: 5 },
      { skinId: 'skin_ak47_redline', weight: 1 },
      { skinId: 'skin_bf_doppler', weight: 0.05 } // Мега удача!
    ]
  },

  // 2. Армейский кейс
  {
    id: 'case_army',
    name: 'Армейский Боевой',
    subname: 'Бюджетный старт',
    price: 39,
    category: 'budget',
    image: 'assets/cases/case_army.png',
    drops: [
      { skinId: 'skin_berettas_colony', weight: 350 },
      { skinId: 'skin_nova_polar_mesh', weight: 250 },
      { skinId: 'skin_ssg08_blue_spruce', weight: 180 },
      { skinId: 'skin_mp9_sand_scale', weight: 120 },
      { skinId: 'skin_p250_sandstorm', weight: 70 },
      { skinId: 'skin_glock_high_beam', weight: 40 },
      { skinId: 'skin_glock_clear_polymer', weight: 25 },
      { skinId: 'skin_m4a4_magnesium', weight: 15 },
      { skinId: 'skin_ak47_uncharted', weight: 10 },
      { skinId: 'skin_ak47_slate', weight: 2 }
    ]
  },

  // 3. Кейс Фармилка
  {
    id: 'case_farm',
    name: 'Кейс Фармилка',
    subname: 'Высокий шанс окупа',
    price: 139,
    category: 'popular',
    badge: 'HOT',
    image: 'assets/cases/case_farm.png',
    drops: [
      { skinId: 'skin_glock_clear_polymer', weight: 260 },
      { skinId: 'skin_m4a4_magnesium', weight: 220 },
      { skinId: 'skin_ak47_uncharted', weight: 180 },
      { skinId: 'skin_deagle_oxide_blaze', weight: 130 },
      { skinId: 'skin_usps_torque', weight: 90 },
      { skinId: 'skin_m4a1s_night_terror', weight: 70 },
      { skinId: 'skin_awp_worm_god', weight: 50 },
      { skinId: 'skin_m4a1s_nightmare', weight: 30 },
      { skinId: 'skin_ak47_slate', weight: 15 },
      { skinId: 'skin_ak47_redline', weight: 5 },
      { skinId: 'skin_ak47_vulcan', weight: 0.5 }
    ]
  },

  // 4. Запрещенный кейс
  {
    id: 'case_restricted',
    name: 'Запретный Арсенал',
    subname: 'Фиолетовые скины и выше',
    price: 249,
    category: 'popular',
    image: 'assets/cases/case_restricted.png',
    drops: [
      { skinId: 'skin_m4a4_magnesium', weight: 180 },
      { skinId: 'skin_m4a1s_night_terror', weight: 160 },
      { skinId: 'skin_awp_worm_god', weight: 140 },
      { skinId: 'skin_m4a1s_nightmare', weight: 150 },
      { skinId: 'skin_m4a4_tooth_fairy', weight: 130 },
      { skinId: 'skin_ak47_slate', weight: 110 },
      { skinId: 'skin_ak47_phantom', weight: 80 },
      { skinId: 'skin_awp_atheris', weight: 60 },
      { skinId: 'skin_deagle_mecha', weight: 40 },
      { skinId: 'skin_glock_water_elemental', weight: 30 },
      { skinId: 'skin_usps_monster', weight: 20 },
      { skinId: 'skin_deagle_ocean_drive', weight: 10 },
      { skinId: 'skin_ak47_bloodsport', weight: 1 }
    ]
  },

  // 5. Засекреченный кейс
  {
    id: 'case_classified',
    name: 'Засекреченный Сейф',
    subname: 'Розовые легенды',
    price: 699,
    category: 'popular',
    image: 'assets/cases/case_classified.png',
    drops: [
      { skinId: 'skin_awp_pit_viper', weight: 260 },
      { skinId: 'skin_glock_royal_legion', weight: 220 },
      { skinId: 'skin_p250_wingshot', weight: 200 },
      { skinId: 'skin_m4a1s_nightmare', weight: 180 },
      { skinId: 'skin_m4a4_tooth_fairy', weight: 160 },
      { skinId: 'skin_ak47_slate', weight: 140 },
      { skinId: 'skin_awp_atheris', weight: 110 },
      { skinId: 'skin_deagle_ocean_drive', weight: 80 },
      { skinId: 'skin_awp_corticera', weight: 65 },
      { skinId: 'skin_m4a4_desolate_space', weight: 50 },
      { skinId: 'skin_ak47_redline', weight: 35 },
      { skinId: 'skin_ak47_frontside_misty', weight: 25 },
      { skinId: 'skin_usps_neo_noir', weight: 15 },
      { skinId: 'skin_glock_bullet_queen', weight: 10 },
      { skinId: 'skin_m4a1s_hyperbeast', weight: 6 },
      { skinId: 'skin_awp_hyperbeast', weight: 3 },
      { skinId: 'skin_awp_asiimov', weight: 1 }
    ]
  },

  // 6. Тайный Дроп
  {
    id: 'case_covert',
    name: 'Тайный Дроп',
    subname: 'Только элитное красное оружие',
    price: 1890,
    category: 'exclusive',
    badge: 'COVERT',
    image: 'assets/cases/case_covert.png',
    drops: [
      { skinId: 'skin_m4a4_spider_lily', weight: 260 },
      { skinId: 'skin_awp_fever_dream', weight: 230 },
      { skinId: 'skin_mac10_neon_rider', weight: 200 },
      { skinId: 'skin_usps_blueprint', weight: 170 },
      { skinId: 'skin_five_seven_angry_mob', weight: 140 },
      { skinId: 'skin_mp9_starlight', weight: 110 },
      { skinId: 'skin_awp_corticera', weight: 90 },
      { skinId: 'skin_ak47_redline', weight: 75 },
      { skinId: 'skin_m4a1s_hyperbeast', weight: 60 },
      { skinId: 'skin_awp_hyperbeast', weight: 45 },
      { skinId: 'skin_deagle_printstream', weight: 30 },
      { skinId: 'skin_awp_wildfire', weight: 20 },
      { skinId: 'skin_deagle_code_red', weight: 15 },
      { skinId: 'skin_awp_neo_noir', weight: 10 },
      { skinId: 'skin_m4a4_emperor', weight: 6 },
      { skinId: 'skin_ak47_empress', weight: 4 },
      { skinId: 'skin_ak47_bloodsport', weight: 2 },
      { skinId: 'skin_awp_asiimov', weight: 1 },
      { skinId: 'skin_ak47_fire_serpent', weight: 0.2 }
    ]
  },

  // 7. Штурмовой AK-47
  {
    id: 'case_ak47',
    name: 'Калашников Арсенал',
    subname: 'Только скины на АК-47',
    price: 649,
    category: 'weapons',
    image: 'assets/cases/case_ak47.png',
    drops: [
      { skinId: 'skin_ak47_uncharted', weight: 350 },
      { skinId: 'skin_ak47_slate', weight: 250 },
      { skinId: 'skin_ak47_phantom', weight: 180 },
      { skinId: 'skin_ak47_redline', weight: 90 },
      { skinId: 'skin_ak47_frontside_misty', weight: 70 },
      { skinId: 'skin_ak47_empress', weight: 30 },
      { skinId: 'skin_ak47_bloodsport', weight: 20 },
      { skinId: 'skin_ak47_vulcan', weight: 8 },
      { skinId: 'skin_ak47_fire_serpent', weight: 2 },
      { skinId: 'skin_ak47_wild_lotus', weight: 0.2 } // Топовый джекпот
    ]
  },

  // 8. Снайперский AWP
  {
    id: 'case_awp',
    name: 'Снайперская Элита',
    subname: 'Только винтовки AWP',
    price: 890,
    category: 'weapons',
    image: 'assets/cases/case_awp.png',
    drops: [
      { skinId: 'skin_awp_worm_god', weight: 320 },
      { skinId: 'skin_awp_atheris', weight: 260 },
      { skinId: 'skin_awp_corticera', weight: 160 },
      { skinId: 'skin_awp_hyperbeast', weight: 90 },
      { skinId: 'skin_awp_wildfire', weight: 70 },
      { skinId: 'skin_awp_neo_noir', weight: 50 },
      { skinId: 'skin_awp_asiimov', weight: 30 },
      { skinId: 'skin_awp_lightning', weight: 12 },
      { skinId: 'skin_awp_dragon_lore', weight: 0.6 },
      { skinId: 'skin_awp_gungnir', weight: 0.4 }
    ]
  },

  // 9. Пистолетный Раш
  {
    id: 'case_pistols',
    name: 'Пистолетный Раш',
    subname: 'Deagle, USP-S и Glock',
    price: 490,
    category: 'weapons',
    image: 'assets/cases/case_pistols.png',
    drops: [
      { skinId: 'skin_glock_clear_polymer', weight: 250 },
      { skinId: 'skin_glock_off_world', weight: 220 },
      { skinId: 'skin_deagle_oxide_blaze', weight: 180 },
      { skinId: 'skin_usps_torque', weight: 140 },
      { skinId: 'skin_deagle_mecha', weight: 90 },
      { skinId: 'skin_glock_water_elemental', weight: 80 },
      { skinId: 'skin_usps_monster', weight: 60 },
      { skinId: 'skin_deagle_ocean_drive', weight: 40 },
      { skinId: 'skin_usps_neo_noir', weight: 25 },
      { skinId: 'skin_glock_bullet_queen', weight: 20 },
      { skinId: 'skin_deagle_printstream', weight: 15 },
      { skinId: 'skin_deagle_code_red', weight: 10 },
      { skinId: 'skin_usps_kill_confirmed', weight: 5 },
      { skinId: 'skin_deagle_blaze', weight: 2 },
      { skinId: 'skin_glock_fade', weight: 0.8 }
    ]
  },

  // 10. Винтовочный М4
  {
    id: 'case_m4',
    name: 'Винтовки M4A4 & M4A1',
    subname: 'Эмки всех мастей',
    price: 749,
    category: 'weapons',
    image: 'assets/cases/case_m4.png',
    drops: [
      { skinId: 'skin_m4a4_magnesium', weight: 320 },
      { skinId: 'skin_m4a1s_night_terror', weight: 260 },
      { skinId: 'skin_m4a1s_nightmare', weight: 180 },
      { skinId: 'skin_m4a4_tooth_fairy', weight: 130 },
      { skinId: 'skin_m4a4_desolate_space', weight: 70 },
      { skinId: 'skin_m4a1s_hyperbeast', weight: 50 },
      { skinId: 'skin_m4a4_emperor', weight: 20 },
      { skinId: 'skin_m4a1s_printstream', weight: 10 },
      { skinId: 'skin_m4a1s_jungle', weight: 2 },
      { skinId: 'skin_m4a4_howl', weight: 0.3 }
    ]
  },

  // 11. Кейс 50 / 50
  {
    id: 'case_5050',
    name: 'Кейс 50 / 50',
    subname: 'Пан или пропал! Удвой или потеряй',
    price: 777,
    category: 'popular',
    badge: '50/50',
    image: 'assets/cases/case_5050.png',
    drops: [
      // 50% плохой дроп
      { skinId: 'skin_berettas_colony', weight: 150 },
      { skinId: 'skin_nova_polar_mesh', weight: 150 },
      { skinId: 'skin_ssg08_blue_spruce', weight: 120 },
      { skinId: 'skin_p250_sandstorm', weight: 80 },
      // 50% супер окуп
      { skinId: 'skin_ak47_redline', weight: 200 },
      { skinId: 'skin_m4a1s_hyperbeast', weight: 130 },
      { skinId: 'skin_deagle_printstream', weight: 80 },
      { skinId: 'skin_awp_asiimov', weight: 50 },
      { skinId: 'skin_usps_kill_confirmed', weight: 25 },
      { skinId: 'skin_ak47_vulcan', weight: 12 },
      { skinId: 'skin_bf_doppler', weight: 3 }
    ]
  },

  // 12. ДРОП БАТЛ фирменный кейс
  {
    id: 'case_drop_battle',
    name: 'ДРОП БАТЛ',
    subname: 'Фирменный кейс для турниров и дуэлей',
    price: 999,
    category: 'popular',
    badge: 'BATTLE',
    image: 'assets/cases/case_drop_battle.png',
    drops: [
      { skinId: 'skin_m4a1s_nightmare', weight: 220 },
      { skinId: 'skin_ak47_slate', weight: 190 },
      { skinId: 'skin_deagle_mecha', weight: 160 },
      { skinId: 'skin_awp_atheris', weight: 130 },
      { skinId: 'skin_ak47_redline', weight: 100 },
      { skinId: 'skin_m4a4_desolate_space', weight: 80 },
      { skinId: 'skin_usps_neo_noir', weight: 55 },
      { skinId: 'skin_awp_hyperbeast', weight: 35 },
      { skinId: 'skin_ak47_bloodsport', weight: 15 },
      { skinId: 'skin_awp_asiimov', weight: 10 },
      { skinId: 'skin_ak47_vulcan', weight: 5 },
      { skinId: 'skin_bf_vanilla', weight: 1.5 },
      { skinId: 'skin_kara_fade', weight: 0.5 }
    ]
  },

  // 13. Ножевой Батл
  {
    id: 'case_knife',
    name: 'Ножевой Батл',
    subname: 'Гарантированный нож в каждом открытии!',
    price: 64900,
    category: 'knives',
    badge: 'KNIFE',
    image: 'assets/cases/case_knife.png',
    drops: [
      { skinId: 'skin_gut_doppler', weight: 320 },
      { skinId: 'skin_ursus_tiger', weight: 260 },
      { skinId: 'skin_bowie_marble', weight: 200 },
      { skinId: 'skin_huntsman_doppler', weight: 150 },
      { skinId: 'skin_bf_vanilla', weight: 100 },
      { skinId: 'skin_m9_lore', weight: 65 },
      { skinId: 'skin_kara_lore', weight: 45 },
      { skinId: 'skin_m9_marble', weight: 30 },
      { skinId: 'skin_bf_crimson', weight: 20 },
      { skinId: 'skin_kara_fade', weight: 12 },
      { skinId: 'skin_bf_doppler', weight: 8 },
      { skinId: 'skin_kara_emerald', weight: 2 }
    ]
  },

  // 14. Перчаточный Рай
  {
    id: 'case_gloves',
    name: 'Перчаточный Рай',
    subname: 'Только легендарные перчатки',
    price: 68900,
    category: 'knives',
    badge: 'GLOVES',
    image: 'assets/cases/case_gloves.png',
    drops: [
      { skinId: 'skin_gloves_racing_green', weight: 350 },
      { skinId: 'skin_gloves_buckshot', weight: 280 },
      { skinId: 'skin_gloves_leather', weight: 220 },
      { skinId: 'skin_gloves_needle_point', weight: 160 },
      { skinId: 'skin_gloves_snow', weight: 100 },
      { skinId: 'skin_gloves_cobalt', weight: 60 },
      { skinId: 'skin_gloves_fade', weight: 40 },
      { skinId: 'skin_gloves_vice', weight: 15 },
      { skinId: 'skin_gloves_pandora', weight: 5 }
    ]
  },

  // 15. Драконье Логово (Супер Кейс)
  {
    id: 'case_dragon_grail',
    name: 'Драконье Логово',
    subname: 'Главные сокровища CS: Dragon Lore, Howl, Gungnir',
    price: 119000,
    category: 'exclusive',
    badge: 'GRAIL',
    image: 'assets/cases/case_dragon_grail.png',
    drops: [
      { skinId: 'skin_ak47_fire_serpent', weight: 450 },
      { skinId: 'skin_glock_fade', weight: 300 },
      { skinId: 'skin_m4a1s_jungle', weight: 150 },
      { skinId: 'skin_ak47_wild_lotus', weight: 50 },
      { skinId: 'skin_m4a4_howl', weight: 30 },
      { skinId: 'skin_awp_dragon_lore', weight: 15 },
      { skinId: 'skin_awp_gungnir', weight: 10 }
    ]
  }
];

// Быстрый поиск кейса по ID
window.CASES_MAP = {};
window.ALL_CASES.forEach(c => {
  window.CASES_MAP[c.id] = c;
});

/**
 * Логика выбивания скина из кейса с учетом весов
 */
window.rollCaseDrop = function(caseId) {
  const c = window.CASES_MAP[caseId];
  if (!c || !c.drops || c.drops.length === 0) {
    return window.ALL_SKINS[0];
  }

  // Суммируем вес
  let totalWeight = 0;
  for (let i = 0; i < c.drops.length; i++) {
    totalWeight += c.drops[i].weight;
  }

  // Случайное число от 0 до totalWeight
  const rand = Math.random() * totalWeight;
  let running = 0;

  for (let i = 0; i < c.drops.length; i++) {
    running += c.drops[i].weight;
    if (rand <= running) {
      const dropObj = c.drops[i];
      return window.SKINS_MAP[dropObj.skinId] || window.ALL_SKINS[0];
    }
  }

  return window.SKINS_MAP[c.drops[c.drops.length - 1].skinId] || window.ALL_SKINS[0];
};
