import { AGE_CATEGORIES } from '../constants/ageCategories';

export const PRODUCTS = [
  { 
    id: 1, 
    name: 'Paracetamol 500mg Tablets', 
    price: 35.00, 
    stock: 100, 
    ageCategory: AGE_CATEGORIES.ADULT,
    description: 'Adult strength pain reliever. Dosage: 1-2 tablets every 4-6 hours (max 8 tablets in 24 hours). For ages 12 and above.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    name: 'Children\'s Paracetamol 250mg/5ml Suspension', 
    price: 45.00, 
    stock: 80, 
    ageCategory: AGE_CATEGORIES.CHILD,
    description: 'For children 6-12 years: 10-20ml every 4-6 hours. For children 2-5 years: 5-10ml every 4-6 hours. Max 4 doses in 24 hours.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    name: 'Infant Paracetamol 120mg/5ml Drops', 
    price: 55.00, 
    stock: 60, 
    ageCategory: AGE_CATEGORIES.INFANT,
    description: '3-12 months: 2.5ml (60mg). 1-2 years: 5ml (120mg). Use enclosed dropper. Max 4 doses in 24 hours.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    name: 'First Aid Kit Professional', 
    price: 599.00, 
    stock: 50, 
    ageCategory: AGE_CATEGORIES.ALL,
    description: 'Complete emergency kit with bandages, antiseptic wipes, scissors, tweezers, and basic medical supplies. Suitable for all ages.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 5, 
    name: 'Adult Amoxicillin 500mg', 
    price: 125.00, 
    stock: 90, 
    ageCategory: AGE_CATEGORIES.ADULT,
    description: 'Antibiotic for bacterial infections. Adult dosage: 500mg three times daily. Prescription required. Ages 12+.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 6, 
    name: 'Children\'s Amoxicillin 250mg/5ml', 
    price: 95.00, 
    stock: 75, 
    ageCategory: AGE_CATEGORIES.CHILD,
    description: 'For children 2-12 years. Dosage based on weight: 20-40mg/kg/day divided in 3 doses. Prescription required.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 7, 
    name: 'Adult Multivitamin Complex', 
    price: 445.00, 
    stock: 120, 
    ageCategory: AGE_CATEGORIES.ADULT,
    description: 'Complete daily vitamin supplement for adults 12+. Take one tablet daily with food. Contains essential vitamins A-Z and minerals.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 8, 
    name: 'Children\'s Multivitamin Gummies', 
    price: 395.00, 
    stock: 100, 
    ageCategory: AGE_CATEGORIES.CHILD,
    description: 'Ages 2-12 years. Take 2 gummies daily. Sugar-free, natural flavors. Contains essential vitamins for growing children.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 9, 
    name: 'Infant Vitamin D3 Drops 400 IU', 
    price: 275.00, 
    stock: 70, 
    ageCategory: AGE_CATEGORIES.INFANT,
    description: 'For infants 0-24 months. One drop (400 IU) daily. Essential for healthy bone development and immune system.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 10, 
    name: 'Antiseptic Solution 100ml', 
    price: 85.00, 
    stock: 200, 
    ageCategory: AGE_CATEGORIES.ALL,
    description: 'For cleaning minor wounds and cuts. Safe for all ages. External use only. Apply directly or dilute with water as needed.',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 11, 
    name: 'Children\'s Ibuprofen 100mg/5ml', 
    price: 65.00, 
    stock: 85, 
    ageCategory: AGE_CATEGORIES.CHILD,
    description: 'Ages 2-12 years. 2-3 years: 5ml. 4-6 years: 7.5ml. 7-9 years: 10ml. 10-12 years: 15ml. Every 6-8 hours.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 12, 
    name: 'Adult Ibuprofen 400mg', 
    price: 45.00, 
    stock: 150, 
    ageCategory: AGE_CATEGORIES.ADULT,
    description: 'Adults and children over 12 years: 1-2 tablets every 4-6 hours. Maximum 6 tablets in 24 hours.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 13, 
    name: 'Infant Gripe Water 150ml', 
    price: 125.00, 
    stock: 60, 
    ageCategory: AGE_CATEGORIES.INFANT,
    description: 'For infants 0-6 months: 2.5ml after feeds. 6-24 months: 5ml after feeds. Helps relieve colic and wind.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 14, 
    name: 'Digital Thermometer', 
    price: 299.00, 
    stock: 100, 
    ageCategory: AGE_CATEGORIES.ALL,
    description: 'Accurate temperature measurement for all ages. Features flexible tip and fever alert. Includes protective case.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 15, 
    name: 'Children\'s Allergy Syrup 5mg/5ml', 
    price: 145.00, 
    stock: 80, 
    ageCategory: AGE_CATEGORIES.CHILD,
    description: '2-5 years: 2.5ml twice daily. 6-12 years: 5ml twice daily. For relief of allergy symptoms.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];