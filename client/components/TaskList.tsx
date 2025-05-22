'use client';

import { Task } from '../types';
import TaskCard from './TaskCard';

type Props = {
  tasks: Task[];
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
};

export default function TaskList({ tasks, onDelete, onEdit }: Props) {
  console.log('Tasks:', tasks);
  return (
    <div className="grid gap-4">
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

