import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zarif_2002",
    database: "researchabroad"
});

export default db;