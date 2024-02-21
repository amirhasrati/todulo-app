import Task from "./Task";
import AddTaskForm from "./AddTaskForm";

function TaskList({ name = "To do", tasks = [], onAddTask, onDeleteTask }) {
    return (
        <div className="flex flex-col gap-4 py-2 px-4 w-80 border border-gray-200 rounded-xl shadow-sm">
            <h1 className="text-rose-400 font-semibold text-lg text-center pt-2">
                {name}
            </h1>

            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task.task}
                    id={task.id}
                    deleteTask={onDeleteTask}
                />
            ))}
            <AddTaskForm addTask={onAddTask} />
        </div>
    );
}

export default TaskList;
