import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
// Obtener todos los roles
export const getUsers = async (_: Request, res: Response) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los Users', error });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const { names, surnames, phone, address, mail, password } = req.body;


    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { mail } });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const newUser = await User.create({
            names,
            surnames,
            phone,
            address,
            mail,
            password: hashedPassword
        });

        // Enviar respuesta de éxito
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};
// // Actualizar un rol existente
// export const updateUser = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     try {
//         const User:any = await User.findByPk(id);
//         if (User) {
//             role.name = name;
//             role.description = description;
//             await role.save();
//             res.json(role);
//         } else {
//             res.status(404).json({ message: 'Rol no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el rol', error });
//     }
// };

// // Eliminar un rol
// export const deleteRole = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const role = await Role.findByPk(id);
//         if (role) {
//             await role.destroy();
//             res.status(204).send();
//         } else {
//             res.status(404).json({ message: 'Rol no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al eliminar el rol', error });
//     }
// };
