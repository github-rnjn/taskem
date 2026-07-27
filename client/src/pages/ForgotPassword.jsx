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

        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md">

                <CardHeader>

                    <CardTitle>
                        Forgot Password
                    </CardTitle>

                    <CardDescription>
                        Enter your registered email.
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

                        </div>

                        <Button
                            className="w-full"
                            disabled={loading}
                            type="submit"
                        >

                            {loading
                                ? <Loader2 className="animate-spin" />
                                : "Send OTP"
                            }

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>

    );

}