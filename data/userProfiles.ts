import type { UserProfile } from '~/types/profile'

const DEFAULT_PROFILE_IMAGE = {
  src: 'https://m.atx.name/s/inflacka/student.ng',
  alt: 'Default profile avatar',
  width: 64,
  height: 64
}

export const userProfiles: UserProfile[] = [
  {
    id: 'default',
    name: 'Standardní košík ČSÚ',
    description: 'Oficiální váhy používané Českým statistickým úřadem',
    categories: [],
    image: {
      src: 'https://m.atx.name/s/inflacka/basket.png',
      alt: 'Default profile avatar',
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
      { categoryId: 'food', amount: 6000 },
      { categoryId: 'transport', amount: 2000 }
    ],
    image: {
      src: 'https://m.atx.name/s/inflacka/student.png',
      alt: 'Default profile avatar',
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
      src: 'https://m.atx.name/s/inflacka/family.png',
      alt: 'Default profile avatar',
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
      src: 'https://m.atx.name/s/inflacka/senior.png',
      alt: 'Default profile avatar',
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
      src: 'https://m.atx.name/s/inflacka/custom.png',
      alt: 'Default profile avatar',
      width: 64,
      height: 64
    }
  }
]