import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { CerereDisertatieAttributes } from './CerereDisertatie';

export interface UtilizatorAttributes{
    UserId : number,
    UserName: string,
    UserSurName: string,
    Type:string,
    UserPhone: string | null,
    UserEmail: string | null,

    Password:string | null,

    Cereri: CerereDisertatieAttributes[],
   
}

export interface UtilizatorCreationAttributes extends UtilizatorAttributes {}

const Utilizator : ModelDefined<UtilizatorAttributes, UtilizatorCreationAttributes> = db.define("Utilizator", 
{
    UserId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    UserSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    Type:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },  
    
    UserPhone:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    UserEmail:
    {
        type: Sequelize.STRING,
        allowNull: false, 
    },



    Password:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },
});

export default Utilizator;