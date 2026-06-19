import { supabase } from "./connection.js";
import { params } from "./params.js"

console.log(supabase);
console.log(params);


async function loadPosts() {
    const result = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();

    console.log(result.data);

    document.querySelector("#blog-post").innerHTML = `
        <h2>${result.data.title}</h2>
        <p>${result.data.content}</p>
      `;
}

async function loadNav() {

    const { data } = await supabase
        .from("posts")
        .select("id, title")
        .order("id");


    const nav = document.querySelector("#blog-nav");

    nav.innerHTML = "";

    data.forEach(post => {
        nav.innerHTML += `
            <a href="blog.html?id=${post.id}">
                ${post.title}
            </a>
        `;
    });
}

loadNav();
loadPosts();