import { DataTypes } from "sequelize";
import { sequelizeInstance} from "../db/database";
export const Role = sequelizeInstance.define('roles',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
    },
})