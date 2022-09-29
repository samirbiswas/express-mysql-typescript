import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boutique_db',
    multipleStatements: true
});

connection.connect();

export default connection