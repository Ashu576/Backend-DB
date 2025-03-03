const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Employee Registration
router.post("/add", async (req, res) => {
    try {
        const { name, email_id, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO employees (name, email_id, password) VALUES (?, ?, ?)", [name, email_id, hashedPassword]);

        res.status(201).json({ message: "Employee registered successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Employee Login
router.post("/login", async (req, res) => {
    try {
        const { email_id, password } = req.body;

        const [rows] = await db.query("SELECT * FROM employees WHERE email_id = ?", [email_id]);
        if (rows.length === 0) return res.status(400).json({ message: "User not found." });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        await db.query("UPDATE employees SET last_login = NOW() WHERE email_id = ?", [email_id]);

        const token = jwt.sign({ name: user.name, email: user.email_id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
