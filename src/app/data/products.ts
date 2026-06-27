import { productImages, type ProductImageName } from "./productImages";

export type Badge = "bio" | "nouveau" | "bestseller" | "promo";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  badge?: Badge;
  benefits?: string[];
  origin?: string;
  weight?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  count?: number;
}

type ProductImageInput = Pick<Product, "id" | "name" | "category">;

const categoryThemes: Record<string, { from: string; to: string; accent: string; backdrop: string }> = {
  poudres: { from: "#E8D3A2", to: "#B87732", accent: "#6B3F1D", backdrop: "#FFF7E8" },
  feuilles: { from: "#B7D1A8", to: "#4D7A4A", accent: "#274B28", backdrop: "#F2F8EF" },
  huiles: { from: "#F4D38A", to: "#C9801D", accent: "#7A4B10", backdrop: "#FFF7E4" },
  cosmetiques: { from: "#EBC7D4", to: "#B86D86", accent: "#6F3D52", backdrop: "#FFF4F8" },
  graines: { from: "#D8C99B", to: "#8B6F3E", accent: "#564326", backdrop: "#FBF6E8" },
  autres: { from: "#C8D9C7", to: "#6A8C66", accent: "#3E5A3A", backdrop: "#F3F8F1" },
};

const powderImg = "./poudre.jpg";
const leafImg = "./plante.jpg";
const oilImg = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&auto=format";
const cosmeticImg = "./cosmetique.jpg";
const seedImg = "./graine.jpg";
const teaImg = "./the.jpg";

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatProductLabel(name: string) {
  return name
    .replace(/^Poudre de /i, "")
    .replace(/^Huile de /i, "")
    .replace(/^Feuilles de /i, "")
    .replace(/^Graines de /i, "")
    .replace(/^Beurre de /i, "")
    .replace(/^Thé /i, "")
    .replace(/^Thé de /i, "")
    .replace(/^Pétales de /i, "")
    .replace(/^Boutons de /i, "")
    .replace(/^Bâton de /i, "")
    .replace(/^Fleur de /i, "")
    .replace(/^Pommade de /i, "")
    .replace(/^Graisse de /i, "")
    .replace(/^Vitamine /i, "")
    .trim();
}

function createProductImage({ id, name, category }: ProductImageInput) {
  const theme = categoryThemes[category] ?? categoryThemes.autres;
  const hash = hashString(id);
  const label = formatProductLabel(name);
  const shortLabel = label.length > 18 ? `${label.slice(0, 16).trim()}…` : label;
  const rotation = hash % 360;
  const accentRotation = (hash * 7) % 360;
  const opacity = 0.14 + ((hash % 7) * 0.02);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(name)}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.backdrop}" />
          <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
        <linearGradient id="main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.from}" />
          <stop offset="100%" stop-color="${theme.to}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="url(#bg)" />
      <circle cx="180" cy="170" r="150" fill="url(#glow)" opacity="0.9" />
      <circle cx="650" cy="120" r="120" fill="${theme.from}" opacity="${opacity}" />
      <circle cx="680" cy="650" r="170" fill="${theme.to}" opacity="${opacity}" />
      <g transform="translate(400 380)">
        <circle r="210" fill="#FFFFFF" opacity="0.72" />
        <circle r="185" fill="url(#main)" opacity="0.16" />
        <path d="M0 -110 C80 -110 140 -50 140 20 C140 90 80 145 0 145 C-80 145 -140 90 -140 20 C-140 -50 -80 -110 0 -110Z" fill="url(#main)" opacity="0.18" transform="rotate(${rotation})" />
        <path d="M0 -138 C48 -100 82 -48 82 18 C82 84 48 136 0 174 C-48 136 -82 84 -82 18 C-82 -48 -48 -100 0 -138Z" fill="url(#main)" opacity="0.26" transform="rotate(${accentRotation})" />
        <circle r="92" fill="${theme.from}" opacity="0.16" />
        <circle r="64" fill="${theme.to}" opacity="0.2" />
      </g>
      <text x="80" y="580" fill="${theme.accent}" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700">
        ${escapeXml(shortLabel)}
      </text>
      <text x="80" y="630" fill="${theme.accent}" font-family="Arial, sans-serif" font-size="24" opacity="0.72">
        ${escapeXml("Source Verde")}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

export const categories: Category[] = [
  {
    id: "poudres",
    name: "Poudres",
    icon: "🌾",
    description: "Poudres médicinales et cosmétiques naturelles",
    image: "./poudre.jpg",
  },
  {
    id: "feuilles",
    name: "Plantes & Feuilles",
    icon: "🌿",
    description: "Herbes aromatiques et plantes médicinales séchées",
    image: "./plante.jpg",
  },
  {
    id: "huiles",
    name: "Huiles végétales",
    icon: "🫒",
    description: "Huiles précieuses pour la beauté et le bien-être",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: "cosmetiques",
    name: "Cosmétiques",
    icon: "✨",
    description: "Soins naturels et beurres végétaux artisanaux",
    image: "./cosmetique.jpg",
  },
  {
    id: "graines",
    name: "Graines",
    icon: "🌱",
    description: "Superaliments et graines nutritives de qualité",
    image: "./graine.jpg",
  },
  {
    id: "autres",
    name: "Thés & Divers",
    icon: "🍵",
    description: "Thés détox, infusions relaxantes et céréales",
    image: "./the.jpg",
  },
];

const baseProducts: Product[] = [
  // Poudres
  { id: "p1", name: "Poudre de Chébé", category: "poudres", description: "Poudre traditionnelle africaine pour fortifier et allonger les cheveux", price: 12.99, image: powderImg, badge: "bestseller", benefits: ["Renforce les cheveux", "Stimule la pousse", "Hydrate le cuir chevelu"], origin: "Tchad" },
  { id: "p2", name: "Poudre d'Amla", category: "poudres", description: "Riche en vitamine C, fortifie et fait briller les cheveux", price: 9.99, image: powderImg, badge: "bio", benefits: ["Fortifie les cheveux", "Riche en vitamine C", "Prévient les cheveux blancs"], origin: "Inde" },
  { id: "p3", name: "Poudre de Nigelle", category: "poudres", description: "Antioxydant naturel puissant, immunostimulant reconnu", price: 8.99, image: powderImg, badge: "bestseller", benefits: ["Boost immunitaire", "Anti-inflammatoire", "Antioxydant puissant"], origin: "Éthiopie" },
  { id: "p4", name: "Poudre de Fenugrec", category: "poudres", description: "Stimule la croissance capillaire et hydrate la peau", price: 7.99, image: powderImg, badge: "bio", benefits: ["Croissance capillaire", "Hydratation peau", "Équilibre hormonal"], origin: "Inde" },
  { id: "p5", name: "Poudre de Curcuma", category: "poudres", description: "Anti-inflammatoire et antioxydant aux mille vertus", price: 6.99, image: powderImg, badge: "bio", benefits: ["Anti-inflammatoire", "Détox naturel", "Éclat du teint"], origin: "Inde" },
  { id: "p6", name: "Poudre de Cactus Indien", category: "poudres", description: "Hydratation intense pour la peau et les cheveux", price: 11.99, image: powderImg, benefits: ["Hydratation intense", "Répare les pointes", "Apaise le cuir chevelu"], origin: "Maroc" },
  { id: "p7", name: "Poudre de Cannelle", category: "poudres", description: "Stimule la circulation et apporte chaleur et vitalité", price: 5.99, image: powderImg, badge: "bio", benefits: ["Stimule la circulation", "Antibactérien", "Aromatique"], origin: "Sri Lanka" },
  { id: "p8", name: "Poudre de Moringa", category: "poudres", description: "Superaliment riche en nutriments essentiels", price: 13.99, image: powderImg, badge: "nouveau", benefits: ["Superaliment complet", "Énergie naturelle", "Antioxydant"], origin: "Afrique de l'Ouest" },
  { id: "p9", name: "Poudre de Cumin", category: "poudres", description: "Digestif naturel, favorise le transit et la digestion", price: 5.49, image: powderImg, badge: "bio", benefits: ["Digestif naturel", "Anti-ballonnements", "Antispasmodique"], origin: "Maroc" },
  { id: "p10", name: "Poudre de Kigelia", category: "poudres", description: "Raffermissant naturel pour la peau et la poitrine", price: 14.99, image: powderImg, badge: "bestseller", benefits: ["Raffermit la peau", "Tonifiant naturel", "Anti-âge"], origin: "Afrique" },
  { id: "p11", name: "Poudre de Maca", category: "poudres", description: "Adaptogène énergisant, équilibre hormonal naturel", price: 15.99, image: powderImg, badge: "nouveau", benefits: ["Énergie et vitalité", "Équilibre hormonal", "Libido naturelle"], origin: "Pérou" },
  { id: "p12", name: "Eau de Rose", category: "poudres", description: "Tonique floral délicat, parfume et hydrate la peau", price: 8.99, image: powderImg, badge: "bio", benefits: ["Tonique cutané", "Parfum naturel", "Hydratation légère"], origin: "Maroc" },

  // Feuilles
  { id: "f1", name: "Camomille", category: "feuilles", description: "Apaisante et relaxante, idéale en infusion digestive", price: 6.99, image: leafImg, badge: "bio", benefits: ["Relaxante", "Anti-stress", "Digestive"], origin: "France" },
  { id: "f2", name: "Feuilles de Nigelle", category: "feuilles", description: "Propriétés thérapeutiques multiples, immunostimulantes", price: 7.49, image: leafImg, badge: "bestseller", benefits: ["Boost immunitaire", "Antioxydant", "Anti-inflammatoire"], origin: "Égypte" },
  { id: "f3", name: "Verveine", category: "feuilles", description: "Digestive et calmante, parfum citronné subtil", price: 5.99, image: leafImg, badge: "bio", benefits: ["Digestive", "Calmante", "Détox légère"], origin: "France" },
  { id: "f4", name: "Feuilles de Framboisier", category: "feuilles", description: "Riche en minéraux, tonique pour la femme", price: 7.99, image: leafImg, benefits: ["Tonique féminin", "Riche en minéraux", "Préparation accouchement"], origin: "France" },
  { id: "f5", name: "Sauge", category: "feuilles", description: "Purifiante et antiseptique, régule la transpiration", price: 6.49, image: leafImg, badge: "bio", benefits: ["Antiseptique", "Régule transpiration", "Purifiante"], origin: "Espagne" },
  { id: "f6", name: "Hibiscus", category: "feuilles", description: "Antioxydant flamboyant, riche en vitamine C naturelle", price: 6.99, image: leafImg, badge: "bestseller", benefits: ["Vitamine C naturelle", "Antioxydant", "Tonique"], origin: "Sénégal" },
  { id: "f7", name: "Feuilles d'Olivier", category: "feuilles", description: "Antioxydant puissant, régule la tension artérielle", price: 8.99, image: leafImg, badge: "bio", benefits: ["Antioxydant", "Régule tension", "Antibactérien"], origin: "Tunisie" },
  { id: "f8", name: "Lavande", category: "feuilles", description: "Relaxante et parfumée, aide au sommeil naturellement", price: 7.49, image: leafImg, badge: "bio", benefits: ["Relaxante", "Aide au sommeil", "Anti-anxiété"], origin: "Provence" },
  { id: "f9", name: "Calendula", category: "feuilles", description: "Cicatrisante et apaisante, douce pour la peau sensible", price: 7.99, image: leafImg, benefits: ["Cicatrisante", "Apaisante", "Anti-inflammatoire"], origin: "France" },
  { id: "f10", name: "Ortie", category: "feuilles", description: "Reminéralisante, riche en fer et calcium naturels", price: 5.49, image: leafImg, badge: "bio", benefits: ["Reminéralisante", "Riche en fer", "Fortifie les ongles"], origin: "France" },
  { id: "f11", name: "Thym", category: "feuilles", description: "Antiseptique naturel puissant, soutient l'immunité", price: 5.99, image: leafImg, badge: "bio", benefits: ["Antiseptique", "Expectorant", "Immunostimulant"], origin: "Maroc" },
  { id: "f12", name: "Pissenlit", category: "feuilles", description: "Détoxifiant hépatique, draineur naturel du foie", price: 6.49, image: leafImg, benefits: ["Détox du foie", "Drainant", "Digestif"], origin: "France" },
  { id: "f13", name: "Pétales de Rose", category: "feuilles", description: "Tonique et régénérant, parfum floral délicat", price: 9.99, image: leafImg, badge: "nouveau", benefits: ["Tonique cutané", "Anti-stress", "Parfum naturel"], origin: "Maroc" },
  { id: "f14", name: "Ambunu", category: "feuilles", description: "Démêlant naturel exceptionnel pour les cheveux bouclés", price: 10.99, image: leafImg, badge: "bestseller", benefits: ["Démêlant naturel", "Hydratant", "Doux pour les boucles"], origin: "Tchad" },
  { id: "f15", name: "Boutons de Rose", category: "feuilles", description: "Aromatique et apaisant, richesse florale naturelle", price: 11.99, image: leafImg, badge: "nouveau", benefits: ["Apaisant", "Tonique", "Parfumant"], origin: "Iran" },
  { id: "f16", name: "Bâton de Cannelle", category: "feuilles", description: "Épice aromatique, stimulante et antiseptique naturelle", price: 6.99, image: leafImg, badge: "bio", benefits: ["Antiseptique", "Digestif", "Stimulant"], origin: "Sri Lanka" },
  { id: "f17", name: "Anis Étoilé", category: "feuilles", description: "Digestif et aromatique, parfum doux et réconfortant", price: 7.99, image: leafImg, badge: "bio", benefits: ["Digestif", "Antispasmodique", "Expectorant"], origin: "Chine" },

  // Huiles
  { id: "h1", name: "Huile de Fenugrec", category: "huiles", description: "Favorise la croissance capillaire et nourrit en profondeur", price: 14.99, image: oilImg, badge: "bestseller", benefits: ["Croissance capillaire", "Nourrissante", "Stimulante"], origin: "Inde" },
  { id: "h2", name: "Huile de Kigelia", category: "huiles", description: "Raffermissante naturelle pour la peau et la poitrine", price: 16.99, image: oilImg, badge: "bestseller", benefits: ["Raffermissante", "Tonifiante", "Anti-âge"], origin: "Afrique" },
  { id: "h3", name: "Huile de Baobab", category: "huiles", description: "Nourrissante et régénérante, riche en vitamines A, D, E, F", price: 15.99, image: oilImg, badge: "bio", benefits: ["Nourrissante", "Régénérante", "Anti-rides"], origin: "Afrique de l'Ouest" },
  { id: "h4", name: "Huile de Jojoba", category: "huiles", description: "Équilibrante et hydratante, régule le sébum naturellement", price: 13.99, image: oilImg, badge: "bio", benefits: ["Équilibrante", "Hydratante", "Régule sébum"], origin: "Mexique" },
  { id: "h5", name: "Huile d'Akpi", category: "huiles", description: "Stimule la pousse et donne du volume aux cheveux", price: 17.99, image: oilImg, badge: "nouveau", benefits: ["Stimule la pousse", "Volume cheveux", "Nourrit"], origin: "Côte d'Ivoire" },
  { id: "h6", name: "Huile de Soja", category: "huiles", description: "Riche en vitamines E et K, protège et nourrit la peau", price: 9.99, image: oilImg, badge: "bio", benefits: ["Riche en vitamines", "Protectrice", "Nourrissante"], origin: "France" },
  { id: "h7", name: "Huile de Rose Musquée", category: "huiles", description: "Anti-âge et réparatrice, efface cicatrices et ridules", price: 19.99, image: oilImg, badge: "bestseller", benefits: ["Anti-âge", "Efface cicatrices", "Régénérante"], origin: "Chili" },
  { id: "h8", name: "Huile de Moutarde", category: "huiles", description: "Stimulante et chauffante, favorise la circulation", price: 11.99, image: oilImg, benefits: ["Stimulante", "Circulation", "Chauffante"], origin: "Inde" },
  { id: "h9", name: "Huile de Tournesol", category: "huiles", description: "Adoucissante et légère, idéale pour peaux sensibles", price: 8.99, image: oilImg, badge: "bio", benefits: ["Adoucissante", "Légère", "Non comédogène"], origin: "France" },
  { id: "h10", name: "Huile d'Olive", category: "huiles", description: "Nourrissante et protectrice, riche en acides gras", price: 12.99, image: oilImg, badge: "bio", benefits: ["Nourrissante", "Protectrice", "Anti-oxydante"], origin: "Tunisie" },
  { id: "h11", name: "Huile de Busserole", category: "huiles", description: "Éclaircissante naturelle, unifie le teint en douceur", price: 18.99, image: oilImg, badge: "nouveau", benefits: ["Éclaircissante", "Unifie le teint", "Anti-taches"], origin: "Maroc" },
  { id: "h12", name: "Huile de Coco", category: "huiles", description: "Hydratation profonde, multi-usages peau et cheveux", price: 10.99, image: oilImg, badge: "bestseller", benefits: ["Hydratation profonde", "Multi-usages", "Antibactérien"], origin: "Philippines" },
  { id: "h13", name: "Vitamine E", category: "huiles", description: "Antioxydant puissant, protège et régénère les cellules", price: 14.99, image: oilImg, badge: "bio", benefits: ["Antioxydant", "Régénérant", "Anti-âge"], origin: "France" },

  // Cosmétiques
  { id: "c1", name: "Pierre d'Alun", category: "cosmetiques", description: "Déodorant naturel sans aluminium, assèche et purifie", price: 7.99, image: cosmeticImg, badge: "bestseller", benefits: ["Déodorant naturel", "Alun pur", "Sans produit chimique"], origin: "Maroc" },
  { id: "c2", name: "Musc Solide", category: "cosmetiques", description: "Parfum oriental naturel, longue tenue et enveloppant", price: 12.99, image: cosmeticImg, badge: "bestseller", benefits: ["Parfum naturel", "Longue tenue", "Oriental"], origin: "Arabie Saoudite" },
  { id: "c3", name: "Fleur de Nila", category: "cosmetiques", description: "Soin capillaire traditionnel, adoucit et donne du brillant", price: 9.99, image: cosmeticImg, benefits: ["Adoucit", "Brillance", "Soin traditionnel"], origin: "Afrique de l'Ouest" },
  { id: "c4", name: "Argile du Mont Saint-Michel", category: "cosmetiques", description: "Argile purifiante, absorbe le sébum en excès", price: 8.99, image: cosmeticImg, badge: "bio", benefits: ["Purifiante", "Absorbe sébum", "Nettoyante"], origin: "France" },
  { id: "c5", name: "Beurre d'Amande", category: "cosmetiques", description: "Nourrissant et émollient, peau douce et soyeuse", price: 11.99, image: cosmeticImg, badge: "bio", benefits: ["Nourrissant", "Émollient", "Peau douce"], origin: "Maroc" },
  { id: "c6", name: "Graisse de Chameau", category: "cosmetiques", description: "Hydratation intense et réparation des peaux abîmées", price: 15.99, image: cosmeticImg, badge: "nouveau", benefits: ["Hydratation intense", "Réparateur", "Peaux sèches"], origin: "Arabie Saoudite" },
  { id: "c7", name: "Beurre de Fenugrec", category: "cosmetiques", description: "Galbe et raffermit, idéal pour les courbes naturelles", price: 13.99, image: cosmeticImg, badge: "bestseller", benefits: ["Galbant", "Raffermissant", "Naturel"], origin: "Inde" },
  { id: "c8", name: "Beurre de Cacao", category: "cosmetiques", description: "Nourrissant en profondeur, peau soyeuse et parfumée", price: 10.99, image: cosmeticImg, badge: "bio", benefits: ["Nourrissant", "Soyeux", "Parfumé"], origin: "Ghana" },
  { id: "c9", name: "Beurre de Karité", category: "cosmetiques", description: "Hydratant et protecteur, multi-usages peau et cheveux", price: 12.99, image: cosmeticImg, badge: "bestseller", benefits: ["Hydratant", "Protecteur", "Multi-usages"], origin: "Burkina Faso" },
  { id: "c10", name: "Pommade de Kigelia", category: "cosmetiques", description: "Raffermissante naturelle pour la peau du corps", price: 16.99, image: cosmeticImg, badge: "nouveau", benefits: ["Raffermissante", "Tonifiante", "Anti-cellulite"], origin: "Afrique" },

  // Graines
  { id: "g1", name: "Graines de Chia", category: "graines", description: "Superaliment riche en oméga-3, fibres et protéines végétales", price: 8.99, image: seedImg, badge: "bestseller", benefits: ["Oméga-3", "Riche en fibres", "Protéines végétales"], origin: "Mexique" },
  { id: "g2", name: "Graines de Lin", category: "graines", description: "Riches en fibres et oméga-3, régulent le transit", price: 6.99, image: seedImg, badge: "bio", benefits: ["Transit intestinal", "Oméga-3", "Anti-inflammatoire"], origin: "France" },
  { id: "g3", name: "Graines de Moringa", category: "graines", description: "Nutritives et purifiantes, anti-oxydantes exceptionnelles", price: 9.99, image: seedImg, badge: "bio", benefits: ["Nutritives", "Purifiantes", "Antioxydantes"], origin: "Inde" },
  { id: "g4", name: "Graines de Courge", category: "graines", description: "Riches en zinc, bénéfiques pour la prostate et l'immunité", price: 7.99, image: seedImg, badge: "bio", benefits: ["Riches en zinc", "Prostate", "Immunostimulant"], origin: "Europe" },
  { id: "g5", name: "Clou de Girofle", category: "graines", description: "Antiseptique et analgésique naturel, antioxydant puissant", price: 6.49, image: seedImg, badge: "bio", benefits: ["Antiseptique", "Analgésique", "Antioxydant"], origin: "Madagascar" },
  { id: "g6", name: "Graines de Fenouil", category: "graines", description: "Digestives et carminatives, parfum doux et frais", price: 5.99, image: seedImg, badge: "bio", benefits: ["Digestives", "Anti-ballonnements", "Aromatiques"], origin: "Italie" },
  { id: "g7", name: "Graines de Moutarde", category: "graines", description: "Stimulantes et chauffantes, riches en acides gras", price: 5.49, image: seedImg, badge: "bio", benefits: ["Stimulantes", "Circulation", "Anti-rhumatismal"], origin: "France" },
  { id: "g8", name: "Graines de Nigelle", category: "graines", description: "Le remède de la médecine prophétique, immunostimulantes", price: 7.99, image: seedImg, badge: "bestseller", benefits: ["Immunostimulantes", "Antioxydant", "Prophétique"], origin: "Éthiopie" },
  { id: "g9", name: "Graines de Jasmin", category: "graines", description: "Parfumées et apaisantes, détente et relaxation", price: 11.99, image: seedImg, badge: "nouveau", benefits: ["Parfumées", "Apaisantes", "Relaxantes"], origin: "Maroc" },
  { id: "g10", name: "Noix du Brésil", category: "graines", description: "Riches en sélénium, protègent thyroïde et immunité", price: 12.99, image: seedImg, badge: "bio", benefits: ["Riches en sélénium", "Thyroïde", "Immunité"], origin: "Brésil" },
  { id: "g11", name: "Graines de Chanvre", category: "graines", description: "Protéines végétales complètes, riches en acides gras", price: 9.99, image: seedImg, badge: "bio", benefits: ["Protéines complètes", "Oméga-3/6", "Énergie"], origin: "France" },
  { id: "g12", name: "Graines de Sésame", category: "graines", description: "Riches en calcium naturel, fortifient os et dents", price: 6.99, image: seedImg, badge: "bio", benefits: ["Calcium naturel", "Os et dents", "Antioxydant"], origin: "Éthiopie" },
  { id: "g13", name: "Baie de Goji", category: "graines", description: "Antioxydant légendaire, vitalité et longévité naturelle", price: 13.99, image: seedImg, badge: "bestseller", benefits: ["Antioxydant puissant", "Vitalité", "Longévité"], origin: "Chine" },

  // Autres
  { id: "a1", name: "Gofio", category: "autres", description: "Farine grillée traditionnelle des Îles Canaries, nutritive", price: 8.99, image: teaImg, badge: "nouveau", benefits: ["Nutritif", "Énergisant", "Traditionnel"], origin: "Îles Canaries" },
  { id: "a2", name: "Flocons d'Avoine", category: "autres", description: "Céréale complète riche en fibres solubles et bêta-glucanes", price: 5.99, image: teaImg, badge: "bio", benefits: ["Riche en fibres", "Cholestérol", "Satiété"], origin: "France" },
  { id: "a3", name: "Thé Détox", category: "autres", description: "Mélange purificateur aux herbes choisies pour drainer et nettoyer", price: 9.99, image: teaImg, badge: "bestseller", benefits: ["Détox foie", "Drainant", "Minceur"], origin: "France" },
  { id: "a4", name: "Thé Relaxant", category: "autres", description: "Mélange apaisant pour retrouver calme et sérénité en soirée", price: 9.99, image: teaImg, badge: "bestseller", benefits: ["Relaxant", "Aide au sommeil", "Anti-stress"], origin: "France" },
];

export const products: Product[] = baseProducts.map((product) => ({
  ...product,
  image: productImages[product.name as ProductImageName],
}));
