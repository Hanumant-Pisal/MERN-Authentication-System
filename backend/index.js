const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/AuthRouter');  // Import your auth routes
const ProductsRouter = require('./Routes/ProductsRouter');  // Fixed the import

const app = express();

// Middleware to handle requests
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB connection
require('dotenv').config();
require('./Models/db'); // Ensure your db connection is correctly set up in this file

// Register routes
app.use('/auth', authRouter);
app.use('/products', ProductsRouter);  // Register the products route

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
