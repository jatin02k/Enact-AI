import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  let cookieDomain: string | undefined = undefined;

  if (typeof window!=='undefined' && process.env.NODE_ENV === 'production') { 
    const root = process.env.NEXT_PUBLIC_APP_URL;
    if(root && window.location.hostname.endsWith(root)){
      cookieDomain = `.${root}`;
    }
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions:{
        domain: cookieDomain,
        path: '/',
        sameSite: 'lax',
        secure:process.env.NODE_ENV === 'production',
        httpOnly: true,
      }
    }
  )
}
