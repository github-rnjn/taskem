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

            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 md:px-8 py-8">

                {/* Header */}
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">
                            Categories
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Organize your tasks using colorful categories.
                        </p>

                    </div>

                    <Button
                        size="lg"
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg"
                        onClick={() => {

                            setSelectedCategory(null);

                            setOpen(true);

                        }}
                    >
                        + Add Category
                    </Button>

                </div>

                {loading ? (

                    <div className="flex justify-center py-20">

                        <p className="text-lg text-gray-500">
                            Loading categories...
                        </p>

                    </div>

                ) : categories.length === 0 ? (

                    <Card className="rounded-2xl shadow-lg">

                        <CardContent className="flex flex-col items-center justify-center py-16">

                            <div className="text-6xl mb-4">
                                📂
                            </div>

                            <h2 className="text-2xl font-semibold">
                                No Categories Yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Create your first category to organize tasks.
                            </p>

                            <Button
                                className="mt-6 rounded-xl bg-blue-600 hover:bg-blue-700"
                                onClick={() => {

                                    setSelectedCategory(null);

                                    setOpen(true);

                                }}
                            >
                                Create Category
                            </Button>

                        </CardContent>

                    </Card>

                ) : (

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {categories.map((category) => (

                            <Card
                                key={category._id}
                                className="rounded-2xl border-0 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >

                                <CardContent className="p-6">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="h-12 w-12 rounded-full shadow"
                                                style={{
                                                    backgroundColor:
                                                        category.color,
                                                }}
                                            />

                                            <div>

                                                <h2 className="text-lg font-semibold">
                                                    {category.name}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Task Category
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex gap-2">

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="rounded-xl hover:bg-blue-50"
                                                onClick={() => {

                                                    setSelectedCategory(category);

                                                    setOpen(true);

                                                }}
                                            >
                                                <Pencil size={18} />
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(category._id)
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

            </main>

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