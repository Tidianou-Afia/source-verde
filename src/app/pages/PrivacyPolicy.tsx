import { Lock, Mail, ShieldCheck, Target, TimerReset, UserCheck2, Wifi, Cookie } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { LegalPageShell } from "../components/LegalPageShell";
import { useSiteSettings } from "../context/site-settings";

const policySections = (contactEmail: string) => [
  {
    title: "1. Données collectées",
    content: [
      "Nous pouvons collecter les informations que vous nous transmettez volontairement via le formulaire de contact, WhatsApp ou toute demande de renseignement.",
      "Cela peut inclure votre nom, votre adresse email, votre numéro de téléphone, votre ville, le contenu de vos messages ainsi que les informations utiles au traitement de votre demande.",
    ],
  },
  {
    title: "2. Finalités",
    content: [
      "Les données sont utilisées pour répondre aux demandes de contact, préparer les commandes, assurer le suivi client, gérer la logistique et améliorer l'expérience utilisateur.",
      "Elles peuvent également servir à la prévention de la fraude, au respect de nos obligations légales et à la communication commerciale lorsque vous y avez consenti.",
    ],
  },
  {
    title: "3. Base légale",
    content: [
      "Le traitement repose, selon les cas, sur l'exécution d'un contrat ou de mesures précontractuelles, le consentement, l'intérêt légitime de Source Verde ou le respect d'obligations légales.",
      "Lorsque le consentement est requis, vous pouvez le retirer à tout moment sans affecter la licéité du traitement déjà effectué.",
    ],
  },
  {
    title: "4. Conservation",
    content: [
      "Nous conservons les données pendant la durée nécessaire à la relation commerciale, au suivi des commandes, puis pour une durée compatible avec les obligations comptables, fiscales ou de preuve applicables.",
      "Les durées exactes peuvent être ajustées selon la nature de la demande, le canal de contact et les exigences réglementaires.",
    ],
  },
  {
    title: "5. Destinataires",
    content: [
      "Les données peuvent être accessibles aux personnes habilitées au sein de Source Verde ainsi qu'à des prestataires techniques strictement nécessaires au fonctionnement du site, à l'hébergement ou à la communication.",
      "Nous ne vendons pas vos données personnelles.",
    ],
  },
  {
    title: "6. Vos droits",
    content: [
      "Vous disposez de droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, dans les limites prévues par la réglementation.",
      `Pour exercer vos droits, vous pouvez nous écrire à ${contactEmail} en précisant votre demande et, si nécessaire, un justificatif d'identité.`,
    ],
  },
  {
    title: "7. Cookies et traceurs",
    content: [
      "Le site peut utiliser des cookies techniques indispensables au fonctionnement, ainsi que des traceurs de mesure d'audience si vous les acceptez.",
      "Vous pouvez gérer vos préférences via les paramètres de votre navigateur ou via le bandeau de consentement lorsqu'il est disponible.",
    ],
  },
  {
    title: "8. Sécurité",
    content: [
      "Nous mettons en place des mesures techniques et organisationnelles raisonnables pour protéger vos données contre la perte, l'accès non autorisé, la divulgation ou l'altération.",
      "Aucun système n'étant infaillible, nous vous invitons à ne transmettre que les informations strictement nécessaires à votre demande.",
    ],
  },
];

export function PrivacyPolicy() {
  const { settings } = useSiteSettings();

  return (
    <LegalPageShell
      eyebrow="Protection des données"
      title="Une politique de confidentialité claire et rassurante"
      intro="Cette page explique quelles données sont collectées, pourquoi elles le sont, combien de temps elles sont conservées et comment vos visiteurs peuvent exercer leurs droits."
      updatedAt="Juin 2026"
      highlights={[
        { label: "Référentiel", value: "RGPD" },
        { label: "Contact", value: settings.contactEmail },
        { label: "Confidentialité", value: "Traitements transparents" },
      ]}
    >
      <Card className="border-primary/15 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: UserCheck2, title: "Collecte utile", text: "Uniquement les données nécessaires au traitement des demandes." },
              { icon: Target, title: "Objectifs précis", text: "Contact, commande, suivi client et obligations légales." },
              { icon: Lock, title: "Sécurité", text: "Mesures raisonnables pour protéger les données traitées." },
              { icon: TimerReset, title: "Durée maîtrisée", text: "Conservation limitée au strict nécessaire." },
              { icon: Cookie, title: "Cookies", text: "Gestion claire des traceurs et préférences du visiteur." },
              { icon: Wifi, title: "Canaux utilisés", text: "Formulaire, email et WhatsApp selon le parcours choisi." },
              { icon: ShieldCheck, title: "Droits RGPD", text: "Accès, rectification, effacement, opposition et portabilité." },
              { icon: Mail, title: "Contact données", text: settings.contactEmail },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
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
        {policySections(settings.contactEmail).map((section) => (
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

      <Card className="border-sky-200 bg-sky-50/70">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">À finaliser avec vos paramètres réels</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Si vous activez des outils d'analyse, des pixels marketing, des cookies tiers ou un CRM,
                ajoutez-les ici avec leurs durées de conservation et leurs finalités exactes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </LegalPageShell>
  );
}
