import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, CheckCircle2, Search,Filter,Tag } from "lucide-react";

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
import Loader from "@/components/Loader";

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

        <main className="w-full px-4 md:px-8 py-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-4xl font-bold">
                        Tasks
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your tasks efficiently.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg"
                    onClick={() => {
                        setSelectedTask(null);
                        setOpen(true);
                    }}
                >
                    + Add Task
                </Button>

            </div>

            {/* Filters */}
            <Card className="mb-8 border-0 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">

            <CardContent className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Search */}

                    <div className="relative">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full
                                h-12
                                pl-11
                                rounded-xl
                                border
                                border-blue-200
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                transition
                            "
                        />

                    </div>

                    {/* Status */}

                    <div className="relative">

                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="
                                w-full
                                h-12
                                pl-11
                                rounded-xl
                                border
                                border-emerald-200
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-emerald-500
                                transition
                            "
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="TODO">
                                🟡 TODO
                            </option>

                            <option value="IN_PROGRESS">
                                🔵 IN PROGRESS
                            </option>

                            <option value="COMPLETED">
                                🟢 COMPLETED
                            </option>

                        </select>

                    </div>

                    {/* Category */}

                    <div className="relative">

                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="
                                w-full
                                h-12
                                pl-11
                                rounded-xl
                                border
                                border-purple-200
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-purple-500
                                transition
                            "
                        >

                            <option value="">
                                All Categories
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

            </CardContent>

        </Card>

                        {/* Loading */}
            {loading ? (

                <Loader text="Loading Task..."/>

            ) : tasks.length === 0 ? (

                <Card>

                    <CardContent className="flex flex-col items-center justify-center py-16">

                        <h2 className="text-xl font-semibold">
                            No Tasks Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create your first task to get started.
                        </p>

                    </CardContent>

                </Card>

            ) : (

                <div className="space-y-6">

                    {tasks.map(task => (

                        <Card
                            key={task._id}
                            className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >

                            <CardContent className="p-6">

                                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                                    {/* Left */}
                                    <div className="flex-1">

                                        <h2 className="text-2xl font-semibold">
                                            {task.title}
                                        </h2>

                                        <p className="mt-2 text-gray-500">
                                            {task.description}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-3">

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                                {task.status}
                                            </span>

                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                                {task.priority}
                                            </span>

                                            {task.category && (

                                                <span
                                                    className="rounded-full px-3 py-1 text-sm font-medium text-white"
                                                    style={{
                                                        backgroundColor:
                                                            task.category.color,
                                                    }}
                                                >
                                                    {task.category.name}
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className="flex gap-2 self-start">

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => {

                                                setSelectedTask(task);

                                                setOpen(true);

                                            }}
                                        >

                                            <Pencil size={18} />

                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            disabled={task.status === "COMPLETED"}
                                            onClick={() =>
                                                handleComplete(task)
                                            }
                                        >

                                            <CheckCircle2 size={18} />

                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(task._id)
                                            }
                                        >

                                            <Trash2 size={18} />

                                        </Button>

                                    </div>

                                </div>

                            </CardContent>

                        </Card>

                    ))}

                </div>

            )}

                        {pagination && pagination.totalPages > 1 && (

                <div className="mt-10 flex justify-center items-center gap-6">

                    <Button
                        variant="outline"
                        disabled={!pagination.hasPreviousPage}
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        ← Previous
                    </Button>

                    <span className="font-medium">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <Button
                        variant="outline"
                        disabled={!pagination.hasNextPage}
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        Next →
                    </Button>

                </div>

            )}

        </main>

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