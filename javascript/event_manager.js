import {plotAnimatedLineChart} from "../charts/animated_line_chart.js";
import {animatedLineChartContinentsData, animatedLineChartIndicatorsData} from "../typescript/plot_data.js";
import {plotPlotChart} from "../charts/plot_chart.js";


let globalIndPage = document.querySelector(".global_ind_page");
let plotChartPage = document.querySelector(".introduction_page");
let continentPage = document.querySelector(".continents_page");

let animatedIndChart = false;
let animatedPlotChart = false;
let animatedContinentsChart = false;
window.addEventListener("scroll", () => {
    let top = globalIndPage.getBoundingClientRect().top;
    if (top / window.innerHeight <= 1 && !animatedIndChart) {
        plotAnimatedLineChart(animatedLineChartIndicatorsData);
        animatedIndChart = true;
    }

});

window.addEventListener("scroll", () => {
    let top = continentPage.getBoundingClientRect().top;
    if (top / window.innerHeight <= 1 && !animatedContinentsChart) {
        plotAnimatedLineChart(animatedLineChartContinentsData);
        animatedContinentsChart = true;
    }

});

window.addEventListener("scroll", () => {
    let top = plotChartPage.getBoundingClientRect().top;
    if (top / window.innerHeight <= 1 && !animatedPlotChart) {
        plotPlotChart();
        animatedPlotChart = true;
    }
});


