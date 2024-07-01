import { Request, Response } from 'express';
import { Role } from '../models/Role';

// Obtener todos los roles
export const getRoles = async (_: Request, res: Response) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles', error });
    }
};

// Crear un nuevo rol
export const createRole = async (req: Request, res: Response) => {
    const { name,  description } = req.body;
    try {
        const newRole = await Role.create({
            name,

            description,
        });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rol', error });
    }
};

// // Actualizar un rol existente
// export const updateRole = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     try {
//         const role:any = await Role.findByPk(id);
//         if (role) {
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
