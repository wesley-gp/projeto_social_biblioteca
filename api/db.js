
import mysql from "mysql2/promise";

const conConfig = {
    host: 'localhost',
    user: 'root',
    password: 'senha123',
    database: 'bibliotecaDB'
};

export const pool = mysql.createPool(conConfig);