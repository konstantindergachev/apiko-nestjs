export const orders = [
  {
    total: (175.19 + 185.3).toFixed(2),
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 2 },
    ],
    shipment: {
      fullname: 'John Doe',
      phone: '+12220099',
      country: 'usa',
      city: 'chicago',
      address: 'edge str. 12',
    },
    created_at: '2022-02-09 11:22:21.626573',
    updated_at: '2022-02-09 11:22:21.626573',
    user_id: 1,
    account_id: 2,
  },
  {
    total: (384.1 + 263.08).toFixed(2),
    items: [
      { product_id: 4, quantity: 3 },
      { product_id: 5, quantity: 1 },
    ],
    shipment: {
      fullname: 'Jill Doe',
      phone: '+12223322',
      country: 'usa',
      city: 'chicago',
      address: 'edge str. 12',
    },
    created_at: '2022-02-10 10:52:21.013602',
    updated_at: '2022-02-10 10:52:21.013602',
    user_id: 2,
    account_id: 1,
  },
];
