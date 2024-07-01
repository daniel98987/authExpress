import { Router } from "express";
import { getRoles,createRole } from "../controllers/role.controller";
import { getUsers,createUser} from "../controllers/user.controller";
import { login} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.get('/role',authMiddleware(['admin']),getRoles);
router.post('/role',createRole);

router.get('/user',getUsers);
router.post('/user',createUser);
router.post('/login',login);
// router.put('/role/:id');
// router.delete('/role/:id');
// router.get('/role/:id');

export default router