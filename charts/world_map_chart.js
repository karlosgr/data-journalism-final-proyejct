const scale = d3.geoMercator();
const path = d3.geoPath().projection(scale);

const svg = d3.select("#world_map_chart")
    .append('svg')
    .attr("viewBox", [0, 0, 960, 500])
;

d3.json("../data/custom.geojson").then(
    (json) => {
        json.features.forEach((feature) => {
            svg.append("path").datum(feature)
                .attr("fill", "#ddd")
                .attr("stroke", "white")
                .attr("d", path)
            ;
        })
        const g = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "black")
        ;
    }
);

