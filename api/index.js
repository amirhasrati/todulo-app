const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const session = require("express-session");
const path = require("path");

mongoose
    // .connect("mongodb://localhost:27017/todulo")
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch((err) => {
        console.log("Oh no, Mongo Connection Error!");
        console.log(err);
    });

app.use("/assets", express.static(path.join("client", "dist", "assets")));
app.use(express.json());
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 25 },
    })
);
app.use(
    cors({
        credentials: true,
        origin: true,
        allowedHeaders: [
            "Content-Type",
            "Cookie",
            "Set-Cookie",
            "Access-Control-Allow-Credentials",
        ],
        methods: ["GET", "POST"],
    })
);

// TO DO declare a middleware to check if the user is logged in

// middleware to check if user is logged in
app.get("/api/session", (req, res) => {
    if (req.session.user_id) {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.get("/api/task", async (req, res) => {
    console.log(req.session);
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
        // find the user in the database
        const user = await User.findById(req.session.user_id);

        // If user not found, send an error
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update tasks to include the isComplete field if it's missing
        user.tasks.forEach((task) => {
            if (typeof task.isComplete === "undefined") {
                task.isComplete = false; // Set default value if missing
            }
        });

        // Save the updated tasks
        await user.save();

        // Send back the user's tasksH
        return res.send(user.tasks);
    }
});

app.post("/api/updateTasks", async (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).send("Unauthorized");
    }
    console.log(req.body);
    const user = await User.findById(req.session.user_id);
    user.tasks = req.body.map((task) => ({
        task: task.task,
        id: task.id,
        isComplete: task.isComplete,
    }));
    await user.save().then(console.log("User saved"));
});

// login route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id.toString();
        console.log(req.session);
        return res.status(200).send("OK");
    } else {
        return res.status(401).send("BAD");
    }
});

// register route
app.post("/api/register", async (req, res) => {
    // Destructure username and password from req.body
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.send(false);

    // Create the new user and save to the database
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id.toString();
    return res.send(true); // OK
});

// logout route
app.post("/api/logout", (req, res) => {
    req.session.destroy();
    return res.send(true);
});

// If in production, serve the client's build folder
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        return res.sendFile("index.html", {
            root: path.join("client", "dist"),
        });
    });
} else {
    app.get("*", (req, res) => {
        res.sendFile("/Users/amirhasrati/Repos/Todulo/client/dist/index.html");
    });
}

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
