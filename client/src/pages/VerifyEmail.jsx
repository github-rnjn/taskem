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

        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md">

                <CardHeader>

                    <CardTitle>

                        Verify Email

                    </CardTitle>

                    <CardDescription>

                        Enter the verification code sent to your email.

                    </CardDescription>

                </CardHeader>

                <CardContent className="space-y-4">

                    <div>

                        <Label>Email</Label>

                        <Input
                            value={email}
                            disabled
                        />

                    </div>

                    <div>

                        <Label>Verification Code</Label>

                        <Input
                            value={otp}
                            maxLength={6}
                            inputMode="numeric"
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />

                    </div>

                    <Button
                        className="w-full"
                        onClick={handleVerify}
                        disabled={loading}
                    >

                        {loading
                            ? <Loader2 className="animate-spin" />
                            : "Verify Email"
                        }

                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResend}
                        disabled={
                            countdown > 0 ||
                            resendLoading
                        }
                    >

                        {resendLoading
                            ? <Loader2 className="animate-spin" />
                            : countdown > 0
                                ? `Resend OTP (${countdown}s)`
                                : "Resend OTP"
                        }

                    </Button>

                </CardContent>

            </Card>

        </div>

    );

}