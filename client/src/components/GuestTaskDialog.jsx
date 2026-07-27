import { useEffect, useState } from "react";

export default function GuestTaskDialog({
    open,
    onClose,
    onSubmit,
    initialData,
}) {

    const [form, setForm] = useState({

        title: "",

        description: "",

        priority: "MEDIUM",

        dueDate: "",

    });

    useEffect(() => {

        if (initialData) {

            setForm({

                title: initialData.title,

                description:
                    initialData.description,

                priority:
                    initialData.priority,

                dueDate:
                    initialData.dueDate
                        ? initialData.dueDate.substring(0,10)
                        : "",

            });

        } else {

            setForm({

                title: "",

                description: "",

                priority: "MEDIUM",

                dueDate: "",

            });

        }

    }, [initialData]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded w-96 space-y-3"
            >

                <h2 className="text-xl font-bold">

                    {
                        initialData
                            ? "Edit Task"
                            : "Create Task"
                    }

                </h2>

                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >

                    <option>LOW</option>

                    <option>MEDIUM</option>

                    <option>HIGH</option>

                </select>

                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <div className="flex justify-end gap-2">

                    <button
                        type="button"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                    >

                        Save

                    </button>

                </div>

            </form>

        </div>

    );

}