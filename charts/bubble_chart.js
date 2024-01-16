import {buildData} from "../typescript/functions.js";
import {getCountryDataByYear} from "../typescript/get-country-data-by-year.js";

let year = 2021;
let bubbleChartData;


updateChart();


function updateChart() {
    updateChartData();
}

function updateChartData() {
    bubbleChartData = ((data, year) => {
        let resultData = getCountryDataByYear(data, year);
        return resultData
            .filter((value) => value !== undefined)
            .sort((a, b) => {
                return a.birthRate - b.birthRate
            })
            .splice(0, 10).concat(resultData.splice(-10));
    })(buildData, year);
}


//Bubble Chart
//TODO make the chart updatable

// Specify the dimensions of the chart.
const width = 928;
const height = 928;
const margin = 1; // to avoid clipping the root circle stroke
const group = d => d.countryName;


// Create a categorical color scale.
const color = d3.scaleOrdinal(d3.schemeTableau10);

// Create the pack layout.
const pack = d3.pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(3);

// Compute the hierarchy from the (flat) data; expose the values
// for each node; lastly apply the pack layout.
const root = pack(d3.hierarchy({children: bubbleChartData})
    .sum(d => d.birthRate));

//TODO refactor this code and move to css

// Create the SVG container.
const svg = d3.create("svg")
    .attr("id", "bubbleChartSvg")
    .attr("viewBox", [-margin, -margin, width, height])
    .attr("text-anchor", "middle");


// Place each (leaf) node according to the layout’s x and y values.
const node = svg.append("g")
    .selectAll()
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);

// Add a title.
node.append("title")
    .text(d => `${d.data.countryName}\n${d.data.birthRate}`);

// Add a filled circle.
node.append("circle")
    .attr("fill-opacity", 0.8)
    .attr("fill", d => color(group(d.data)))
    .attr("r", (d) => {
        return d.r
    });

// Add a label.
const text = node.append("text")
    .attr("clip-path", d => `circle(${d.r})`)
    .attr("class", "circlesText")
    .text(d => d.data.countryName)
;


const chartElement = document.getElementById('bubble_chart');
chartElement.appendChild(svg.node());