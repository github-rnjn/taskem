import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { getDashboard } from "../api/dashboard";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import SummaryCards from "../components/dashboard/SummaryCards";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import CategoryChart from "../components/dashboard/CategoryChart";

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchDashboard() {

            try {

                const response = await getDashboard();

                setDashboardData(response.data.data);

            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoading(false);

            }

        }

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="p-8">

                    Loading dashboard...

                </div>

            </>

        );

    }

    const summary = dashboardData.dashboard;

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    <SummaryCards
                        dashboard={dashboardData.dashboard}
                    />

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">

                        <ProductivityChart
                            data={dashboardData.productivity}
                        />

                        <CategoryChart
                            data={dashboardData.categoryBreakdown}
                        />

                    </div>

                </div>

            </div>

        </>
    );

}