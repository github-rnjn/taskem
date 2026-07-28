import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { getCategories } from "../api/category";

const priorities = [
    "LOW",
    "MEDIUM",
    "HIGH",
];

export default function TaskDialog({
    open,
    onOpenChange,
    onSubmit,
    initialData,
}) {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        priority: "MEDIUM",
        dueDate: "",
    });

    useEffect(() => {

        async function loadCategories() {

            try {

                const response =
                    await getCategories();

                setCategories(
                    response.data.data
                );

            }
            catch (error) {

                console.error(error);

            }

        }

        loadCategories();

    }, []);

    useEffect(() => {

        if (initialData) {

            setForm({

                title: initialData.title,

                description:
                    initialData.description || "",

                category:
                    initialData.category?._id || "",

                priority:
                    initialData.priority,

                dueDate:
                    initialData.dueDate
                        ? initialData.dueDate.substring(0,10)
                        : "",

            });

        }
        else {

            setForm({

                title: "",

                description: "",

                category: "",

                priority: "MEDIUM",

                dueDate: "",

            });

        }

    }, [initialData]);

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,

        });

    }

    function handleSubmit(e){

        e.preventDefault();

        const payload = {
            ...form,
        };

        if (!payload.dueDate) {
            delete payload.dueDate;
        }

        if (!payload.category) {
            delete payload.category;
        }

        onSubmit(payload);

    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="w-[95vw]
            sm:max-w-xl
            max-h-[90vh]
            overflow-y-auto
            rounded-2xl
            border-0
            p-0
            shadow-2xl"
            >

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">

                    <DialogHeader>

                        <DialogTitle className="text-3xl font-bold">

                            {initialData
                                ? "Edit Task"
                                : "Create Task"}

                        </DialogTitle>

                        <p className="mt-2 text-blue-100">

                            {initialData
                                ? "Update your task information."
                                : "Add a new task to stay productive."}

                        </p>

                    </DialogHeader>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >

                    {/* Title */}

                    <div>

                        <Label className="mb-2 block">
                            Title
                        </Label>

                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Task title..."
                            className="h-12 rounded-xl"
                            required
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <Label className="mb-2 block">
                            Description
                        </Label>

                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe your task..."
                            className="min-h-32 rounded-xl resize-none"
                        />

                    </div>

                    {/* Category + Priority */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <Label className="mb-2 block">
                                Category
                            </Label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="
                                    h-12
                                    w-full
                                    rounded-xl
                                    border
                                    px-3
                                    bg-white
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            >

                                <option value="">
                                    Select Category
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

                        <div>

                            <Label className="mb-2 block">
                                Priority
                            </Label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="
                                    h-12
                                    w-full
                                    rounded-xl
                                    border
                                    px-3
                                    bg-white
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            >

                                {priorities.map(priority => (

                                    <option
                                        key={priority}
                                        value={priority}
                                    >

                                        {priority}

                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                    {/* Due Date */}

                    <div>

                        <Label className="mb-2 block">
                            Due Date
                        </Label>

                        <Input
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="h-12 rounded-xl"
                        />

                    </div>

                    {/* Preview */}

                    <div className="rounded-2xl bg-slate-50 border p-5">

                        <p className="text-sm text-gray-500 mb-3">
                            Preview
                        </p>

                        <h3 className="font-semibold text-lg">

                            {form.title || "Task Title"}

                        </h3>

                        <p className="text-gray-500 mt-1">

                            {form.description || "Task description..."}

                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm">

                                {form.priority}

                            </span>

                            {form.category && (

                                <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm">

                                    Category Selected

                                </span>

                            )}

                        </div>

                    </div>

                    {/* Footer */}

                    <DialogFooter className="gap-3">

                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >

                            Cancel

                        </Button>

                        <Button
                            type="submit"
                            className="
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                hover:from-blue-700
                                hover:to-indigo-700
                                shadow-lg
                            "
                        >

                            {initialData
                                ? "Update Task"
                                : "Create Task"}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );

}