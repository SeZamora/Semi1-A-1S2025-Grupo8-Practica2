import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/task.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', authRoutes)
app.use('/tasks', tasksRoutes)

app.listen(PORT, () => {
  return console.log(`Server is running on port ${PORT}`);
})