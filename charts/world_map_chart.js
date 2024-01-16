import {buildData} from "../typescript/functions.js";
import {getCountryDataByYear} from "../typescript/get-country-data-by-year.js";
import {getMapColor} from "../typescript/word_map_color.js";

let mapData;
let showParam = 1;
let year = 2021;

updateMapChart();

function getCountryName(data, countryId) {
    for (const country of data) {
        if (country.id === countryId)
            return country.countryName;
    }
}

function getCountryValue(data, countryId, showParam) {
    for (const country of data) {
        if (country.id === countryId) {
            switch (showParam) {
                case 1:
                    return country.birthRate ?? 0;
                case -1:
                    return -country.mortalityRate ?? 0;
                default:
                    return (country.birthRate - country.mortalityRate) ?? 0;
            }
        }
    }
    return 0;
}


function updateMapChart() {
    updateMapData();
}


function updateMapData() {
    mapData = ((data, year) => {
        return getCountryDataByYear(data, year);
    })(buildData, year);
}


const scale = d3.geoMercator();
const path = d3.geoPath().projection(scale);

const svg = d3.create("svg")
    .attr("viewBox", [80, -100, 830, 580])
;

d3.json("../data/custom.geo.json").then(
    (json) => {
        json.features.forEach((feature) => {
            svg.append("path").datum(feature)
                .attr("fill", () => {
                    return getMapColor(getCountryValue(mapData, feature.properties["adm0_a3_in"], showParam));
                })
                .attr("stroke", "#ddd")
                .attr("d", path)
                .append("title")
                .text(`${getCountryName(mapData, feature.properties["adm0_a3_in"])}\n 
                       indicator: ${getCountryValue(mapData, feature.properties["adm0_a3_in"], showParam)}`
                )
            ;
        })
        const g = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "black")
        ;
    }
);

const worldMapChart = document.getElementById("world_map_chart");
worldMapChart.appendChild(svg.node());

