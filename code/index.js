const ANIMATIONS_ON = 0;

let loading_wrapper = document.querySelector("#loading-screen");
let loading_items = document.querySelectorAll(".loading-item");
let total_loading_delay = loading_items[loading_items.length - 1].dataset.delay;
let extra_loading_delay = 1000;

loading_items.forEach(item => {
    let delay = Number(item.dataset.delay);

    setTimeout(() => {
        item.style.opacity = 1;
    }, delay * ANIMATIONS_ON);
});

setTimeout(() => {
    loading_wrapper.style.opacity = 0;
}, (Number(total_loading_delay) + Number(extra_loading_delay)) * ANIMATIONS_ON);

setTimeout(() => {
    loading_wrapper.style.display = "none";
}, (Number(total_loading_delay) + Number(extra_loading_delay) + 400) * ANIMATIONS_ON);


const nav_items = document.querySelectorAll(".nav-item");

function change_page(to_page)
{
    nav_items.forEach(item => {
        if (item.dataset.active != 1)
            return;
        if (item.textContent.toLowerCase() == to_page)
            return;

        let current_nav_item = item;
        let new_nav_item = document.querySelector("#nav-" + to_page);
        let current_page = document.querySelector("#" + item.textContent.toLowerCase());
        let new_page = document.querySelector("#" + to_page);

        current_nav_item.dataset.active = 0;
        current_nav_item.classList.remove("active");
        current_nav_item.classList.add("inactive");

        new_nav_item.dataset.active = 1;
        new_nav_item.classList.remove("inactive");
        new_nav_item.classList.add("active");

        current_page.classList.toggle("page-inactive");
        new_page.classList.toggle("page-inactive");
    })
}
