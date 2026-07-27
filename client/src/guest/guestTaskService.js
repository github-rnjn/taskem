import {
    loadGuestTasks,
    saveGuestTasks,
} from "./guestStorage";

function generateId() {

    return Date.now().toString();

}

export function getTasks() {

    return loadGuestTasks();

}

export function createTask(task) {

    const tasks = loadGuestTasks();

    const newTask = {

        _id: generateId(),

        title: task.title,

        description: task.description || "",

        priority: task.priority || "MEDIUM",

        dueDate: task.dueDate || null,

        status: "TODO",

        createdAt: new Date().toISOString(),

    };

    tasks.unshift(newTask);

    saveGuestTasks(tasks);

    return newTask;

}

export function updateTask(id, data) {

    const tasks = loadGuestTasks();

    const updatedTasks = tasks.map(task =>

        task._id === id
            ? {
                ...task,
                ...data,
            }
            : task

    );

    saveGuestTasks(updatedTasks);

}

export function deleteTask(id) {

    const tasks = loadGuestTasks();

    const updatedTasks = tasks.filter(
        task => task._id !== id
    );

    saveGuestTasks(updatedTasks);

}

export function completeTask(id) {

    const tasks = loadGuestTasks();

    const updatedTasks = tasks.map(task =>

        task._id === id
            ? {
                ...task,
                status: "COMPLETED",
            }
            : task

    );

    saveGuestTasks(updatedTasks);

}

export function clearAllTasks() {

    saveGuestTasks([]);

}