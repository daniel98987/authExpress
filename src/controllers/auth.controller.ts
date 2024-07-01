import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';


// Crear un nuevo usuario
export const login = async (req: Request, res: Response) => {
    const { mail, password } = req.body;


    try {
        // Verificar si el usuario ya existe
        const user:any = await User.findOne({ where: { mail } });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // Encriptar la contraseña
        const isValid = bcrypt.compareSync(password,user.password)
        if(!isValid) throw new Error("password is invalid");
        
        const _jwt = jwt.sign({id:user.id,email:user.mail,roleId:user.roleId},SECRET_JWT_KEY,{
            expiresIn:'1h'
        })

       res.send({_jwt})
    } catch (error:any) {
        res.status(401).send(error.message );
    }
};
