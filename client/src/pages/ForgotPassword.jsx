import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { forgotPassword } from "../api/auth";

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

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(values) {

        try {

            setLoading(true);

            await forgotPassword(values);

            toast.success("Password reset OTP sent.");

            navigate(
                `/reset-password?email=${encodeURIComponent(values.email)}`
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">

                <CardHeader className="text-center space-y-4">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

                        <span className="text-4xl">
                            🔒
                        </span>

                    </div>

                    <div>

                        <CardTitle className="text-3xl font-bold">

                            Forgot Password

                        </CardTitle>

                        <CardDescription className="mt-2 text-base">

                            Enter your registered email and we'll send you a verification code.

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

                                Email Address

                            </Label>

                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 rounded-xl"
                                {...register("email")}
                            />

                        </div>

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
                                shadow-lg
                                hover:shadow-xl
                                transition-all
                                duration-300
                            "
                        >

                            {loading ? (

                                <>

                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                    Sending OTP...

                                </>

                            ) : (

                                "Send OTP"

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