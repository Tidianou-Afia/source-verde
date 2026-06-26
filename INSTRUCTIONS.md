# Source Verde - Instructions de configuration

## Configuration WhatsApp

Pour activer les commandes via WhatsApp, vous devez remplacer `YOUR_WHATSAPP_NUMBER` par votre numéro de téléphone WhatsApp dans les fichiers suivants :

1. `/src/app/components/WhatsAppButton.tsx`
2. `/src/app/components/ProductCard.tsx`
3. `/src/app/pages/Home.tsx`
4. `/src/app/pages/Contact.tsx`

### Format du numéro de téléphone

Le numéro doit être au format international sans espaces, tirets ou symboles :
- Format : `[code pays][numéro]`
- Exemple pour la France : `33612345678` (pour +33 6 12 34 56 78)
- Exemple pour le Maroc : `212612345678` (pour +212 6 12 34 56 78)

### Exemple de remplacement

Remplacez cette ligne :
```typescript
const phoneNumber = "YOUR_WHATSAPP_NUMBER";
```

Par :
```typescript
const phoneNumber = "33612345678"; // Votre numéro réel
```

## Structure du site

Le site comprend 4 pages principales :

1. **Accueil** (`/`) - Page d'accueil avec présentation et produits populaires
2. **Produits** (`/produits`) - Catalogue complet avec filtres par catégorie
3. **À propos** (`/a-propos`) - Présentation de l'entreprise et ses valeurs
4. **Contact** (`/contact`) - Formulaire de contact et informations

## Catégories de produits

- 🌾 Poudres (herbes)
- 🍃 Feuilles
- 💧 Huiles
- ✨ Cosmétiques
- 🌱 Graines
- 🍵 Autres (Gofio, Flocons d'avoine, Thés)

## Personnalisation

Pour personnaliser les produits, modifiez le fichier `/src/app/data/products.ts`.

Chaque produit a la structure suivante :
```typescript
{
  id: 'p1',
  name: 'Nom du produit',
  category: 'poudres', // ou 'feuilles', 'huiles', etc.
  description: 'Description du produit',
  price: 12.99,
  image: '' // URL de l'image (optionnel)
}
```

## Support

Pour toute question, consultez la documentation React Router et Tailwind CSS.
