'use client';

import { useState, useEffect } from 'react';
import { Task } from '../types';

type Props = {
  onSubmit: (task: Partial<Task>) => void;
  selectedTask?: Task | null;
  onCancelEdit?: () => void;
};

export default function TaskForm({ onSubmit, selectedTask, onCancelEdit }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Medium');
  const [status, setStatus] = useState<Task['status']>('Pending');
  const [assignedTo, setAssignedTo] = useState('');

  // Populate form if editing a task
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || '');
      setDescription(selectedTask.description || '');
      setDueDate(selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : '');
      setPriority(selectedTask.priority || 'Medium');
      setStatus(selectedTask.status || 'Pending');
      setAssignedTo(selectedTask.assignedTo || '');
    } else {
      resetForm();
    }
  }, [selectedTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setStatus('Pending');
    setAssignedTo('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = ({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      status,
      assignedTo: assignedTo.trim(),
    });
    console.log("submitting task:", newTask);
    onSubmit(newTask);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded space-y-4 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {selectedTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded text-gray-700"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded text-gray-700"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border px-3 py-2 rounded text-gray-700"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Task['priority'])}
        className="w-full border px-3 py-2 rounded text-gray-700"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task['status'])}
        className="w-full border px-3 py-2 rounded text-gray-700"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
      </select>

      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full border px-3 py-2 rounded text-gray-700"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {selectedTask ? 'Update' : 'Create'}
        </button>
        {selectedTask && onCancelEdit && (
          <button
            type="button"
            onClick={() => {
              onCancelEdit();
              resetForm();
            }}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}


