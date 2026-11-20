// All page content lives here so it can be edited without touching UI code.
// Shop details are placeholders. Replace them with the real ones.

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  name: "Fresh Basket",
  tagline: "Your neighbourhood grocery",
  description:
    "Fresh fruit, crisp vegetables, warm bread and everyday essentials from your friendly neighbourhood grocery shop.",
  since: 2014,
  phone: "(555) 012-3456",
  phoneHref: "tel:+15550123456",
  email: "hello@freshbasket.example",
  address: {
    street: "123 Market Street",
    city: "Springfield",
  },
  mapQuery: "123 Market Street, Springfield",
  socials: [
    { label: "Instagram", short: "IG", href: "#" },
    { label: "Facebook", short: "FB", href: "#" },
    { label: "X", short: "X", href: "#" },
  ],
};

export const hours = [
  { days: "Mon – Fri", time: "7:00 – 22:00", opens: "07:00", closes: "22:00", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
  { days: "Saturday", time: "8:00 – 22:00", opens: "08:00", closes: "22:00", schema: ["Saturday"] },
  { days: "Sunday", time: "9:00 – 20:00", opens: "09:00", closes: "20:00", schema: ["Sunday"] },
];

export const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#offers", label: "Offers" },
  { href: "#about", label: "About" },
  { href: "#visit", label: "Visit Us" },
  { href: "#feedback", label: "Feedback" },
];

export const slides = [
  {
    image: unsplash("1542838132-92c53300491e", 1920),
    alt: "Shelves of colourful fresh vegetables and fruit",
    badge: "Open daily · 7am – 10pm",
    title: "Fresh from the farm to your table",
    text: "Your neighbourhood grocery for crisp vegetables, juicy fruit and everyday essentials.",
    cta: { label: "Shop categories", href: "#products" },
    secondary: { label: "Find us", href: "#visit" },
  },
  {
    image: unsplash("1610832958506-aa56368176cf", 1920),
    alt: "Assorted bright tropical and citrus fruits",
    badge: "This week",
    title: "Juicy seasonal fruit, picked at its peak",
    text: "Up to 20% off berries, citrus and tropical favourites.",
    cta: { label: "See offers", href: "#offers" },
  },
  {
    image: unsplash("1488459716781-31db52582fe9", 1920),
    alt: "Fresh vegetables on a market stall",
    badge: "Local growers",
    title: "Supporting farms within 50 miles",
    text: "Every week we restock with produce from local growers we know by name.",
    cta: { label: "Our story", href: "#about" },
  },
  {
    image: unsplash("1509440159596-0249088772ff", 1920),
    alt: "Rustic loaves of freshly baked bread",
    badge: "Baked this morning",
    title: "Warm bread, every single morning",
    text: "Sourdough, baguettes and pastries from our partner bakery, delivered at dawn.",
    cta: { label: "Browse bakery", href: "#products" },
  },
];

export const highlights = [
  { icon: "leaf", title: "Farm-fresh daily", text: "Restocked every morning" },
  { icon: "sprout", title: "Local produce", text: "From nearby growers" },
  { icon: "tag", title: "Fair prices", text: "No surprises at checkout" },
  { icon: "bike", title: "Free delivery", text: "On orders over $30 nearby" },
] as const;

export const categories = [
  { title: "Fruits", count: "120+ items", text: "Apples, berries, citrus and exotic picks.", image: unsplash("1619566636858-adf3ef46400b", 800), alt: "A colourful selection of fresh fruit" },
  { title: "Vegetables", count: "90+ items", text: "Crisp greens, roots and seasonal veg.", image: unsplash("1540420773420-3366772f4999", 800), alt: "Fresh green vegetables" },
  { title: "Dairy & Eggs", count: "60+ items", text: "Milk, cheese, yoghurt and free-range eggs.", image: unsplash("1550583724-b2692b85b150", 800), alt: "Bottles and glasses of fresh milk" },
  { title: "Bakery", count: "40+ items", text: "Fresh loaves, rolls and sweet treats.", image: unsplash("1509440159596-0249088772ff", 800), alt: "Freshly baked bread loaves" },
  { title: "Pantry", count: "200+ items", text: "Oils, grains, spices and cupboard staples.", image: unsplash("1474979266404-7eaacbcd87c5", 800), alt: "Olive oil and pantry staples" },
  { title: "Beverages", count: "80+ items", text: "Juices, teas, coffee and sparkling drinks.", image: unsplash("1544145945-f90425340c7e", 800), alt: "Colourful fresh drinks with lime" },
];

export const offers = [
  { title: "Mixed Berries", badge: "20% off", price: "$4.79", was: "$5.99", image: unsplash("1601004890684-d8cbf643f5f2", 800), alt: "Fresh strawberries" },
  { title: "Organic Bananas", badge: "2 for 1", price: "$1.49", was: "$2.98", image: unsplash("1528825871115-3581a5387919", 800), alt: "A peeled banana" },
  { title: "Crisp Red Apples", badge: "15% off", price: "$2.54", was: "$2.99", image: unsplash("1567306226416-28f0efdc88ce", 800), alt: "Red apples piled together" },
];

export const about = {
  image: unsplash("1534723452862-4c874018d66d", 1200),
  alt: "Inside the grocery shop",
  stats: [
    { value: "40+", label: "Local suppliers" },
    { value: "5k", label: "Happy customers" },
    { value: "4.9★", label: "Average rating" },
  ],
};

export const feedbackImage = {
  image: unsplash("1498557850523-fd3d118b962e", 900),
  alt: "Close-up of fresh blueberries",
};
