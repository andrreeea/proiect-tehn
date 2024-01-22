import db from '../dbConfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface CerereDisertatieAttributes{
    Id: number,
    Detail: string,
    Stare: string,

    Profesor:string,
    Specializare:string,
    
    UserId: number
}

export interface CerereDisertatieCreationAttributes extends CerereDisertatieAttributes {}

const CerereDisertatie : ModelDefined<CerereDisertatieAttributes, CerereDisertatieCreationAttributes> = db.define("CerereDisertatie", 
{
    Id:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Detail: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    Stare:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    Profesor:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Specializare:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    UserId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }   
});

export default CerereDisertatie;