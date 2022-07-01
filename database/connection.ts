import { Sequelize } from "sequelize";



const db = new Sequelize('node', 'root', 'gjap1008', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false, Para fines educativo se deja el logging en true
});

export default db;


