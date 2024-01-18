let causes_page = document.querySelector(".causes_pages");
let scroll_container = document.querySelector(".scroll_container_causes");
let world_map_page = document.querySelector(".world_map_page");
window.addEventListener("scroll", () => {
    let top = scroll_container.getBoundingClientRect().top;
    let bottom = scroll_container.getBoundingClientRect().bottom;
    if (top <= 0) {
        // world_map_page.classList.remove("fixed");
        causes_page.classList.add("fixed");
    } else if (bottom >= window.innerHeight) {
        causes_page.classList.remove("fixed");
    }

});