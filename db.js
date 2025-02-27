const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '', // Change if needed
    password: '', // Change if needed
    database: 'hrportal' // Database Name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL ✅');
    }
});

module.exports = db;
