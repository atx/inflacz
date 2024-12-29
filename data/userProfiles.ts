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
      { categoryId: 'housing_rent', amount: 8000 },
      { categoryId: 'food', amount: 6000 }
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
      { categoryId: 'housing', amount: 15000 },
      { categoryId: 'food', amount: 10000 },
      { categoryId: 'education', amount: 3000 }
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
      { categoryId: 'housing', amount: 8000 },
      { categoryId: 'food', amount: 6000 },
      { categoryId: 'health', amount: 2000 }
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
