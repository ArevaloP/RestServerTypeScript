"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'root', 'gjap1008', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false, Para fines educativo se deja el logging en true
});
exports.default = db;
//# sourceMappingURL=connection.js.map