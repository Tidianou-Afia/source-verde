import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { categories, products as fallbackProducts, type Product } from "../data/products";
import { DEFAULT_WHATSAPP_NUMBER } from "../config";
import { getFirebaseDb, isFirebaseConfigured } from "../lib/firebase";
import type { ContactRecord, NewsletterRecord, OrderRecord, TimestampedRecord } from "./firestore";

export type AdminProduct = Product & {
  active: boolean;
  featured: boolean;
  stock: number;
};

export type SiteSettings = {
  whatsappNumber: string;
  contactEmail: string;
  supportHours: string;
  heroTitle: string;
  heroSubtitle: string;
};

export const defaultSiteSettings: SiteSettings = {
  whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
  contactEmail: "contact@sourceverde.bio",
  supportHours: "Lun-Sam : 9h-20h",
  heroTitle: "Retrouvez les trésors de la nature.",
  heroSubtitle: "Découvrez notre sélection de produits naturels soigneusement choisis pour votre bien-être quotidien.",
};

const PRODUCTS_COLLECTION = "products";
const LEGACY_PRODUCTS_COLLECTION = "catalog_products";
const SETTINGS_COLLECTION = "site_settings";
const SETTINGS_DOC = "main";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeProduct(
  input: Partial<AdminProduct> & {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
  }
): AdminProduct {
  return {
    ...input,
    badge: input.badge,
    benefits: Array.isArray(input.benefits) ? input.benefits.filter(Boolean) : [],
    origin: input.origin || "",
    weight: input.weight || "",
    active: input.active ?? true,
    featured: input.featured ?? false,
    stock: Number.isFinite(input.stock) ? Number(input.stock) : 0,
  };
}

function mergeCatalogProducts(remoteProducts: AdminProduct[]) {
  const map = new Map<string, AdminProduct>();

  fallbackProducts.forEach((product) => {
    map.set(
      product.id,
      normalizeProduct({
        ...product,
        active: true,
        featured: product.badge === "bestseller",
        stock: 24,
      })
    );
  });

  remoteProducts.forEach((product) => {
    map.set(product.id, normalizeProduct(product));
  });

  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
}

function normalizeSettings(value: Partial<SiteSettings> | null | undefined): SiteSettings {
  return {
    ...defaultSiteSettings,
    ...(value || {}),
    whatsappNumber: (value?.whatsappNumber || defaultSiteSettings.whatsappNumber).replace(/[^\d]/g, ""),
  };
}

function sortByDate<T extends TimestampedRecord>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const left = a.createdAt && typeof a.createdAt === "object" && "seconds" in a.createdAt
      ? Number((a.createdAt as { seconds: number }).seconds)
      : 0;
    const right = b.createdAt && typeof b.createdAt === "object" && "seconds" in b.createdAt
      ? Number((b.createdAt as { seconds: number }).seconds)
      : 0;
    return right - left;
  });
}

export function subscribeCatalogProducts(onChange: (items: AdminProduct[]) => void) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    onChange(mergeCatalogProducts([]));
    return () => {};
  }

  try {
    let primaryProducts: AdminProduct[] = [];
    let legacyProducts: AdminProduct[] = [];

    const mapSnapshot = (snapshot: { docs: Array<{ id: string; data: () => Partial<AdminProduct> }> }) =>
      snapshot.docs.map((document) => {
        const data = document.data() as Partial<AdminProduct>;
        return normalizeProduct({
          id: document.id,
          name: data.name || document.id,
          category: data.category || "autres",
          description: data.description || "",
          price: Number(data.price || 0),
          image: data.image || "",
          badge: data.badge,
          benefits: data.benefits,
          origin: data.origin,
          weight: data.weight,
          active: data.active,
          featured: data.featured,
          stock: data.stock,
        });
      });

    const publish = () => {
      onChange(mergeCatalogProducts([...legacyProducts, ...primaryProducts]));
    };

    const primaryUnsubscribe = onSnapshot(
      query(collection(db, PRODUCTS_COLLECTION)),
      (snapshot) => {
        primaryProducts = mapSnapshot(snapshot);
        publish();
      },
      (error) => {
        console.error(`Failed to read ${PRODUCTS_COLLECTION}`, error);
        publish();
      }
    );

    const legacyUnsubscribe = onSnapshot(
      query(collection(db, LEGACY_PRODUCTS_COLLECTION)),
      (snapshot) => {
        legacyProducts = mapSnapshot(snapshot);
        publish();
      },
      (error) => {
        console.error(`Failed to read ${LEGACY_PRODUCTS_COLLECTION}`, error);
        publish();
      }
    );

    return () => {
      primaryUnsubscribe();
      legacyUnsubscribe();
    };
  } catch (error) {
    console.error("Failed to subscribe to catalog products", error);
    onChange(mergeCatalogProducts([]));
    return () => {};
  }
}

export async function saveCatalogProduct(product: AdminProduct) {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) {
    throw new Error("Firebase is not configured");
  }

  const id = product.id || slugify(product.name);
  await setDoc(
    doc(db, PRODUCTS_COLLECTION, id),
    {
      ...normalizeProduct({ ...product, id }),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function deleteCatalogProduct(productId: string) {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) {
    throw new Error("Firebase is not configured");
  }

  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
}

export function subscribeOrders(onChange: (items: OrderRecord[]) => void) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    onChange([]);
    return () => {};
  }

  try {
    return onSnapshot(query(collection(db, "orders")), (snapshot) => {
      onChange(sortByDate(snapshot.docs.map((document) => document.data() as OrderRecord)));
    });
  } catch {
    onChange([]);
    return () => {};
  }
}

export function subscribeContacts(onChange: (items: ContactRecord[]) => void) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    onChange([]);
    return () => {};
  }

  try {
    return onSnapshot(query(collection(db, "contact_messages")), (snapshot) => {
      onChange(sortByDate(snapshot.docs.map((document) => document.data() as ContactRecord)));
    });
  } catch {
    onChange([]);
    return () => {};
  }
}

export function subscribeNewsletterSubscribers(onChange: (items: NewsletterRecord[]) => void) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    onChange([]);
    return () => {};
  }

  try {
    return onSnapshot(query(collection(db, "newsletter_subscribers")), (snapshot) => {
      onChange(sortByDate(snapshot.docs.map((document) => document.data() as NewsletterRecord)));
    });
  } catch {
    onChange([]);
    return () => {};
  }
}

export function subscribeSiteSettings(onChange: (settings: SiteSettings) => void) {
  const db = getFirebaseDb();

  if (!isFirebaseConfigured() || !db) {
    onChange(defaultSiteSettings);
    return () => {};
  }

  try {
    return onSnapshot(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), (snapshot) => {
      onChange(normalizeSettings(snapshot.exists() ? (snapshot.data() as SiteSettings) : null));
    });
  } catch {
    onChange(defaultSiteSettings);
    return () => {};
  }
}

export async function saveSiteSettings(settings: SiteSettings) {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) {
    throw new Error("Firebase is not configured");
  }

  await setDoc(
    doc(db, SETTINGS_COLLECTION, SETTINGS_DOC),
    {
      ...normalizeSettings(settings),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export { categories };
