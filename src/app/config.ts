export const WHATSAPP_NUMBER = "212600000000"; // Remplacez par votre numéro réel (ex: 33612345678)

export function buildWhatsAppUrl(productName?: string, price?: number): string {
  let message = "Bonjour Source Verde 🌿,\n\nJe souhaite commander :";
  if (productName) {
    message += `\n\n• Produit : ${productName}`;
    if (price !== undefined) message += `\n• Prix : ${price.toFixed(2)} €`;
    message += "\n• Quantité : 1";
    message += "\n\nNom du client : \nTéléphone : \nVille : \n\nMerci de me confirmer la disponibilité.";
  } else {
    message += " des produits naturels.\n\nMerci.";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
