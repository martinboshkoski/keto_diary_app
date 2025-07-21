import { Recipe } from '../types';

export const ketoRecipes: Recipe[] = [
  // Breakfast recipes
  {
    id: 'scrambled-eggs-bacon',
    name: 'Кајгана со бекон',
    type: 'breakfast',
    ingredients: [
      { foodId: 'jajca', grams: 150 },
      { foodId: 'bacon', grams: 50 },
      { foodId: 'maslo', grams: 10 }
    ],
    instructions: [
      'Исечи го бeконот на парчиња',
      'Пржи го бeконот во тава',
      'Додај масло во тавата',
      'Разбиј ги јајцата и додај ги',
      'Мешај додека не се сварат'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },
  {
    id: 'avocado-eggs',
    name: 'Авокадо со јајца',
    type: 'breakfast',
    ingredients: [
      { foodId: 'avokado', grams: 150 },
      { foodId: 'jajca', grams: 100 },
      { foodId: 'maslinjovo-maslo', grams: 5 }
    ],
    instructions: [
      'Исечи го авокадото на половина',
      'Извади ја коската',
      'Разбиј јајце во секоја половина',
      'Капни маслиново масло',
      'Пеци 15 минути на 180°C'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },
  {
    id: 'bulletproof-coffee',
    name: 'Буллетпруф кафе',
    type: 'breakfast',
    ingredients: [
      { foodId: 'coffee', grams: 250 },
      { foodId: 'maslo', grams: 15 },
      { foodId: 'mct-oil', grams: 10 }
    ],
    instructions: [
      'Направи силно кафе',
      'Додај масло и MCT масло',
      'Мешај во блендер 30 секунди',
      'Служи топло'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },

  // Lunch recipes
  {
    id: 'chicken-salad',
    name: 'Пилешка салата',
    type: 'lunch',
    ingredients: [
      { foodId: 'pileshko-file', grams: 150 },
      { foodId: 'spinat', grams: 100 },
      { foodId: 'avokado', grams: 80 },
      { foodId: 'feta', grams: 50 },
      { foodId: 'maslinjovo-maslo', grams: 15 }
    ],
    instructions: [
      'Испржи го пилешкото филе',
      'Исечи го на коцки',
      'Измиј го спанаќот',
      'Исечи го авокадото',
      'Измешај сè со маслиново масло'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },
  {
    id: 'salmon-broccoli',
    name: 'Лосос со брокула',
    type: 'lunch',
    ingredients: [
      { foodId: 'salmon', grams: 150 },
      { foodId: 'brokula', grams: 150 },
      { foodId: 'maslo', grams: 20 },
      { foodId: 'garlic', grams: 5 }
    ],
    instructions: [
      'Испржи го лососот со масло',
      'Сфри ја брокулата',
      'Додај лук за вкус',
      'Служи заедно'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },

  // Dinner recipes
  {
    id: 'beef-mushrooms',
    name: 'Говедско со печурки',
    type: 'dinner',
    ingredients: [
      { foodId: 'govedsko-meso', grams: 200 },
      { foodId: 'mushrooms', grams: 150 },
      { foodId: 'heavy-cream', grams: 50 },
      { foodId: 'maslo', grams: 15 }
    ],
    instructions: [
      'Исечи го месото на коцки',
      'Пржи го во масло',
      'Додај ги печурките',
      'Додај павлака и вари 10 мин'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },
  {
    id: 'pork-cauliflower',
    name: 'Свињско со карфиол',
    type: 'dinner',
    ingredients: [
      { foodId: 'svinjsko-meso', grams: 180 },
      { foodId: 'karfiol', grams: 200 },
      { foodId: 'cheddar', grams: 50 },
      { foodId: 'maslo', grams: 15 }
    ],
    instructions: [
      'Испржи го свињското месо',
      'Сфри го карфиолот',
      'Додај сирење за топење',
      'Мешај и служи'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },

  // Snack recipes
  {
    id: 'cheese-olives',
    name: 'Сирење со маслинки',
    type: 'snack',
    ingredients: [
      { foodId: 'sirenje', grams: 50 },
      { foodId: 'olives', grams: 30 },
      { foodId: 'oreви', grams: 20 }
    ],
    instructions: [
      'Исечи го сирењето на коцки',
      'Додај маслинки',
      'Додај ореви',
      'Служи како снек'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  },
  {
    id: 'avocado-nuts',
    name: 'Авокадо со јаткасти',
    type: 'snack',
    ingredients: [
      { foodId: 'avokado', grams: 100 },
      { foodId: 'badem', grams: 25 },
      { foodId: 'lemon-juice', grams: 5 }
    ],
    instructions: [
      'Исечи го авокадото',
      'Додај бадеми',
      'Капни лимонов сок',
      'Мешај и јади'
    ],
    totalNutrition: { netCarbs: 0, fat: 0, protein: 0, calories: 0 },
    servings: 1
  }
];

export const mealTypes = [
  { key: 'random', label: 'Случаен рецепт', icon: '🎲' },
  { key: 'breakfast', label: 'Појадок', icon: '🍳' },
  { key: 'lunch', label: 'Ручек', icon: '🥗' },
  { key: 'dinner', label: 'Вечера', icon: '🍖' },
  { key: 'snack', label: 'Снек', icon: '🥜' }
] as const;