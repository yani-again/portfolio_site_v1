const TEMPLATE_BLOG = document.querySelector("#blog-template");
let blog_list = document.querySelector("#blog-list");

async function load_blogs() {
    const response = await fetch("public/blog_previews.json");
    const data = await response.json();

    let total_blogs = 0;

    data.blogs.forEach(d => {
        // clone templates
        let blog_template = TEMPLATE_BLOG.content.cloneNode(true);

        // populate templates
        blog_template.querySelector(".title").textContent = d.title;
        blog_template.querySelector(".date").textContent = d.date;
        blog_template.querySelector(".read-time").textContent = d.read_time + " min read";
        blog_template.querySelector(".summary").textContent = d.summary;

        // append template
        blog_list.appendChild(blog_template);
    })
}

load_blogs();
