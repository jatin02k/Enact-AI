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
    const { error } = await supabase
        .from("waitlist")
        .insert([{ email }]);

    if (error) {
        console.log('Supabase Error', error);
        if (error.code === '23505') { // Unique constraint violation code
            return { error: 'Email already registered' }
        }
        return { error: 'Failed to save email' }
    }
    revalidatePath("/");
    return { success: true };
}
