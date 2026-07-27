import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SummaryCards({ dashboard }) {

    const cards = [
        {
            title: "Total Tasks",
            value: dashboard.totalTasks,
        },
        {
            title: "Completed",
            value: dashboard.completedTasks,
        },
        {
            title: "Pending",
            value: dashboard.pendingTasks,
        },
        {
            title: "Due Today",
            value: dashboard.dueToday,
        },
        {
            title: "Overdue",
            value: dashboard.overdueTasks,
        },
        {
            title: "Completion Rate",
            value: `${dashboard.completionRate}%`,
        },
    ];

    return (

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {cards.map(card => (

                <Card key={card.title}>

                    <CardHeader>

                        <CardTitle className="text-base">

                            {card.title}

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <p className="text-3xl font-bold">

                            {card.value}

                        </p>

                    </CardContent>

                </Card>

            ))}

        </div>

    );

}