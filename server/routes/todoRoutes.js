const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// CREATE
router.post("/add", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// READ
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;