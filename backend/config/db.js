const dotenv = require('dotenv').config()
var mysql      = require('mysql');

const db  = mysql.createPool({
    connectionLimit: 30000,
    acquireTimeout: 30000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


module.exports = db