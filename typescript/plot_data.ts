import {
    numberOfCountriesWithBirthRateData,
    numberOfCountriesWithMortalityData,
    regionData,
    worldData,
    worldDataByYears
} from "./functions.js";


const regions: any = {
    "África": [
        "AFW", "AFE", "SSF",
    ],
    "Asia": [
        "EAS", "ECS", "TSA"
    ],
    "Europa": [
        "CEB", "EUU"
    ],
    "América": [
        "CSS", "LCN", "CAN", "USA"
    ],
    "Australia": [
        "AUS",
    ]
}

function getContinentByRegion(regionId: string): string {
    for (const continent in regions) {
        if (regions[continent].indexOf(regionId) != -1)
            return continent;
    }
    return "";
}

const deleteDuplicatedRegionData = (regionData: any[]) => {
    const filterContinentData = []
    for (let i = 1960; i < 2022; i++) {
        for (const region in regions) {
            let average = 0;
            for (const continent of regionData) {
                if (continent[1] === region && continent[2] === i) {
                    average += continent[0];
                }
            }
            filterContinentData.push([
                +(average / (regions[region].length)).toFixed(2), region, i
            ])

        }
    }
    return filterContinentData;
}

export const animatedLineChartIndicatorsData = {
    title: "Indicadores de Natalidad y Mortalidad por cada 1000 personas",
    htmlElementId: document.getElementById('animated_line_chart_indicators'),
    lineDataNames: [
        "Birth Rate",
        "Mortality"
    ],
    data: ((data: worldData[]) => {
        const chartData: any = [[
            'Value', 'Indicator', 'Year'
        ]];
        for (const worldData of data) {
            chartData.push([
                    +(worldData.worldBirthRate / numberOfCountriesWithBirthRateData(worldData.year)).toFixed(2),
                    "Birth Rate",
                    worldData.year
                ],
                [
                    +(worldData.worldMortalityRate / numberOfCountriesWithMortalityData(worldData.year)).toFixed(2),
                    "Mortality",
                    worldData.year
                ]
            );
        }
        return chartData;
    })(worldDataByYears),
}

export const animatedLineChartContinentsData = {
    title: 'Natalidad por Continentes',
    htmlElementId: document.getElementById('animated_line_chart_continents'),
    lineDataNames: [
        "África",
        "América",
        "Europa",
        "Asia",
        "Australia",
    ],
    data: ((continentsData: regionData[]) => {
        const chartData: any[] = [];
        const filterData: any[] = [
            [
                "Natalidad", "Continente", "Año",
            ],
        ]
        for (const region of continentsData) {
            for (const year of region.birthData) {
                if (getContinentByRegion(region.id) != "") {
                    chartData.push([
                        year.value, getContinentByRegion(region.id), year.year
                    ]);
                }

            }
        }
        return filterData.concat(deleteDuplicatedRegionData(chartData));
    })(regionData),
}

