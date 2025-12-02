const Category = {
  PRODUCTS: 'products',
  CAFES_RESTAURANTS: 'cafes_restaurants',
  TRANSPORT: 'transport',
  PHARMACY_MEDICINE: 'pharmacy_medicine',
  CLOTHING_SHOES: 'clothing_shoes',
  UTILITIES: 'utilities',
  ONLINE_SHOPING : 'online_shopping',
  SUBSCRIPTIONS: 'subscriptions',
  ELECTRONICS: 'electronics',
  ENTERTAINMENT: 'entertainment',
  EARNING: 'earning'
};

const CategoryLabel = {
  [Category.PRODUCTS]: 'Продукты',
  [Category.CAFES_RESTAURANTS]: 'Кафе и рестораны',
  [Category.TRANSPORT]: 'Транспорт',
  [Category.PHARMACY_MEDICINE]: 'Аптека и медицина',
  [Category.CLOTHING_SHOES]: 'Одежда и обувь',
  [Category.UTILITIES]: 'Коммунальные услуги',
  [Category.ONLINE_SHOPING]: 'Онлайн-покупки',
  [Category.SUBSCRIPTIONS]: 'Подписки',
  [Category.ELECTRONICS]: 'Электроника',
  [Category.ENTERTAINMENT]: 'Развлечения',
  [Category.EARNING]: 'Доходы',
}

const Month = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь'
}

export { Category, CategoryLabel, Month };