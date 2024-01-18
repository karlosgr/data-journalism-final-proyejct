import {buildData} from "../typescript/functions.js";
import {getCountryDataByYear} from "../typescript/get-country-data-by-year.js";
import {getMapColor} from "../typescript/word_map_color.js";

let mapData;
const mapJson = await (await fetch("data/custom.geo.json")).json();
const worldMapChart = document.getElementById("world_map_chart");


updateMapChart(1960);


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
    mapJson.features.forEach((feature) => {
        svg.append("path").datum(feature)
            .attr("stroke", "#ddd")
            .attr("fill", () => {
                return getMapColor(_getCountryValue(mapData, feature.properties["adm0_a3_in"]));
            })
            .attr("d", path)
            .append("title")
            .text(`${_getCountryName(mapData, feature.properties["adm0_a3_in"])}\n 
                      indicator: ${_getCountryValue(mapData, feature.properties["adm0_a3_in"])}`
            )
        ;
    })
    const g = svg.append("g").attr("fill", "none").attr("stroke", "black")
    ;
    worldMapChart.appendChild(svg.node());
}

export function updateMapChart(year) {
    updateMapData(year);
    d3.select("#world_map_chart").selectAll("*").remove();
    _plot();
}