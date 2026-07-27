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

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        {initialData
                            ? "Edit Category"
                            : "Create Category"}

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <Label>Name</Label>

                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div>

                        <Label>Color</Label>

                        <div className="mt-2 flex gap-2">

                            {COLORS.map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        setColor(item)
                                    }
                                    className={`h-8 w-8 rounded-full border-2 ${
                                        color === item
                                            ? "border-black"
                                            : "border-transparent"
                                    }`}
                                    style={{
                                        backgroundColor: item,
                                    }}
                                />

                            ))}

                        </div>

                    </div>

                    <DialogFooter>

                        <Button
                            type="submit"
                        >

                            {initialData
                                ? "Update"
                                : "Create"}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}