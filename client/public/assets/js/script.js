const OpenNav = document.querySelector(".icon1")
const FermerNav = document.querySelector(".fermer")
const Menu = document.querySelector(".menu")

const PositionMenu = Menu.getBoundingClientRect().left;

OpenNav.addEventListener("click", () =>{
    if(PositionMenu <0){
        Menu.classList.add("monter")
    }
})

FermerNav.addEventListener("click", () =>{
    if(PositionMenu <0){
        Menu.classList.remove("monter")
    }
})
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

    function register(){
        RegForm.style.transform = "translateX(0px)"
        LoginForm.style.transform = "translateX(0px)"
        Indicator.style.transform = "translateX(100px)"
    }
    function login(){
        RegForm.style.transform = "translateX(300px)"
        LoginForm.style.transform = "translateX(300px)"
        Indicator.style.transform = "translateX(0px)"
    }

