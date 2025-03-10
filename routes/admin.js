const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
require("dotenv").config();

// Admin Register
router.post("/register", async (req, res) => {
    const { first_name, last_name, email_id, password } = req.body;
    
    // Check if admin already exists
    db.query("SELECT * FROM admin WHERE email_id = ?", [email_id], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length > 0) return res.status(400).json({ message: "You are already registered." });
        
        // Hash password and insert new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO admin (first_name, last_name, email_id, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [first_name, last_name, email_id, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: "Error registering admin" });
            res.json({ message: "Admin registered successfully", id: result.insertId });
        });
    });
});

// Admin Login
router.post("/login", (req, res) => {
    const { email_id, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email_id = ?";

    db.query(sql, [email_id], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: results[0].id, first_name: results[0].first_name }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

// Delete Admin
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM admin WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting admin" });
        res.json({ message: "Admin deleted successfully" });
    });
});

module.exports = router;
