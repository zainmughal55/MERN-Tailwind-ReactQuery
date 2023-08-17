require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error(`An error occured while fetching notes.`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get Note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error(`An error occured while fetching note.`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Create Note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error(`An error occured while creating note.`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update Note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;

    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    if (!data) {
      throw new Error(`An error occured while updating note.`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete Note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error(`An error occured while deleting note.`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/", (req, res) => {
  res.json("Hi!");
});

app.get("*", (req, res) => {
  res.json("404");
});

app.listen(PORT, () => {
  console.log(`Server is started on Port: ${PORT}`);
});
