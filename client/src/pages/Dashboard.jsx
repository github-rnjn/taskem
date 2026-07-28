import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Loader from "@/components/Loader";
import { getDashboard } from "../api/dashboard";

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
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <Loader text="Loading dashboard..." />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="w-full px-4 md:px-8 py-6">
                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                {/* Summary Cards */}
                <SummaryCards
                        dashboard={dashboardData.dashboard}
                    />

                {/* Charts */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProductivityChart
                        data={dashboardData.productivity}
                    />

                    <CategoryChart
                        data={dashboardData.categoryBreakdown}
                    />
                </div>
            </main>
        </>
    );
}