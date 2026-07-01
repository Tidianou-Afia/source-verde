import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Eye,
  FileImage,
  Leaf,
  Mail,
  Package,
  PencilLine,
  Plus,
  RefreshCcw,
  Save,
  Settings2,
  ShoppingBag,
  ShieldAlert,
  Trash2,
  Upload,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { categories, deleteCatalogProduct, defaultSiteSettings, saveCatalogProduct, saveSiteSettings, subscribeCatalogProducts, subscribeContacts, subscribeNewsletterSubscribers, subscribeOrders, type AdminProduct, type SiteSettings } from "../services/admin";
import type { ContactRecord, NewsletterRecord, OrderRecord } from "../services/firestore";
import { buildWhatsAppUrl } from "../config";
import { useSiteSettings } from "../context/site-settings";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ACCESS_KEY = "sourceverde-admin-unlocked";
const ADMIN_ACCESS_CODE = import.meta.env.VITE_ADMIN_ACCESS_CODE || "source-verde-admin";

const emptyProduct: AdminProduct = {
  id: "",
  name: "",
  category: "poudres",
  description: "",
  price: 0,
  image: "",
  badge: "bio",
  benefits: [],
  origin: "",
  weight: "",
  active: true,
  featured: false,
  stock: 0,
};

const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const PRODUCTS_PER_PAGE = 10;
const ORDERS_PER_PAGE = 8;
const CONTACTS_PER_PAGE = 5;
const SUBSCRIBERS_PER_PAGE = 8;
const MAX_FIRESTORE_IMAGE_LENGTH = 750_000;

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("seconds" in value)) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date((value as { seconds: number }).seconds * 1000)
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

async function fileToOptimizedImage(file: File) {
  const dataUrl = await fileToDataUrl(file);

  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const maxSize = 900;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Impossible de préparer l'image."));
        return;
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.76));
    };
    image.onerror = () => reject(new Error("Image invalide."));
    image.src = dataUrl;
  });
}

function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    page: safePage,
    totalPages,
    items: items.slice(start, start + perPage),
  };
}

function TablePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-5 border-t border-border pt-4">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(Math.max(1, page - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(Math.min(totalPages, page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim() !== ADMIN_ACCESS_CODE) {
      toast.error("Code d'accès incorrect.");
      return;
    }

    sessionStorage.setItem(ACCESS_KEY, "1");
    onUnlock();
    toast.success("Accès administrateur activé.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Panel administrateur</CardTitle>
          <CardDescription>
            Accès réservé pour gérer le catalogue, les demandes et les réglages du site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
            />
            <Button type="submit" className="w-full">
              Accéder au tableau de bord
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Le code peut être défini avec <span className="font-medium">VITE_ADMIN_ACCESS_CODE</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <Icon className="h-5 w-5 text-primary" />
      </CardContent>
    </Card>
  );
}

export function Admin() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(ACCESS_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRecord[]>([]);
  const { settings, isLoaded } = useSiteSettings();

  const [draftSettings, setDraftSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [productDraft, setProductDraft] = useState<AdminProduct>(emptyProduct);
  const [benefitsDraft, setBenefitsDraft] = useState("");
  const [imageMode, setImageMode] = useState<"link" | "upload">("link");
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [subscriberPage, setSubscriberPage] = useState(1);

  useEffect(() => {
    const unsubscribeProducts = subscribeCatalogProducts(setProducts);
    const unsubscribeOrders = subscribeOrders(setOrders);
    const unsubscribeContacts = subscribeContacts(setContacts);
    const unsubscribeSubscribers = subscribeNewsletterSubscribers(setSubscribers);

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
      unsubscribeContacts();
      unsubscribeSubscribers();
    };
  }, []);

  useEffect(() => {
    if (isLoaded) setDraftSettings(settings);
  }, [isLoaded, settings]);

  useEffect(() => {
    setProductPage(1);
  }, [products.length]);

  useEffect(() => {
    setOrderPage(1);
  }, [orders.length]);

  useEffect(() => {
    setContactPage(1);
  }, [contacts.length]);

  useEffect(() => {
    setSubscriberPage(1);
  }, [subscribers.length]);

  const summary = useMemo(() => {
    const byCategory = categories.map((category) => ({
      name: category.name,
      count: products.filter((product) => product.category === category.id && product.active).length,
    }));

    return {
      activeProducts: products.filter((product) => product.active).length,
      featuredProducts: products.filter((product) => product.featured).length,
      byCategory,
      funnel: [orders.length, contacts.length, subscribers.length],
    };
  }, [products, orders, contacts, subscribers]);

  const categoryChart = {
    labels: summary.byCategory.map((item) => item.name),
    datasets: [
      {
        label: "Produits actifs",
        data: summary.byCategory.map((item) => item.count),
        backgroundColor: ["#6E7E3B", "#7B9C64", "#B7A35B", "#C7D3A7", "#A87C53", "#8EA17A"],
        borderRadius: 6,
      },
    ],
  };

  const funnelChart = {
    labels: ["Commandes", "Messages", "Newsletter"],
    datasets: [
      {
        data: summary.funnel,
        backgroundColor: ["#6E7E3B", "#C7A76A", "#A1B57D"],
        borderWidth: 0,
      },
    ],
  };

  const paginatedProducts = paginate(products, productPage, PRODUCTS_PER_PAGE);
  const paginatedOrders = paginate(orders, orderPage, ORDERS_PER_PAGE);
  const paginatedContacts = paginate(contacts, contactPage, CONTACTS_PER_PAGE);
  const paginatedSubscribers = paginate(subscribers, subscriberPage, SUBSCRIBERS_PER_PAGE);

  if (!isUnlocked) {
    return <AccessGate onUnlock={() => setIsUnlocked(true)} />;
  }

  const handleSelectProduct = (product: AdminProduct) => {
    setProductDraft(product);
    setBenefitsDraft((product.benefits || []).join("\n"));
    setImageMode(product.image?.startsWith("data:") ? "upload" : "link");
  };

  const handleNewProduct = () => {
    setProductDraft(emptyProduct);
    setBenefitsDraft("");
    setImageMode("link");
  };

  const handleImageUpload = async (file?: File | null) => {
    if (!file) return;
    try {
      const image = await fileToOptimizedImage(file);
      setProductDraft((current) => ({ ...current, image }));
      setImageMode("upload");
    } catch {
      toast.error("Impossible de lire l'image.");
    }
  };

  const handleSaveProduct = async () => {
    if (!productDraft.name.trim() || !productDraft.description.trim() || !productDraft.image.trim()) {
      toast.error("Nom, description et image sont requis.");
      return;
    }

    if (productDraft.image.startsWith("data:") && productDraft.image.length > MAX_FIRESTORE_IMAGE_LENGTH) {
      toast.error("Image trop lourde.", {
        description: "Utilise une image plus légère ou colle un lien d'image.",
      });
      return;
    }

    setIsSavingProduct(true);
    try {
      await saveCatalogProduct({
        ...productDraft,
        benefits: benefitsDraft
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      toast.success("Produit enregistré.");
      handleNewProduct();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      toast.error("Impossible d'enregistrer le produit.", {
        description:
          message.includes("Firebase is not configured")
            ? "Vérifie les variables VITE_FIREBASE_* dans .env puis redémarre le serveur."
            : message,
      });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await deleteCatalogProduct(productId);
      toast.success("Produit supprimé.");
      if (productDraft.id === productId) handleNewProduct();
    } catch (error) {
      console.error(error);
      toast.error("Suppression impossible.");
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await saveSiteSettings(draftSettings);
      toast.success("Réglages mis à jour.");
    } catch (error) {
      console.error(error);
      toast.error("Impossible d'enregistrer les réglages.", {
        description: error instanceof Error ? error.message : "Erreur inconnue",
      });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const previewWhatsApp = buildWhatsAppUrl("Poudre de Chébé", 12.99, draftSettings.whatsappNumber);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Link>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Source Verde</p>
              <h1 className="text-xl font-semibold text-foreground">Tableau de bord admin</h1>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Synchronisation active
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Produits actifs" value={summary.activeProducts} icon={Package} />
          <StatCard label="Produits en avant" value={summary.featuredProducts} icon={BadgeCheck} />
          <StatCard label="Commandes" value={orders.length} icon={ShoppingBag} />
          <StatCard label="Messages" value={contacts.length} icon={MessageSquare} />
          <StatCard label="Newsletter" value={subscribers.length} icon={Mail} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Répartition du catalogue
              </CardTitle>
              <CardDescription>Nombre de produits actifs par catégorie.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <Bar
                  data={categoryChart}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        grid: { display: false },
                        ticks: { color: "#6B7280" },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: { precision: 0, color: "#6B7280" },
                        grid: { color: "rgba(107,114,128,0.12)" },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Flux des demandes
              </CardTitle>
              <CardDescription>Vue rapide des commandes, messages et abonnements.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <Doughnut
                  data={funnelChart}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "68%",
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { boxWidth: 12, usePointStyle: true },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="catalogue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-[540px]">
            <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
            <TabsTrigger value="demandes">Demandes</TabsTrigger>
            <TabsTrigger value="reglages">Réglages</TabsTrigger>
          </TabsList>

          <TabsContent value="catalogue" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings2 className="h-4 w-4" />
                    {productDraft.id ? "Modifier le produit" : "Ajouter un produit"}
                  </CardTitle>
                  <CardDescription>Formulaire complet, adapté au catalogue Source Verde.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      placeholder="Nom du produit"
                      value={productDraft.name}
                      onChange={(e) => setProductDraft({ ...productDraft, name: e.target.value })}
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Prix (€)"
                      value={productDraft.price}
                      onChange={(e) => setProductDraft({ ...productDraft, price: Number(e.target.value) })}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      value={productDraft.category}
                      onChange={(e) => setProductDraft({ ...productDraft, category: e.target.value })}
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={productDraft.badge || ""}
                      onChange={(e) =>
                        setProductDraft({
                          ...productDraft,
                          badge: e.target.value ? (e.target.value as AdminProduct["badge"]) : undefined,
                        })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Sans badge</option>
                      <option value="bio">Bio</option>
                      <option value="nouveau">Nouveau</option>
                      <option value="bestseller">Bestseller</option>
                      <option value="promo">Promo</option>
                    </select>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      placeholder="Origine"
                      value={productDraft.origin || ""}
                      onChange={(e) => setProductDraft({ ...productDraft, origin: e.target.value })}
                    />
                    <Input
                      type="number"
                      step="1"
                      placeholder="Stock"
                      value={productDraft.stock}
                      onChange={(e) => setProductDraft({ ...productDraft, stock: Number(e.target.value) })}
                    />
                  </div>

                  <Input
                    placeholder="Poids / format"
                    value={productDraft.weight || ""}
                    onChange={(e) => setProductDraft({ ...productDraft, weight: e.target.value })}
                  />

                  <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                    <Button
                      type="button"
                      variant={imageMode === "link" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setImageMode("link")}
                    >
                      Lien
                    </Button>
                    <Button
                      type="button"
                      variant={imageMode === "upload" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setImageMode("upload")}
                    >
                      Upload
                    </Button>
                  </div>

                  {imageMode === "link" ? (
                    <Input
                      placeholder="Lien de l'image"
                      value={productDraft.image}
                      onChange={(e) => setProductDraft({ ...productDraft, image: e.target.value })}
                    />
                  ) : (
                    <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Importer depuis l'appareil
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => handleImageUpload(event.target.files?.[0])}
                      />
                    </label>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm font-medium mb-2">Actif</p>
                      <Switch
                        checked={productDraft.active}
                        onCheckedChange={(checked) => setProductDraft({ ...productDraft, active: checked })}
                      />
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-sm font-medium mb-2">Mis en avant</p>
                      <Switch
                        checked={productDraft.featured}
                        onCheckedChange={(checked) => setProductDraft({ ...productDraft, featured: checked })}
                      />
                    </div>
                  </div>

                  <Textarea
                    placeholder="Description du produit"
                    value={productDraft.description}
                    onChange={(e) => setProductDraft({ ...productDraft, description: e.target.value })}
                    rows={4}
                  />
                  <Textarea
                    placeholder="Bienfaits, un par ligne"
                    value={benefitsDraft}
                    onChange={(e) => setBenefitsDraft(e.target.value)}
                    rows={4}
                  />

                  <div className="rounded-xl border border-border p-3">
                    <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                      <FileImage className="h-4 w-4" />
                      Aperçu de l'image
                    </div>
                    <div className="aspect-square overflow-hidden rounded-lg bg-secondary/40">
                      {productDraft.image ? (
                        <img src={productDraft.image} alt={productDraft.name || "Aperçu produit"} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <Eye className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleSaveProduct} disabled={isSavingProduct}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSavingProduct ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    <Button variant="outline" type="button" onClick={handleNewProduct}>
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Produits</CardTitle>
                <CardDescription>
                    {products.length} références synchronisées, avec aperçu rapide des statuts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="py-3 pr-4">Produit</th>
                        <th className="py-3 pr-4">Prix</th>
                        <th className="py-3 pr-4">Statut</th>
                        <th className="py-3 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.items.map((product) => (
                        <tr key={product.id} className="border-b border-border/60 align-top">
                          <td className="py-4 pr-4">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{categories.find((item) => item.id === product.category)?.name}</div>
                          </td>
                          <td className="py-4 pr-4">{money.format(product.price)}</td>
                          <td className="py-4 pr-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant={product.active ? "default" : "secondary"}>{product.active ? "Actif" : "Masqué"}</Badge>
                              {product.featured && <Badge variant="secondary">À la une</Badge>}
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" onClick={() => handleSelectProduct(product)}>
                                <PencilLine className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <TablePagination
                    page={paginatedProducts.page}
                    totalPages={paginatedProducts.totalPages}
                    onPageChange={setProductPage}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demandes" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Commandes</CardTitle>
                  <CardDescription>Demandes enregistrées depuis les fiches produits.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="py-3 pr-4">Produit</th>
                        <th className="py-3 pr-4">Client</th>
                        <th className="py-3 pr-4">Contact</th>
                        <th className="py-3 pr-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.items.map((order, index) => (
                        <tr key={`${order.productName}-${index}`} className="border-b border-border/60 align-top">
                          <td className="py-4 pr-4">
                            <div className="font-medium">{order.productName}</div>
                            <div className="text-xs text-muted-foreground">
                              {order.quantity} article{order.quantity > 1 ? "s" : ""} · {order.price ? money.format(order.price) : "—"}
                            </div>
                          </td>
                          <td className="py-4 pr-4">{order.customerName || "—"}</td>
                          <td className="py-4 pr-4">
                            <div>{order.phone || "—"}</div>
                            <div className="text-xs text-muted-foreground">{order.email || "—"}</div>
                          </td>
                          <td className="py-4 pr-4 text-muted-foreground">{formatDate((order as { createdAt?: unknown }).createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <TablePagination
                    page={paginatedOrders.page}
                    totalPages={paginatedOrders.totalPages}
                    onPageChange={setOrderPage}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Commandes</p>
                    <p className="mt-1 text-2xl font-semibold">{orders.length}</p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Messages</p>
                    <p className="mt-1 text-2xl font-semibold">{contacts.length}</p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Newsletter</p>
                    <p className="mt-1 text-2xl font-semibold">{subscribers.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Messages contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paginatedContacts.items.map((contact, index) => (
                    <div key={`${contact.email}-${index}`} className="rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                        <Badge variant="secondary">{contact.status}</Badge>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{contact.message}</p>
                    </div>
                  ))}
                  <TablePagination
                    page={paginatedContacts.page}
                    totalPages={paginatedContacts.totalPages}
                    onPageChange={setContactPage}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Newsletter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paginatedSubscribers.items.map((subscriber, index) => (
                    <div
                      key={`${subscriber.email}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
                    >
                      <div>
                        <p className="font-medium">{subscriber.email}</p>
                        <p className="text-xs text-muted-foreground">{subscriber.status}</p>
                      </div>
                      <Badge variant="secondary">Abonné</Badge>
                    </div>
                  ))}
                  <TablePagination
                    page={paginatedSubscribers.page}
                    totalPages={paginatedSubscribers.totalPages}
                    onPageChange={setSubscriberPage}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reglages" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Réglages du site</CardTitle>
                  <CardDescription>WhatsApp, contact et bloc d'accueil.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Numéro WhatsApp"
                    value={draftSettings.whatsappNumber}
                    onChange={(e) => setDraftSettings({ ...draftSettings, whatsappNumber: e.target.value })}
                  />
                  <Input
                    placeholder="Email de contact"
                    value={draftSettings.contactEmail}
                    onChange={(e) => setDraftSettings({ ...draftSettings, contactEmail: e.target.value })}
                  />
                  <Input
                    placeholder="Horaires"
                    value={draftSettings.supportHours}
                    onChange={(e) => setDraftSettings({ ...draftSettings, supportHours: e.target.value })}
                  />
                  <Input
                    placeholder="Titre de l'accueil"
                    value={draftSettings.heroTitle}
                    onChange={(e) => setDraftSettings({ ...draftSettings, heroTitle: e.target.value })}
                  />
                  <Textarea
                    placeholder="Sous-titre de l'accueil"
                    value={draftSettings.heroSubtitle}
                    onChange={(e) => setDraftSettings({ ...draftSettings, heroSubtitle: e.target.value })}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveSettings} disabled={isSavingSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSavingSettings ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    <Button variant="outline" onClick={() => setDraftSettings(settings)}>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Réinitialiser
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Aperçu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">WhatsApp</p>
                    <p className="mt-2 font-medium break-all">{previewWhatsApp}</p>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
                    <p className="mt-2 font-medium">{draftSettings.contactEmail}</p>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Accueil</p>
                    <p className="mt-2 font-medium">{draftSettings.heroTitle}</p>
                    <p className="mt-1 text-muted-foreground">{draftSettings.heroSubtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-dashed">
          <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Gestion centrale</p>
                <p className="text-sm text-muted-foreground">
                  Les données viennent de Firestore quand il est configuré, avec un jeu de secours local pour garder le site exploitable.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Leaf className="h-4 w-4 text-primary" />
              <span>Source Verde · extension .bio</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
