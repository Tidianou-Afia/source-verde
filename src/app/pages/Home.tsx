import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Droplets,
  ExternalLink,
  Heart,
  Instagram,
  Leaf,
  Moon,
  Shield,
  Play,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { categories, products } from "../data/products";
import { instagramReels } from "../data/instagramReels";
import { ProductCard } from "../components/ProductCard";
import { buildWhatsAppUrl } from "../config";
import { useState } from "react";
import { toast } from "sonner";
import { saveNewsletterSubscriber } from "../services/firestore";

const featuredProducts = products.filter((p) => p.badge === "bestseller").slice(0, 8);

const whyUs = [
  { icon: Leaf, title: "100% Naturel", desc: "Tous nos produits proviennent de la nature, sans additifs chimiques." },
  { icon: Shield, title: "Sélection rigoureuse", desc: "Chaque produit est choisi avec soin pour sa qualité exceptionnelle." },
  { icon: Star, title: "Produits premium", desc: "Une gamme haut de gamme inspirée des médecines traditionnelles." },
  { icon: Truck, title: "Livraison rapide", desc: "Commandez via WhatsApp, livré rapidement à votre domicile." },
  { icon: Heart, title: "Fabrication artisanale", desc: "Des préparations soigneuses respectant les méthodes ancestrales." },
  { icon: Zap, title: "Conseils personnalisés", desc: "Une équipe passionnée à votre écoute pour vous guider." },
  { icon: Moon, title: "Commande facile", desc: "Passez commande directement sur WhatsApp en quelques secondes." },
];

const testimonials = [
  {
    name: "Fatima B.",
    city: "Paris",
    rating: 5,
    text: "Les produits Source Verde ont transformé ma routine beauté. La poudre de Chébé et l'huile de Kigelia sont incroyables pour mes cheveux. Je recommande vivement !",
    product: "Poudre de Chébé",
  },
  {
    name: "Amina K.",
    city: "Tambacounda",
    rating: 5,
    text: "Qualité exceptionnelle et livraison très rapide. Le beurre de karité est pur et naturel, exactement ce que je cherchais. Service client via WhatsApp très réactif.",
    product: "Beurre de Karité",
  },
  {
    name: "Sarah M.",
    city: "Dakar",
    rating: 5,
    text: "Je commande régulièrement mes huiles et mes graines de nigelle ici. La fraîcheur des produits est incomparable. Source Verde c'est vraiment du sérieux !",
    product: "Graines de Nigelle",
  },
];

// const healthNeeds = [
//   { icon: "ðŸ’†â€â™€ï¸", label: "Cheveux" },
//   { icon: "ðŸŒ¸", label: "Peau" },
//   { icon: "âš¡", label: "Energie" },
//   { icon: "ðŸ˜´", label: "Sommeil" },
//   { icon: "ðŸ§˜", label: "Stress" },
//   { icon: "ðŸ«", label: "Immunité" },
//   { icon: "ðŸŒ¿", label: "Détox" },
//   { icon: "ðŸ¦´", label: "Articulations" },
//   { icon: "ðŸ¼", label: "Allaitement" },
//   { icon: "âœ¨", label: "Beauté" },
//   { icon: "ðŸ”¥", label: "Digestion" },
//   { icon: "ðŸ‘¨", label: "Barbe" },
// ];

export function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = newsletterEmail.trim().toLowerCase();
    if (!email) return;

    setIsNewsletterSubmitting(true);

    try {
      await saveNewsletterSubscriber({
        email,
        source: "homepage-newsletter",
        status: "subscribed",
      });
      toast.success("Merci, votre inscription a bien été enregistrée.");
      setNewsletterEmail("");
    } catch (error) {
      console.error("Failed to save newsletter subscriber", error);
      toast.error("Impossible d'enregistrer l'inscription pour le moment.");
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* â”€â”€â”€ HERO â”€â”€â”€ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-secondary/30">
        {/* Background botanical pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 C30 25 20 30 15 45 C25 40 30 35 40 30 C50 35 55 40 65 45 C60 30 50 25 40 10Z' fill='%236E7E3B'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-primary/20">
                <Leaf className="w-3.5 h-3.5" />
                100% Naturel &amp; Bio Â· Sélection Premium
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Retrouvez les<br />
                <em className="text-primary not-italic">trésors</em> de<br />
                la nature.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Découvrez notre sélection de produits naturels soigneusement choisis pour votre bien-être quotidien.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/produits"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  Découvrir le catalogue
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 sm:px-7 py-3 text-sm sm:text-base rounded-full transition-all shadow-lg shadow-green-500/20"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.118 1.532 5.846L.057 23.607a.5.5 0 0 0 .611.611l5.761-1.475A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-4.999-1.368l-.358-.213-3.715.952.969-3.645-.234-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                  </svg>
                  Commander sur WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>50+</p>
                  <p className="text-xs text-muted-foreground">Produits naturels</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>100%</p>
                  <p className="text-xs text-muted-foreground">Naturel &amp; Bio</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">+200 avis</span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                {/* Main image */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://www.naturellement-bio.com/cdn/shop/files/banner_ete_soldes.webp?v=1782122525&width=1500"
                    alt="Herbes et plantes médicinales naturelles"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </div>

                {/* Floating card 1 */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border max-w-[160px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">100% Bio</p>
                      <p className="text-[10px] text-muted-foreground">Certifié naturel</p>
                    </div>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Livraison</p>
                  <p className="text-sm font-bold text-primary">Rapide &amp; soignée</p>
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ HEALTH NEEDS â”€â”€â”€ */}
      {/* <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">
            Trouvez les produits adaptés à vos besoins
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {healthNeeds.map((need) => (
              <Link
                key={need.label}
                to="/produits"
                className="flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground/70 text-sm font-medium px-4 py-2 rounded-full border border-border hover:border-primary transition-all"
              >
                <span>{need.icon}</span>
                {need.label}
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* â”€â”€â”€ NOS COLLECTIONS â”€â”€â”€ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">Collections</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Nos collections
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Six univers de produits naturels, chacun sélectionné avec le plus grand soin pour votre bien-être.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/produits/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span className="text-2xl sm:text-3xl block mb-1.5">{cat.icon}</span>
                  <h3
                    className="text-white font-bold text-base sm:text-xl leading-tight mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm line-clamp-2 mb-3">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-primary transition-colors">
                    Découvrir <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ MEILLEURES VENTES â”€â”€â”€ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">Notre sélection</p>
              <h2
                className="text-4xl sm:text-5xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Meilleures ventes
              </h2>
            </div>
            <Link
              to="/produits"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/produits"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
            >
              Voir tous les produits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ POURQUOI NOUS CHOISIR â”€â”€â”€ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">Nos engagements</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Pourquoi choisir<br />Source Verde ?
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ INSTAGRAM â”€â”€â”€ */}
      <section className="relative py-20 overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-primary/15">
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Vous êtes + de 90k à nous suivre sur Instagram
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {instagramReels.map((reel, index) => (
              <motion.a
                key={reel.title}
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                className="group relative aspect-[4/3.25] md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-border/60 bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <img
                  src={reel.poster}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${reel.tone}`} />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
                  <Instagram className="w-3 h-3" />
                  Reel cliquable
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-white" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                  <h3
                    className="text-sm sm:text-xl font-semibold leading-tight mb-1.5 sm:mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {reel.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-white/80 leading-relaxed">{reel.caption}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <ExternalLink className="w-4 h-4" />
              Visiter Instagram
            </a>
           
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ TÉMOIGNAGES â”€â”€â”€ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">Témoignages</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Avis de nos clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.city} Â· {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ NEWSLETTER â”€â”€â”€ */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          {/* <span className="text-2xl block mb-4">ðŸŒ¿</span> */}
          <h2
            className="text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Restez connectés à  la nature
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Inscrivez-vous pour recevoir nos conseils bien-être, recettes de tisanes et offres exclusives.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={isNewsletterSubmitting}
              className="bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-primary-foreground font-semibold px-7 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              {isNewsletterSubmitting ? "En cours..." : "S'inscrire"}
            </button>
          </form>
          <p className="text-muted-foreground text-xs mt-4">Pas de spam. Désinscription en un clic.</p>
        </div>
      </section>

      {/* â”€â”€â”€ WHATSAPP CTA â”€â”€â”€ */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C22 18 14 22 10 32 C18 28 22 24 30 20 C38 24 42 28 50 32 C46 22 38 18 30 5Z' fill='%23F6F2E8'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-background/10 text-background/80 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-background/20">
            <Droplets className="w-3.5 h-3.5" />
            Commander est simple et rapide
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Prêt à commander<br />vos produits naturels ?
          </h2>
          <p className="text-background/60 text-lg mb-10 max-w-xl mx-auto">
            Un simple message WhatsApp suffit. Nous vous répondons rapidement et préparons votre commande avec soin.
          </p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-3.5 rounded-full transition-all shadow-2xl hover:shadow-green-500/30 hover:scale-105 max-w-full sm:max-w-none"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.118 1.532 5.846L.057 23.607a.5.5 0 0 0 .611.611l5.761-1.475A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-4.999-1.368l-.358-.213-3.715.952.969-3.645-.234-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
            </svg>
            Commander sur WhatsApp
          </a>
          <p className="text-background/40 text-sm mt-6">
            Réponse garantie sous 24h Â· Lunâ€“Sam 9hâ€“20h
          </p>
        </div>
      </section>
    </div>
  );
}



