const dashboardRepository = require("../repositories/dashboard.repository");

class DashboardService {

    async getDashboard(userId) {

        const [
            summary,
            productivity,
            categoryBreakdown
        ] = await Promise.all([

            dashboardRepository.getSummary(userId),

            dashboardRepository.getProductivity(userId),

            dashboardRepository.getCategoryBreakdown(userId)

        ]);

        const dashboardSummary = summary || {
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
            overdueTasks: 0,
            dueToday: 0
        };

        const completionRate =
            dashboardSummary.totalTasks === 0
                ? 0
                : Number(
                    (
                        (dashboardSummary.completedTasks * 100) /
                        dashboardSummary.totalTasks
                    ).toFixed(2)
                );

        return {
            summary: {
                ...dashboardSummary,
                completionRate
            },

            productivity,

            categoryBreakdown
        };
    }

}

module.exports = new DashboardService();