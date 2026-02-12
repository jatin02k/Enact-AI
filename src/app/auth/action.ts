'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:{
            redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/auth/callback',
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

