/** Halaman kelola kategori & nominal PPOB. */
import type { Metadata } from "next";
import { ProductManager } from "@/components/admin/ProductManager";
import { PageHeader } from "@/components/admin/ui";
import { getProductsWithItems } from "@/lib/store";

export const metadata: Metadata = { title: "Produk & Nominal" };

export default async function ProdukPage() {
  const products = await getProductsWithItems();

  return (
    <>
      <PageHeader
        title="Produk & Nominal"
        description="Atur kategori layanan, nominal, harga, biaya admin, dan urutan tampil. Semua perubahan langsung dibaca oleh homepage dan panel checkout."
      />
      <ProductManager products={products} />
    </>
  );
}
