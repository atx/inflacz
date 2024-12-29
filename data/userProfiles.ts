import type { UserProfile } from '~/types/profile'

export const userProfiles: UserProfile[] = [
  {
    id: 'default',
    name: 'Standardní košík ČSÚ',
    description: 'Oficiální váhy používané Českým statistickým úřadem',
    categories:
      [
  {
    "categoryId": "food",
    "amount": 8870.0
  },
  {
    "categoryId": "restaurants",
    "amount": 2850.0
  },
  {
    "categoryId": "alcohol",
    "amount": 4230.0
  },
  {
    "categoryId": "housing_rent",
    "amount": 1660.0
  },
  {
    "categoryId": "housing_own",
    "amount": 5170.0
  },
  {
    "categoryId": "clothing",
    "amount": 2200.0
  },
  {
    "categoryId": "housing_utilities",
    "amount": 6090.0
  },
  {
    "categoryId": "furniture",
    "amount": 2900.0
  },
  {
    "categoryId": "health",
    "amount": 1390.0
  },
  {
    "categoryId": "transport_personal",
    "amount": 4820.0
  },
  {
    "categoryId": "transport_public",
    "amount": 460.0
  },
  {
    "categoryId": "communication",
    "amount": 1340.0
  },
  {
    "categoryId": "computers",
    "amount": 670.0
  },
  {
    "categoryId": "recreation",
    "amount": 3370.0
  },
  {
    "categoryId": "education",
    "amount": 310.0
  },
  {
    "categoryId": "hotels",
    "amount": 390.0
  },
  {
    "categoryId": "miscellaneous",
    "amount": 3280.0
  }
]
    ,
    image: {
      src: '/images/profiles/basket.png',
      alt: 'Ikonka nákupního košíku',
      width: 64,
      height: 64
    }
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Typické výdaje mladého studenta (nájem, MHD, potraviny)',
    categories: [
      { categoryId: 'food', amount: 6000 },
      { categoryId: 'restaurants', amount: 1000 },
      { categoryId: 'alcohol', amount: 200 },
      { categoryId: 'housing_rent', amount: 6000 },
      { categoryId: 'housing_own', amount: 0 },
      { categoryId: 'clothing', amount: 500 },
      { categoryId: 'housing_utilities', amount: 1000 },
      { categoryId: 'furniture', amount: 250 },
      { categoryId: 'health', amount: 500 },
      { categoryId: 'transport_personal', amount: 200 },
      { categoryId: 'transport_public', amount: 200 },
      { categoryId: 'communication', amount: 300 },
      { categoryId: 'computers', amount: 500 },
      { categoryId: 'recreation', amount: 500 },
      { categoryId: 'education', amount: 200 },
      { categoryId: 'hotels', amount: 200 },
      { categoryId: 'miscellaneous', amount: 250 },
    ],
    image: {
      src: '/images/profiles/student.png',
      alt: 'Ikonka s mladým studentem',
      width: 64,
      height: 64
    }
  },
  {
    id: 'family',
    name: 'Mladá rodina',
    description: 'Rodina s dětmi (bydlení, potraviny, vzdělávání)',
    categories: [
      { categoryId: 'food', amount: 10000 },
      { categoryId: 'restaurants', amount: 2000 },
      { categoryId: 'alcohol', amount: 300 },
      { categoryId: 'housing_rent', amount: 0 },
      { categoryId: 'housing_own', amount: 20000 },
      { categoryId: 'clothing', amount: 1500 },
      { categoryId: 'housing_utilities', amount: 3000 },
      { categoryId: 'furniture', amount: 1000 },
      { categoryId: 'health', amount: 1000 },
      { categoryId: 'transport_personal', amount: 2000 },
      { categoryId: 'transport_public', amount: 500 },
      { categoryId: 'communication', amount: 400 },
      { categoryId: 'computers', amount: 1000 },
      { categoryId: 'recreation', amount: 1000 },
      { categoryId: 'education', amount: 500 },
      { categoryId: 'hotels', amount: 1000 },
      { categoryId: 'miscellaneous', amount: 1000 },
    ],
    image: {
      src: '/images/profiles/family.png',
      alt: 'Ikonka s rodinou',
      width: 64,
      height: 64
    }
  },
  {
    id: 'senior',
    name: 'Senior',
    description: 'Důchodce (léky, potraviny, energie)',
    categories: [
      { categoryId: 'food', amount: 6000 },
      { categoryId: 'restaurants', amount: 500 },
      { categoryId: 'alcohol', amount: 100 },
      { categoryId: 'housing_rent', amount: 0 },
      { categoryId: 'housing_own', amount: 5000 },
      { categoryId: 'clothing', amount: 500 },
      { categoryId: 'housing_utilities', amount: 3000 },
      { categoryId: 'furniture', amount: 500 },
      { categoryId: 'health', amount: 2000 },
      { categoryId: 'transport_personal', amount: 500 },
      { categoryId: 'transport_public', amount: 200 },
      { categoryId: 'communication', amount: 200 },
      { categoryId: 'computers', amount: 300 },
      { categoryId: 'recreation', amount: 500 },
      { categoryId: 'education', amount: 0 },
      { categoryId: 'hotels', amount: 500 },
      { categoryId: 'miscellaneous', amount: 1000 },
    ],
    image: {
      src: '/images/profiles/senior.png',
      alt: 'Ikonka se starším člověkem používajicím chodítko',
      width: 64,
      height: 64
    }
  },
  {
    id: 'custom',
    name: 'Vlastní nastavení',
    description: 'Vytvořte si vlastní složení spotřebního koše',
    categories: [],
    image: {
      src: '/images/profiles/custom.png',
      alt: 'Ikonka s ozubeným kolem',
      width: 64,
      height: 64
    }
  }
]
