'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInWithGoogle() {
    const supabase = await createClient();
    
    // Get the current origin dynamically
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const origin = `${protocol}://${host}`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:{
            redirectTo: `${origin}/auth/callback`,
        }
    })
    if(error){
        console.log(error);
        return redirect('/auth?error=' + error.message);
    }
    if(data.url){
        return redirect(data.url);
    }
}

