'use client'

import { useRef, useEffect, useState } from 'react';
import UploadImage from "@/components/dashboard/uploadImage";
import TaskDisplay, { TaskDisplayRef } from "@/components/dashboard/taskDisplay";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const taskDisplayRef = useRef<TaskDisplayRef>(null);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleTasksExtracted = () => {
    // Refresh the task list when new tasks are extracted
    taskDisplayRef.current?.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white border border-soft-sand shadow-lg p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-deep-brown mb-2">
            Welcome Back
          </h1>
          <p className="text-warm-gray">
            Hello, <span className="font-semibold text-coral">{user.email}</span>
          </p>
          
          <form action="/api/auth/signout" method="post" className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-soft-sand text-deep-brown rounded hover:bg-coral hover:text-white transition text-sm"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Upload Section */}
        <UploadImage onTasksExtracted={handleTasksExtracted} />

        {/* Tasks Section */}
        <div className="bg-white border border-soft-sand shadow-lg p-8 rounded-lg">
          <TaskDisplay ref={taskDisplayRef} />
        </div>
      </div>
    </div>
  );
}
