const express = require('express');
const router = express.Router();
const db = require('../db');

// Create New Template
router.post('/create', (req, res) => {
    const { title, content, employee_id } = req.body;
    const sql = 'INSERT INTO templates (title, content, employee_id) VALUES (?, ?, ?)';
    
    db.query(sql, [title, content, employee_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating template' });
        } else {
            res.json({ message: 'Template created successfully', id: result.insertId });
        }
    });
});

// Get All Templates
router.get('/all', (req, res) => {
    const sql = 'SELECT * FROM templates';

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching templates' });
        } else {
            res.json(results);
        }
    });
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

// Update a Template
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const sql = 'UPDATE templates SET title = ?, content = ? WHERE id = ?';

    db.query(sql, [title, content, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating template' });
        } else {
            res.json({ message: 'Template updated successfully' });
        }
    });
});

// Delete a Template
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM templates WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting template' });
        } else {
            res.json({ message: 'Template deleted successfully' });
        }
    });
});

module.exports = router;
