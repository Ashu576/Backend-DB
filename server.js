require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: '', // Database username
    password: '', // Database Password
    database: 'hrportal'// Database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database ✅');
    }
});

// Default Route
//--------------------
// app.get('/', (req, res) => {
//     res.send('HR Portal Backend is running...');
// });

// Import API Routes
const employeeRoutes = require('./routes/employees');
const templateRoutes = require('./routes/templates');

app.use('/api/employees', employeeRoutes);
app.use('/api/templates', templateRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
