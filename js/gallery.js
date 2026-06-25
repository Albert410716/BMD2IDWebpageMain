import { supabase } from "./connection.js";

console.log(supabase);

console.log("Gallery Loading 0");

async function loadData(){
    const result = await supabase.from("products").select("*");
    
    console.log("loaded data:");
    console.log(result.data);

    console.log(result.data[0].product_name);
    console.log(result.data[0].modifications_json);

    return result.data;
}

console.log("Gallery Loading 1");

const data = await loadData();
let content = "";

console.log("Gallery Loading 2");
console.log(data);
console.log(data[0].modifications_json.images.get)

for(var i=0;i<data.length;i++){
    let name = data[i].product_name;
    let internalname = data[i].modifications_json.name;
    let imgsrc = data[i].modifications_json.images.get;
    console.log(`img: ${internalname}${imgsrc}.png`);
    content += `
    <a class="card" href="app.html?p=${name}">
        <div style="background-image: url(assets/images/${internalname}${imgsrc}.png);"></div>
        <h4>${name}</h4>
    </a>
    `
}



console.log("Gallery Loading 3");

console.log(content);


document.querySelector("#showcase").innerHTML = `
    <div class="cardgallery">
        <div>
            ${content}
        </div>
    </div>
`;

