const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const session = require("express-session");

mongoose
<<<<<<< HEAD
    .connect(process.env.DB_URL)
=======
    .connect("mongodb://127.0.0.1:27017/toduloTest")
>>>>>>> parent of d97da6b (Fixed MongoDB connection.)
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch((err) => {
        console.log("Oh no, Mongo Connection Error!");
        console.log(err);
    });

app.use(express.static("../client/dist"));
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
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
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
    }

    // find the user in the database
    const user = await User.findById(req.session.user_id);

    // If user not found, send an error
    if (!user) {
        return res.status(404).send("User not found");
    }

    // Send back the user's tasks
    return res.send(user.tasks);
});

app.post("/api/updateTasks", async (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).send("Unauthorized");
    }
    const user = await User.findById(req.session.user_id);
    user.tasks = req.body.map((task) => ({ task: task.task, id: task.id }));
    await user.save().then(console.log("User saved"));
});

// login route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id.toString();
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
    req.session.user_id = user._id;
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
        return res.sendFile(
            "/Users/amirhasrati/Repos/Todulo/client/dist/index.html"
        );
        // res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
