
let currentShelf = 0;
let currentVariant = [];

function changeVariant(shelf,change){
    console.log(`Changing Variant, current--${currentVariant}-- change--${change}--`);
    let variantslist = shelf.variants;
    let newvariantlist = [];
    let allowchange = false;
    let remove = false;

    for (let i in variantslist){
        if (variantslist[i] == change){
            allowchange = true;
        }
    }

    for (let i in currentVariant){
        if (currentVariant[i] == change){
            remove = true;
        }
    }

    console.log(`Verify ${allowchange}`);
    if (allowchange){
        if (remove){
            console.log("Removing");
            // remove
            for (let i in currentVariant){
                if (currentVariant[i] != change){
                    newvariantlist.push(variantslist[i]);
                }
            }
        }else{
            console.log("Adding");
            // add
            for (let i in variantslist){
                console.log(`item ${i}: ${variantslist[i]}`);
                if (variantslist[i] == change){// make it add more than 1
                    console.log(`pushing ${variantslist[i]}`);
                    newvariantlist.push(variantslist[i]);
                }
            }
        }
        console.log(`End ChangeVariant with: | ${newvariantlist}`);
        currentVariant = newvariantlist;
        loadImage(shelf);
        loadVariantButtons(shelf);
        return newvariantlist;
    }else {
        console.log("Error");
        return [];
    }
}

async function loadData(){
    const getshelf1 = await fetch ("./productData/shelf1.json");
    const getshelf2 = await fetch ("./productData/shelf2.json");

    const shelf1 = await getshelf1.json();
    const shelf2 = await getshelf2.json();

    const shelves = [shelf1,shelf2];
    console.log("LoadData Finished");
    return shelves;
}

function loadVariantButtons(shelf){
    console.log("Loading Variant Options");
    let optionsHtml = `
    <div>Options</div>
    `;
    for (let i in shelf.variants){
        if(currentVariant == shelf.variants[i]){
            optionsHtml += `
            <div class="option${shelf.variants[i]} optionActive">
                ${shelf.variants[i]}
            </div>
            `
        }else{
            optionsHtml += `
            <div class="option${shelf.variants[i]}">
                ${shelf.variants[i]}
            </div>
            `
        }
        
    }
    const optionsmenu = document.querySelector(".options");
    optionsmenu.innerHTML = optionsHtml;
    console.log("HTML modified, adding listeners");

    for (let i in shelf.variants){
        let item = document.querySelector(`.option${shelf.variants[i]}`);
        console.log(`giving .option${shelf.variants[i]} Eventlistener with: ${shelf} | ${shelf.variants} | ${shelf.variants[i]}`);
        item.addEventListener("click",() => changeVariant(shelf,shelf.variants[i]));
        
    }
    console.log("LoadVariantButtons Finished");
}

function loadImage(shelf){
    console.log("LoadImage Started");
    console.log(shelf);
    let filename = shelf.name;

    console.log("Applying Variant");
    for (let v in currentVariant){
        console.log(v);
        filename += currentVariant[v];
    }

    console.log(filename);
    console.log("Applying Image");
    document.querySelector("#mods").style.backgroundImage = `url(assets/images/${filename}.png)`;
    console.log("LoadImage Finished");
}

function reloadstats(){

}

async function reloadpage(){
    console.log("reloadPage Started");
    let shelves = await loadData();
    let shelf = shelves[currentShelf];
    console.log(`Shelf: ${shelf}`);
    //
    loadImage(shelf);
    loadVariantButtons(shelf);
    
}

reloadpage();