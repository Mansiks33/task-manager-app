'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // ✅ redirect to login if not authenticated
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false); // ✅ Stop loading after attempt
      }
    };

    fetchTasks();
  }, [router]);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleSave = (task: Partial<Task>) => {
    if (!task.title || !task.status) {
      console.error('Missing required fields');
      return;
    }
    const completeTask = task as Task;
    if (selectedTask) {
      setTasks(tasks.map((t) => (t._id === completeTask._id ? completeTask : t)));
    } else {
      setTasks([completeTask, ...tasks]);
    }
    setSelectedTask(null);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-6">
      <Navbar />
      <TaskForm onSubmit={handleSave} selectedTask={selectedTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
}



