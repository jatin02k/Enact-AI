'use client'

import { signInWithGoogle } from "../auth/action"

export default function loginPage(){
    return(
        <div className="min-h-screen bg-warm-cream flex items-center justify-center ">
            <div className="w-full max-w-md shadow-2x backdrop-blur-sm relative z-10 border">
                <h1 className=" text-4xl ">Welcome to Enact AI</h1>
                <p>Turn your self-help books into daily actions.</p>
                <form action={signInWithGoogle}>
                    <button
                    type="submit"
                    className="h-14 w-full px-8 text-base sm:w-auto shadow-lg shadow-coral/20 disabled:opacity-50 bg-orange-600"
                    >
                        Continue With Google
                    </button>
                </form> 
            </div>
            
        </div>
    )
}