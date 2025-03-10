require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const hrRoutes = require("./routes/hr");
const templateRoutes = require("./routes/templates");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/templates", templateRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
