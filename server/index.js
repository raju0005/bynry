import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import profileRoutes from './routes/profileRoutes.js';
import cors from 'cors'; // Import the CORS package

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Use CORS to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests only from this frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  credentials: true,  // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));  // Enable CORS with the specified options

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/profiles', profileRoutes);

app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
