import {buildData} from "../typescript/functions.js";
import {getCountryDataByYear} from "../typescript/get-country-data-by-year.js";
import {getMapColor} from "../typescript/word_map_color.js";

let mapData;
const worldMapChart = document.getElementById("world_map_chart");


function _getCountryName(data, countryId) {
    for (const country of data) {
        if (country.id === countryId)
            return country.countryName;
    }
}

function _getCountryValue(data, countryId) {
    for (const country of data) {
        if (country.id === countryId) {
            return country.birthRate ?? 0;

        }
    }
    return 0;
}


export function plotMapChart(year) {
    updateMapData(year);
    _plot();
}


function updateMapData(year) {
    mapData = ((data, year) => {
        return getCountryDataByYear(data, year);
    })(buildData, year);
}

function _plot() {
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
                        return getMapColor(_getCountryValue(mapData, feature.properties["adm0_a3_in"]));
                    })
                    .attr("stroke", "#ddd")
                    .attr("d", path)
                    .append("title")
                    .text(`${_getCountryName(mapData, feature.properties["adm0_a3_in"])}\n 
                       indicator: ${_getCountryValue(mapData, feature.properties["adm0_a3_in"])}`
                    )
                ;
            })
            const g = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "black")
            ;
        }
    );

    worldMapChart.appendChild(svg.node());
}