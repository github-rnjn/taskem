import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

import Navbar from "../components/Navbar";
import CategoryDialog from "../components/CategoryDialog";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../api/category";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    async function fetchCategories() {

        try {

            setLoading(true);

            const response = await getCategories();

            setCategories(response.data.data);

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchCategories();

    }, []);

    async function handleCreate(data) {

        try {

            await createCategory(data);

            toast.success("Category created");

            setOpen(false);

            fetchCategories();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleUpdate(data) {

        try {

            await updateCategory(
                selectedCategory._id,
                data
            );

            toast.success("Category updated");

            setSelectedCategory(null);

            setOpen(false);

            fetchCategories();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Delete this category?"
        );

        if (!confirmed) return;

        try {

            await deleteCategory(id);

            toast.success("Category deleted");

            fetchCategories();

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

            <div className="mx-auto max-w-5xl p-6">

                <div className="mb-6 flex items-center justify-between">

                    <h1 className="text-3xl font-bold">

                        Categories

                    </h1>

                    <Button
                        onClick={() => {

                            setSelectedCategory(null);

                            setOpen(true);

                        }}
                    >

                        + Add Category

                    </Button>

                </div>

                {loading ? (

                    <p>Loading...</p>

                ) : categories.length === 0 ? (

                    <Card>

                        <CardContent className="py-10 text-center text-gray-500">

                            No categories found.

                        </CardContent>

                    </Card>

                ) : (

                    <div className="space-y-4">

                        {categories.map((category) => (

                            <Card
                                key={category._id}
                            >

                                <CardContent className="flex items-center justify-between py-4">

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="h-5 w-5 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    category.color,
                                            }}
                                        />

                                        <span className="font-medium">

                                            {category.name}

                                        </span>

                                    </div>

                                    <div className="flex gap-2">

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => {

                                                setSelectedCategory(
                                                    category
                                                );

                                                setOpen(true);

                                            }}
                                        >

                                            <Pencil
                                                size={16}
                                            />

                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(
                                                    category._id
                                                )
                                            }
                                        >

                                            <Trash2
                                                size={16}
                                            />

                                        </Button>

                                    </div>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                )}

            </div>

            <CategoryDialog
                open={open}
                onOpenChange={setOpen}
                initialData={selectedCategory}
                onSubmit={
                    selectedCategory
                        ? handleUpdate
                        : handleCreate
                }
            />

        </>

    );

}