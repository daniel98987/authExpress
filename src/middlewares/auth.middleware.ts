import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';
import { Role } from '../models/Role';

// Interfaz para el objeto Request extendido con los datos del usuario
interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

// Middleware para verificar la autenticación y autorización
export const authMiddleware =   (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1]; // Elimina "Bearer " del token
    try {
      // Verifica el token y extrae los datos del usuario
      console.log('start')
      const decoded:any = jwt.verify(token, SECRET_JWT_KEY) ;
      console.log('decoded',decoded)
      const roles:any = await Role.findOne({ where: { id:decoded.roleId } });
      if (!decoded || !allowedRoles.includes(roles.name)) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      next();
    } catch (error) {
        console.log('ERROR',error)
      return res.status(401).json({ message: 'Token inválido' });
    }
  };
};
