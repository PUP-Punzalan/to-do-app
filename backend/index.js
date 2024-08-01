import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(express.json());
app.use(cors());

// To initialize the database
app.get("/", (req, res) => {
  res.send("Welcome to the Express server");
});

// To get all tasks from the database
app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM tasks";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// To add a new task to the database
app.post("/tasks", (req, res) => {
  const q =
    "INSERT INTO tasks (`title`, `desc`, `is_completed`, `due_date`, `created_at`) VALUES (?)";

  const date = new Date(); // Get the current date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const values = [
    req.body.title,
    req.body.desc,
    req.body.is_completed,
    req.body.due_date,
    formattedDate,
  ];

  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task added successfully");
  });
});

// To delete a task from the database
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const q = "DELETE FROM tasks WHERE id = ?";

  db.query(q, [taskId], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task deleted successfully");
  });
});

// To update a task in the database
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q =
    "UPDATE tasks SET `title` = ?, `desc` = ?, `is_completed` = ?, `due_date` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.is_completed,
    req.body.due_date,
  ];

  db.query(q, [...values, taskId], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task updated successfully");
  });
});

// To update all tasks in the database
app.put("/tasks", (req, res) => {
  const q = "UPDATE tasks SET `is_completed` = 1";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json("All tasks marked as done");
  });
});

// To update the status of a task in the database
app.patch("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "UPDATE tasks SET `is_completed` = ? WHERE id = ?";

  const newStatus = req.body.is_completed;

  db.query(q, [newStatus, taskId], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task status updated successfully");
  });
});

// To get a specific task from the database
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const q = "SELECT * FROM tasks WHERE id = ?";

  db.query(q, [taskId], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// To delete all tasks from the database
app.delete("/tasks", (req, res) => {
  const q = "DELETE FROM tasks";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json("All tasks deleted successfully");
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
