import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UploadImage } from '@/components/dashboard/uploadImage'
import { TaskList } from '@/components/dashboard/taskList'
import { DashboardClient } from '@/components/dashboard/dashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <DashboardClient user={user} />
}
