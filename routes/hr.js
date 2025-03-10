const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
require("dotenv").config();

// HR Register
router.post("/register", async (req, res) => {
    const { first_name, last_name, email_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO hr (first_name, last_name, email_id, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, email_id, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: "Error registering HR" });
        res.json({ message: "HR registered successfully", id: result.insertId });
    });
});

// HR Login
router.post("/login", (req, res) => {
    const { email_id, password } = req.body;
    const sql = "SELECT * FROM hr WHERE email_id = ?";

    db.query(sql, [email_id], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: results[0].id, first_name: results[0].first_name }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

// Delete HR
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM hr WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting HR" });
        res.json({ message: "HR deleted successfully" });
    });
});

module.exports = router;
