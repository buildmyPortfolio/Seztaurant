"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "main" | "pasta" | "vegetable" | "dessert";
type SizeOption = { label: string; price: number };

type MenuItem = {
  id: string;
  name: string;
  description: string;
  note?: string;
  category: Category;
  icon: string;
  price?: number | null;
  sizes?: SizeOption[];
  image?: string;
};

// ─── Category styles ──────────────────────────────────────────────────────────

const CAT_CONFIG = {
  main: {
    label: "Main Dish",
    imgLight: "from-amber-50 to-orange-100",
    imgDark: "dark:from-amber-950/70 dark:to-orange-950/70",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  pasta: {
    label: "Pasta",
    imgLight: "from-yellow-50 to-amber-100",
    imgDark: "dark:from-yellow-950/70 dark:to-amber-950/70",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  vegetable: {
    label: "Vegetable",
    imgLight: "from-emerald-50 to-teal-100",
    imgDark: "dark:from-emerald-950/70 dark:to-teal-950/70",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  dessert: {
    label: "Dessert & Kakanin",
    imgLight: "from-pink-50 to-rose-100",
    imgDark: "dark:from-pink-950/70 dark:to-rose-950/70",
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  },
} as const;

const CATEGORIES: { key: Category; label: string; emoji: string; count: number }[] = [
  { key: "main",      label: "Main Dish",         emoji: "🍖", count: 22 },
  { key: "pasta",     label: "Pasta",             emoji: "🍝", count: 9  },
  { key: "vegetable", label: "Vegetable",         emoji: "🥦", count: 6  },
  { key: "dessert",   label: "Dessert & Kakanin", emoji: "🍰", count: 6  },
];

// ─── Menu Data ────────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  // ── MAIN DISH ──────────────────────────────────────────────────────────────
  {
    id: "pork-shanghai",
    name: "Pork Shanghai",
    description: "Crispy fried lumpia rolls packed with seasoned ground pork, vegetables, and aromatic spices. Golden on the outside, juicy and flavorful inside. A guaranteed crowd-pleaser at every gathering.",
    note: "50 pieces",
    category: "main",
    icon: "🥟",
    price: 650,
    image: "/assets/pork-shanghai.jpg",
  },
  {
    id: "pork-barbecue",
    name: "Pork Barbecue",
    description: "Tender pork skewers marinated overnight in a sweet-savory blend of soy sauce, kalamansi, and brown sugar, then grilled over charcoal to smoky perfection. Filipino BBQ at its finest.",
    note: "25 pieces",
    category: "main",
    icon: "🍡",
    price: 750,
    image: "/assets/pork-barbecue.png",
  },
  {
    id: "pork-liempo-bbq",
    name: "Pork Liempo BBQ w/ Sauce",
    description: "Thick-cut pork belly marinated in a rich barbecue blend, grilled until the skin is perfectly caramelized and the meat is fall-apart tender. Served with a house-made dipping sauce.",
    category: "main",
    icon: "🥩",
    price: 950,
    image: "/assets/pork-liempo-bbq.jpg",
  },
  {
    id: "pork-hamonado",
    name: "Pork Hamonado",
    description: "Succulent pork slow-braised in pineapple juice and soy sauce until melt-in-your-mouth tender. The luscious sweet-savory glaze that coats every bite makes this a Filipino celebration staple.",
    category: "main",
    icon: "🍖",
    price: 950,
    image: "/assets/pork-hamonado.jpg",
  },
  {
    id: "pork-binagoongan",
    name: "Pork Binagoongan",
    description: "Tender braised pork belly cooked with fermented shrimp paste (bagoong), creating a bold, deeply savory dish that pairs beautifully with garlic fried rice. Rich, pungent, and absolutely delicious.",
    category: "main",
    icon: "🫙",
    price: 900,
    image: "/assets/pork-binagoongan.png",
  },
  {
    id: "creamy-pork-mushroom",
    name: "Creamy Pork w/ Mushroom",
    description: "Juicy pork strips simmered in a rich, velvety cream sauce loaded with earthy mushrooms. Comforting Filipino-style fusion at its finest — perfect over steamed white rice.",
    category: "main",
    icon: "🍄",
    price: 950,
    image: "/assets/creamy-pork-mushroom.jpg",
  },
  {
    id: "pork-humba",
    name: "Pork Humba",
    description: "A Visayan-style braised pork belly slow-cooked with soy sauce, vinegar, brown sugar, and banana blossoms. Sweet, tangy, and deeply comforting — a dish that feels like a warm hug.",
    category: "main",
    icon: "🫕",
    price: 950,    image: "/assets/pork-humba.jpg",  },
  {
    id: "bicol-express",
    name: "Bicol Express",
    description: "A fiery Bicolano classic — pork strips slow-simmered in thick coconut milk with bird\'s eye chili and shrimp paste. Creamy, spicy, and utterly addictive. A must-try Filipino comfort dish.",
    category: "main",
    icon: "🌶️",
    price: 900,
    image: "/assets/bicol-express.jpg",
  },
  {
    id: "caldereta",
    name: "Caldereta",
    description: "Hearty pork stew slow-cooked in a rich tomato-liver sauce with potatoes, carrots, and bell peppers. Deep, complex flavors that develop beautifully over time — a Filipino fiesta essential.",
    category: "main",
    icon: "🥘",
    price: 900,
    image: "/assets/kaldareta.png",
  },
  {
    id: "menudo",
    name: "Menudo",
    description: "A Filipino staple — tender diced pork with liver, potatoes, raisins, and bell peppers in a rich tomato sauce. The balance of sweet and savory makes this a timeless comfort dish for all occasions.",
    category: "main",
    icon: "🥘",
    price: 900,
    image: "/assets/menudo.png",
  },
  {
    id: "igado",
    name: "Igado",
    description: "An Ilocano classic — pork tenderloin and liver sautéed with soy sauce, vinegar, and aromatics. Bright, punchy flavors with a satisfying depth that pairs perfectly with steamed rice.",
    category: "main",
    icon: "🍖",
    price: 900,
    image: "/assets/igado.jpg",
  },
  {
    id: "kare-kare",
    name: "Kare-Kare",
    description: "A beloved Filipino feast dish — slow-simmered oxtail and vegetables in a thick, nutty peanut sauce with annatto coloring. Traditionally served with fermented bagoong on the side.",
    category: "main",
    icon: "🥜",
    price: 950,
    image: "/assets/kare-kare.jpg",
  },
  {
    id: "garlic-butter-shrimp",
    name: "Garlic Butter Shrimp",
    description: "Plump, fresh shrimp tossed in a fragrant garlic butter sauce with seasoning and a squeeze of lemon. Simple, elegant, and incredibly flavorful — the dish that always disappears first.",
    category: "main",
    icon: "🦐",
    price: 800,
    image: "/assets/garlic-butter-shrimp.png",
  },
  {
    id: "beef-broccoli",
    name: "Beef Broccoli",
    description: "Tender beef strips and crisp broccoli florets stir-fried in a glossy, savory oyster sauce glaze. A classic that strikes the perfect balance between hearty protein and fresh vegetable crunch.",
    category: "main",
    icon: "🥦",
    price: 999,
    image: "/assets/beef-broccoli.png",
  },
  {
    id: "creamy-beef-mushroom",
    name: "Creamy Beef w/ Mushroom",
    description: "Slow-cooked beef in a luxurious cream and mushroom sauce — rich, silky, and deeply comforting. Perfect over steamed rice or served alongside crusty bread at any gathering.",
    category: "main",
    icon: "🍄",
    price: 999,
    image: "/assets/creamy-beef-mushroom.png",
  },
  {
    id: "fish-fillet",
    name: "Fish Fillet",
    description: "Golden-fried fish fillet with a light, crispy coating and a flaky, tender interior. Seasoned just right and served with a zesty dipping sauce. Crowd-pleasing seafood at its simplest and best.",
    category: "main",
    icon: "🐟",
    price: 750,
    image: "/assets/fish-fillet.jpg",
  },
  {
    id: "chicken-fillet",
    name: "Chicken Fillet",
    description: "Juicy chicken breast strips with a perfectly seasoned, golden-crispy crust. Tender inside, satisfyingly crunchy outside. A versatile dish loved by kids and adults alike at every occasion.",
    category: "main",
    icon: "🍗",
    price: 750,
    image: "/assets/chicken-fillet.png",
  },
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    description: "Crispy, well-seasoned chicken wings available in four bold flavors. Garlic Butter for rich savory depth, Honey Glaze for sticky-sweet perfection, Buffalo for a spicy kick, and BBQ for smoky sweetness.",
    note: "Garlic Butter · Honey Glaze · Buffalo · BBQ",
    category: "main",
    icon: "🍗",
    price: 800,
    image: "/assets/chicken-wings.png",
  },
  {
    id: "cordon-bleu",
    name: "Cordon Bleu",
    description: "Chicken breast stuffed with savory ham and melted cheese, breaded and fried to a glorious golden perfection. A timeless classic reinvented Filipino-style — elegant enough for any celebration.",
    category: "main",
    icon: "🧀",
    price: 800,
    image: "/assets/cordon-bleu.png",
  },
  {
    id: "fried-chicken",
    name: "Fried Chicken",
    description: "Classic Filipino-style fried chicken with crispy, perfectly seasoned skin and juicy, flavorful meat inside. Marinated for hours for maximum depth — comfort food that never gets old.",
    category: "main",
    icon: "🍗",
    price: 800,
    image: "/assets/fried-chicken.jpg",
  },
  {
    id: "chicken-bbq-sauce",
    name: "Chicken BBQ w/ Sauce",
    description: "Marinated chicken grilled over charcoal and basted with a sweet, smoky BBQ glaze. Smoky, tender, and packed with flavor — the quintessential Filipino BBQ experience for your gathering.",
    category: "main",
    icon: "🍡",
    price: 900,
    image: "/assets/chicken-bbq-sauce.jpg",
  },
  {
    id: "chicken-sweet-sour",
    name: "Chicken Sweet and Sour",
    description: "Crispy-fried chicken pieces coated in a vibrant sweet-and-sour sauce with colorful bell peppers. Tangy, sweet, and utterly satisfying — a dish that brings smiles to the table every time.",
    category: "main",
    icon: "🍋",
    price: 900,
    image: "/assets/chicken-sweet-sour.png",
  },

  // ── PASTA ──────────────────────────────────────────────────────────────────
  {
    id: "creamy-carbonara",
    name: "Creamy Carbonara",
    description: "Pasta in a rich, velvety cream sauce with smoky bacon bits and a touch of black pepper. Filipino-style carbonara done right — thick, indulgent, and always the first pasta to be finished.",
    category: "pasta",
    icon: "🍝",
    image: "/assets/carbonara.jpg",
    sizes: [
      { label: "Medium",  price: 750  },
      { label: "Large",   price: 850  },
      { label: "X-Large", price: 999  },
    ],
  },
  {
    id: "tuna-pasta",
    name: "Tuna Pasta",
    description: "Tender pasta tossed with flaked tuna, tomatoes, and herbs in a light, flavorful sauce. Fresh, satisfying, and perfect for every gathering — a lighter pasta option that still delivers on taste.",
    category: "pasta",
    icon: "🐟",
    image: "/assets/tuna-pasta.jpg",
    sizes: [
      { label: "Medium",  price: 750 },
      { label: "Large",   price: 850 },
      { label: "X-Large", price: 999 },
    ],
  },
  {
    id: "hungarian-pasta",
    name: "Hungarian Pasta",
    description: "Pasta loaded with sliced Hungarian sausage in a savory, slightly spiced tomato cream sauce. Hearty, flavorful, and incredibly satisfying — a pasta that makes people reach for seconds.",
    category: "pasta",
    icon: "🌭",
    image: "/assets/hungarian-pasta.jpg",
    sizes: [
      { label: "Medium",  price: 750 },
      { label: "Large",   price: 850 },
      { label: "X-Large", price: 999 },
    ],
  },
  {
    id: "creamy-spaghetti",
    name: "Creamy Spaghetti",
    description: "A beloved Filipino-style sweet spaghetti — creamy tomato meat sauce tossed with perfectly cooked pasta. A nostalgic party staple that kids and adults equally adore. Always the first to disappear.",
    category: "pasta",
    icon: "🍝",
    image: "/assets/creamy-spaghetti.png",
    sizes: [
      { label: "Medium",  price: 750 },
      { label: "Large",   price: 850 },
      { label: "X-Large", price: 999 },
    ],
  },
  {
    id: "bakemac",
    name: "BakeMAC",
    description: "Macaroni pasta baked in a rich, creamy cheese sauce until golden and bubbly on top. Pure cheesy comfort in every spoonful — the crowd-favorite that never fails to impress at any occasion.",
    category: "pasta",
    icon: "🧀",
    image: "/assets/bakemac.jpg",
    sizes: [
      { label: "Medium",  price: 750 },
      { label: "Large",   price: 850 },
      { label: "X-Large", price: 999 },
    ],
  },
  {
    id: "lasagna",
    name: "Lasagna",
    description: "Layers of flat pasta, richly seasoned meat sauce, and silky béchamel, baked to a perfect bubbling golden top. A true showstopper for any celebration — impressive, hearty, and deeply satisfying.",
    category: "pasta",
    icon: "🫕",
    image: "/assets/lasagna.jpg",
    sizes: [
      { label: "Medium",  price: 800  },
      { label: "Large",   price: 950  },
      { label: "X-Large", price: 1100 },
    ],
  },
  {
    id: "palabok",
    name: "Palabok",
    description: "Thick rice noodles drenched in a rich, savory shrimp-based gravy and topped with crushed chicharon, boiled eggs, tinapa flakes, and spring onions. A Filipino celebration staple, full of tradition.",
    category: "pasta",
    icon: "🍜",
    image: "/assets/palabok.png",
    sizes: [
      { label: "Medium",  price: 650 },
      { label: "Large",   price: 800 },
      { label: "X-Large", price: 900 },
    ],
  },
  {
    id: "pansit-canton",
    name: "Pansit Canton",
    description: "Stir-fried egg noodles with tender chicken, pork, and a colorful mix of vegetables in a savory sauce. A classic Filipino pansit that symbolizes long life and good fortune — always a hit.",
    category: "pasta",
    icon: "🍜",
    image: "/assets/pansit-canton.jpg",
    sizes: [
      { label: "Medium",  price: 700 },
      { label: "Large",   price: 850 },
      { label: "X-Large", price: 950 },
    ],
  },
  {
    id: "pansit-bihon",
    name: "Pansit Bihon",
    description: "Silky thin rice vermicelli stir-fried with vegetables, chicken, and pork in a light, flavorful sauce. A Filipino celebration essential — light on the palate but rich in authentic homemade flavor.",
    category: "pasta",
    icon: "🍜",
    image: "/assets/pansit-bihon.jpg",
    sizes: [
      { label: "Medium",  price: 650 },
      { label: "Large",   price: 800 },
      { label: "X-Large", price: 900 },
    ],
  },

  // ── VEGETABLE ──────────────────────────────────────────────────────────────
  {
    id: "sipo-egg",
    name: "Sipo Egg / Mix Veggies",
    description: "Tender quail eggs and a colorful medley of fresh vegetables — carrots, snap peas, baby corn, and mushrooms — in a delicate, savory oyster sauce. Light, nutritious, and beautifully colorful.",
    category: "vegetable",
    icon: "🥚",
    price: 850,
    image: "/assets/sipo-egg.jpg",
  },
  {
    id: "chopsuey",
    name: "Chopsuey",
    description: "A vibrant Filipino stir-fry with a rainbow of fresh vegetables cooked in a light, umami-rich sauce. Colorful, nutritious, and deliciously satisfying — the perfect complement to any meat dish.",
    category: "vegetable",
    icon: "🥬",
    price: 800,
    image: "/assets/chopsuey.png",
  },
  {
    id: "fresh-lumpia",
    name: "Fresh Lumpia",
    description: "Soft crepe-like wrappers filled with a savory mixture of fresh vegetables, pork, and shrimp. Served with a sweet garlic sauce and crushed peanuts. Fresh, healthy, and incredibly satisfying.",
    note: "25 pieces",
    category: "vegetable",
    icon: "🥗",
    price: 750,
    image: "/assets/fresh-lumpia.jpg",
  },
  {
    id: "lumpiang-hubad",
    name: "Lumpiang Hubad",
    description: "The \'naked\' lumpia — all the delicious filling served without the wrapper. Topped with sweet garlic sauce, crushed peanuts, and spring onions. A healthier twist on a beloved Filipino classic.",
    category: "vegetable",
    icon: "🌯",
    price: 650,
    image: "/assets/lumpiang-hubad.jpg",
  },
  {
    id: "veggie-spring-rolls",
    name: "Veggie Spring Rolls",
    description: "Crispy golden spring rolls packed with seasoned vegetables and glass noodles. Light, crunchy, and the perfect finger food for any celebration. Served with a sweet dipping sauce.",
    note: "25 pieces",
    category: "vegetable",
    icon: "🥟",
    price: 550,
    image: "/assets/veggie-spring-rolls.png",
  },
  {
    id: "laing",
    name: "Laing",
    description: "A Bicolano treasure — dried taro leaves slow-simmered in thick coconut milk with chili peppers and dried fish until rich, creamy, and deeply flavorful. Bold, coconutty, and utterly irresistible.",
    category: "vegetable",
    icon: "🌿",
    price: 750,
    image: "/assets/laing.jpg",
  },

  // ── DESSERT ────────────────────────────────────────────────────────────────
  {
    id: "baked-kalamay",
    name: "Baked Kalamay",
    description: "Traditional Filipino sticky rice cake slow-cooked to achieve a rich, caramel-like depth of sweetness. Topped with latik for the perfect finish. Dense, chewy, and wonderfully satisfying.",
    category: "dessert",
    icon: "🍮",
    price: 400,
    image: "/assets/baked-kalamay.png",
  },
  {
    id: "biko",
    name: "Biko",
    description: "Sweet glutinous rice cooked in coconut milk and muscovado sugar, topped with a crispy caramelized latik. A beloved Filipino kakanin that warms the soul — perfect for any celebration.",
    category: "dessert",
    icon: "🍚",
    price: 400,
    image: "/assets/biko.png",
  },
  {
    id: "fruit-salad",
    name: "Fruit Salad",
    description: "A chilled medley of tropical fruits — nata de coco, kaong, and peaches — mixed in sweet cream and condensed milk. Refreshing, creamy, and utterly irresistible. The dessert everyone looks forward to.",
    category: "dessert",
    icon: "🍓",
    price: 800,
    image: "/assets/fruit-salad.jpg",
  },
  {
    id: "coffee-jelly",
    name: "Coffee Jelly",
    description: "Smooth coffee-flavored jelly cubes bathed in sweetened cream — a beloved Filipino dessert with the perfect balance of bold coffee and sweet, silky cream. Cool, satisfying, and totally addictive.",
    category: "dessert",
    icon: "☕",
    price: 700,
    image: "/assets/coffee-jelly.jpg",
  },
  {
    id: "buko-pandan",
    name: "Buko Pandan",
    description: "Tender young coconut strips and vibrant pandan-flavored jelly in a luscious sweetened cream. Cool, fragrant, and utterly refreshing — the quintessential Filipino dessert that screams celebration.",
    category: "dessert",
    icon: "🥥",
    price: 750,
    image: "/assets/buko-pandan.jpg",
  },
  {
    id: "customize-cake",
    name: "Customize Cake",
    description: "Tell us your occasion — birthday, anniversary, or any special celebration — and we\'ll create a custom cake tailored just for you. Reach out with your preferences, design ideas, and we\'ll make it unforgettable.",
    category: "dessert",
    icon: "🎂",
    price: null,
    image: "/assets/customize-cake.jpg",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDisplayPrice(item: MenuItem): string {
  if (item.sizes?.length) {
    const min = Math.min(...item.sizes.map((s) => s.price));
    return `From ₱${min.toLocaleString()}`;
  }
  if (!item.price) return "Ask for price";
  return `₱${item.price.toLocaleString()}`;
}

// ─── MenuCard ─────────────────────────────────────────────────────────────────

function MenuCard({
  item,
  index,
  onClick,
}: {
  item: MenuItem;
  index: number;
  onClick: () => void;
}) {
  const cfg = CAT_CONFIG[item.category];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      onClick={onClick}
      className={`
        group relative text-left w-full rounded-2xl overflow-hidden cursor-pointer
        bg-white dark:bg-[#111111]
        border border-stone-200/80 dark:border-white/[0.07]
        shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-gold/[0.08]
        hover:border-gold/50 dark:hover:border-gold/30
        hover:-translate-y-1.5
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
        focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-[#070707]
      `}
    >
      <div className="w-full text-left">
        {/* ── Placeholder image ── */}
        <div
          className={`relative aspect-[4/3] bg-gradient-to-br overflow-hidden
            ${cfg.imgLight} ${cfg.imgDark}`}
        >
          {/* Future real image */}
          {item.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Emoji (hidden when real image exists) */}
          {!item.image && (
            <span className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl select-none pointer-events-none drop-shadow-md transition-transform duration-500 group-hover:scale-110">
              {item.icon}
            </span>
          )}

          {/* Category badge top-left */}
          <span className={`absolute top-3 left-3 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${cfg.badge}`}>
            {cfg.label}
          </span>

          {/* Price pill bottom-right */}
          <span className="absolute bottom-3 right-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 dark:bg-black/65 backdrop-blur-sm font-sans font-bold text-gold text-xs sm:text-sm tabular-nums shadow-sm">
            {getDisplayPrice(item)}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 text-white text-[11px] font-bold tracking-[0.15em] uppercase bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/25">
              View Details →
            </span>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-4 sm:p-5">
          <h3 className="font-display font-bold text-stone-800 dark:text-white/90 text-base sm:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-[#b8922b] dark:group-hover:text-gold transition-colors duration-300">
            {item.name}
          </h3>

          <p className="font-sans text-stone-500 dark:text-white/40 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
            {item.description}
          </p>

          {item.note && (
            <p className="font-sans text-stone-400 dark:text-white/25 text-[11px] italic mb-2">
              {item.note}
            </p>
          )}

          {item.sizes && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {item.sizes.map((s) => (
                <span key={s.label} className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/[0.06] text-stone-500 dark:text-white/40 border border-stone-200 dark:border-white/[0.06]">
                  {s.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── MenuModal ────────────────────────────────────────────────────────────────

function MenuModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const cfg = CAT_CONFIG[item.category];
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    item.sizes ? item.sizes[item.sizes.length - 1] : null
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const displayPrice = selectedSize
    ? `₱${selectedSize.price.toLocaleString()}`
    : item.price
    ? `₱${item.price.toLocaleString()}`
    : "Ask for price";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 32 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#161616] border border-stone-200 dark:border-white/[0.08] shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className={`relative aspect-video overflow-hidden rounded-t-3xl ${!item.image ? `bg-gradient-to-br ${cfg.imgLight} ${cfg.imgDark}` : "bg-stone-100 dark:bg-[#1a1a1a]"}`}>
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-8xl sm:text-9xl select-none drop-shadow-xl">
                {item.icon}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="px-5 sm:px-8 pb-7 sm:pb-8 -mt-3 relative">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full ${cfg.badge}`}>
                {cfg.label}
              </span>
              {item.note && (
                <span className="text-[10px] font-medium px-3 py-1.5 rounded-full bg-stone-100 dark:bg-white/[0.07] text-stone-500 dark:text-white/40 border border-stone-200 dark:border-white/[0.08]">
                  {item.note}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-800 dark:text-white leading-tight mb-3">
              {item.name}
            </h2>

            {/* Description */}
            <p className="font-sans text-stone-500 dark:text-white/55 text-sm sm:text-base leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-stone-100 dark:bg-white/[0.06] mb-5" />

            {/* Size picker for pasta */}
            {item.sizes && (
              <div className="mb-6">
                <p className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 dark:text-white/30 mb-3">
                  Choose Size
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {item.sizes.map((s) => {
                    const active = selectedSize?.label === s.label;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setSelectedSize(s)}
                        className={`flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "bg-gold border-gold text-background shadow-md shadow-gold/25 scale-105"
                            : "border-stone-200 dark:border-white/[0.1] text-stone-500 dark:text-white/50 hover:border-gold/50 dark:hover:border-gold/40 hover:bg-stone-50 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="text-[10px] font-medium opacity-75">{s.label}</span>
                        <span className="tabular-nums font-bold">₱{s.price.toLocaleString()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price display */}
            <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/[0.04] border border-stone-100 dark:border-white/[0.04]">
              <span className="font-sans text-xs text-stone-400 dark:text-white/30 tracking-widest uppercase">
                {item.sizes ? "Selected Price" : "Price"}
              </span>
              <span className="font-display text-2xl font-bold text-gold tabular-nums">
                {displayPrice}
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <a
                href="#order"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full bg-gold hover:bg-gold-light text-background font-semibold text-xs sm:text-sm tracking-wider uppercase text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/25"
              >
                Order This Dish
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3.5 rounded-full bg-stone-100 dark:bg-white/[0.06] border border-stone-200 dark:border-white/[0.1] text-stone-500 dark:text-white/50 hover:text-stone-800 dark:hover:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── MenuSection ──────────────────────────────────────────────────────────────

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("main");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <>
      <section
        id="menu"
        ref={ref}
        className="relative py-24 sm:py-32 bg-[#F8F5EE] dark:bg-[#070707] overflow-hidden"
      >
        {/* ── Background glows ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gold/[0.03] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-green/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-4 sm:mb-5">
              Made to Order · 15–18 Pax
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-white leading-[1.1] mb-4 sm:mb-5">
              Our <span className="text-shimmer">Menu</span>
            </h2>
            <p className="font-sans text-stone-500 dark:text-white/35 text-sm max-w-md mx-auto leading-relaxed px-4">
              Click any dish to see the full description and details. All orders require 2–3 days advance notice.
            </p>
          </motion.div>

          {/* ── Category tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-gold text-background font-semibold shadow-md shadow-gold/30 scale-105"
                      : "bg-white dark:bg-white/[0.04] text-stone-500 dark:text-white/50 hover:text-stone-800 dark:hover:text-white border border-stone-200 dark:border-white/[0.08] hover:border-gold/40 dark:hover:border-gold/30"
                  }`}
                >
                  <span className="text-sm sm:text-base leading-none">{cat.emoji}</span>
                  {cat.label}
                  <span className={`text-[9px] sm:text-[10px] font-normal rounded-full px-1.5 py-0.5 ${
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-stone-100 dark:bg-white/10 text-stone-400 dark:text-white/30"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Card grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
            >
              {filtered.map((item, idx) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onClick={() => setSelected(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom disclaimer ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center font-sans text-[11px] text-stone-400 dark:text-white/25 mt-10 sm:mt-12 leading-relaxed px-4"
          >
            All orders are placed 2–3 days before pick-up or delivery date.
            Delivery shipping fee is shouldered by the customer.
          </motion.p>

        </div>
      </section>

      {/* ── Modal (outside section, z-index above everything) ── */}
      <AnimatePresence>
        {selected && (
          <MenuModal key={selected.id} item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
