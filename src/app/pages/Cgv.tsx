import { BadgeCheck, Clock3, CreditCard, Leaf, Package, ShieldCheck, Truck } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { LegalPageShell } from "../components/LegalPageShell";

const sections = [
  {
    title: "1. Objet",
    content: [
      "Les présentes Conditions Générales de Vente, ci-après \"CGV\", régissent les ventes de produits proposées sur le site Source Verde ainsi que les commandes passées par message, notamment via WhatsApp.",
      "Elles précisent les droits et obligations des parties dans le cadre d'une relation commerciale simple, claire et transparente.",
    ],
  },
  {
    title: "2. Produits et disponibilité",
    content: [
      "Les produits présentés sur le site sont décrits avec le plus grand soin. Les photographies, visuels et textes sont fournis à titre indicatif et ne constituent pas un engagement contractuel absolu.",
      "Les stocks, références et disponibilités peuvent évoluer à tout moment. En cas d'indisponibilité après demande de commande, Source Verde en informe le client dans les meilleurs délais.",
    ],
  },
  {
    title: "3. Commande",
    content: [
      "La commande peut être initiée depuis le site, puis finalisée via WhatsApp, ou directement par échange avec notre équipe selon le canal choisi.",
      "Toute commande n'est considérée comme ferme qu'après confirmation par Source Verde. Cette confirmation peut préciser la disponibilité, le prix final, le mode de livraison et, le cas échéant, les délais.",
    ],
  },
  {
    title: "4. Prix",
    content: [
      "Les prix sont indiqués en euros. Ils peuvent être modifiés à tout moment, mais le prix appliqué est celui affiché au moment de la confirmation de commande.",
      "Les frais de livraison, si applicables, sont annoncés avant validation et peuvent varier selon la destination, le volume et les conditions logistiques.",
    ],
  },
  {
    title: "5. Paiement",
    content: [
      "Les modalités de paiement sont communiquées au client au moment de la confirmation de commande. Source Verde peut proposer plusieurs solutions selon la zone de livraison et la nature du panier.",
      "Aucune commande n'est préparée définitivement sans validation des conditions de règlement convenues avec le client.",
    ],
  },
  {
    title: "6. Livraison",
    content: [
      "Les délais de livraison sont donnés à titre indicatif. Ils peuvent varier selon la destination, la disponibilité des produits et les périodes de forte activité.",
      "Le transfert des risques intervient au moment de la remise du colis au client ou au transporteur selon le mode de livraison retenu.",
    ],
  },
  {
    title: "7. Droit de rétractation et retours",
    content: [
      "Lorsque la réglementation applicable le permet, le client dispose d'un droit de rétractation de 14 jours pour les achats à distance, sous réserve des exceptions légales applicables aux produits scellés, ouverts ou personnalisés.",
      "Tout retour doit être signalé avant expédition et validé par notre équipe afin de préserver l'hygiène, la sécurité et la traçabilité des produits naturels.",
    ],
  },
  {
    title: "8. Responsabilité",
    content: [
      "Source Verde ne saurait être tenue responsable d'une mauvaise utilisation des produits, d'une conservation inadaptée ou du non-respect des conseils d'usage.",
      "Les informations présentes sur le site ont une vocation informative et ne remplacent pas l'avis d'un professionnel de santé lorsque celui-ci est nécessaire.",
    ],
  },
  {
    title: "9. Droit applicable",
    content: [
      "Les présentes CGV sont soumises au droit français, sauf disposition impérative contraire liée au pays de livraison.",
      "En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents seront saisis selon les règles de droit applicables.",
    ],
  },
];

export function Cgv() {
  return (
    <LegalPageShell
      eyebrow="Conditions générales"
      title="Des CGV claires, simples et rassurantes"
      intro="Ces conditions encadrent les commandes, les prix, la livraison et les retours pour offrir à vos clientes une expérience d'achat transparente et sereine."
      updatedAt="Juin 2026"
      highlights={[
        { label: "Canal de vente", value: "Site + WhatsApp" },
        { label: "Zone de droit", value: "Droit français" },
        { label: "Mise à jour", value: "Juin 2026" },
      ]}
    >
      <Card className="border-primary/15 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Leaf, title: "Produits naturels", text: "Des références sélectionnées avec soin pour votre bien-être." },
              { icon: Package, title: "Commande confirmée", text: "Validation manuelle avant préparation et expédition." },
              { icon: Truck, title: "Livraison suivie", text: "Délais annoncés clairement selon la destination." },
              { icon: ShieldCheck, title: "Achat rassurant", text: "Des règles simples pour une relation commerciale lisible." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-background p-5">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="border-border shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.content.map((paragraph) => (
                  <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/15 bg-primary/5">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">À personnaliser avant mise en ligne</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Remplacez les éléments entre crochets ou les mentions génériques par vos informations légales réelles
                (raison sociale, adresse, numéro d'immatriculation, modalités de paiement exactes, politique de livraison).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </LegalPageShell>
  );
}
