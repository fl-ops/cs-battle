/**
 * ДРОП ДРОП (Drop Drop) - CS Battle Web Edition
 * База данных всех настоящих скинов Counter-Strike (208 скинов)
 * Цены указаны в валюте «Дропы» (🪙)
 */

window.SKINS_RARITY = {
  consumer: { name: 'Ширпотреб', color: '#b0c3d9', bg: 'linear-gradient(135deg, #2b303c, #1f232d)', border: '#5a6275', order: 1 },
  industrial: { name: 'Промышленное', color: '#5e98d9', bg: 'linear-gradient(135deg, #1b314d, #142133)', border: '#3b6ea8', order: 2 },
  milspec: { name: 'Армейское', color: '#4b69ff', bg: 'linear-gradient(135deg, #192a6b, #10193d)', border: '#4b69ff', order: 3 },
  restricted: { name: 'Запрещенное', color: '#8847ff', bg: 'linear-gradient(135deg, #371966, #200f3b)', border: '#8847ff', order: 4 },
  classified: { name: 'Засекреченное', color: '#d32ce6', bg: 'linear-gradient(135deg, #5b1363, #330b38)', border: '#d32ce6', order: 5 },
  covert: { name: 'Тайное', color: '#eb4b4b', bg: 'linear-gradient(135deg, #661919, #380e0e)', border: '#eb4b4b', order: 6 },
  extraordinary: { name: 'Экстраординарное', color: '#ffd700', bg: 'linear-gradient(135deg, #66500f, #3d3007)', border: '#ffd700', order: 7 }
};

// Вспомогательный генератор SVG для резервного отображения при сбоях
function createWeaponSvg(weaponType, primaryColor, accentColor, patternType = 'standard') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="100%" height="100%">
      <rect width="100%" height="100%" rx="8" fill="#151922"/>
      <text x="100" y="55" fill="${accentColor || '#ffffff'}" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif">${weaponType}</text>
    </svg>
  `.trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

window.ALL_SKINS = [
  // =================== EXTRAORDINARY (ЗОЛОТО: НОЖИ И ПЕРЧАТКИ) ===================
  {
    id: 'skin_kara_emerald',
    name: 'Керамбит | Гамма-волны Изумруд',
    nameEn: 'Karambit | Gamma Doppler Emerald',
    category: 'Ножи',
    weapon: 'Керамбит',
    rarity: 'extraordinary',
    price: 430000,
    image: 'assets/skins/skin_kara_emerald.png'
  },
  {
    id: 'skin_gloves_pandora',
    name: 'Спортивные перчатки | Ящик Пандоры',
    nameEn: "Sport Gloves | Pandora's Box",
    category: 'Перчатки',
    weapon: 'Спортивные перчатки',
    rarity: 'extraordinary',
    price: 360000,
    image: 'assets/skins/skin_gloves_pandora.png'
  },
  {
    id: 'skin_gloves_kimono',
    name: 'Перчатки спецназа | Кровавое кимоно',
    nameEn: 'Specialist Gloves | Crimson Kimono',
    category: 'Перчатки',
    weapon: 'Перчатки спецназа',
    rarity: 'extraordinary',
    price: 280000,
    image: 'assets/skins/skin_gloves_kimono.png'
  },
  {
    id: 'skin_gloves_spearmint',
    name: 'Мотоциклетные перчатки | Мята',
    nameEn: 'Moto Gloves | Spearmint',
    category: 'Перчатки',
    weapon: 'Мотоциклетные перчатки',
    rarity: 'extraordinary',
    price: 260000,
    image: 'assets/skins/skin_gloves_spearmint.png'
  },
  {
    id: 'skin_bf_fade',
    name: 'Нож-бабочка | Градиент',
    nameEn: 'Butterfly Knife | Fade',
    category: 'Ножи',
    weapon: 'Нож-бабочка',
    rarity: 'extraordinary',
    price: 240000,
    image: 'assets/skins/skin_bf_fade.png'
  },
  {
    id: 'skin_gloves_hedge_maze',
    name: 'Спортивные перчатки | Живая изгородь',
    nameEn: 'Sport Gloves | Hedge Maze',
    category: 'Перчатки',
    weapon: 'Спортивные перчатки',
    rarity: 'extraordinary',
    price: 230000,
    image: 'assets/skins/skin_gloves_hedge_maze.png'
  },
  {
    id: 'skin_gloves_vice',
    name: 'Спортивные перчатки | Порок',
    nameEn: 'Sport Gloves | Vice',
    category: 'Перчатки',
    weapon: 'Спортивные перчатки',
    rarity: 'extraordinary',
    price: 210000,
    image: 'assets/skins/skin_gloves_vice.png'
  },
  {
    id: 'skin_skeleton_fade',
    name: 'Скелетный нож | Градиент',
    nameEn: 'Skeleton Knife | Fade',
    category: 'Ножи',
    weapon: 'Скелетный нож',
    rarity: 'extraordinary',
    price: 195000,
    image: 'assets/skins/skin_skeleton_fade.png'
  },
  {
    id: 'skin_gloves_amphibious',
    name: 'Спортивные перчатки | Амфибия',
    nameEn: 'Sport Gloves | Amphibious',
    category: 'Перчатки',
    weapon: 'Спортивные перчатки',
    rarity: 'extraordinary',
    price: 190000,
    image: 'assets/skins/skin_gloves_amphibious.png'
  },
  {
    id: 'skin_bf_doppler',
    name: 'Нож-бабочка | Волны',
    nameEn: 'Butterfly Knife | Doppler',
    category: 'Ножи',
    weapon: 'Нож-бабочка',
    rarity: 'extraordinary',
    price: 185000,
    image: 'assets/skins/skin_bf_doppler.png'
  },
  {
    id: 'skin_kara_fade',
    name: 'Керамбит | Градиент',
    nameEn: 'Karambit | Fade',
    category: 'Ножи',
    weapon: 'Керамбит',
    rarity: 'extraordinary',
    price: 165000,
    image: 'assets/skins/skin_kara_fade.png'
  },
  {
    id: 'skin_m9_doppler',
    name: 'M9 Штык-нож | Волны',
    nameEn: 'M9 Bayonet | Doppler',
    category: 'Ножи',
    weapon: 'M9 Штык-нож',
    rarity: 'extraordinary',
    price: 145000,
    image: 'assets/skins/skin_m9_doppler.png'
  },
  {
    id: 'skin_bf_crimson',
    name: 'Нож-бабочка | Кровавая паутина',
    nameEn: 'Butterfly Knife | Crimson Web',
    category: 'Ножи',
    weapon: 'Нож-бабочка',
    rarity: 'extraordinary',
    price: 140000,
    image: 'assets/skins/skin_bf_crimson.png'
  },
  {
    id: 'skin_gloves_king_snake',
    name: 'Водительские перчатки | Королевская змея',
    nameEn: 'Driver Gloves | King Snake',
    category: 'Перчатки',
    weapon: 'Водительские перчатки',
    rarity: 'extraordinary',
    price: 140000,
    image: 'assets/skins/skin_gloves_king_snake.png'
  },
  {
    id: 'skin_talon_marble',
    name: 'Коготь | Мраморный градиент',
    nameEn: 'Talon Knife | Marble Fade',
    category: 'Ножи',
    weapon: 'Коготь',
    rarity: 'extraordinary',
    price: 135000,
    image: 'assets/skins/skin_talon_marble.png'
  },
  {
    id: 'skin_bf_slaughter',
    name: 'Нож-бабочка | Убийство',
    nameEn: 'Butterfly Knife | Slaughter',
    category: 'Ножи',
    weapon: 'Нож-бабочка',
    rarity: 'extraordinary',
    price: 130000,
    image: 'assets/skins/skin_bf_slaughter.png'
  },
  {
    id: 'skin_m9_marble',
    name: 'M9 Штык-нож | Мраморный градиент',
    nameEn: 'M9 Bayonet | Marble Fade',
    category: 'Ножи',
    weapon: 'M9 Штык-нож',
    rarity: 'extraordinary',
    price: 125000,
    image: 'assets/skins/skin_m9_marble.png'
  },
  {
    id: 'skin_kara_tiger',
    name: 'Керамбит | Зуб тигра',
    nameEn: 'Karambit | Tiger Tooth',
    category: 'Ножи',
    weapon: 'Керамбит',
    rarity: 'extraordinary',
    price: 115000,
    image: 'assets/skins/skin_kara_tiger.png'
  },
  {
    id: 'skin_kara_autotronic',
    name: 'Керамбит | Автотроника',
    nameEn: 'Karambit | Autotronic',
    category: 'Ножи',
    weapon: 'Керамбит',
    rarity: 'extraordinary',
    price: 98000,
    image: 'assets/skins/skin_kara_autotronic.png'
  },
  {
    id: 'skin_kara_lore',
    name: 'Керамбит | Легенды',
    nameEn: 'Karambit | Lore',
    category: 'Ножи',
    weapon: 'Керамбит',
    rarity: 'extraordinary',
    price: 95000,
    image: 'assets/skins/skin_kara_lore.png'
  },
  {
    id: 'skin_gloves_fade',
    name: 'Перчатки спецназа | Градиент',
    nameEn: 'Specialist Gloves | Fade',
    category: 'Перчатки',
    weapon: 'Перчатки спецназа',
    rarity: 'extraordinary',
    price: 95000,
    image: 'assets/skins/skin_gloves_fade.png'
  },
  {
    id: 'skin_m9_lore',
    name: 'M9 Штык-нож | Легенды',
    nameEn: 'M9 Bayonet | Lore',
    category: 'Ножи',
    weapon: 'M9 Штык-нож',
    rarity: 'extraordinary',
    price: 88000,
    image: 'assets/skins/skin_m9_lore.png'
  },
  {
    id: 'skin_gloves_cobalt',
    name: 'Обмотки рук | Синие черепа',
    nameEn: 'Hand Wraps | Cobalt Skulls',
    category: 'Перчатки',
    weapon: 'Обмотки рук',
    rarity: 'extraordinary',
    price: 88000,
    image: 'assets/skins/skin_gloves_cobalt.png'
  },
  {
    id: 'skin_nomad_slaughter',
    name: 'Нож «Бродяга» | Убийство',
    nameEn: 'Nomad Knife | Slaughter',
    category: 'Ножи',
    weapon: 'Нож «Бродяга»',
    rarity: 'extraordinary',
    price: 85000,
    image: 'assets/skins/skin_nomad_slaughter.png'
  },
  {
    id: 'skin_classic_fade',
    name: 'Классический нож | Градиент',
    nameEn: 'Classic Knife | Fade',
    category: 'Ножи',
    weapon: 'Классический нож',
    rarity: 'extraordinary',
    price: 82000,
    image: 'assets/skins/skin_classic_fade.png'
  },
  {
    id: 'skin_bf_vanilla',
    name: 'Нож-бабочка | Обычный',
    nameEn: 'Butterfly Knife',
    category: 'Ножи',
    weapon: 'Нож-бабочка',
    rarity: 'extraordinary',
    price: 78000,
    image: 'assets/skins/skin_bf_vanilla.png'
  },
  {
    id: 'skin_stiletto_fade',
    name: 'Стилет | Градиент',
    nameEn: 'Stiletto Knife | Fade',
    category: 'Ножи',
    weapon: 'Стилет',
    rarity: 'extraordinary',
    price: 75000,
    image: 'assets/skins/skin_stiletto_fade.png'
  },
  {
    id: 'skin_gloves_snow',
    name: 'Водительские перчатки | Снежный барс',
    nameEn: 'Driver Gloves | Snow Leopard',
    category: 'Перчатки',
    weapon: 'Водительские перчатки',
    rarity: 'extraordinary',
    price: 72000,
    image: 'assets/skins/skin_gloves_snow.png'
  },
  {
    id: 'skin_flip_gamma',
    name: 'Складной нож | Гамма-волны',
    nameEn: 'Flip Knife | Gamma Doppler',
    category: 'Ножи',
    weapon: 'Складной нож',
    rarity: 'extraordinary',
    price: 68000,
    image: 'assets/skins/skin_flip_gamma.png'
  },
  {
    id: 'skin_huntsman_doppler',
    name: 'Охотничий нож | Волны',
    nameEn: 'Huntsman Knife | Doppler',
    category: 'Ножи',
    weapon: 'Охотничий нож',
    rarity: 'extraordinary',
    price: 55000,
    image: 'assets/skins/skin_huntsman_doppler.png'
  },
  {
    id: 'skin_bowie_marble',
    name: 'Нож Боуи | Мраморный градиент',
    nameEn: 'Bowie Knife | Marble Fade',
    category: 'Ножи',
    weapon: 'Нож Боуи',
    rarity: 'extraordinary',
    price: 48000,
    image: 'assets/skins/skin_bowie_marble.png'
  },
  {
    id: 'skin_ursus_tiger',
    name: 'Нож Медведь | Зуб тигра',
    nameEn: 'Ursus Knife | Tiger Tooth',
    category: 'Ножи',
    weapon: 'Нож Медведь',
    rarity: 'extraordinary',
    price: 42000,
    image: 'assets/skins/skin_ursus_tiger.png'
  },
  {
    id: 'skin_gut_doppler',
    name: 'Нож с лезвием-крюком | Волны',
    nameEn: 'Gut Knife | Doppler',
    category: 'Ножи',
    weapon: 'Нож с лезвием-крюком',
    rarity: 'extraordinary',
    price: 35000,
    image: 'assets/skins/skin_gut_doppler.png'
  },
  // =================== COVERT (ТАЙНОЕ: КУЛЬТОВЫЕ ВИНТОВКИ И ПИСТОЛЕТЫ) ===================
  {
    id: 'skin_awp_gungnir',
    name: 'AWP | Гунгнир',
    nameEn: 'AWP | Gungnir',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 540000,
    image: 'assets/skins/skin_awp_gungnir.png'
  },
  {
    id: 'skin_awp_dragon_lore',
    name: 'AWP | История о драконе',
    nameEn: 'AWP | Dragon Lore',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 490000,
    image: 'assets/skins/skin_awp_dragon_lore.png'
  },
  {
    id: 'skin_awp_prince',
    name: 'AWP | Принц',
    nameEn: 'AWP | The Prince',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 410000,
    image: 'assets/skins/skin_awp_prince.png'
  },
  {
    id: 'skin_m4a4_howl',
    name: 'M4A4 | Вой',
    nameEn: 'M4A4 | Howl',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 395000,
    image: 'assets/skins/skin_m4a4_howl.png'
  },
  {
    id: 'skin_awp_medusa',
    name: 'AWP | Медуза',
    nameEn: 'AWP | Medusa',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 380000,
    image: 'assets/skins/skin_awp_medusa.png'
  },
  {
    id: 'skin_ak47_wild_lotus',
    name: 'AK-47 | Дикий лотос',
    nameEn: 'AK-47 | Wild Lotus',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 340000,
    image: 'assets/skins/skin_ak47_wild_lotus.png'
  },
  {
    id: 'skin_awp_desert_hydra',
    name: 'AWP | Пустынная гидра',
    nameEn: 'AWP | Desert Hydra',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 290000,
    image: 'assets/skins/skin_awp_desert_hydra.png'
  },
  {
    id: 'skin_ak47_gold_arabesque',
    name: 'AK-47 | Золотая арабеска',
    nameEn: 'AK-47 | Gold Arabesque',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 270000,
    image: 'assets/skins/skin_ak47_gold_arabesque.png'
  },
  {
    id: 'skin_m4a4_eye_of_horus',
    name: 'M4A4 | Око Гора',
    nameEn: 'M4A4 | Eye of Horus',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 210000,
    image: 'assets/skins/skin_m4a4_eye_of_horus.png'
  },
  {
    id: 'skin_m4a1s_imminent_danger',
    name: 'M4A1-S | Неминуемая опасность',
    nameEn: 'M4A1-S | Imminent Danger',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 180000,
    image: 'assets/skins/skin_m4a1s_imminent_danger.png'
  },
  {
    id: 'skin_awp_fade',
    name: 'AWP | Градиент',
    nameEn: 'AWP | Fade',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 175000,
    image: 'assets/skins/skin_awp_fade.png'
  },
  {
    id: 'skin_ak47_hydroponic',
    name: 'AK-47 | Гидропоника',
    nameEn: 'AK-47 | Hydroponic',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 160000,
    image: 'assets/skins/skin_ak47_hydroponic.png'
  },
  {
    id: 'skin_m4a1s_jungle',
    name: 'M4A1-S | Добро пожаловать в джунгли',
    nameEn: 'M4A1-S | Welcome to the Jungle',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 98000,
    image: 'assets/skins/skin_m4a1s_jungle.png'
  },
  {
    id: 'skin_glock_fade',
    name: 'Glock-18 | Градиент',
    nameEn: 'Glock-18 | Fade',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'covert',
    price: 89000,
    image: 'assets/skins/skin_glock_fade.png'
  },
  {
    id: 'skin_ak47_fire_serpent',
    name: 'AK-47 | Огненный змей',
    nameEn: 'AK-47 | Fire Serpent',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 82000,
    image: 'assets/skins/skin_ak47_fire_serpent.png'
  },
  {
    id: 'skin_deagle_blaze',
    name: 'Desert Eagle | Пламя',
    nameEn: 'Desert Eagle | Blaze',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'covert',
    price: 52000,
    image: 'assets/skins/skin_deagle_blaze.png'
  },
  {
    id: 'skin_awp_oni_taiji',
    name: 'AWP | Великий демон',
    nameEn: 'AWP | Oni Taiji',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 48000,
    image: 'assets/skins/skin_awp_oni_taiji.png'
  },
  {
    id: 'skin_awp_lightning',
    name: 'AWP | Удар молнии',
    nameEn: 'AWP | Lightning Strike',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 44000,
    image: 'assets/skins/skin_awp_lightning.png'
  },
  {
    id: 'skin_ak47_vulcan',
    name: 'AK-47 | Вулкан',
    nameEn: 'AK-47 | Vulcan',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 39000,
    image: 'assets/skins/skin_ak47_vulcan.png'
  },
  {
    id: 'skin_ak47_fuel_injector',
    name: 'AK-47 | Топливный инжектор',
    nameEn: 'AK-47 | Fuel Injector',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 35000,
    image: 'assets/skins/skin_ak47_fuel_injector.png'
  },
  {
    id: 'skin_awp_containment',
    name: 'AWP | Распространение',
    nameEn: 'AWP | Containment Breach',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 32000,
    image: 'assets/skins/skin_awp_containment.png'
  },
  {
    id: 'skin_m4a1s_printstream',
    name: 'M4A1-S | Поток информации',
    nameEn: 'M4A1-S | Printstream',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 28000,
    image: 'assets/skins/skin_m4a1s_printstream.png'
  },
  {
    id: 'skin_awp_chrome_cannon',
    name: 'AWP | Хромированная пушка',
    nameEn: 'AWP | Chrome Cannon',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 26000,
    image: 'assets/skins/skin_awp_chrome_cannon.png'
  },
  {
    id: 'skin_m4a4_temukau',
    name: 'M4A4 | Темукау',
    nameEn: 'M4A4 | Temukau',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 19500,
    image: 'assets/skins/skin_m4a4_temukau.png'
  },
  {
    id: 'skin_ak47_inheritance',
    name: 'AK-47 | Наследство',
    nameEn: 'AK-47 | Inheritance',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 18000,
    image: 'assets/skins/skin_ak47_inheritance.png'
  },
  {
    id: 'skin_m4a4_asiimov',
    name: 'M4A4 | Азимов',
    nameEn: 'M4A4 | Asiimov',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 17000,
    image: 'assets/skins/skin_m4a4_asiimov.png'
  },
  {
    id: 'skin_ak47_asiimov',
    name: 'AK-47 | Азимов',
    nameEn: 'AK-47 | Asiimov',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 16500,
    image: 'assets/skins/skin_ak47_asiimov.png'
  },
  {
    id: 'skin_usps_kill_confirmed',
    name: 'USP-S | Подтвержденное убийство',
    nameEn: 'USP-S | Kill Confirmed',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'covert',
    price: 14200,
    image: 'assets/skins/skin_usps_kill_confirmed.png'
  },
  {
    id: 'skin_deagle_golden_koi',
    name: 'Desert Eagle | Золотой карп',
    nameEn: 'Desert Eagle | Golden Koi',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'covert',
    price: 14000,
    image: 'assets/skins/skin_deagle_golden_koi.png'
  },
  {
    id: 'skin_awp_asiimov',
    name: 'AWP | Азимов',
    nameEn: 'AWP | Asiimov',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 13500,
    image: 'assets/skins/skin_awp_asiimov.png'
  },
  {
    id: 'skin_m4a1s_golden_coil',
    name: 'M4A1-S | Золотая спираль',
    nameEn: 'M4A1-S | Golden Coil',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 13000,
    image: 'assets/skins/skin_m4a1s_golden_coil.png'
  },
  {
    id: 'skin_ak47_neon_rider',
    name: 'AK-47 | Неоновый гонщик',
    nameEn: 'AK-47 | Neon Rider',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 12500,
    image: 'assets/skins/skin_ak47_neon_rider.png'
  },
  {
    id: 'skin_ak47_bloodsport',
    name: 'AK-47 | Кровавый спорт',
    nameEn: 'AK-47 | Bloodsport',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 11800,
    image: 'assets/skins/skin_ak47_bloodsport.png'
  },
  {
    id: 'skin_m4a1s_player_two',
    name: 'M4A1-S | Второй игрок',
    nameEn: 'M4A1-S | Player Two',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 11500,
    image: 'assets/skins/skin_m4a1s_player_two.png'
  },
  {
    id: 'skin_ak47_empress',
    name: 'AK-47 | Императрица',
    nameEn: 'AK-47 | The Empress',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 9800,
    image: 'assets/skins/skin_ak47_empress.png'
  },
  {
    id: 'skin_m4a1s_chantico',
    name: 'M4A1-S | Огонь Чантико',
    nameEn: 'M4A1-S | Chantico\'s Fire',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 9600,
    image: 'assets/skins/skin_m4a1s_chantico.png'
  },
  {
    id: 'skin_ak47_head_shot',
    name: 'AK-47 | Выстрел в голову',
    nameEn: 'AK-47 | Head Shot',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 9500,
    image: 'assets/skins/skin_ak47_head_shot.png'
  },
  {
    id: 'skin_m4a4_emperor',
    name: 'M4A4 | Император',
    nameEn: 'M4A4 | The Emperor',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 9200,
    image: 'assets/skins/skin_m4a4_emperor.png'
  },
  {
    id: 'skin_usps_printstream',
    name: 'USP-S | Поток информации',
    nameEn: 'USP-S | Printstream',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'covert',
    price: 8900,
    image: 'assets/skins/skin_usps_printstream.png'
  },
  {
    id: 'skin_glock_gamma_doppler',
    name: 'Glock-18 | Гамма-волны',
    nameEn: 'Glock-18 | Gamma Doppler',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'covert',
    price: 8500,
    image: 'assets/skins/skin_glock_gamma_doppler.png'
  },
  {
    id: 'skin_ssg08_blood_in_water',
    name: 'SSG 08 | Кровь в воде',
    nameEn: 'SSG 08 | Blood in the Water',
    category: 'Снайперские винтовки',
    weapon: 'SSG 08',
    rarity: 'covert',
    price: 8200,
    image: 'assets/skins/skin_ssg08_blood_in_water.png'
  },
  {
    id: 'skin_usps_the_traitor',
    name: 'USP-S | Предатель',
    nameEn: 'USP-S | The Traitor',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'covert',
    price: 6500,
    image: 'assets/skins/skin_usps_the_traitor.png'
  },
  {
    id: 'skin_ak47_nightwish',
    name: 'AK-47 | Пожелание на ночь',
    nameEn: 'AK-47 | Nightwish',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 5800,
    image: 'assets/skins/skin_ak47_nightwish.png'
  },
  {
    id: 'skin_m4a1s_cyrex',
    name: 'M4A1-S | Сайрекс',
    nameEn: 'M4A1-S | Cyrex',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'covert',
    price: 4900,
    image: 'assets/skins/skin_m4a1s_cyrex.png'
  },
  {
    id: 'skin_m4a4_in_living_color',
    name: 'M4A4 | Живой цвет',
    nameEn: 'M4A4 | In Living Color',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 4800,
    image: 'assets/skins/skin_m4a4_in_living_color.png'
  },
  {
    id: 'skin_five_seven_hyperbeast',
    name: 'Five-SeveN | Скоростной зверь',
    nameEn: 'Five-SeveN | Hyper Beast',
    category: 'Пистолеты',
    weapon: 'Five-SeveN',
    rarity: 'covert',
    price: 4800,
    image: 'assets/skins/skin_five_seven_hyperbeast.png'
  },
  {
    id: 'skin_deagle_code_red',
    name: 'Desert Eagle | Код красный',
    nameEn: 'Desert Eagle | Code Red',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'covert',
    price: 4500,
    image: 'assets/skins/skin_deagle_code_red.png'
  },
  {
    id: 'skin_awp_neo_noir',
    name: 'AWP | Нео-нуар',
    nameEn: 'AWP | Neo-Noir',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'covert',
    price: 4200,
    image: 'assets/skins/skin_awp_neo_noir.png'
  },
  {
    id: 'skin_glock_neo_noir',
    name: 'Glock-18 | Нео-нуар',
    nameEn: 'Glock-18 | Neo-Noir',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'covert',
    price: 4100,
    image: 'assets/skins/skin_glock_neo_noir.png'
  },
  {
    id: 'skin_ssg08_dragonfire',
    name: 'SSG 08 | Пламя дракона',
    nameEn: 'SSG 08 | Dragonfire',
    category: 'Снайперские винтовки',
    weapon: 'SSG 08',
    rarity: 'covert',
    price: 3900,
    image: 'assets/skins/skin_ssg08_dragonfire.png'
  },
  {
    id: 'skin_ak47_legion_anubis',
    name: 'AK-47 | Легион Анубиса',
    nameEn: 'AK-47 | Legion of Anubis',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'covert',
    price: 3800,
    image: 'assets/skins/skin_ak47_legion_anubis.png'
  },
  {
    id: 'skin_p90_asiimov',
    name: 'P90 | Азимов',
    nameEn: 'P90 | Asiimov',
    category: 'Пистолеты-пулеметы',
    weapon: 'P90',
    rarity: 'covert',
    price: 3700,
    image: 'assets/skins/skin_p90_asiimov.png'
  },
  {
    id: 'skin_m4a4_neo_noir',
    name: 'M4A4 | Нео-нуар',
    nameEn: 'M4A4 | Neo-Noir',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 3600,
    image: 'assets/skins/skin_m4a4_neo_noir.png'
  },
  {
    id: 'skin_glock_wasteland_rebel',
    name: 'Glock-18 | Пустынный повстанец',
    nameEn: 'Glock-18 | Wasteland Rebel',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'covert',
    price: 3500,
    image: 'assets/skins/skin_glock_wasteland_rebel.png'
  },
  {
    id: 'skin_m4a4_buzz_kill',
    name: 'M4A4 | Облом',
    nameEn: 'M4A4 | Buzz Kill',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'covert',
    price: 3400,
    image: 'assets/skins/skin_m4a4_buzz_kill.png'
  },
  {
    id: 'skin_mac10_neon_rider',
    name: 'MAC-10 | Неоновый всадник',
    nameEn: 'MAC-10 | Neon Rider',
    category: 'Пистолеты-пулеметы',
    weapon: 'MAC-10',
    rarity: 'covert',
    price: 1350,
    image: 'assets/skins/skin_mac10_neon_rider.png'
  },
  // =================== CLASSIFIED (ЗАСЕКРЕЧЕННОЕ: ТОПОВЫЕ СКИНЫ) ===================
  {
    id: 'skin_m4a1s_hot_rod',
    name: 'M4A1-S | Хот-род',
    nameEn: 'M4A1-S | Hot Rod',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 92000,
    image: 'assets/skins/skin_m4a1s_hot_rod.png'
  },
  {
    id: 'skin_m4a1s_blue_phosphor',
    name: 'M4A1-S | Синий фосфор',
    nameEn: 'M4A1-S | Blue Phosphor',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 85000,
    image: 'assets/skins/skin_m4a1s_blue_phosphor.png'
  },
  {
    id: 'skin_deagle_fennec_fox',
    name: 'Desert Eagle | Фенек',
    nameEn: 'Desert Eagle | Fennec Fox',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 62000,
    image: 'assets/skins/skin_deagle_fennec_fox.png'
  },
  {
    id: 'skin_ak47_case_hardened',
    name: 'AK-47 | Поверхностная закалка',
    nameEn: 'AK-47 | Case Hardened',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 24000,
    image: 'assets/skins/skin_ak47_case_hardened.png'
  },
  {
    id: 'skin_glock_dragon_tattoo',
    name: 'Glock-18 | Татуировка дракона',
    nameEn: 'Glock-18 | Dragon Tattoo',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'classified',
    price: 9000,
    image: 'assets/skins/skin_glock_dragon_tattoo.png'
  },
  {
    id: 'skin_awp_boom',
    name: 'AWP | БАХ',
    nameEn: 'AWP | BOOM',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 8500,
    image: 'assets/skins/skin_awp_boom.png'
  },
  {
    id: 'skin_awp_wildfire',
    name: 'AWP | Дикое пламя',
    nameEn: 'AWP | Wildfire',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 7800,
    image: 'assets/skins/skin_awp_wildfire.png'
  },
  {
    id: 'skin_usps_orion',
    name: 'USP-S | Орион',
    nameEn: 'USP-S | Orion',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'classified',
    price: 7500,
    image: 'assets/skins/skin_usps_orion.png'
  },
  {
    id: 'skin_deagle_hypnotic',
    name: 'Desert Eagle | Гипнотический',
    nameEn: 'Desert Eagle | Hypnotic',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 7200,
    image: 'assets/skins/skin_deagle_hypnotic.png'
  },
  {
    id: 'skin_deagle_printstream',
    name: 'Desert Eagle | Поток информации',
    nameEn: 'Desert Eagle | Printstream',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 6800,
    image: 'assets/skins/skin_deagle_printstream.png'
  },
  {
    id: 'skin_deagle_cobalt_disruption',
    name: 'Desert Eagle | Кобальтовый разлом',
    nameEn: 'Desert Eagle | Cobalt Disruption',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 6800,
    image: 'assets/skins/skin_deagle_cobalt_disruption.png'
  },
  {
    id: 'skin_m4a4_hellfire',
    name: 'M4A4 | Адское пламя',
    nameEn: 'M4A4 | Hellfire',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'classified',
    price: 6500,
    image: 'assets/skins/skin_m4a4_hellfire.png'
  },
  {
    id: 'skin_awp_hyperbeast',
    name: 'AWP | Скоростной зверь',
    nameEn: 'AWP | Hyper Beast',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 6200,
    image: 'assets/skins/skin_awp_hyperbeast.png'
  },
  {
    id: 'skin_awp_redline',
    name: 'AWP | Красная линия',
    nameEn: 'AWP | Redline',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 4600,
    image: 'assets/skins/skin_awp_redline.png'
  },
  {
    id: 'skin_m4a1s_hyperbeast',
    name: 'M4A1-S | Скоростной зверь',
    nameEn: 'M4A1-S | Hyper Beast',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 4500,
    image: 'assets/skins/skin_m4a1s_hyperbeast.png'
  },
  {
    id: 'skin_m4a1s_atomic_alloy',
    name: 'M4A1-S | Атомный сплав',
    nameEn: 'M4A1-S | Atomic Alloy',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 4200,
    image: 'assets/skins/skin_m4a1s_atomic_alloy.png'
  },
  {
    id: 'skin_glock_bullet_queen',
    name: 'Glock-18 | Королева пуль',
    nameEn: 'Glock-18 | Bullet Queen',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'classified',
    price: 3900,
    image: 'assets/skins/skin_glock_bullet_queen.png'
  },
  {
    id: 'skin_usps_caiman',
    name: 'USP-S | Кайман',
    nameEn: 'USP-S | Caiman',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'classified',
    price: 3600,
    image: 'assets/skins/skin_usps_caiman.png'
  },
  {
    id: 'skin_p250_undertow',
    name: 'P250 | Обратная тяга',
    nameEn: 'P250 | Undertow',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'classified',
    price: 3500,
    image: 'assets/skins/skin_p250_undertow.png'
  },
  {
    id: 'skin_deagle_kumicho_dragon',
    name: 'Desert Eagle | Дракон-предводитель',
    nameEn: 'Desert Eagle | Kumicho Dragon',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 3400,
    image: 'assets/skins/skin_deagle_kumicho_dragon.png'
  },
  {
    id: 'skin_usps_cortex',
    name: 'USP-S | Извилины',
    nameEn: 'USP-S | Cortex',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'classified',
    price: 3200,
    image: 'assets/skins/skin_usps_cortex.png'
  },
  {
    id: 'skin_usps_neo_noir',
    name: 'USP-S | Нео-нуар',
    nameEn: 'USP-S | Neo-Noir',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'classified',
    price: 2900,
    image: 'assets/skins/skin_usps_neo_noir.png'
  },
  {
    id: 'skin_m4a4_cyber_security',
    name: 'M4A4 | Кибербезопасность',
    nameEn: 'M4A4 | Cyber Security',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'classified',
    price: 2900,
    image: 'assets/skins/skin_m4a4_cyber_security.png'
  },
  {
    id: 'skin_ak47_point_disarray',
    name: 'AK-47 | Буйство красок',
    nameEn: 'AK-47 | Point Disarray',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 2800,
    image: 'assets/skins/skin_ak47_point_disarray.png'
  },
  {
    id: 'skin_m4a1s_decimator',
    name: 'M4A1-S | Опустошитель',
    nameEn: 'M4A1-S | Decimator',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 2700,
    image: 'assets/skins/skin_m4a1s_decimator.png'
  },
  {
    id: 'skin_ak47_frontside_misty',
    name: 'AK-47 | Снежный вихрь',
    nameEn: 'AK-47 | Frontside Misty',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 2600,
    image: 'assets/skins/skin_ak47_frontside_misty.png'
  },
  {
    id: 'skin_galil_sugar_rush',
    name: 'Galil AR | Сахарная лихорадка',
    nameEn: 'Galil AR | Sugar Rush',
    category: 'Штурмовые винтовки',
    weapon: 'Galil AR',
    rarity: 'classified',
    price: 2600,
    image: 'assets/skins/skin_galil_sugar_rush.png'
  },
  {
    id: 'skin_usps_jawbreaker',
    name: 'USP-S | Зубодробитель',
    nameEn: 'USP-S | Jawbreaker',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'classified',
    price: 2500,
    image: 'assets/skins/skin_usps_jawbreaker.png'
  },
  {
    id: 'skin_ak47_ice_coaled',
    name: 'AK-47 | Ледяной уголь',
    nameEn: 'AK-47 | Ice Coaled',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 2400,
    image: 'assets/skins/skin_ak47_ice_coaled.png'
  },
  {
    id: 'skin_deagle_conspiracy',
    name: 'Desert Eagle | Заговор',
    nameEn: 'Desert Eagle | Conspiracy',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'classified',
    price: 2300,
    image: 'assets/skins/skin_deagle_conspiracy.png'
  },
  {
    id: 'skin_famas_commemoration',
    name: 'FAMAS | Память',
    nameEn: 'FAMAS | Commemoration',
    category: 'Штурмовые винтовки',
    weapon: 'FAMAS',
    rarity: 'classified',
    price: 2300,
    image: 'assets/skins/skin_famas_commemoration.png'
  },
  {
    id: 'skin_ak47_redline',
    name: 'AK-47 | Красная линия',
    nameEn: 'AK-47 | Redline',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 2200,
    image: 'assets/skins/skin_ak47_redline.png'
  },
  {
    id: 'skin_glock_vogue',
    name: 'Glock-18 | Мода',
    nameEn: 'Glock-18 | Vogue',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'classified',
    price: 2200,
    image: 'assets/skins/skin_glock_vogue.png'
  },
  {
    id: 'skin_m4a4_desolate_space',
    name: 'M4A4 | Безлюдный космос',
    nameEn: 'M4A4 | Desolate Space',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'classified',
    price: 2100,
    image: 'assets/skins/skin_m4a4_desolate_space.png'
  },
  {
    id: 'skin_ak47_cartel',
    name: 'AK-47 | Картель',
    nameEn: 'AK-47 | Cartel',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'classified',
    price: 2100,
    image: 'assets/skins/skin_ak47_cartel.png'
  },
  {
    id: 'skin_m4a1s_leaded_glass',
    name: 'M4A1-S | Витраж',
    nameEn: 'M4A1-S | Leaded Glass',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'classified',
    price: 2100,
    image: 'assets/skins/skin_m4a1s_leaded_glass.png'
  },
  {
    id: 'skin_awp_duality',
    name: 'AWP | Двойственность',
    nameEn: 'AWP | Duality',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 1900,
    image: 'assets/skins/skin_awp_duality.png'
  },
  {
    id: 'skin_mp9_mount_fuji',
    name: 'MP9 | Фудзияма',
    nameEn: 'MP9 | Mount Fuji',
    category: 'Пистолеты-пулеметы',
    weapon: 'MP9',
    rarity: 'classified',
    price: 1900,
    image: 'assets/skins/skin_mp9_mount_fuji.png'
  },
  {
    id: 'skin_five_seven_monkey',
    name: 'Five-SeveN | Обезьянье дело',
    nameEn: 'Five-SeveN | Monkey Business',
    category: 'Пистолеты',
    weapon: 'Five-SeveN',
    rarity: 'classified',
    price: 1900,
    image: 'assets/skins/skin_five_seven_monkey.png'
  },
  {
    id: 'skin_awp_corticera',
    name: 'AWP | Кортисейра',
    nameEn: 'AWP | Corticera',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'classified',
    price: 1800,
    image: 'assets/skins/skin_awp_corticera.png'
  },
  {
    id: 'skin_p250_see_ya_later',
    name: 'P250 | До скорого',
    nameEn: 'P250 | See Ya Later',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'classified',
    price: 1800,
    image: 'assets/skins/skin_p250_see_ya_later.png'
  },
  {
    id: 'skin_mp9_starlight',
    name: 'MP9 | Звездный защитник',
    nameEn: 'MP9 | Starlight Protector',
    category: 'Пистолеты-пулеметы',
    weapon: 'MP9',
    rarity: 'classified',
    price: 1700,
    image: 'assets/skins/skin_mp9_starlight.png'
  },
  {
    id: 'skin_mac10_disco_tech',
    name: 'MAC-10 | Дискотехника',
    nameEn: 'MAC-10 | Disco Tech',
    category: 'Пистолеты-пулеметы',
    weapon: 'MAC-10',
    rarity: 'classified',
    price: 1600,
    image: 'assets/skins/skin_mac10_disco_tech.png'
  },
  {
    id: 'skin_five_seven_angry_mob',
    name: 'Five-SeveN | Разъяренная толпа',
    nameEn: 'Five-SeveN | Angry Mob',
    category: 'Пистолеты',
    weapon: 'Five-SeveN',
    rarity: 'classified',
    price: 1600,
    image: 'assets/skins/skin_five_seven_angry_mob.png'
  },
  {
    id: 'skin_p250_muertos',
    name: 'P250 | Покойник',
    nameEn: 'P250 | Muertos',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'classified',
    price: 980,
    image: 'assets/skins/skin_p250_muertos.png'
  },
  {
    id: 'skin_galil_chromatic',
    name: 'Galil AR | Хроматическая аберрация',
    nameEn: 'Galil AR | Chromatic Aberration',
    category: 'Штурмовые винтовки',
    weapon: 'Galil AR',
    rarity: 'classified',
    price: 890,
    image: 'assets/skins/skin_galil_chromatic.png'
  },
  {
    id: 'skin_p250_visions',
    name: 'P250 | Видения',
    nameEn: 'P250 | Visions',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'classified',
    price: 720,
    image: 'assets/skins/skin_p250_visions.png'
  },
  // =================== RESTRICTED (ЗАПРЕЩЕННОЕ: СТИЛЬНЫЕ И ПОПУЛЯРНЫЕ) ===================
  {
    id: 'skin_deagle_emerald_jormungandr',
    name: 'Desert Eagle | Изумрудный Ёрмунганд',
    nameEn: 'Desert Eagle | Emerald Jörmungandr',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 48000,
    image: 'assets/skins/skin_deagle_emerald_jormungandr.png'
  },
  {
    id: 'skin_m4a1s_guardian',
    name: 'M4A1-S | Страж',
    nameEn: 'M4A1-S | Guardian',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'restricted',
    price: 1600,
    image: 'assets/skins/skin_m4a1s_guardian.png'
  },
  {
    id: 'skin_deagle_ocean_drive',
    name: 'Desert Eagle | Океанский драйв',
    nameEn: 'Desert Eagle | Ocean Drive',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 1500,
    image: 'assets/skins/skin_deagle_ocean_drive.png'
  },
  {
    id: 'skin_ak47_orbit',
    name: 'AK-47 | Орбита, вер. 01',
    nameEn: 'AK-47 | Orbit Mk01',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'restricted',
    price: 1400,
    image: 'assets/skins/skin_ak47_orbit.png'
  },
  {
    id: 'skin_usps_blueprint',
    name: 'USP-S | Калька',
    nameEn: 'USP-S | Blueprint',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'restricted',
    price: 1400,
    image: 'assets/skins/skin_usps_blueprint.png'
  },
  {
    id: 'skin_m4a1s_basilisk',
    name: 'M4A1-S | Василиск',
    nameEn: 'M4A1-S | Basilisk',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'restricted',
    price: 1300,
    image: 'assets/skins/skin_m4a1s_basilisk.png'
  },
  {
    id: 'skin_awp_fever_dream',
    name: 'AWP | Горячечные грезы',
    nameEn: 'AWP | Fever Dream',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 1250,
    image: 'assets/skins/skin_awp_fever_dream.png'
  },
  {
    id: 'skin_usps_monster',
    name: 'USP-S | Извилины',
    nameEn: 'USP-S | Monster Mashup',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'restricted',
    price: 1200,
    image: 'assets/skins/skin_usps_monster.png'
  },
  {
    id: 'skin_m4a4_spider_lily',
    name: 'M4A4 | Паучья лилия',
    nameEn: 'M4A4 | Spider Lily',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'restricted',
    price: 1100,
    image: 'assets/skins/skin_m4a4_spider_lily.png'
  },
  {
    id: 'skin_usps_stainless',
    name: 'USP-S | Нержавейка',
    nameEn: 'USP-S | Stainless',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'restricted',
    price: 1100,
    image: 'assets/skins/skin_usps_stainless.png'
  },
  {
    id: 'skin_glock_water_elemental',
    name: 'Glock-18 | Водяной элементаль',
    nameEn: 'Glock-18 | Water Elemental',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'restricted',
    price: 990,
    image: 'assets/skins/skin_glock_water_elemental.png'
  },
  {
    id: 'skin_ak47_safety_net',
    name: 'AK-47 | Страховочная сетка',
    nameEn: 'AK-47 | Safety Net',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'restricted',
    price: 950,
    image: 'assets/skins/skin_ak47_safety_net.png'
  },
  {
    id: 'skin_glock_franklin',
    name: 'Glock-18 | Франклин',
    nameEn: 'Glock-18 | Franklin',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'restricted',
    price: 890,
    image: 'assets/skins/skin_glock_franklin.png'
  },
  {
    id: 'skin_deagle_mecha',
    name: 'Desert Eagle | Механо-пушка',
    nameEn: 'Desert Eagle | Mecha Industries',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 880,
    image: 'assets/skins/skin_deagle_mecha.png'
  },
  {
    id: 'skin_ak47_rat_rod',
    name: 'AK-47 | Рэт-род',
    nameEn: 'AK-47 | Rat Rod',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'restricted',
    price: 850,
    image: 'assets/skins/skin_ak47_rat_rod.png'
  },
  {
    id: 'skin_awp_mortis',
    name: 'AWP | Мортис',
    nameEn: 'AWP | Mortis',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 850,
    image: 'assets/skins/skin_awp_mortis.png'
  },
  {
    id: 'skin_usps_cyrex',
    name: 'USP-S | Сайрекс',
    nameEn: 'USP-S | Cyrex',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'restricted',
    price: 850,
    image: 'assets/skins/skin_usps_cyrex.png'
  },
  {
    id: 'skin_awp_atheris',
    name: 'AWP | Древесная гадюка',
    nameEn: 'AWP | Atheris',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 790,
    image: 'assets/skins/skin_awp_atheris.png'
  },
  {
    id: 'skin_usps_guardian',
    name: 'USP-S | Страж',
    nameEn: 'USP-S | Guardian',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'restricted',
    price: 780,
    image: 'assets/skins/skin_usps_guardian.png'
  },
  {
    id: 'skin_glock_snack_attack',
    name: 'Glock-18 | Время перекусить',
    nameEn: 'Glock-18 | Snack Attack',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'restricted',
    price: 780,
    image: 'assets/skins/skin_glock_snack_attack.png'
  },
  {
    id: 'skin_m4a4_evil_daimyo',
    name: 'M4A4 | Злобный даймё',
    nameEn: 'M4A4 | Evil Daimyo',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'restricted',
    price: 750,
    image: 'assets/skins/skin_m4a4_evil_daimyo.png'
  },
  {
    id: 'skin_deagle_trigger_discipline',
    name: 'Desert Eagle | Стрелковая дисциплина',
    nameEn: 'Desert Eagle | Trigger Discipline',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 720,
    image: 'assets/skins/skin_deagle_trigger_discipline.png'
  },
  {
    id: 'skin_ak47_phantom',
    name: 'AK-47 | Фантомный вредитель',
    nameEn: 'AK-47 | Phantom Disruptor',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'restricted',
    price: 690,
    image: 'assets/skins/skin_ak47_phantom.png'
  },
  {
    id: 'skin_m4a1s_flashback',
    name: 'M4A1-S | Взгляд в прошлое',
    nameEn: 'M4A1-S | Flashback',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'restricted',
    price: 680,
    image: 'assets/skins/skin_m4a1s_flashback.png'
  },
  {
    id: 'skin_m4a4_griffin',
    name: 'M4A4 | Грифон',
    nameEn: 'M4A4 | Griffin',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'restricted',
    price: 650,
    image: 'assets/skins/skin_m4a4_griffin.png'
  },
  {
    id: 'skin_awp_paw',
    name: 'AWP | Лапки',
    nameEn: 'AWP | PAW',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 650,
    image: 'assets/skins/skin_awp_paw.png'
  },
  {
    id: 'skin_ak47_slate',
    name: 'AK-47 | Сланец',
    nameEn: 'AK-47 | Slate',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'restricted',
    price: 620,
    image: 'assets/skins/skin_ak47_slate.png'
  },
  {
    id: 'skin_deagle_light_rail',
    name: 'Desert Eagle | Рельсотрон',
    nameEn: 'Desert Eagle | Light Rail',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 620,
    image: 'assets/skins/skin_deagle_light_rail.png'
  },
  {
    id: 'skin_awp_exoskeleton',
    name: 'AWP | Экзоскелет',
    nameEn: 'AWP | Exoskeleton',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 580,
    image: 'assets/skins/skin_awp_exoskeleton.png'
  },
  {
    id: 'skin_m4a4_tooth_fairy',
    name: 'M4A4 | Зубная фея',
    nameEn: 'M4A4 | Tooth Fairy',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'restricted',
    price: 520,
    image: 'assets/skins/skin_m4a4_tooth_fairy.png'
  },
  {
    id: 'skin_deagle_directive',
    name: 'Desert Eagle | Директива',
    nameEn: 'Desert Eagle | Directive',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'restricted',
    price: 520,
    image: 'assets/skins/skin_deagle_directive.png'
  },
  {
    id: 'skin_glock_weasel',
    name: 'Glock-18 | Ласка',
    nameEn: 'Glock-18 | Weasel',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'restricted',
    price: 520,
    image: 'assets/skins/skin_glock_weasel.png'
  },
  {
    id: 'skin_m4a1s_nightmare',
    name: 'M4A1-S | Ночной кошмар',
    nameEn: 'M4A1-S | Nightmare',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'restricted',
    price: 490,
    image: 'assets/skins/skin_m4a1s_nightmare.png'
  },
  {
    id: 'skin_p250_wingshot',
    name: 'P250 | Стрельба по тарелочкам',
    nameEn: 'P250 | Wingshot',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'restricted',
    price: 480,
    image: 'assets/skins/skin_p250_wingshot.png'
  },
  {
    id: 'skin_glock_royal_legion',
    name: 'Glock-18 | Королевский легион',
    nameEn: 'Glock-18 | Royal Legion',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'restricted',
    price: 460,
    image: 'assets/skins/skin_glock_royal_legion.png'
  },
  {
    id: 'skin_awp_pit_viper',
    name: 'AWP | Гадюка',
    nameEn: 'AWP | Pit Viper',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'restricted',
    price: 340,
    image: 'assets/skins/skin_awp_pit_viper.png'
  },
  {
    id: 'skin_m4a1s_emphorosaur',
    name: 'M4A1-S | Эмфорозавр-S',
    nameEn: 'M4A1-S | Emphorosaur-S',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'restricted',
    price: 210,
    image: 'assets/skins/skin_m4a1s_emphorosaur.png'
  },
  {
    id: 'skin_mac10_pipe_down',
    name: 'MAC-10 | Заткнись',
    nameEn: 'MAC-10 | Pipe Down',
    category: 'Пистолеты-пулеметы',
    weapon: 'MAC-10',
    rarity: 'restricted',
    price: 180,
    image: 'assets/skins/skin_mac10_pipe_down.png'
  },
  // =================== MIL-SPEC (АРМЕЙСКОЕ КАЧЕСТВО) ===================
  {
    id: 'skin_m4a1s_nitro',
    name: 'M4A1-S | Нитро',
    nameEn: 'M4A1-S | Nitro',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'milspec',
    price: 320,
    image: 'assets/skins/skin_m4a1s_nitro.png'
  },
  {
    id: 'skin_m4a1s_night_terror',
    name: 'M4A1-S | Ночной ужас',
    nameEn: 'M4A1-S | Night Terror',
    category: 'Штурмовые винтовки',
    weapon: 'M4A1-S',
    rarity: 'milspec',
    price: 280,
    image: 'assets/skins/skin_m4a1s_night_terror.png'
  },
  {
    id: 'skin_glock_candy_apple',
    name: 'Glock-18 | Карамельное яблоко',
    nameEn: 'Glock-18 | Candy Apple',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'milspec',
    price: 280,
    image: 'assets/skins/skin_glock_candy_apple.png'
  },
  {
    id: 'skin_awp_acheron',
    name: 'AWP | Ахерон',
    nameEn: 'AWP | Acheron',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'milspec',
    price: 260,
    image: 'assets/skins/skin_awp_acheron.png'
  },
  {
    id: 'skin_awp_worm_god',
    name: 'AWP | Бог червей',
    nameEn: 'AWP | Worm God',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'milspec',
    price: 240,
    image: 'assets/skins/skin_awp_worm_god.png'
  },
  {
    id: 'skin_ak47_elite_build',
    name: 'AK-47 | Элитное снаряжение',
    nameEn: 'AK-47 | Elite Build',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'milspec',
    price: 220,
    image: 'assets/skins/skin_ak47_elite_build.png'
  },
  {
    id: 'skin_ssg08_abyss',
    name: 'SSG 08 | Пучина',
    nameEn: 'SSG 08 | Abyss',
    category: 'Снайперские винтовки',
    weapon: 'SSG 08',
    rarity: 'milspec',
    price: 220,
    image: 'assets/skins/skin_ssg08_abyss.png'
  },
  {
    id: 'skin_usps_flashback',
    name: 'USP-S | Взгляд в прошлое',
    nameEn: 'USP-S | Flashback',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'milspec',
    price: 210,
    image: 'assets/skins/skin_usps_flashback.png'
  },
  {
    id: 'skin_m4a4_converter',
    name: 'M4A4 | Преобразователь',
    nameEn: 'M4A4 | Converter',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'milspec',
    price: 190,
    image: 'assets/skins/skin_m4a4_converter.png'
  },
  {
    id: 'skin_deagle_blue_ply',
    name: 'Desert Eagle | Синяя фанера',
    nameEn: 'Desert Eagle | Blue Ply',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'milspec',
    price: 190,
    image: 'assets/skins/skin_deagle_blue_ply.png'
  },
  {
    id: 'skin_usps_torque',
    name: 'USP-S | Крутящий момент',
    nameEn: 'USP-S | Torque',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'milspec',
    price: 180,
    image: 'assets/skins/skin_usps_torque.png'
  },
  {
    id: 'skin_glock_bunsen_burner',
    name: 'Glock-18 | Горелка Бунзена',
    nameEn: 'Glock-18 | Bunsen Burner',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'milspec',
    price: 180,
    image: 'assets/skins/skin_glock_bunsen_burner.png'
  },
  {
    id: 'skin_deagle_oxide_blaze',
    name: 'Desert Eagle | Оксидное пламя',
    nameEn: 'Desert Eagle | Oxide Blaze',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'milspec',
    price: 160,
    image: 'assets/skins/skin_deagle_oxide_blaze.png'
  },
  {
    id: 'skin_m4a4_poly_mag',
    name: 'M4A4 | Полимерный магазин',
    nameEn: 'M4A4 | Poly Mag',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'milspec',
    price: 150,
    image: 'assets/skins/skin_m4a4_poly_mag.png'
  },
  {
    id: 'skin_deagle_bronze_deco',
    name: 'Desert Eagle | Бронзовая декорация',
    nameEn: 'Desert Eagle | Bronze Deco',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'milspec',
    price: 150,
    image: 'assets/skins/skin_deagle_bronze_deco.png'
  },
  {
    id: 'skin_usps_ticket_to_hell',
    name: 'USP-S | Билет в ад',
    nameEn: 'USP-S | Ticket to Hell',
    category: 'Пистолеты',
    weapon: 'USP-S',
    rarity: 'milspec',
    price: 150,
    image: 'assets/skins/skin_usps_ticket_to_hell.png'
  },
  {
    id: 'skin_glock_oxide_blaze',
    name: 'Glock-18 | Оксидное пламя',
    nameEn: 'Glock-18 | Oxide Blaze',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'milspec',
    price: 140,
    image: 'assets/skins/skin_glock_oxide_blaze.png'
  },
  {
    id: 'skin_ak47_uncharted',
    name: 'AK-47 | Неизведанное',
    nameEn: 'AK-47 | Uncharted',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'milspec',
    price: 135,
    image: 'assets/skins/skin_ak47_uncharted.png'
  },
  {
    id: 'skin_deagle_corinthian',
    name: 'Desert Eagle | Коринфская бронза',
    nameEn: 'Desert Eagle | Corinthian',
    category: 'Пистолеты',
    weapon: 'Desert Eagle',
    rarity: 'milspec',
    price: 130,
    image: 'assets/skins/skin_deagle_corinthian.png'
  },
  {
    id: 'skin_p250_cyber_shell',
    name: 'P250 | Киберпанцирь',
    nameEn: 'P250 | Cyber Shell',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'milspec',
    price: 130,
    image: 'assets/skins/skin_p250_cyber_shell.png'
  },
  {
    id: 'skin_mac10_ensnared',
    name: 'MAC-10 | В ловушке',
    nameEn: 'MAC-10 | Ensnared',
    category: 'Пистолеты-пулеметы',
    weapon: 'MAC-10',
    rarity: 'milspec',
    price: 120,
    image: 'assets/skins/skin_mac10_ensnared.png'
  },
  {
    id: 'skin_glock_off_world',
    name: 'Glock-18 | Жертва',
    nameEn: 'Glock-18 | Off World',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'milspec',
    price: 110,
    image: 'assets/skins/skin_glock_off_world.png'
  },
  {
    id: 'skin_p250_valence',
    name: 'P250 | Валентность',
    nameEn: 'P250 | Valence',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'milspec',
    price: 110,
    image: 'assets/skins/skin_p250_valence.png'
  },
  {
    id: 'skin_m4a4_magnesium',
    name: 'M4A4 | Магний',
    nameEn: 'M4A4 | Magnesium',
    category: 'Штурмовые винтовки',
    weapon: 'M4A4',
    rarity: 'milspec',
    price: 95,
    image: 'assets/skins/skin_m4a4_magnesium.png'
  },
  {
    id: 'skin_glock_clear_polymer',
    name: 'Glock-18 | Прозрачный полимер',
    nameEn: 'Glock-18 | Clear Polymer',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'milspec',
    price: 85,
    image: 'assets/skins/skin_glock_clear_polymer.png'
  },
  // =================== INDUSTRIAL (ПРОМЫШЛЕННОЕ КАЧЕСТВО) ===================
  {
    id: 'skin_awp_safari_mesh',
    name: 'AWP | Африканская сетка',
    nameEn: 'AWP | Safari Mesh',
    category: 'Снайперские винтовки',
    weapon: 'AWP',
    rarity: 'industrial',
    price: 140,
    image: 'assets/skins/skin_awp_safari_mesh.png'
  },
  {
    id: 'skin_ak47_safari_mesh',
    name: 'AK-47 | Африканская сетка',
    nameEn: 'AK-47 | Safari Mesh',
    category: 'Штурмовые винтовки',
    weapon: 'AK-47',
    rarity: 'industrial',
    price: 120,
    image: 'assets/skins/skin_ak47_safari_mesh.png'
  },
  {
    id: 'skin_glock_high_beam',
    name: 'Glock-18 | Дальний свет',
    nameEn: 'Glock-18 | High Beam',
    category: 'Пистолеты',
    weapon: 'Glock-18',
    rarity: 'industrial',
    price: 65,
    image: 'assets/skins/skin_glock_high_beam.png'
  },
  {
    id: 'skin_p250_sandstorm',
    name: 'P250 | Песчаные дюны',
    nameEn: 'P250 | Sand Dune',
    category: 'Пистолеты',
    weapon: 'P250',
    rarity: 'industrial',
    price: 45,
    image: 'assets/skins/skin_p250_sandstorm.png'
  },
  {
    id: 'skin_mp9_sand_scale',
    name: 'MP9 | Песчаная чешуя',
    nameEn: 'MP9 | Sand Scale',
    category: 'Пистолеты-пулеметы',
    weapon: 'MP9',
    rarity: 'industrial',
    price: 32,
    image: 'assets/skins/skin_mp9_sand_scale.png'
  },
  // =================== CONSUMER GRADE (ШИРПОТРЕБ) ===================
  {
    id: 'skin_ssg08_blue_spruce',
    name: 'SSG 08 | Голубая хвоя',
    nameEn: 'SSG 08 | Blue Spruce',
    category: 'Снайперские винтовки',
    weapon: 'SSG 08',
    rarity: 'consumer',
    price: 22,
    image: 'assets/skins/skin_ssg08_blue_spruce.png'
  },
  {
    id: 'skin_nova_polar_mesh',
    name: 'Nova | Полярная сетка',
    nameEn: 'Nova | Polar Mesh',
    category: 'Дробовики',
    weapon: 'Nova',
    rarity: 'consumer',
    price: 18,
    image: 'assets/skins/skin_nova_polar_mesh.png'
  },
  {
    id: 'skin_p90_storm',
    name: 'P90 | Гроза',
    nameEn: 'P90 | Storm',
    category: 'Пистолеты-пулеметы',
    weapon: 'P90',
    rarity: 'consumer',
    price: 14,
    image: 'assets/skins/skin_p90_storm.png'
  },
  {
    id: 'skin_berettas_colony',
    name: 'Dual Berettas | Колония',
    nameEn: 'Dual Berettas | Colony',
    category: 'Пистолеты',
    weapon: 'Dual Berettas',
    rarity: 'consumer',
    price: 10,
    image: 'assets/skins/skin_berettas_colony.png'
  },
  {
    id: 'skin_gloves_racing_green',
    name: 'Водительские перчатки | Гоночный зеленый',
    nameEn: 'Driver Gloves | Racing Green',
    category: 'Перчатки',
    weapon: 'Перчатки',
    rarity: 'extraordinary',
    price: 28000,
    image: 'assets/skins/skin_gloves_racing_green.png'
  },
  {
    id: 'skin_gloves_buckshot',
    name: 'Перчатки спецназа | Дробинка',
    nameEn: 'Specialist Gloves | Buckshot',
    category: 'Перчатки',
    weapon: 'Перчатки',
    rarity: 'extraordinary',
    price: 38000,
    image: 'assets/skins/skin_gloves_buckshot.png'
  },
  {
    id: 'skin_gloves_leather',
    name: 'Обмотки рук | Кожа',
    nameEn: 'Hand Wraps | Leather',
    category: 'Перчатки',
    weapon: 'Перчатки',
    rarity: 'extraordinary',
    price: 46000,
    image: 'assets/skins/skin_gloves_leather.png'
  },
  {
    id: 'skin_gloves_needle_point',
    name: 'Перчатки «Сломанный клык» | Игольное ушко',
    nameEn: 'Broken Fang Gloves | Needle Point',
    category: 'Перчатки',
    weapon: 'Перчатки',
    rarity: 'extraordinary',
    price: 54000,
    image: 'assets/skins/skin_gloves_needle_point.png'
  }
];

// Быстрый поиск скина по ID
window.SKINS_MAP = {};
window.ALL_SKINS.forEach(skin => {
  window.SKINS_MAP[skin.id] = skin;
});
