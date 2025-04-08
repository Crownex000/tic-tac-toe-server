import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import controller from './controller/history.js'

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.NODE_ENVIRONMENT === 'production' ? process.env.APP_DEPLOYMENT_URL : process.env.APP_DEVELOPMENT_URL);
    res.header('Access-Control-Allow-Methods', 'OPTIONS, PUT, GET, POST');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
  });
app.use(express.json());
app.use(express.static('public'));
app.use(controller);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});