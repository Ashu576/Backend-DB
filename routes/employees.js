const express = require('express');
const router = express.Router();
const db = require('../db');

// Employee Login (Authentication)
router.post("/login", (req, res) => {
    const { employee_id, password } = req.body;

    // Query to find the user
    const sql = "SELECT * FROM employees WHERE employee_id = ?";
    db.query(sql, [employee_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Update last login timestamp
        const updateLoginTimeSQL = "UPDATE employees SET last_login = NOW() WHERE employee_id = ?";
        db.query(updateLoginTimeSQL, [employee_id], (err, updateResult) => {
            if (err) return res.status(500).json({ error: "Error updating login time" });

            // Send response with user details and last login
            res.json({
                message: "Login successful",
                employee: {
                    employee_id: user.employee_id,
                    last_login: new Date().toISOString(),  // Send current login time
                }
            });
        });
    });
});

// Add New Employee
router.post('/add', (req, res) => {
    const { employee_id, password } = req.body;
    const sql = 'INSERT INTO employees (employee_id, password) VALUES (?, ?)';
    
    db.query(sql, [employee_id, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error adding employee' });
        } else {
            res.json({ message: 'Employee added successfully', id: result.insertId });
        }
    });
});

// Delete Employee
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE employee_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting employee' });
        } else {
            res.json({ message: 'Employee deleted successfully' });
        }
    });
});

module.exports = router;
