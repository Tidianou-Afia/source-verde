export const DEFAULT_WHATSAPP_NUMBER = "221773870030"; // Format international sans + ni espaces
export const WHATSAPP_NUMBER = DEFAULT_WHATSAPP_NUMBER;
export const LOGO_PATH = "/logo.jpg";

export function buildWhatsAppUrl(
  productName?: string,
  price?: number,
  whatsappNumber = WHATSAPP_NUMBER
): string {
  let message = "Bonjour, Source Verde 🌿\n\nJe souhaite passer commande pour les produits suivants :";
  if (productName) {
    message += `\n\n• Produit : ${productName}`;
    if (price !== undefined) message += `\n• Prix : ${price.toFixed(2)} €`;
    message += "\n• Quantité : 1";
    message += "\n\nJe vous remercie de bien vouloir me confirmer la disponibilité, ainsi que les modalités de commande et de livraison.";
  } else {
    message += " des produits naturels.\n\nMerci.";
  }
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

