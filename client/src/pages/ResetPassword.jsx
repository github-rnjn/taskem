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

        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md">

                <CardHeader>

                    <CardTitle>
                        Reset Password
                    </CardTitle>

                    <CardDescription>
                        Enter OTP and your new password.
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
                                value={email || ""}
                                disabled
                            />

                        </div>

                        <div>

                            <Label>OTP</Label>

                            <Input
                                {...register("otp")}
                                maxLength={6}
                            />

                        </div>

                        <div>

                            <Label>New Password</Label>

                            <Input
                                type="password"
                                {...register("password")}
                            />

                        </div>

                        <Button
                            className="w-full"
                            disabled={loading}
                            type="submit"
                        >

                            {loading
                                ? <Loader2 className="animate-spin" />
                                : "Reset Password"
                            }

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>

    );

}