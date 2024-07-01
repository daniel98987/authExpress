import app from './app';
import {sequelizeInstance} from './db/database';
import { Role } from './models/Role';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

// import './models/Project.js';
// import './models/Task.js';

async function main (){

    try {
        await sequelizeInstance.sync({force:true})
            // Crear roles de ejemplo
        const adminRole:any = await Role.create({ name: 'admin' });
        const userRole:any = await Role.create({ name: 'normal' });

        // Crear usuarios de ejemplo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123', salt);

        await User.create({names:"Daniel Zambrano", mail: 'daniel@gmail.com', password: hashedPassword, roleId: adminRole.id });
        await User.create({ names:"Normal User", mail: 'normalUser@gmail.com', password: hashedPassword, roleId: userRole.id });
        await sequelizeInstance.authenticate();
        console.log("Connection has been established successfully");
        app.listen(3000);
        console.log("Server is listening on port",3000)
    
    } catch (error) {
        console.log('Unable to connect to the database',error)
    }
}

main();