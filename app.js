const express = require("express");
const app = express();

app.use(express.json());

let goals = [];

// Home
app.get("/", (req, res) => {
    res.send("Goal Tracker Running 🚀");
});

// ✅ v1 - Add Goal
app.post("/addGoal", (req, res) => {
    const { name, description, deadline } = req.body;

    const goal = {
        id: goals.length + 1,
        name,
        description,
        deadline,
        status: "Pending"
    };

    goals.push(goal);
    res.json(goal);
});

// View Goals
app.get("/goals", (req, res) => {
    res.json(goals);
});

// ✅ v2 - Update Goal
app.put("/updateGoal/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const goal = goals.find(g => g.id === id);

    if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
    }

    const { name, description, deadline, status } = req.body;

    goal.name = name || goal.name;
    goal.description = description || goal.description;
    goal.deadline = deadline || goal.deadline;
    goal.status = status || goal.status;

    res.json(goal);
});

// ✅ v3 - Progress
app.get("/progress", (req, res) => {
    const total = goals.length;
    const completed = goals.filter(g => g.status === "Completed").length;
    const percent = total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

    res.json({
        total,
        completed,
        progress: percent + "%"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});