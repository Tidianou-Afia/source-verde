import { Building2, FileText, Globe2, Mail, Shield, Sparkles, UserCircle2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { LegalPageShell } from "../components/LegalPageShell";

const noticeItems = [
  {
    title: "Éditeur du site",
    body: [
      "Source Verde",
      "Madame Ndeye Fatou Sidibé Niang.",
      "Adresse du siège social : Dakar, Sénégal.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Email : contact@sourceverde.bio",
      "WhatsApp : via les boutons du site",
      "Site : sourceverde.bio",
    ],
  },

  {
    title: "Propriété intellectuelle",
    body: [
      "L'ensemble des contenus du site, notamment les textes, visuels, éléments graphiques, logos et structure, est protégé par le droit de la propriété intellectuelle.",
      "Toute reproduction, diffusion ou exploitation sans autorisation écrite préalable est interdite.",
    ],
  },
];

export function LegalNotice() {
  return (
    <LegalPageShell
      eyebrow="Cadre légal"
      title="Mentions légales pensées pour inspirer confiance"
      intro="Cette page rassemble les informations légales essentielles pour que le visiteur sache à qui s'adresser en cas de question ou de réclamation. Elle est conçue pour être claire, complète et agréable à lire."
      updatedAt="Juin 2026"
      highlights={[
        // { label: "Identité", value: "Source Verde" },
        // { label: "Contact", value: "contact@sourceverde.bio" },
        // { label: "Confiance", value: "Infos transparentes" },
      ]}
    >
      <Card className="border-primary/15 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { icon: Building2, title: "Entreprise", text: "Source Verde" },
              { icon: Mail, title: "Contact direct", text: "contact@sourceverde.bio" },
              { icon: Globe2, title: "Accès web", text: "Le site sert de vitrine, catalogue et point d'entrée vers la commande." },
              { icon: Shield, title: "Cadre légal", text: "Les obligations d'information sont réunies dans une seule page claire." },
              { icon: UserCircle2, title: "Responsabilité", text: "Madame Ndeye Fatou Sidibé Niang." },
              { icon: Sparkles, title: "Présentation premium", text: "Une présentation élégante et professionnelle." },
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
        {noticeItems.map((item) => (
          <Card key={item.title} className="border-border shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {item.title}
              </h2>
              <div className="mt-4 space-y-3">
                {item.body.map((line) => (
                  <p key={line} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200 bg-amber-50/70">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">À compléter avant publication</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Cette version est prête visuellement, mais les champs juridiques de l'éditeur et de l'hébergeur
                doivent être remplacés par vos informations exactes pour une mise en ligne définitive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </LegalPageShell>
  );
}
