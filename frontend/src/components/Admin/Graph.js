import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
} from "@progress/kendo-react-charts";

const Graph = () => {

    const COLORS = {
        accepted: "#059669",
        rejected: "#B91C1C",
        pending: "#6366F1",
        interviewing: "#2563EB",
        total: "#D97706",
    };


    const series = [
        {
            name: "Approved",
            data: [19, 9, 20],
            color: COLORS.total,
        },
        {
            name: "Pending",
            data: [12, 6, 15],
            color: COLORS.pending,
        },
        {
            name: "Rejected",
            data: [7, 3, 5],
            color: COLORS.accepted,
        },
    ];

    const categories = ["January", "February", "March"];

    return (
        <Chart pannable zoomable style={{ height: 350 }}>
            <ChartTitle text="Application status - last 3 months" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartValueAxis>
                <ChartValueAxisItem title={{ text: "Number of EODs" }} min={0} max={30} />
            </ChartValueAxis>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
            </ChartCategoryAxis>
            <ChartSeries>
                {series.map((item, idx) => (
                    <ChartSeriesItem
                        key={idx}
                        type="line"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                    />
                ))}
            </ChartSeries>
        </Chart>
    )
}

export default Graph;