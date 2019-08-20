import mysql from 'mysql';

const db = mysql.createConnection(process.env.DB_URL);

module.exports = db;
