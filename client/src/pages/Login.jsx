import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { loginSchema } from "../schemas/auth.schema";

import { login } from "../api/auth";

import { setCredentials } from "../redux/authSlice";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(values) {

        try {

            setLoading(true);

            const response = await login(values);

            dispatch(
                setCredentials(response.data.data)
            );

            toast.success("Login successful");

            navigate("/dashboard");

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0">

                <CardHeader className="text-center space-y-4">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white shadow-lg">
                        ✓
                    </div>

                    <div>

                        <CardTitle className="text-3xl font-bold">
                            Welcome Back
                        </CardTitle>

                        <CardDescription className="mt-2 text-base">
                            Login to continue managing your tasks.
                        </CardDescription>

                    </div>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        <div>

                            <Label className="mb-2 block">
                                Email
                            </Label>

                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 rounded-xl"
                                {...register("email")}
                            />

                            {errors.email && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>

                            )}

                        </div>

                        <div>

                            <Label className="mb-2 block">
                                Password
                            </Label>

                            <div className="relative">

                                <Input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    className="h-12 rounded-xl pr-12"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    {showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }

                                </button>

                            </div>

                            {errors.password && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>

                            )}

                        </div>

                        <div className="flex justify-end">

                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                h-12
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                transition-all
                                duration-300
                                hover:shadow-xl
                                hover:-translate-y-0.5
                            "
                        >

                            {loading ? (

                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing In...
                                </>

                            ) : (

                                "Login"

                            )}

                        </Button>

                        <div className="relative">

                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">

                                <span className="bg-white px-2 text-gray-500">
                                    OR
                                </span>

                            </div>

                        </div>

                        <p className="text-center text-sm text-gray-600">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                Create one
                            </Link>

                        </p>

                    </form>

                </CardContent>

            </Card>

        </div>
    );

}