/**
 * Supabase client untuk SERVER (Server Component, Server Action, Route Handler).
 *
 * Sesi login admin dibaca dari cookie lewat @supabase/ssr, sehingga query
 * otomatis berjalan sebagai user yang sedang login (RLS tetap berlaku).
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Dipanggil dari Server Component: refresh sesi ditangani middleware.
          }
        },
      },
    },
  );
}
