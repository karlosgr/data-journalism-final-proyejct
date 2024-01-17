import {worldDataByYears} from "../typescript/functions.js";


let plotChartData = [];

const plotChartElement = document.getElementById('plot_chart');
const length = (path) => d3.create("svg:path").attr("d", path).node().getTotalLength()


plot();

function fillData() {
    for (const data of worldDataByYears) {
        if (data.year !== 1960) {
            plotChartData.push({
                side: _pickSide(data.year),
                point: data.year,
                years: data.year,
                population: (data.worldPopulation - worldDataByYears
                    .find((value) => value.year === data.year - 1).worldPopulation ?? data.worldPopulation) / 1000000,
            })
        }
    }
}

function _pickSide(year) {
    if ([1961, 1962, 1965, 1967, 1977, 1978, 1984, 2014, 2021, 2020, 2019, 2018, 2017].indexOf(year) !== -1) return "right";
    if ([1963, 1964, 1966, 1968, 1969, 1970, 1971, 1973, 1979, 1980, 1981, 1982, 1983, 1985, 1986, 1987, 1988, 2012].indexOf(year) !== -1) return "left";
    if ([1972, 1976, 1989, 1992, 1995, 1997, 1999, 2001, 2004, 2007, 2011, 2015].indexOf(year) !== -1) return "bottom";
    return "top";
}


function plot() {
    fillData();
    plotChartElement.append(plotChart());
}


function plotChart() {

    // Declare the chart dimensions and margins.
    const width = `${window.innerWidth * 0.57}`;
    const height = `${window.innerHeight * 0.82}`;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 50;

    // Declare the positional encodings.
    const x = d3.scaleLinear()
        .domain(d3.extent(plotChartData, d => d.point)).nice()
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain(d3.extent(plotChartData, d => d.population)).nice()
        .range([height - marginBottom, marginTop]);

    const line = d3.line()
        .curve(d3.curveCatmullRom)
        .x(d => x(d.point))
        .y(d => y(d.population));

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    const l = length(line(plotChartData));

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", -height)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", width - 4)
            .attr("y", -4)
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .attr("fill", "currentColor")
            .text("Año"));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(null, ".2f"))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.1))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Crecimiento Poblacional en cada año(millones)"));

    svg.append("path")
        .datum(plotChartData)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", `0,${l}`)
        .attr("d", line)
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-dasharray", `${l},${l}`);

    svg.append("g")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(plotChartData)
        .join("circle")
        .attr("cx", d => x(d.point))
        .attr("cy", d => y(d.population))
        .attr("r", 3);

    const label = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll()
        .data(plotChartData)
        .join("text")
        .attr("transform", d => `translate(${x(d.point)},${y(d.population)})`)
        .attr("fill-opacity", 0)
        .text(d => d.point)
        .attr("stroke", "white")
        .attr("paint-order", "stroke")
        .attr("fill", "currentColor")
        .each(function (d) {
            const t = d3.select(this);
            switch (d.side) {
                case "top":
                    t.attr("text-anchor", "middle").attr("dy", "-0.7em");
                    break;
                case "right":
                    t.attr("dx", "0.5em").attr("dy", "0.32em").attr("text-anchor", "start");
                    break;
                case "bottom":
                    t.attr("text-anchor", "middle").attr("dy", "1.4em");
                    break;
                case "left":
                    t.attr("dx", "-0.5em").attr("dy", "0.32em").attr("text-anchor", "end");
                    break;
            }
        });

    label.transition()
        .delay((d, i) => length(line(plotChartData.slice(0, i + 1))) / l * (5000 - 125))
        .attr("fill-opacity", 1);

    return svg.node();
}

