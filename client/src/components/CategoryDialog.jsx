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
import { Button } from "@/components/ui/button";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
];

export default function CategoryDialog({
    open,
    onOpenChange,
    onSubmit,
    initialData,
}) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B82F6");

    useEffect(() => {

        if (initialData) {

            setName(initialData.name);
            setColor(initialData.color);

        } else {

            setName("");
            setColor("#3B82F6");

        }

    }, [initialData]);

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit({
            name,
            color,
        });

    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">

                    <DialogHeader>

                        <DialogTitle className="text-2xl font-bold">

                            {initialData
                                ? "Edit Category"
                                : "Create Category"}

                        </DialogTitle>

                        <p className="mt-1 text-blue-100 text-sm">

                            Organize your tasks with colorful categories.

                        </p>

                    </DialogHeader>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >

                    {/* Category Name */}

                    <div>

                        <Label className="mb-2 block font-medium">
                            Category Name
                        </Label>

                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="e.g. Work"
                            required
                            className="
                                h-12
                                rounded-xl
                                border-gray-300
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>

                    {/* Color Picker */}

                    <div>

                        <Label className="mb-3 block font-medium">
                            Choose Color
                        </Label>

                        <div className="flex flex-wrap gap-4">

                            {COLORS.map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        setColor(item)
                                    }
                                    className={`
                                        relative
                                        h-12
                                        w-12
                                        rounded-full
                                        transition-all
                                        duration-300
                                        hover:scale-110
                                        ${
                                            color === item
                                                ? "ring-4 ring-offset-2 ring-blue-500"
                                                : ""
                                        }
                                    `}
                                    style={{
                                        backgroundColor: item,
                                    }}
                                >

                                    {color === item && (

                                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">

                                            ✓

                                        </span>

                                    )}

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Preview */}

                    <div className="rounded-2xl border bg-slate-50 p-4">

                        <p className="mb-3 text-sm text-gray-500">
                            Preview
                        </p>

                        <div className="flex items-center gap-3">

                            <div
                                className="h-8 w-8 rounded-full shadow"
                                style={{
                                    backgroundColor: color,
                                }}
                            />

                            <span className="text-lg font-semibold">

                                {name || "Category Name"}

                            </span>

                        </div>

                    </div>

                    {/* Buttons */}

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
                                bg-blue-600
                                hover:bg-blue-700
                                shadow-lg
                            "
                        >

                            {initialData
                                ? "Update Category"
                                : "Create Category"}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );

}