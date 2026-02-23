'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Clock, XCircle, BookOpen, ChevronRight } from 'lucide-react'

interface Task {
  id: string
  task_text: string
  image_url: string
  status: 'pending' | 'verified' | 'failed'
  created_at: string
}

interface TaskListProps {
  refreshTrigger?: number
}

export function TaskList({ refreshTrigger }: TaskListProps) {
  const supabase = createClient()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error && data) {
      setTasks(data)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks, refreshTrigger])

  const statusConfig = {
    pending: {
      icon: Clock,
      label: 'Pending',
      className: 'text-warm-gold bg-warm-gold/10',
    },
    verified: {
      icon: CheckCircle2,
      label: 'Completed',
      className: 'text-sage bg-sage/10',
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      className: 'text-red-500 bg-red-50',
    },
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-soft-sand p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-coral" />
          </div>
          <div>
            <h3 className="font-semibold text-deep-brown text-sm">Your Tasks</h3>
            <p className="text-xs text-warm-gray">Actions extracted from your books</p>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-warm-cream rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-soft-sand p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-coral" />
          </div>
          <div>
            <h3 className="font-semibold text-deep-brown text-sm">Your Tasks</h3>
            <p className="text-xs text-warm-gray">Actions extracted from your books</p>
          </div>
        </div>
        <span className="text-xs font-medium text-warm-gray bg-warm-cream px-2.5 py-1 rounded-full">
          {tasks.length} total
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-warm-cream flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-warm-gray" />
          </div>
          <p className="text-sm font-medium text-deep-brown mb-1">No tasks yet</p>
          <p className="text-xs text-warm-gray">Upload a book page to extract your first task</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const config = statusConfig[task.status]
            const Icon = config.icon
            const date = new Date(task.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })

            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-soft-sand hover:border-coral/30 hover:bg-warm-cream/50 transition-all group"
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${config.className}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-deep-brown font-medium leading-snug line-clamp-2">
                    {task.task_text}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.className}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-warm-gray">{date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-warm-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
