/**
 * Kelola kategori & nominal PPOB.
 *
 * Setiap perubahan langsung ditulis ke Supabase lewat server action, lalu
 * halaman di-revalidate sehingga homepage ikut ter-update tanpa deploy ulang.
 */
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveItem, deleteItem, saveProduct, saveProductOrder } from "@/app/admin/actions";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Card, Field, inputBase } from "@/components/admin/ui";
import { useAdminAction } from "@/components/admin/useAdminAction";
import { useToast } from "@/context/ToastContext";
import { formatRupiah } from "@/lib/format";
import type { ProductItem, ProductWithItems } from "@/types/store";

/** Checkbox kecil dengan label, dipakai untuk flag populer/cepat/aktif. */
function CheckField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-3.5 w-3.5 accent-accent"
      />
      {label}
    </label>
  );
}

/** Satu baris nominal: nama, harga, urutan, flag, tombol simpan & hapus. */
function ItemRow({ item }: { item: ProductItem }) {
  const save = useAdminAction(saveItem, `Nominal "${item.nama_item}" tersimpan.`);
  const remove = useAdminAction(deleteItem, `Nominal "${item.nama_item}" dihapus.`);

  return (
    <div className="flex flex-col gap-2 border-t border-hairline px-4 py-3 sm:flex-row sm:items-center">
      <form
        action={save.formAction}
        className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-12 sm:items-center"
      >
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="product_id" value={item.product_id} />

        <input
          name="nama_item"
          defaultValue={item.nama_item}
          required
          placeholder="Nama nominal"
          aria-label="Nama nominal"
          className={`${inputBase} sm:col-span-4`}
        />

        <input
          name="harga"
          defaultValue={item.harga}
          required
          inputMode="numeric"
          placeholder="Harga"
          aria-label="Harga"
          className={`${inputBase} font-console-mono tabular-nums sm:col-span-2`}
        />

        <input
          name="urutan_tampil"
          defaultValue={item.urutan_tampil}
          inputMode="numeric"
          aria-label="Urutan tampil"
          className={`${inputBase} font-console-mono tabular-nums sm:col-span-1`}
        />

        <input type="hidden" name="kode" value={item.kode} />
        <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
          <CheckField name="populer" label="Populer" defaultChecked={item.populer} />
          <CheckField name="tampil_cepat" label="Cepat" defaultChecked={item.tampil_cepat} />
          <CheckField
            name="status_available"
            label="Aktif"
            defaultChecked={item.status_available}
          />
        </div>

        <div className="sm:col-span-2 sm:justify-self-end">
          <SubmitButton pendingLabel="Menyimpan…" className="w-full sm:w-auto">
            <MaterialIcon name="save" className="text-[15px]" />
            Simpan
          </SubmitButton>
        </div>
      </form>

      <form action={remove.formAction} className="sm:shrink-0">
        <input type="hidden" name="id" value={item.id} />
        <SubmitButton pendingLabel="Menghapus…" variant="danger" className="w-full sm:w-auto">
          <MaterialIcon name="delete" className="text-[15px]" />
          Hapus
        </SubmitButton>
      </form>
    </div>
  );
}

/** Form tambah nominal baru di bawah daftar nominal kategori. */
function AddItemForm({
  productId,
  nextOrder,
}: {
  productId: string;
  nextOrder: number;
}) {
  const add = useAdminAction(saveItem, "Nominal baru ditambahkan.");

  return (
    <form
      action={add.formAction}
      className="grid grid-cols-1 gap-2 border-t border-hairline bg-console/60 px-4 py-3 sm:grid-cols-12 sm:items-center"
    >
      <input type="hidden" name="product_id" value={productId} />

      <input
        name="nama_item"
        required
        placeholder="Nama nominal baru, mis. Pulsa 25.000"
        aria-label="Nama nominal baru"
        className={`${inputBase} sm:col-span-4`}
      />
      <input
        name="harga"
        required
        inputMode="numeric"
        placeholder="Harga, mis. 25400"
        aria-label="Harga nominal baru"
        className={`${inputBase} font-console-mono tabular-nums sm:col-span-2`}
      />
      <input
        name="urutan_tampil"
        defaultValue={nextOrder}
        inputMode="numeric"
        aria-label="Urutan tampil"
        className={`${inputBase} font-console-mono tabular-nums sm:col-span-1`}
      />
      <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
        <CheckField name="populer" label="Populer" defaultChecked={false} />
        <CheckField name="tampil_cepat" label="Cepat" defaultChecked={false} />
        <CheckField name="status_available" label="Aktif" defaultChecked />
      </div>
      <div className="sm:col-span-2 sm:justify-self-end">
        <SubmitButton pendingLabel="Menambah…" className="w-full sm:w-auto">
          <MaterialIcon name="add" className="text-[15px]" />
          Tambah
        </SubmitButton>
      </div>
    </form>
  );
}

/** Satu kategori: pengaturan + daftar nominalnya. */
function CategoryCard({
  product,
  index,
  total,
  onMove,
  movePending,
  isOpen,
  onToggle,
}: {
  product: ProductWithItems;
  index: number;
  total: number;
  onMove: (index: number, direction: -1 | 1) => void;
  movePending: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const form = useAdminAction(saveProduct, `Kategori "${product.nama_kategori}" tersimpan.`);
  const nextOrder = product.items.length + 1;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3.5">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-console">
            <MaterialIcon name={product.icon} className="text-[18px] text-accent" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-[14px] font-semibold tracking-tight text-ink">
                {product.nama_kategori}
              </span>
              <span
                className={
                  product.status_aktif
                    ? "rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-700"
                    : "rounded-full border border-hairline bg-bone px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-faint"
                }
              >
                {product.status_aktif ? "Aktif" : "Nonaktif"}
              </span>
            </span>
            <span className="mt-0.5 block font-console-mono text-[11px] text-ink-faint">
              {product.slug} · {product.items.length} nominal · admin{" "}
              {formatRupiah(product.biaya_admin)}
            </span>
          </span>
          <MaterialIcon
            name={isOpen ? "expand_less" : "expand_more"}
            className="ml-auto text-[20px] text-ink-faint"
          />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(index, -1)}
            disabled={index === 0 || movePending}
            aria-label="Naikkan urutan"
            className="grid h-8 w-8 place-items-center rounded-md border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent disabled:opacity-40 cursor-pointer"
          >
            <MaterialIcon name="arrow_upward" className="text-[16px]" />
          </button>
          <button
            type="button"
            onClick={() => onMove(index, 1)}
            disabled={index === total - 1 || movePending}
            aria-label="Turunkan urutan"
            className="grid h-8 w-8 place-items-center rounded-md border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent disabled:opacity-40 cursor-pointer"
          >
            <MaterialIcon name="arrow_downward" className="text-[16px]" />
          </button>
        </div>
      </div>

      {isOpen ? (
        <>
          <form
            action={form.formAction}
            className="grid grid-cols-1 gap-4 border-t border-hairline bg-console/60 px-4 py-4 sm:grid-cols-3"
          >
            <input type="hidden" name="id" value={product.id} />

            <Field label="Nama kategori" htmlFor={`nama-${product.id}`}>
              <input
                id={`nama-${product.id}`}
                name="nama_kategori"
                defaultValue={product.nama_kategori}
                required
                className={inputBase}
              />
            </Field>
            <Field label="Judul di checkout" htmlFor={`judul-${product.id}`}>
              <input
                id={`judul-${product.id}`}
                name="judul"
                defaultValue={product.judul}
                className={inputBase}
              />
            </Field>
            <Field label="Ikon (Material Symbols)" htmlFor={`icon-${product.id}`}>
              <input
                id={`icon-${product.id}`}
                name="icon"
                defaultValue={product.icon}
                className={`${inputBase} font-console-mono`}
              />
            </Field>

            <Field label="Label input" htmlFor={`label-${product.id}`}>
              <input
                id={`label-${product.id}`}
                name="label"
                defaultValue={product.label}
                className={inputBase}
              />
            </Field>
            <Field label="Placeholder" htmlFor={`placeholder-${product.id}`}>
              <input
                id={`placeholder-${product.id}`}
                name="placeholder"
                defaultValue={product.placeholder}
                className={inputBase}
              />
            </Field>
            <Field label="Helper text" htmlFor={`helper-${product.id}`}>
              <input
                id={`helper-${product.id}`}
                name="helper"
                defaultValue={product.helper}
                className={inputBase}
              />
            </Field>

            <Field
              label="Biaya admin (Rp)"
              htmlFor={`admin-${product.id}`}
              hint="Ditambahkan ke harga nominal."
            >
              <input
                id={`admin-${product.id}`}
                name="biaya_admin"
                defaultValue={product.biaya_admin}
                inputMode="numeric"
                className={`${inputBase} font-console-mono tabular-nums`}
              />
            </Field>
            <Field label="Urutan tampil" htmlFor={`urutan-${product.id}`}>
              <input
                id={`urutan-${product.id}`}
                name="urutan_tampil"
                defaultValue={product.urutan_tampil}
                inputMode="numeric"
                className={`${inputBase} font-console-mono tabular-nums`}
              />
            </Field>
            <Field
              label="Urutan tab cepat"
              htmlFor={`urutan-cepat-${product.id}`}
              hint="Tampil di widget Transaksi Instan."
            >
              <input
                id={`urutan-cepat-${product.id}`}
                name="urutan_cepat"
                defaultValue={product.urutan_cepat}
                inputMode="numeric"
                className={`${inputBase} font-console-mono tabular-nums`}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-5 sm:col-span-3">
              <CheckField
                name="status_aktif"
                label="Tampilkan kategori di homepage"
                defaultChecked={product.status_aktif}
              />
              <CheckField
                name="tampil_cepat"
                label="Muncul di tab Transaksi Instan"
                defaultChecked={product.tampil_cepat}
              />
              <div className="sm:ml-auto">
                <SubmitButton pendingLabel="Menyimpan…">
                  <MaterialIcon name="save" className="text-[15px]" />
                  Simpan kategori
                </SubmitButton>
              </div>
            </div>

            {form.error ? (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] text-rose-700 sm:col-span-3">
                {form.error}
              </p>
            ) : null}
          </form>

          <div className="border-t border-hairline">
            <div className="hidden grid-cols-12 gap-2 bg-bone/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft sm:grid">
              <span className="col-span-4">Nama nominal</span>
              <span className="col-span-2">Harga</span>
              <span className="col-span-1">Urut</span>
              <span className="col-span-3">Flag</span>
              <span className="col-span-2 text-right">Aksi</span>
            </div>

            {product.items.length === 0 ? (
              <p className="px-4 py-6 text-center text-[12px] text-ink-faint">
                Belum ada nominal di kategori ini.
              </p>
            ) : (
              product.items.map((item) => <ItemRow key={item.id} item={item} />)
            )}

            <AddItemForm productId={product.id} nextOrder={nextOrder} />
          </div>
        </>
      ) : null}
    </Card>
  );
}

export function ProductManager({ products }: { products: ProductWithItems[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isMoving, startMove] = useTransition();
  const [openId, setOpenId] = useState<string | null>(products[0]?.id ?? null);

  /** Tukar posisi kategori lalu simpan urutan barunya ke database. */
  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= products.length) return;

    const reordered = [...products];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    startMove(async () => {
      const result = await saveProductOrder(
        reordered.map((product, position) => ({
          id: product.id,
          urutan_tampil: position + 1,
        })),
      );
      showToast(result.message, result.ok ? "success" : "error");
      if (result.ok) router.refresh();
    });
  };

  if (products.length === 0) {
    return (
      <Card>
        <p className="px-5 py-10 text-center text-[13px] text-ink-soft">
          Data kategori belum bisa dibaca dari Supabase. Periksa konfigurasi
          environment dan jalankan skema database.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <CategoryCard
          key={product.id}
          product={product}
          index={index}
          total={products.length}
          onMove={handleMove}
          movePending={isMoving}
          isOpen={openId === product.id}
          onToggle={() => setOpenId(openId === product.id ? null : product.id)}
        />
      ))}
    </div>
  );
}
