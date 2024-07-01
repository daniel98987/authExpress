import express from "express"
const app = express();
import projectsRoutes from './routes/routes.routes';
//Middlewares
app.use(express.json());

app.use(projectsRoutes);
export default app;