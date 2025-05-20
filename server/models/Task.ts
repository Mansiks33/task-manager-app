import mongoose from 'mongoose';

// 1. Define the TypeScript interface for Task
// export interface ITask extends Document {
//   title: string;
//   description?: string;
//   dueDate?: Date;
//   priority?: 'Low' | 'Medium' | 'High';
//   status?: 'Pending' | 'In Progress' | 'Completed';
//   assignedTo?: string;
// }

// 2. Define the Mongoose schema
const taskSchema = new mongoose.Schema(
  {
    _id: {type: String},
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

// 3. Export the model using ES modules and TypeScript types
const Task = mongoose.model('Task', taskSchema);
export default Task;

