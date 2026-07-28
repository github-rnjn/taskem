import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">

            <div className="text-center max-w-lg">

                <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-slate-800">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-600 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist,
                    may have been moved, or the URL is incorrect.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="h-11 min-w-[170px] rounded-xl"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Go Back</span>
                        </span>
                    </Button>

                    <Button
                        asChild
                        className="
                            h-11
                            min-w-[170px]
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            hover:from-blue-700
                            hover:to-indigo-700
                        "
                    >
                        <Link
                            to="/dashboard"
                            className="flex items-center justify-center gap-2"
                        >
                            <Home className="h-4 w-4" />
                            <span>Go to Dashboard</span>
                        </Link>
                    </Button>

                </div>

            </div>

        </div>

    );

}