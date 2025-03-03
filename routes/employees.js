const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Add Employee
router.post("/add", async (req, res) => {
    const { name, email_id, password } = req.body;
    if (!name || !email_id || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const sql = "INSERT INTO employees (name, email_id, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email_id, password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error adding employee" });
            }
            res.status(201).json({ message: "Employee added successfully", id: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Employee Login
router.post("/login", async (req, res) => {
    const { email_id, password } = req.body;
    if (!email_id || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const sql = "SELECT * FROM employees WHERE email_id = ? AND password = ?";
        db.query(sql, [email_id, password], (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            
            // ✅ Update last login time
            const updateLoginSQL = "UPDATE employees SET last_login = NOW() WHERE email_id = ?";
            db.query(updateLoginSQL, [email_id]);

            res.status(200).json({ message: "Login successful", employee: results[0] });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the employee exists
        const [employee] = await db.promise().query("SELECT * FROM employees WHERE id = ?", [id]);

        if (employee.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Delete the employee without affecting the templates
        await db.promise().query("DELETE FROM employees WHERE id = ?", [id]);

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Error deleting employee" });
    }
});

module.exports = router;
