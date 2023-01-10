const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();

const PORT = 8000;

app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasksPath = path.resolve("file/tasks.json");
  const tasks = await fs.readFile(tasksPath, "utf8");
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  const tasksPath = path.resolve("file/tasks.json");
  const tasks = JSON.parse(await fs.readFile(tasksPath, "utf8"));
  const lastIndex = tasks.length - 1;

  const newTask = req.body;
  const id = tasks[lastIndex].id + 1

  tasks.push({ ...newTask, id });

  fs.writeFile(tasksPath, JSON.stringify(tasks));

  res.end();
});

app.put("/tasks", async (req, res) => {
  const tasksPath = path.resolve("file/tasks.json");
  let tasks = JSON.parse(await fs.readFile(tasksPath, "utf8"));

  const newTask = req.body;
  tasks.find(task => task.id == newTask.id).status = newTask.status;

  await fs.writeFile(tasksPath, JSON.stringify(tasks));

  res.end();
});

app.delete("/tasks", async (req, res) => {
  const tasksPath = path.resolve("file/tasks.json");
  let tasks = JSON.parse(await fs.readFile(tasksPath, "utf8"));

  const newTask = req.body;
  tasks = tasks.filter(task => task.id != newTask.id)

  await fs.writeFile(tasksPath, JSON.stringify(tasks));

  res.end();
})

app.listen(PORT);