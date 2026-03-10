'use server';

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(){
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll(): { name: string; value: string }[] {
                    // @ts-ignore - Next.js 15 requires await but Supabase type expects sync
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]): void {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch { 
                        // handled by middleware
                    }
                },
            }
        }
    )
}