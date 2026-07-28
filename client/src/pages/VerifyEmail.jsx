import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import {
    verifyEmail,
    resendVerification,
} from "../api/auth";

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

export default function VerifyEmail() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [resendLoading, setResendLoading] = useState(false);

    const [countdown, setCountdown] = useState(60);

    useEffect(() => {

        if (countdown === 0) return;

        const timer = setTimeout(() => {

            setCountdown(prev => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown]);

    async function handleVerify() {

        if (!otp) {
            toast.error("Enter verification code");
            return;
        }

        try {

            setLoading(true);

            await verifyEmail({
                email,
                otp,
            });

            toast.success(
                "Email verified successfully"
            );

            navigate("/login");

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Verification failed"
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function handleResend() {

        try {

            setResendLoading(true);

            await resendVerification({
                email,
            });

            toast.success(
                "OTP sent successfully"
            );

            setCountdown(60);

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
        finally {

            setResendLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">

                <CardHeader className="text-center space-y-4">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

                        📧

                    </div>

                    <div>

                        <CardTitle className="text-3xl font-bold">

                            Verify Your Email

                        </CardTitle>

                        <CardDescription className="mt-2 text-base">

                            We've sent a 6-digit verification code to your email.

                        </CardDescription>

                    </div>

                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Email */}

                    <div>

                        <Label className="mb-2 block">

                            Email Address

                        </Label>

                        <Input
                            value={email}
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
                            value={otp}
                            maxLength={6}
                            inputMode="numeric"
                            placeholder="Enter 6-digit OTP"
                            className="
                                h-12
                                rounded-xl
                                text-center
                                text-2xl
                                tracking-[0.5em]
                                font-semibold
                            "
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />

                        <p className="mt-2 text-xs text-gray-500">

                            Check your inbox and spam folder.

                        </p>

                    </div>

                    {/* Verify */}

                    <Button
                        onClick={handleVerify}
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
                        "
                    >

                        {loading ? (

                            <>

                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                Verifying...

                            </>

                        ) : (

                            "Verify Email"

                        )}

                    </Button>

                    {/* Countdown */}

                    {countdown > 0 ? (

                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">

                            <p className="text-sm text-amber-700">

                                You can resend the code in{" "}

                                <span className="font-bold">

                                    {countdown}s

                                </span>

                            </p>

                        </div>

                    ) : (

                        <Button
                            variant="outline"
                            className="
                                w-full
                                h-12
                                rounded-xl
                                border-blue-500
                                text-blue-600
                                hover:bg-blue-50
                            "
                            onClick={handleResend}
                            disabled={resendLoading}
                        >

                            {resendLoading ? (

                                <>

                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                    Sending...

                                </>

                            ) : (

                                "Resend Verification Code"

                            )}

                        </Button>

                    )}

                </CardContent>

            </Card>

        </div>

    );

}