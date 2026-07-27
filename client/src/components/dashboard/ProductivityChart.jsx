import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ProductivityChart({ data }) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Productivity

                </CardTitle>

            </CardHeader>

            <CardContent>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart data={data}>

                        <CartesianGrid />

                        <XAxis dataKey="_id" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="completed"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}