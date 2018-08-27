// must match kiwi backend

export const COUPONS = {
  CODER: 'CODER',
  LETSCODE: 'LETSCODE',
  LEARN: 'LEARN',
  CREATE: 'CREATE',
  KIWI: 'KIWI',
}

export const COUPON_LANGUAGE = {
  [COUPONS.CODER]:    'Your first month is $10 off!',
  [COUPONS.LETSCODE]: 'Your first month is 10% off!',
  [COUPONS.LEARN]:    'Your first month is 20% off!',
  [COUPONS.CREATE]:   'Your first month is 30% off!',
  [COUPONS.KIWI]:     'Your first month is 50% off!',
}

export const COUPON_DETAILS = {
  [COUPONS.CODER]:    { value: 10, type: 'dollars', text: '$10 off' },
  [COUPONS.LETSCODE]: { value: 10, type: 'percent', text: '10% off' },
  [COUPONS.LEARN]:    { value: 20, type: 'percent', text: '20% off' },
  [COUPONS.CREATE]:   { value: 30, type: 'percent', text: '30% off' },
  [COUPONS.KIWI]:     { value: 50, type: 'percent', text: '50% off' },
}