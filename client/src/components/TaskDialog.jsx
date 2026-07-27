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

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        {
                            initialData
                                ? "Edit Task"
                                : "Create Task"
                        }

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <Label>

                            Title

                        </Label>

                        <Input

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div>

                        <Label>

                            Description

                        </Label>

                        <Textarea

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                        />

                    </div>

                    <div>

                        <Label>

                            Category

                        </Label>

                        <select

                            name="category"

                            value={form.category}

                            onChange={handleChange}

                            className="w-full rounded border p-2"

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

                        <Label>

                            Priority

                        </Label>

                        <select

                            name="priority"

                            value={form.priority}

                            onChange={handleChange}

                            className="w-full rounded border p-2"

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

                    <div>

                        <Label>

                            Due Date

                        </Label>

                        <Input

                            type="date"

                            name="dueDate"

                            value={form.dueDate}

                            onChange={handleChange}

                        />

                    </div>

                    <DialogFooter>

                        <Button type="submit">

                            {
                                initialData
                                    ? "Update"
                                    : "Create"
                            }

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}