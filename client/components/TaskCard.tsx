'use client';

import { Task } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
};

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white shadow-md p-4 rounded space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <Pencil
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
            onClick={() => onEdit?.(task)}
          />
          <Trash2
            className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
            onClick={() => onDelete?.(task._id!)}
          />
        </div>
      </div>
      <p className="text-base text-gray-900">{task.description || 'No description provided.'}</p>
      <p className="text-sm text-gray-900">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      <p className="text-sm text-gray-900">Priority: {task.priority || 'N/A'}</p>
      <p className="text-sm text-gray-900">Status: {task.status || 'N/A'}</p>
      <p className="text-sm text-gray-900">Assigned to: {task.assignedTo || 'N/A'}</p>
    </div>
  );
}

