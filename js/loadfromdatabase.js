import { supabase } from "./connection.js";

console.log(supabase);

async function loadData(){
    const result = await supabase
    .from("products")
    .select("*");
    
    console.log("loaded data:");
    console.log(result.data);

    console.log(result.data[0].product_name);
    console.log(result.data[0].modifications_json);

    return result.data;
}

loadData();