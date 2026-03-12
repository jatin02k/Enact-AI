'use client'

import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Flame } from 'lucide-react';
import ProofModal from './proofModal';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_xp: number;
  image_url: string;
  status: 'pending' | 'verified' | 'failed';
  created_at: string;
}

export interface TaskDisplayRef {
  refresh: () => Promise<void>;
}

interface TaskDisplayProps {
  refreshTrigger?: number;
}

const TaskDisplay = forwardRef<TaskDisplayRef, TaskDisplayProps>(({ refreshTrigger }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProof = async ({ imageBase64, textProof }: { imageBase64: string | null; textProof: string }) => {
    if (!imageBase64 && !textProof) return;
    setIsSubmitting(true);
    try {
      toast.loading('Submitting Proof...');
      const response = await fetch('api/verify-proof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          imageBase64, 
          textProof, 
          taskId: selectedTask?.id, 
          taskTitle: selectedTask?.title, 
          taskDescription: selectedTask?.description })
      })
      if (!response.ok) {
        throw new Error('Failed to Submit Proof');
      }
      const data = await response.json();
      toast.dismiss();
      if (data.verdict === 'accepted') {
        await supabase.from('tasks').update({ status: 'verified' }).eq('id', selectedTask?.id);
        toast.success('Task Verified Successfully');
        setIsModalOpen(false);
        await fetchTasks();
      } else {
        toast.error(data.reason);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to Submit Proof');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Expose refresh function to parent
  useImperativeHandle(ref, () => ({
    refresh: fetchTasks
  }));

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (refreshTrigger) fetchTasks();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <Flame className="w-16 h-16 mx-auto text-warm-gray" />
        <div>
          <h3 className="text-xl font-semibold text-deep-brown mb-2">No Tasks Yet</h3>
          <p className="text-warm-gray">
            Upload a book page above to extract your first task!
          </p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'verified');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-soft-sand/30 rounded-lg p-4 border border-soft-sand">
          <div className="text-2xl font-bold text-deep-brown">{tasks.length}</div>
          <div className="text-sm text-warm-gray">Total Tasks</div>
        </div>
        <div className="bg-coral/10 rounded-lg p-4 border border-coral/30">
          <div className="text-2xl font-bold text-coral">{pendingTasks.length}</div>
          <div className="text-sm text-warm-gray">Pending</div>
        </div>
        <div className="bg-sage/10 rounded-lg p-4 border border-sage/30">
          <div className="text-2xl font-bold text-sage">{completedTasks.length}</div>
          <div className="text-sm text-warm-gray">Completed</div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-deep-brown">Your Tasks</h3>
        {tasks.map((task) => (
          <Card key={task.id} className="bg-white border-soft-sand p-4 hover:border-coral/50 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              {/* Task Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-deep-brown">{task.title}</h4>
                  <Badge variant="outline" className="text-xs border-warm-gold/30 text-warm-gold bg-warm-gold/10">
                    {task.category}
                  </Badge>
                </div>
                <p className="text-sm text-warm-gray">{task.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-coral font-medium">+{task.estimated_xp} XP</span>
                  <span className="text-warm-gray">•</span>
                  <span className="text-warm-gray">
                    {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-end gap-2">
                {task.status === 'pending' ? (
                  <>
                    <Badge variant="outline" className="bg-warm-gold/10 text-warm-gold border-warm-gold/30">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                    <Button size="sm" variant="ghost"
                      onClick={() => {
                        setSelectedTask(task)
                        setIsModalOpen(true)
                      }}
                      className="text-xs text-deep-brown hover:bg-coral/10 hover:text-coral">
                      Upload Proof
                    </Button>
                    <ProofModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      taskTitle={selectedTask?.title ?? ""}
                      onSubmit={handleSubmitProof}  // passing the function down
                    />
                  </>
                ) : (
                  <Badge variant="outline" className="bg-sage/10 text-sage border-sage/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
});

TaskDisplay.displayName = 'TaskDisplay';

export default TaskDisplay;
