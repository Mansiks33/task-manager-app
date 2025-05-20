// server/controllers/taskController.ts
import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthRequest extends Request {
  userId?: string;
}

// export const createTask = async (req: Request, res: Response) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json(task);
//   } catch (err: any) {
//     res.status(400).json({ message: err.message || 'Task creation failed' });
//   }
// };

//create tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Incoming create task request:', req.body);
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    const userId = req.userId;
    if(!userId){
      return res.status(400).json({ message: 'Unauthorized: No user ID in request' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({ title, description, dueDate, priority, status, assignedTo, userId }); 
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Task creation failed' });
  }
};

// get all tasks
export const getAllTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  console.log('Fetching tasks for userId:', userId);
  try{
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  }
  catch(err:any){
    res.status(500).json({message: err.message || 'Failed to fetch tasks'});
  }
};

// Update a task by ID
export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
