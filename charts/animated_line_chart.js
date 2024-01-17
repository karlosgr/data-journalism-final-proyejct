export function plotAnimatedLineChart(animatedLineChartData) {
    run(animatedLineChartData.data,
        animatedLineChartData.lineDataNames,
        animatedLineChartData.title,
        animatedLineChartData.htmlElementId,);
}


function run(_rawData, lineDataName, chartTitle, htmlElementId) {
    let animatedLineChart = echarts.init(htmlElementId);
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(lineDataName, function (line) {
        let datasetId = 'dataset_' + line;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        {dimension: _rawData[0][2], gte: 1960},
                        {dimension: _rawData[0][1], '=': line}
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: line,
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[1] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: _rawData[0][2],
                y: _rawData[0][0],
                label: [_rawData[0][1], _rawData[0][2]],
                itemName: _rawData[0][2],
                tooltip: [_rawData[0][0]]
            }
        });
    });
    let option = {
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: chartTitle,
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            name: 'Value'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    animatedLineChart.setOption(option);
}