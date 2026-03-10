'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// function to submit email to waitlist from landing page
export type ActionState = {
    error?: string;
    success?: boolean;
};

// function to submit email to waitlist from landing page
export async function submitEmail(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const supabase = await createClient();
    if (!email) {
        return { error: "Email is required" };
    }
    const { data: existingUser } = await supabase
        .from("waitlist")
        .select("email")
        .eq("email", email)
        .single();

    if (existingUser) {
        return { error: 'Email already registered' };
    }

    const { error } = await supabase
        .from("waitlist")
        .insert([{ email }]);

    if (error) {
        console.error('Supabase Error', error);
        return { error: 'Failed to save email. Please try again later.' }
    }
    revalidatePath("/");
    return { success: true };
}
