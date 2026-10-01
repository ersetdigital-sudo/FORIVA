/**
 * Supabase client dengan SERVICE ROLE KEY — hanya untuk operasi server yang
 * butuh melewati RLS (mis. mencatat transaksi guest checkout).
 *
 * JANGAN pernah mengimpor file ini dari Client Component.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY belum diisi di environment.");
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
