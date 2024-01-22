import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import Utilizator from '../entities/Utilizator';
import CerereDisertatie from '../entities/CerereDisertatie';
import { CereriDisertatie } from '../entities/dbConst';

env.config();


function createDatabase() {   
    mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    })
    .then((connection) => {   
        return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })    
    .then(() => {
        console.log('Database created successfully.');
    })
    .catch((err) => {
        console.warn(err.stack);
    });
}



function fkConfig()
{
    Utilizator.hasMany(CerereDisertatie, {as : CereriDisertatie, foreignKey: "UserId"});
    CerereDisertatie.belongsTo(Utilizator, { foreignKey: "UserId"})    
}

function db_init(){
    createDatabase();
    fkConfig();    
}

export default db_init;