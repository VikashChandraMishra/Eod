import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartTooltip,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";

const Graph = () => {

    const COLORS = {
        accepted: "#059669",
        rejected: "#B91C1C",
        pending: "#6366F1",
        interviewing: "#2563EB",
        total: "#D97706",
    };

    const renderTooltip = context => {
        const { category, value } = context.point || context;
        return (
            <div>
                {category}: {value}%
            </div>
        );
    };

    const data = [
        {
            status: "Approved",
            value: 30,
            color: COLORS.total,
        },
        {
            status: "Pending",
            value: 40,
            color: COLORS.pending,
        },
        {
            status: "Rejected",
            value: 30,
            color: COLORS.accepted,
        },
    ];

    const labelContent = e => e.category;

    return (
        <div className="d-flex justify-content-center">
            <Chart>
                <ChartTitle text="Sample Chart" />
                <ChartLegend visible={false} />
                <ChartTooltip render={renderTooltip} />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut"
                        data={data}
                        categoryField="status"
                        field="value"
                    >
                        <ChartSeriesLabels
                            color="#fff"
                            background="none"
                            content={labelContent}
                        />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        </div>
    )
}

export default Graph;