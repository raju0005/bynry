import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import profileRoutes from "./routes/profileRoutes.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

const allowedOrigins = [
  "https://bynry-profiles.vercel.app",
  "http://localhost:5173/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

app.use("/api/profiles", profileRoutes);

app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
