import {
  PricingTier,
  PricingTierFrequency,
} from '@/data/config/pricingDataInterface';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    id: 'tier-1',
    href: '/subscribe',
    discountPrice: { '1': '', '2': '' },
    price: { '1': '$0', '2': '$0' },
    description: 'Get all goodies for free, no credit card required.',
    features: [
      'Multi-platform compatibility',
      'Real-time notification system',
      'Advanced user permissions',
    ],
    featured: false,
    highlighted: false,
    cta: 'Sign up',
  },
];

export const pricingFrequencies: PricingTierFrequency[] = [
  {
    id: 'bb75f1a0-fb3a-4f10-8cab-8ca0c97ed182',
    value: '1',
    label: 'Monthly',
    priceSuffix: '/month',
  },
  {
    id: '1a999b5e-4253-44d6-9789-f5261c36601d',
    value: '2',
    label: 'Annually',
    priceSuffix: '/year',
  },
];
