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
        completed: false
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
app.put('/goals/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    let goal = goals.find(g => g.id === id);

    if (goal) {
        goal.title = title || goal.title;
        goal.description = description || goal.description;
        res.json({ message: "Goal updated", goal });
    } else {
        res.status(404).json({ message: "Goal not found" });
    }
});

app.patch('/goals/:id/status', (req, res) => {
    const id = parseInt(req.params.id);

    let goal = goals.find(g => g.id === id);

    if (goal) {
        goal.completed = true;
        res.json({ message: "Goal marked as completed", goal });
    } else {
        res.status(404).json({ message: "Goal not found" });
    }
});
app.get('/goals/progress', (req, res) => {
    const total = goals.length;
    const completed = goals.filter(g => g.completed).length;
    const pending = total - completed;

    const progress = total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

    res.json({
        total,
        completed,
        pending,
        progress: `${progress}%`
    });
});