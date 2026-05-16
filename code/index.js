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
