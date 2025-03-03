require("dotenv").config();
const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employees");
const templateRoutes = require("./routes/templates");

app.use(express.json()); // Parse JSON data
app.use("/api/employees", employeeRoutes);
app.use("/api/templates", templateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
