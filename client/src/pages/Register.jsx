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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md">

                <CardHeader>

                    <CardTitle>Create Account</CardTitle>

                    <CardDescription>
                        Register to continue
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <div>
                            <Label>Name</Label>

                            <Input
                                {...register("name")}
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>

                            <Label>Email</Label>

                            <Input
                                type="email"
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
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
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <Label>Confirm Password</Label>

                            <div className="relative">

                                <Input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    {...register("confirmPassword")}
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.confirmPassword
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        <Button
                            className="w-full"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Register"
                            )}
                        </Button>

                        <p className="text-center text-sm">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
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