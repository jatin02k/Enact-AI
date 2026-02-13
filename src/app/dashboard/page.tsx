import UploadImage from "@/components/dashboard/uploadImage";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-warm-cream p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-zinc-800 shadow-2xl p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-deep-brown mb-4">
            Welcome to Your Dashboard
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg text-deep-brown/80">
              Hello, <span className="font-semibold">{user.email}</span>!
            </p>
            
            <div className="bg-coral/10 border border-coral/20 p-4 rounded">
              <p className="text-deep-brown">
                🎉 You&apos;re successfully authenticated with Google!
              </p>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-semibold mb-2">User Info:</h2>
              <div className="bg-zinc-50 p-4 rounded border border-zinc-200">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
              </div>
            </div>

            <form action="/api/auth/signout" method="post" className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition"
              >
                Sign Out
              </button>
            </form>
          </div>
          <div className="pt-4">
            <UploadImage />
          </div>

        </div>
      </div>
    </div>
  );
}
