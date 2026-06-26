import { Leaf, Heart, Award, Users, Truck, Shield } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const values = [
    {
      icon: Leaf,
      title: "Produits 100% Bio",
      description: "Tous nos produits proviennent de l'agriculture biologique certifiée et respectueuse de l'environnement.",
    },
    {
      icon: Heart,
      title: "Passion du naturel",
      description: "Notre mission est de rendre accessible à tous les bienfaits des produits naturels et authentiques.",
    },
    {
      icon: Award,
      title: "Qualité premium",
      description: "Chaque produit est soigneusement sélectionné et testé pour garantir une qualité exceptionnelle.",
    },
    {
      icon: Users,
      title: "Service client",
      description: "Une équipe dédiée et passionnée à votre écoute pour vous conseiller et vous accompagner.",
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      description: "Commandez facilement via WhatsApp et recevez vos produits rapidement à votre domicile.",
    },
    {
      icon: Shield,
      title: "Garantie authenticité",
      description: "Nous garantissons l'authenticité et la traçabilité de tous nos produits bio.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              À propos de Source Verde
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Votre partenaire de confiance pour des produits bio authentiques et naturels
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Source Verde est née d'une passion pour les produits naturels et bio. Notre mission est simple : 
                  rendre accessible à tous les bienfaits extraordinaires de la nature à travers une sélection 
                  rigoureuse de produits authentiques.
                </p>
                <p>
                  Nous parcourons le monde pour vous proposer les meilleures poudres, huiles, graines et 
                  cosmétiques naturels. Chaque produit est choisi avec soin pour sa qualité exceptionnelle 
                  et ses propriétés bénéfiques.
                </p>
                <p>
                  Notre engagement : vous offrir des produits 100% naturels, issus de l'agriculture biologique, 
                  dans le respect de l'environnement et des producteurs locaux.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595414902678-862fe51c9f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGVyYnMlMjBwb3dkZXIlMjBuYXR1cmFsfGVufDF8fHx8MTc4MjQ5MDgyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Produits naturels"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Range Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre gamme de produits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une sélection complète pour votre bien-être
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="font-semibold text-xl mb-2">Poudres naturelles</h3>
              <p className="text-gray-600">
                Chébé, Amla, Moringa, Curcuma et bien d'autres poudres aux vertus exceptionnelles
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🍃</div>
              <h3 className="font-semibold text-xl mb-2">Feuilles & Plantes</h3>
              <p className="text-gray-600">
                Camomille, Hibiscus, Lavande, Thym et une variété de plantes aromatiques
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="font-semibold text-xl mb-2">Huiles précieuses</h3>
              <p className="text-gray-600">
                Baobab, Jojoba, Argan, Coco et huiles végétales de qualité premium
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-semibold text-xl mb-2">Cosmétiques bio</h3>
              <p className="text-gray-600">
                Beurres de karité, cacao, produits de beauté naturels et authentiques
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-semibold text-xl mb-2">Graines nutritives</h3>
              <p className="text-gray-600">
                Chia, Lin, Nigelle, Sésame et superaliments pour votre santé
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🍵</div>
              <h3 className="font-semibold text-xl mb-2">Thés & Infusions</h3>
              <p className="text-gray-600">
                Mélanges détox et relaxants pour votre bien-être quotidien
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez la famille Source Verde
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Découvrez tous nos produits bio et commencez votre voyage vers un bien-être naturel
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/produits">
              <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-all">
                Découvrir nos produits
              </button>
            </a>
            <a href="/contact">
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all">
                Nous contacter
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
