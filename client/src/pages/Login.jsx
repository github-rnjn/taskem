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

        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md">

                <CardHeader>

                    <CardTitle>
                        Login
                    </CardTitle>

                    <CardDescription>
                        Login to continue
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <div>

                            <Label>Email</Label>

                            <Input
                                type="email"
                                {...register("email")}
                            />

                            {errors.email && (

                                <p className="text-sm text-red-500 mt-1">

                                    {errors.email.message}

                                </p>

                            )}

                        </div>

                        <div>

                            <Label>Password</Label>

                            <div className="relative">

                                <Input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {showPassword
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />
                                    }

                                </button>

                            </div>

                            {errors.password && (

                                <p className="text-sm text-red-500 mt-1">

                                    {errors.password.message}

                                </p>

                            )}

                        </div>

                        <div className="flex justify-end">

                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >

                            {loading
                                ? <Loader2 className="animate-spin" />
                                : "Login"
                            }

                        </Button>

                        <p className="text-center text-sm">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register
                            </Link>

                        </p>

                    </form>

                </CardContent>

            </Card>

        </div>

    );

}