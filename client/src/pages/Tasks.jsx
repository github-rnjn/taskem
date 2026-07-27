import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, CheckCircle2 } from "lucide-react";

import Navbar from "../components/Navbar";
import TaskDialog from "../components/TaskDialog";

import { getCategories } from "../api/category";

import useDebounce from "../hooks/useDebounce";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} from "../api/task";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const [status, setStatus] = useState("");

    const [category, setCategory] = useState("");

    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState(null);

    async function fetchTasks() {

        try {

            setLoading(true);

            const response = await getTasks({
                page,
                search: debouncedSearch,
                status,
                category,
            });

            setTasks(response.data.data.tasks);

            setPagination(response.data.data.pagination);

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function loadCategories() {

        try {

            const response = await getCategories();

            setCategories(response.data.data);

        }
        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadCategories();

    }, []);

    useEffect(() => {

        setPage(1);

    }, [debouncedSearch, status, category]);

    useEffect(() => {

        fetchTasks();

    }, [page, debouncedSearch, status, category]);

    async function handleCreate(data) {

        try {

            await createTask(data);

            toast.success("Task created");

            setOpen(false);

            fetchTasks();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleUpdate(data) {

        try {

            await updateTask(
                selectedTask._id,
                data
            );

            toast.success("Task updated");

            setSelectedTask(null);

            setOpen(false);

            fetchTasks();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this task?"))
            return;

        try {

            await deleteTask(id);

            toast.success("Task deleted");

            fetchTasks();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleComplete(task) {

        if (task.status === "COMPLETED")
            return;

        try {

            await updateTaskStatus(
                task._id,
                "COMPLETED"
            );

            toast.success("Task completed");

            fetchTasks();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    return (

        <>

            <Navbar />

            <div className="max-w-6xl mx-auto p-6">

                <div className="mb-6 grid gap-4 md:grid-cols-3">

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="rounded border p-2"
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="rounded border p-2"
                    >

                        <option value="">

                            All Status

                        </option>

                        <option value="TODO">

                            TODO

                        </option>

                        <option value="IN_PROGRESS">

                            IN PROGRESS

                        </option>

                        <option value="COMPLETED">

                            COMPLETED

                        </option>

                    </select>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="rounded border p-2"
                    >

                        <option value="">

                            All Categories

                        </option>

                        {categories.map(category => (

                            <option
                                key={category._id}
                                value={category._id}
                            >

                                {category.name}

                            </option>

                        ))}

                    </select>

                </div>

                {pagination && pagination.totalPages > 1 && (

                    <div className="mt-6 flex items-center justify-center gap-4">

                        <Button
                            variant="outline"
                            disabled={!pagination.hasPreviousPage}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>

                        <span>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <Button
                            variant="outline"
                            disabled={!pagination.hasNextPage}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </Button>

                    </div>

                )}

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">

                        Tasks

                    </h1>

                    <Button
                        onClick={() => {

                            setSelectedTask(null);

                            setOpen(true);

                        }}
                    >

                        + Add Task

                    </Button>

                </div>

                {loading ? (

                    <p>Loading...</p>

                ) : tasks.length === 0 ? (

                    <Card>

                        <CardContent className="py-10 text-center text-gray-500">

                            No tasks found.

                        </CardContent>

                    </Card>

                ) : (

                    <div className="space-y-4">

                        {tasks.map(task => (

                            <Card
                                key={task._id}
                            >

                                <CardContent className="py-4">

                                    <div className="flex justify-between">

                                        <div>

                                            <h2 className="font-semibold text-lg">

                                                {task.title}

                                            </h2>

                                            <p className="text-gray-500">

                                                {task.description}

                                            </p>

                                            <div className="mt-3 flex gap-3 text-sm">

                                                <span>

                                                    Status:
                                                    {" "}
                                                    {task.status}

                                                </span>

                                                <span>

                                                    Priority:
                                                    {" "}
                                                    {task.priority}

                                                </span>

                                            </div>

                                            {task.category && (

                                                <div
                                                    className="mt-2 flex items-center gap-2"
                                                >

                                                    <div
                                                        className="h-3 w-3 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                task.category.color,
                                                        }}
                                                    />

                                                    <span>

                                                        {task.category.name}

                                                    </span>

                                                </div>

                                            )}

                                        </div>

                                        <div className="flex gap-2">

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {

                                                    setSelectedTask(task);

                                                    setOpen(true);

                                                }}
                                            >

                                                <Pencil
                                                    size={16}
                                                />

                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleComplete(task)
                                                }
                                            >

                                                <CheckCircle2
                                                    size={16}
                                                />

                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(task._id)
                                                }
                                            >

                                                <Trash2
                                                    size={16}
                                                />

                                            </Button>

                                        </div>

                                    </div>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                )}

            </div>

            <TaskDialog
                open={open}
                onOpenChange={setOpen}
                initialData={selectedTask}
                onSubmit={
                    selectedTask
                        ? handleUpdate
                        : handleCreate
                }
            />

        </>

    );

}