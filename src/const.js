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

export { Category, CategoryLabel };