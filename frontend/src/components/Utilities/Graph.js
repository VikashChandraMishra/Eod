import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartTooltip,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";

const Graph = (props) => {

    const { data, text } = props;

    const renderTooltip = context => {

        const { category, value } = context.point || context;

        return (
            <div>
                {category}: {value}%
            </div>
        );

    };

    const labelContent = e => e.category;

    return (
        <div className="d-flex justify-content-center">
            <Chart style={{width: '440px', height: '440px'}}>
                <ChartTitle text={text} />
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