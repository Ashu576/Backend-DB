const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Create Template
router.post("/create", async (req, res) => {
    const { title, content, uploaded_by } = req.body;
    if (!title || !content || !uploaded_by) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // ✅ Check if employee exists before uploading
        const checkEmployeeSQL = "SELECT name FROM employees WHERE name = ?";
        db.query(checkEmployeeSQL, [uploaded_by], (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ error: "Invalid employee name" });
            }

            const insertSQL = "INSERT INTO templates (title, content, uploaded_by) VALUES (?, ?, ?)";
            db.query(insertSQL, [title, content, uploaded_by], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error creating template" });
                }
                res.status(201).json({ message: "Template created successfully", id: result.insertId });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Fetch All Templates
router.get("/all", async (req, res) => {
    try {
        const sql = "SELECT * FROM templates";
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching templates" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Template by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM templates WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching template' });
        } else {
            res.json(result[0]);
        }
    });
});

// ✅ Update Template
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, uploaded_by } = req.body;
    if (!title || !content || !uploaded_by) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const updateSQL = "UPDATE templates SET title = ?, content = ?, uploaded_by = ? WHERE id = ?";
        db.query(updateSQL, [title, content, uploaded_by, id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(500).json({ error: "Error updating template" });
            }
            res.status(200).json({ message: "Template updated successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete Template
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSQL = "DELETE FROM templates WHERE id = ?";
        db.query(deleteSQL, [id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(500).json({ error: "Error deleting template" });
            }
            res.status(200).json({ message: "Template deleted successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


