
const header = document.querySelector("header");
const menu = document.querySelector("#menu");
const main = document.querySelector("main");
const menubutton = document.querySelector(".menubutton");
let menustate = 1;

const height = window.innerHeight;

function toggleMenu (){
    if(menustate){
        // open menu
        header.classList.add("open");
        gsap.from("header>*",{ y:-height, duration: 0.2 });

        menustate = false;
    }else{
        // close menu

        header.classList.remove("open");
        gsap.from("header>*",{ y:height, duration: 0.2 });

        menustate = true;
    }
}


// execute functions


menubutton.addEventListener("click",toggleMenu);