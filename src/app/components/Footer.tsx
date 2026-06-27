import { Link } from "react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { buildWhatsAppUrl, LOGO_PATH } from "../config";

const catalogLinks = [
  { path: "/produits/poudres", label: "Poudres médicinales" },
  { path: "/produits/feuilles", label: "Plantes & Feuilles" },
  { path: "/produits/huiles", label: "Huiles végétales" },
  { path: "/produits/cosmetiques", label: "Cosmétiques naturels" },
  { path: "/produits/graines", label: "Graines & Superaliments" },
  { path: "/produits/autres", label: "Thés & Infusions" },
];

const infoLinks = [
  { path: "/a-propos", label: "À propos de nous" },
  { path: "/contact", label: "Nous contacter" },
  { path: "/produits", label: "Tous les produits" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-background/10 border border-background/10">
                <img
                  src={LOGO_PATH}
                  alt="Source Verde"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-xl font-bold tracking-wide text-background"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                SOURCE VERDE
              </span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Le pouvoir de la nature au service de votre bien-être. Produits 100% naturels, soigneusement sélectionnés pour vous.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-colors flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.118 1.532 5.846L.057 23.607a.5.5 0 0 0 .611.611l5.761-1.475A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-4.999-1.368l-.358-.213-3.715.952.969-3.645-.234-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm tracking-widest uppercase">
              Catalogue
            </h3>
            <ul className="space-y-2.5">
              {catalogLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm tracking-widest uppercase">
              Informations
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/mentions-legales" className="text-background/60 hover:text-primary transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-background/60 hover:text-primary transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-background/60 hover:text-primary transition-colors text-sm">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm tracking-widest uppercase">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-background/60 hover:text-[#25D366] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Commander via WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/60 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contact@sourceverde.bio</span>
              </li>
              <li className="flex items-start gap-3 text-background/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Livraison partout en France</span>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-background/5 border border-background/10">
              <p className="text-background/80 text-xs leading-relaxed">
                <span className="text-primary font-semibold">Horaires WhatsApp :</span><br />
                Lun–Sam : 9h–20h<br />
                Dimanche : 10h–18h
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm text-center">
            © {new Date().getFullYear()} Source Verde. Tous droits réservés.
          </p>
          <p className="text-background/30 text-xs text-center">
            🌿 Produits 100% naturels · Commande via WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}
