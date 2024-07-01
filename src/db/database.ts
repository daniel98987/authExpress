import { Sequelize} from 'sequelize'

export const  sequelizeInstance = new Sequelize('projectsdb', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
});