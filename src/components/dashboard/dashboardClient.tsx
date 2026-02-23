'use client'

import { useState } from 'react'
import { UploadImage } from '@/components/dashboard/uploadImage'
import { TaskList } from '@/components/dashboard/taskList'
import { User } from '@supabase/supabase-js'
import { Flame, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface DashboardClientProps {
  user: User
}

export function DashboardClient({ user }: DashboardClientProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  const handleTaskExtracted = () => {
    // Increment trigger to cause TaskList to re-fetch
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const avatar = user.user_metadata?.avatar_url

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header */}
      <header className="bg-white border-b border-soft-sand sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <span className="font-semibold text-deep-brown text-sm">Enact AI</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-coral" />
              <span className="text-xs font-semibold text-deep-brown">0 day streak</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs text-warm-gray hover:text-coral transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Welcome */}
        <div className="flex items-center gap-3">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={displayName}
              className="w-10 h-10 rounded-full border-2 border-soft-sand"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
              <span className="text-coral font-semibold text-sm">
                {displayName[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 className="font-bold text-deep-brown text-lg leading-tight">
              Good {getTimeOfDay()}, {displayName.split(' ')[0]}!
            </h1>
            <p className="text-xs text-warm-gray">What will you enact today?</p>
          </div>
        </div>

        {/* Upload Image to Extract Task */}
        <UploadImage onTaskExtracted={handleTaskExtracted} />

        {/* Task List */}
        <TaskList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  )
}

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}
