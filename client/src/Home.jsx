import { v4 as uuid } from "uuid";
import { useState } from "react";
import Navbar from "./Navbar";
import TaskList from "./TaskList";

// Version 1.0
// const changelog = [
//     { task: "Added a homepage", id: uuid() },
//     { task: "Added user accounts and authentication", id: uuid() },
//     { task: "Added a back-end component to store user data", id: uuid() },
// ];

// Version 1.1
const changelog = [
    {
        task: "Fixed issue with user sessions expiring, causing undefined behaviour",
        id: uuid(),
        isComplete: true,
    },
    {
        task: 'Added feature to "check off" tasks',
        id: uuid(),
        isComplete: true,
    },
    {
        task: "Various UI improvents (responsiveness, color scheme, etc.)",
        id: uuid(),
        isComplete: true,
    },
];

function Home() {
    const [tasks, setTasks] = useState(changelog);

    const deleteTask = async (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const addTask = async (task) => {
        const newTasks = [...tasks, { ...task, id: uuid() }];
        setTasks(newTasks);
    };

    return (
        <div className="h-screen flex flex-col relative">
            <Navbar />

            <div className="flex-1 flex flex-col items-center">
                <h1 className="text-6xl text-center text-rose-500 mt-16">
                    Welcome to Todulo.
                </h1>
                <p className="text-blue-300 text-center text-xl mt-8">
                    Make a{" "}
                    <span className="text-rose-500">
                        {" "}
                        <a href="/register">new account</a>{" "}
                    </span>{" "}
                    to save your list.
                </p>
                <p className="text-blue-300 text-center text-lg mt-8">
                    👇🏼 or just mess with my changelog below 👇🏼
                </p>
                <div className="mt-8">
                    <TaskList
                        onAddTask={addTask}
                        onDeleteTask={deleteTask}
                        name={"Changelog - Version 1.1"}
                        tasks={tasks}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
