// server/routes/taskRoutes.ts
// import express from 'express';
// import { createTask } from '../controllers/taskController';

// console.log('✅ createTask loaded:', typeof createTask);

// const router = express.Router();

// // POST /api/tasks
// router.post('/', createTask);

// export default router;

// server/routes/taskRoutes.ts
import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('✅ Request received at /api/tasks');
    await createTask(req, res);  // Await the controller's promise
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

router.get('/', authMiddleware, getAllTasks);

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    await updateTask(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await deleteTask(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
});


export default router;


