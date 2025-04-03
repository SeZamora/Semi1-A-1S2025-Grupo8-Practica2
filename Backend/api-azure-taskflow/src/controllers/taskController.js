import db from "../config/db";

export const createTask = async (req, async) => {
  const { title, description } = req.body;
  try {
    await db.query(
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
      [req.user.id, title, description]
    );
    res.status(201).json({ message: "Tarea creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
      req.user.id,
    ]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
