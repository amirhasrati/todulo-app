import { useState } from "react";
import PlusButton from "./PlusButton";
import Input from "./Input";

export default function AddTaskForm({ addTask }) {
    const [formData, setFormData] = useState({ task: "" });
    const [taskIsValid, setTaskIsValid] = useState(false);

    const validate = (task) => {
        setTaskIsValid(task.length > 0);
    };

    const handleChange = (e) => {
        if (e.target.name === "task") validate(e.target.value);

        setFormData((currData) => {
            return {
                ...currData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskIsValid) {
            addTask(formData);
            setFormData({ task: "" });
            setTaskIsValid(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 flex-1 pb-2 text-gray-400">
            <form
                onSubmit={handleSubmit}
                className="flex flex-row gap-2 justify-center items-center">
                <Input
                    type="text"
                    placeholder="New task"
                    name="task"
                    id="task"
                    onChange={handleChange}
                    value={formData.task}
                />
                <button
                    disabled={!taskIsValid}
                    type="submit"
                    className="p-1 rounded-lg hover:text-rose-400 hover:bg-gray-100 hover:shadow-sm transition delay-75 disabled:bg-gray-100 disabled:pointer-events-none">
                    <PlusButton />
                </button>
            </form>
        </div>
    );
}
