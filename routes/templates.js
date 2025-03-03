const express = require("express");
const db = require("../db");
const verifyToken = require("../authMiddleware");
const router = express.Router();

// Create a Template (Only for Logged-in HRs)
router.post("/create", verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const uploaded_by = req.user.name; // Fetch employee name from JWT token

        await db.query("INSERT INTO templates (title, content, uploaded_by) VALUES (?, ?, ?)", [title, content, uploaded_by]);

        res.status(201).json({ message: "Template created successfully.", uploaded_by });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Templates
router.get("/all", async (req, res) => {
    try {
        const [templates] = await db.query("SELECT * FROM templates");
        res.json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;




