import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { resetPassword } from "../api/auth";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(values) {

        try {

            setLoading(true);

            await resetPassword({

                email,

                otp: values.otp,

                password: values.password,

            });

            toast.success("Password reset successfully.");

            navigate("/login");

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Reset failed"
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">

                <CardHeader className="space-y-4 text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

                        <span className="text-4xl">
                            🔑
                        </span>

                    </div>

                    <div>

                        <CardTitle className="text-3xl font-bold">

                            Reset Password

                        </CardTitle>

                        <CardDescription className="mt-2 text-base">

                            Enter the verification code sent to your email and choose a new password.

                        </CardDescription>

                    </div>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <Label className="mb-2 block">
                                Email Address
                            </Label>

                            <Input
                                value={email || ""}
                                disabled
                                className="h-12 rounded-xl bg-slate-100"
                            />

                        </div>

                        {/* OTP */}

                        <div>

                            <Label className="mb-2 block">
                                Verification Code
                            </Label>

                            <Input
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                className="h-12 rounded-xl tracking-[0.4em] text-center text-lg"
                                {...register("otp")}
                            />

                        </div>

                        {/* Password */}

                        <div>

                            <Label className="mb-2 block">
                                New Password
                            </Label>

                            <Input
                                type="password"
                                placeholder="Create a new password"
                                className="h-12 rounded-xl"
                                {...register("password")}
                            />

                        </div>

                        {/* Button */}

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
                                shadow-lg
                                hover:shadow-xl
                            "
                        >

                            {loading ? (

                                <>

                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                    Resetting...

                                </>

                            ) : (

                                "Reset Password"

                            )}

                        </Button>

                        <p className="text-center text-sm text-gray-600">

                            Remember your password?{" "}

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="font-semibold text-blue-600 hover:underline"
                            >

                                Back to Login

                            </button>

                        </p>

                    </form>

                </CardContent>

            </Card>

        </div>

    );

}