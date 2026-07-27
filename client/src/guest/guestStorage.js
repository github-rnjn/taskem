const STORAGE_KEY = "guestTasks";

export function loadGuestTasks() {

    const tasks = localStorage.getItem(STORAGE_KEY);

    return tasks ? JSON.parse(tasks) : [];

}

export function saveGuestTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}

export function clearGuestTasks() {

    localStorage.removeItem(STORAGE_KEY);

}