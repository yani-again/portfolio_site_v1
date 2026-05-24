const ANIMATIONS_ON = 1;

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


/*
 * ------------------
 * -- BLOG SECTION --
 * ------------------
 */
const BLOG_BOX_LEN = 40;
const BLOG_TEXT_LEN = BLOG_BOX_LEN - 4;
const BLOG_HEADER_LEN = BLOG_BOX_LEN - 4;
const TEMPLATE_BLOG_HEADER = document.querySelector("#blog-header");
const TEMPLATE_BLOG_TEXT = document.querySelector("#blog-text");
const TEMPLATE_BLOG_FOOTER = document.querySelector("#blog-footer");
let blog_list = document.querySelector("#blog-list");

async function load_blogs() {
    const response = await fetch("public/blog_previews.json");
    const data = await response.json();

    let total_blogs = 0;

    data.blogs.forEach(d => {
        // clone templates
        let blog_header = TEMPLATE_BLOG_HEADER.content.cloneNode(true);
        let blog_texts = [];
        let blog_footer = TEMPLATE_BLOG_FOOTER.content.cloneNode(true);

        // populate templates
        blog_header.querySelector(".date").textContent = d.date;
        blog_header.querySelector(".read-time").textContent = d.read_time;
        blog_header.querySelector(".title").textContent = d.title + ' '.repeat(BLOG_TEXT_LEN - d.title.length);

        const filler = '─'.repeat(BLOG_HEADER_LEN - (d.date.length + d.read_time.length + 4 + 9));  // 4 for spaces, 9 for "min read"
        blog_header.querySelector(".filler").textContent = filler;

        let summary = d.summary.split(' ');
        while (summary.length > 0)
        {
            let text = "";
            while (text.length + summary[0].length <= BLOG_TEXT_LEN)
            {
                if (text.length + summary[0].length < BLOG_TEXT_LEN)
                    text += summary.shift() + ' ';
                else
                    text += summary.shift();

                if (summary.length == 0)
                    break;
            }

            if (text.length < BLOG_TEXT_LEN)
                text += ' '.repeat(BLOG_TEXT_LEN - text.length);

            let blog_text = TEMPLATE_BLOG_TEXT.content.cloneNode(true);
            blog_text.querySelector(".text").textContent = text;
            blog_texts.push(blog_text);
        }

        // append templates
        let blog_div = document.createElement("div");
        blog_div.classList.add("blog");

        blog_div.appendChild(blog_header);
        blog_texts.forEach(blog_text => {
            blog_div.appendChild(blog_text);
        })
        blog_div.appendChild(blog_footer);

        blog_list.appendChild(blog_div);
    })
}

load_blogs();
