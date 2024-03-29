export const Products = [
  {
    id: 1,
    title: "Sicilian",
    category: "Sembako",
    img: "/temporary/p1.png",
    buyPrice: 20000,
    sellPrice: 25000,
    stock: 60,
  },
  {
    id: 2,
    title: "Bacon Deluxe",
    category: "Sembako",
    img: "/temporary/p2.png",
    buyPrice: 15000,
    sellPrice: 20000,
    stock: 100,
  },
  {
    id: 3,
    title: "Bella Napoli",
    category: "Sembako",
    img: "/temporary/p3.png",
    buyPrice: 3000,
    sellPrice: 5000,
    stock: 200,
  },
  {
    id: 4,
    title: "Spicy Arrabbiata",
    category: "Sembako",
    img: "/temporary/p4.png",
    buyPrice: 48000,
    sellPrice: 60000,
    stock: 30,
  },
  {
    id: 5,
    title: "Jalapeño Fiesta",
    category: "Sembako",
    img: "/temporary/p5.png",
    buyPrice: 22000,
    sellPrice: 26000,
    stock: 67,
  },
  {
    id: 6,
    title: "Margherita Magic",
    category: "Sembako",
    img: "/temporary/p6.png",
    buyPrice: 8000,
    sellPrice: 12000,
    stock: 55,
  },
  {
    id: 7,
    title: "Garlic Parmesan Linguine",
    category: "Makanan Ringan",
    img: "/temporary/p7.png",
    buyPrice: 1500,
    sellPrice: 2000,
    stock: 120,
  },
  {
    id: 8,
    title: "Mediterranean Delight",
    category: "Makanan Ringan",
    img: "/temporary/p8.png",
    buyPrice: 7000,
    sellPrice: 10000,
    stock: 80,
  },
  {
    id: 9,
    title: "Hawaiian Teriyaki",
    category: "Makanan Ringan",
    img: "/temporary/p9.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 10,
    title: "Product 10",
    category: "Produk Kebersihan",
    img: "/temporary/p10.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 11,
    title: "Product 11",
    category: "Makanan Ringan",
    img: "/temporary/p11.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 12,
    title: "Product 12",
    category: "Produk Kebersihan",
    img: "/temporary/p12.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 13,
    title: "Product 13",
    category: "Produk Kebersihan",
    img: "/temporary/p13.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 14,
    title: "Product 14",
    category: "Produk Kebersihan",
    img: "/temporary/p14.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 15,
    title: "Product 15",
    category: "Minuman Kemasan",
    img: "/temporary/p15.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 16,
    title: "Product 16",
    category: "Minuman Kemasan",
    img: "/temporary/p16.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 17,
    title: "Product 17",
    category: "Minuman Kemasan",
    img: "/temporary/p17.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 18,
    title: "Product 18",
    category: "Makanan Ringan",
    img: "/temporary/p18.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
  {
    id: 19,
    title: "Product 12",
    category: "Makanan Ringan",
    img: "/temporary/p12.png",
    buyPrice: 80000,
    sellPrice: 100000,
    stock: 32,
  },
];

export const Category = [
  {
    id: 1,
    title: "Makanan Ringan",
  },
  {
    id: 2,
    title: "Minuman Kemasan",
  },
  {
    id: 3,
    title: "Produk Kebersihan",
  },
  {
    id: 4,
    title: "Sembako",
  },
];

export const Expenses = [
  {
    id: 1,
    date: "17 April 2024",
    desc: "Menambah stok barang",
    nominal: 2000000,
  },
  {
    id: 2,
    date: "17 April 2024",
    desc: "Keperluan pribadi",
    nominal: 300000,
  },
  {
    id: 3,
    date: "18 April 2024",
    desc: "Memperbaiki warung",
    nominal: 6000000,
  },
  {
    id: 4,
    date: "19 April 2024",
    desc: "Menambah stok barang",
    nominal: 1500000,
  },
  {
    id: 6,
    date: "19 April 2024",
    desc: "Renovasi warung",
    nominal: 10000000,
  },
];

export const Transactions = [
  {
    id: 1,
    date: "17 April 2024",
    products: [
      { title: "Sicilian", quantity: 3, price: 25000, totalPrice: 75000 },
      { title: "Bacon Deluxe", quantity: 2, price: 20000, totalPrice: 40000 },
      { title: "Bella Napoli", quantity: 1, price: 5000, totalPrice: 5000 },
    ],
    totalProfit: 30000,
    totalTransaction: 120000,
    cash: 150000,
    change: 30000,
  },
  {
    id: 2,
    date: "17 April 2024",
    products: [
      { title: "Spicy Arrabbiata", quantity: 1, price: 25000, totalPrice: 25000 },
      { title: "Bacon Deluxe", quantity: 4, price: 20000, totalPrice: 80000 },
    ],
    totalProfit: 30000,
    totalTransaction: 105000,
    cash: 110000,
    change: 5000,
  },
  {
    id: 3,
    date: "18 April 2024",
    products: [
      { title: "Jalapeño Fiesta", quantity: 1, price: 26000, totalPrice: 26000 },
      { title: "Margherita Magic", quantity: 2, price: 12000, totalPrice: 24000 },
    ],
    totalProfit: 30000,
    totalTransaction: 50000,
    cash: 50000,
    change: 0,
  },
  {
    id: 4,
    date: "18 April 2024",
    products: [
      { title: "Bacon Deluxe", quantity: 4, price: 20000, totalPrice: 80000 },
      { title: "Jalapeño Fiesta", quantity: 1, price: 26000, totalPrice: 26000 },
      { title: "Margherita Magic", quantity: 2, price: 12000, totalPrice: 24000 },
      { title: "Garlic Parmesan Linguine", quantity: 3, price: 2000, totalPrice: 6000 },
    ],
    totalProfit: 30000,
    totalTransaction: 6000,
    cash: 10000,
    change: 4000,
  },
  {
    id: 5,
    date: "19 April 2024",
    products: [
      { title: "Sicilian", quantity: 3, price: 25000, totalPrice: 75000 },
      { title: "Bacon Deluxe", quantity: 2, price: 20000, totalPrice: 40000 },
      { title: "Jalapeño Fiesta", quantity: 1, price: 26000, totalPrice: 26000 },
      { title: "Garlic Parmesan Linguine", quantity: 2, price: 2000, totalPrice: 4000 },
      { title: "Mediterranean Delight", quantity: 3, price: 10000, totalPrice: 30000 },
      { title: "Hawaiian Teriyaki", quantity: 1, price: 100000, totalPrice: 100000 },
    ],
    totalProfit: 30000,
    totalTransaction: 275000,
    cash: 300000,
    change: 25000,
  },
  {
    id: 6,
    date: "20 April 2024",
    products: [
      { title: "Jalapeño Fiesta", quantity: 1, price: 26000, totalPrice: 26000 },
      { title: "Margherita Magic", quantity: 2, price: 12000, totalPrice: 24000 },
    ],
    totalProfit: 30000,
    totalTransaction: 50000,
    cash: 50000,
    change: 0,
  },
  {
    id: 7,
    date: "20 April 2024",
    products: [{ title: "Garlic Parmesan Linguine", quantity: 1, price: 2000, totalPrice: 2000 }],
    totalProfit: 30000,
    totalTransaction: 2000,
    cash: 5000,
    change: 3000,
  },
];

export const Reports = [
  {
    id: 1,
    date: "17 April 2024",
    transaction: 300000,
    expense: 70000,
    grossProfit: 230000,
    netProfit: 11500,
  },
  {
    id: 2,
    date: "18 April 2024",
    transaction: 450000,
    expense: 50000,
    grossProfit: 400000,
    netProfit: 20000,
  },
  {
    id: 3,
    date: "19 April 2024",
    transaction: 2000000,
    expense: 100000,
    grossProfit: 1900000,
    netProfit: 95000,
  },
  {
    id: 4,
    date: "20 April 2024",
    transaction: 3200000,
    expense: 140000,
    grossProfit: 3060000,
    netProfit: 153000,
  },
  {
    id: 5,
    date: "20 April 2024",
    transaction: 740000,
    expense: 0,
    grossProfit: 740000,
    netProfit: 37000,
  },
  {
    id: 6,
    date: "20 April 2024",
    transaction: 5000000,
    expense: 0,
    grossProfit: 5000000,
    netProfit: 250000,
  },
  {
    id: 7,
    date: "21 April 2024",
    transaction: 5000000,
    expense: 0,
    grossProfit: 5000000,
    netProfit: 250000,
  },
  {
    id: 8,
    date: "22 April 2024",
    transaction: 5000000,
    expense: 0,
    grossProfit: 5000000,
    netProfit: 250000,
  },
  {
    id: 9,
    date: "23 April 2024",
    transaction: 5000000,
    expense: 0,
    grossProfit: 5000000,
    netProfit: 250000,
  },
  {
    id: 10,
    date: "24 April 2024",
    transaction: 5000000,
    expense: 0,
    grossProfit: 5000000,
    netProfit: 250000,
  },
  {
    id: 11,
    date: "25 April 2024",
    transaction: 10000000,
    expense: 0,
    grossProfit: 10000000,
    netProfit: 500000,
  },
];
