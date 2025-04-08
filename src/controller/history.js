import { Router } from "express";
import History from '../schema/History.model.js';

const controller = Router();

// Routes
controller.get('/', (req, res) => {
  res.send('Tic-Tac-Toe History API');
});

// Get all history records
controller.get('/history', async (req, res) => {
  try {
    const histories = await History.find();
    res.json(histories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history records' });
  }
});

// Add a new history record
controller.post('/record', async (req, res) => {
  const { player1, player2, description, winner, data } = req.body;

  try {
    const newHistory = new History({ player1, player2, description, winner, data });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add history record' });
  }
});

export default controller;