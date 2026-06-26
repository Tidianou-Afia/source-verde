import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "YOUR_WHATSAPP_NUMBER";
    const message = encodeURIComponent(
      `Bonjour! Je suis ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "YOUR_WHATSAPP_NUMBER";
    const message = encodeURIComponent("Bonjour! J'aimerais en savoir plus sur vos produits Source Verde.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Cards */}
            <Card className="border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Le moyen le plus rapide pour nous contacter et passer commande
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                  Ouvrir WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Envoyez-nous un email, nous vous répondrons rapidement
                </p>
                <a
                  href="mailto:contact@sourceverde.bio"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  contact@sourceverde.bio
                </a>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Horaires</h3>
                <p className="text-gray-600 text-sm">
                  Lundi - Vendredi<br />
                  9h00 - 18h00<br />
                  Samedi : 10h00 - 16h00
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="border-emerald-100">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={6}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer via WhatsApp
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    En soumettant ce formulaire, votre message sera envoyé via WhatsApp
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      Livraison disponible
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nous livrons vos produits bio directement chez vous. 
                      Commandez facilement via WhatsApp et profitez d'une livraison rapide et soignée.
                      Tous nos produits sont soigneusement emballés pour garantir leur qualité.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              <Card className="border-emerald-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Comment passer commande ?</h3>
                  <p className="text-gray-600">
                    Vous pouvez commander directement via WhatsApp en cliquant sur le bouton "Commander" 
                    sur chaque produit ou en nous contactant directement. Nous vous guiderons dans votre commande.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Quels sont les modes de paiement acceptés ?</h3>
                  <p className="text-gray-600">
                    Nous acceptons plusieurs modes de paiement : virement bancaire, PayPal, et paiement à la livraison 
                    selon votre localisation. Contactez-nous pour plus de détails.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Combien de temps prend la livraison ?</h3>
                  <p className="text-gray-600">
                    Les délais de livraison varient selon votre localisation. En général, comptez 2 à 5 jours ouvrés 
                    pour la France métropolitaine. Nous vous informerons du délai exact lors de votre commande.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Vos produits sont-ils certifiés bio ?</h3>
                  <p className="text-gray-600">
                    Oui, tous nos produits sont 100% naturels et issus de l'agriculture biologique. 
                    Nous garantissons leur authenticité et leur qualité premium.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
