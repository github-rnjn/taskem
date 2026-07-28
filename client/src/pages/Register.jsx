import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { registerSchema } from "../schemas/auth.schema";
import { register as registerUser } from "../api/auth";

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

export default function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(values) {
        try {
            setLoading(true);

            await registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
            });

            toast.success(
                "Verification code sent to your email."
            );

            navigate(
                `/verify-email?email=${encodeURIComponent(
                    values.email
                )}`
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-10">

            <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">

                <CardHeader className="space-y-4 text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-4xl font-bold text-white shadow-lg">
                        👤
                    </div>

                    <div>

                        <CardTitle className="text-3xl font-bold">
                            Create Account
                        </CardTitle>

                        <CardDescription className="mt-2 text-base">
                            Create an account to start managing your tasks.
                        </CardDescription>

                    </div>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>

                            <Label className="mb-2 block">
                                Name
                            </Label>

                            <Input
                                className="h-12 rounded-xl"
                                placeholder="John Doe"
                                {...register("name")}
                            />

                            {errors.name && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.name.message}
                                </p>

                            )}

                        </div>

                        {/* Email */}
                        <div>

                            <Label className="mb-2 block">
                                Email
                            </Label>

                            <Input
                                type="email"
                                className="h-12 rounded-xl"
                                placeholder="john@example.com"
                                {...register("email")}
                            />

                            {errors.email && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>

                            )}

                        </div>

                        {/* Password */}
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
                                    className="h-12 rounded-xl pr-12"
                                    placeholder="Create a password"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >

                                    {showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />}

                                </button>

                            </div>

                            {errors.password && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>

                            )}

                        </div>

                        {/* Confirm Password */}
                        <div>

                            <Label className="mb-2 block">
                                Confirm Password
                            </Label>

                            <div className="relative">

                                <Input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="h-12 rounded-xl pr-12"
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >

                                    {showConfirmPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />}

                                </button>

                            </div>

                            {errors.confirmPassword && (

                                <p className="mt-2 text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>

                            )}

                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                h-12
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                hover:from-blue-700
                                hover:to-indigo-700
                                transition-all
                                duration-300
                                hover:shadow-xl
                                hover:-translate-y-0.5
                            "
                        >

                            {loading ? (

                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Account...
                                </>

                            ) : (

                                "Create Account"

                            )}

                        </Button>

                        {/* Divider */}
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

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </form>

                </CardContent>

            </Card>

        </div>
    );
}