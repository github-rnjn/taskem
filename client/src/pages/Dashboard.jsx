import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { getDashboard } from "../api/dashboard";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
        return <h1 className="p-6">Loading...</h1>;
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tasks</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.totalTasks}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Completed</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.completedTasks}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pending</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.pendingTasks}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Overdue</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.overdueTasks}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Due Today</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.dueToday}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Completion Rate</CardTitle>
                        </CardHeader>

                        <CardContent className="text-3xl font-bold">
                            {summary.completionRate}%
                        </CardContent>
                    </Card>

                </div>

            </div>

        </>
    );

}