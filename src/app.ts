import express from "express"
const app = express();
import projectsRoutes from './routes/routes.routes';
import cors from 'cors'
//Middlewares
app.use(express.json());
app.use(cors()); 
app.use(projectsRoutes);
export default app;