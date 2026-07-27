import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
];

export default function CategoryChart({ data }) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Tasks By Category

                </CardTitle>

            </CardHeader>

            <CardContent>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="count"

                            nameKey="name"

                            outerRadius={100}

                        >

                            {data.map((entry) => (

                                <Cell
                                    key={entry.categoryId}
                                    fill={entry.color}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}