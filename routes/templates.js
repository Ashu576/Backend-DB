const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
require("dotenv").config();

// Middleware to verify Admin token
const verifyAdmin = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access denied, token missing" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Create Template (Admin Only)
router.post("/create", verifyAdmin, (req, res) => {
    const { title, content } = req.body;
    const uploaded_by = req.admin.first_name + " " + req.admin.last_name;

    const sql = "INSERT INTO templates (title, content, uploaded_by) VALUES (?, ?, ?)";
    db.query(sql, [title, content, uploaded_by], (err, result) => {
        if (err) return res.status(500).json({ error: "Error creating template" });
        res.json({ message: "Template created successfully", id: result.insertId });
    });
});

// Update Template (Admin Only)
router.put("/update/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const sql = "UPDATE templates SET title = ?, content = ? WHERE id = ?";

    db.query(sql, [title, content, id], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(500).json({ error: "Error updating template" });
        res.json({ message: "Template updated successfully" });
    });
});

// Delete Template (Admin Only)
router.delete("/delete/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM templates WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(500).json({ error: "Error deleting template" });
        res.json({ message: "Template deleted successfully" });
    });
});

// Fetch Template by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM templates WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err || result.length === 0) return res.status(404).json({ error: "Template not found" });
        res.json(result[0]);
    });
});

// Fetch All Templates
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM templates";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching templates" });
        res.json(results);
    });
});

module.exports = router;