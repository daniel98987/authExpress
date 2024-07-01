import { DataTypes } from "sequelize";
import { sequelizeInstance} from "../db/database";
import {Role} from "./Role"
export const User = sequelizeInstance.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    names:{
        type: DataTypes.STRING,
        unique: true
    },
    surnames:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    // state:{
    //     type: DataTypes.STRING
    // },
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
  
},{
    timestamps:false
})

// Relación
User.belongsTo(Role, { foreignKey: 'roleId' });