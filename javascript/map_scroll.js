import {updateMapChart} from "../charts/world_map_chart.js";

let scrollContainer = document.querySelector(".scroll_container");
let world_map_page = document.querySelector(".world_map_page");
let map_year = document.getElementById("map_year");

let year;

window.addEventListener("scroll", () => {
    let top = scrollContainer.getBoundingClientRect().top;
    let bottom = scrollContainer.getBoundingClientRect().bottom;
    let height = bottom - top;
    if (scrollContainer.getBoundingClientRect().top <= 0) {
        year = -top / (height - window.innerHeight) * 61 >= 61 ? 61 : Math.round(-top / (height - window.innerHeight) * 61);
        world_map_page.classList.add("fixed");
        updateMapChart(1960 + year);
        map_year.innerText = 1960 + year;
    } else if (scrollContainer.getBoundingClientRect().bottom >= window.innerHeight) {
        world_map_page.classList.remove("fixed");
    }

});