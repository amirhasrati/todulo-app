import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Navbar from "./Navbar";
import TaskList from "./TaskList";
function Todo() {
    const [tasks, setTasks] = useState([]);

    const addTask = async (task) => {
        const newTasks = [...tasks, { ...task, id: uuid() }];
        setTasks(newTasks);
        await saveTasks(newTasks);
    };

    const deleteTask = async (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        await saveTasks(newTasks);
    };

    const saveTasks = async (tasks) => {
        await fetch("http://localhost:3000/api/updateTasks", {
            method: "POST",
            body: JSON.stringify(tasks),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const getTasks = async () => {
        const res = await fetch("http://localhost:3000/api/task", {
            method: "GET",
            credentials: "include",
        });

        if (res.status === 200) {
            const data = await res.json();
            setTasks(data);
        } else if (res.status === 401) {
            window.location.href = "/login";
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="h-screen flex flex-col relative">
            <Navbar />

            <div className="flex-1 flex flex-col justify-center items-center">
                <TaskList
                    tasks={tasks}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                />
            </div>
        </div>
    );
}

export default Todo;
