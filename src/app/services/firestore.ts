import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "../lib/firebase";

export type OrderRecord = {
  productName: string;
  price?: number;
  quantity: number;
  source: "product-card" | "contact-form";
  status: "new";
  channel: "whatsapp";
  customerName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
};

export type NewsletterRecord = {
  email: string;
  source: "homepage-newsletter";
  status: "subscribed";
};

export type ContactRecord = {
  name: string;
  email: string;
  message: string;
  source: "contact-page";
  status: "new";
};

async function writeDocument<T extends Record<string, unknown>>(collectionName: string, data: T) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    throw new Error("Firebase is not configured");
  }

  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export function saveOrder(record: OrderRecord) {
  return writeDocument("orders", record);
}

export function saveNewsletterSubscriber(record: NewsletterRecord) {
  return writeDocument("newsletter_subscribers", record);
}

export function saveContactMessage(record: ContactRecord) {
  return writeDocument("contact_messages", record);
}
