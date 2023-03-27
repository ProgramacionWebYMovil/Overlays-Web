function loadHeaderContent(){

    let headerContent = {
        lenguageContent :null ,
        commonContent:null
    }

    fetch("/json/header.json")
        .then(response => {
            return response.json()
        })
        .then(data => {

            headerContent.commonContent = data.common;

            switch(navigator.language){
                case "es":
                case "es-ES":
                    headerContent.lenguageContent = data.spanish;
                    break;

                default:
                    headerContent.lenguageContent = data.english;
            }

            loadSectionsHeader(headerContent);
            sessionState();
        })
}

function loadSectionsHeader(headerContent){
    //document.querySelector("#logo-header").src = headerContent.commonContent.logoImg;
    load_names(headerContent.lenguageContent.names);
    load_dropmenu_elements(headerContent.lenguageContent.dropmenu_elements);
    load_logged_options(headerContent.lenguageContent.logged_options);
}

function load_names(data){
    document.querySelector("#dropmenu-top").innerHTML = data.overlays;
    document.querySelector("#prices").querySelector("a").innerHTML = data.prices;

    document.querySelector("#howToUse").querySelector("a").innerHTML = data.howtouse;
}

function  load_dropmenu_elements(data) {
    document.querySelector("#football").innerHTML = data.football;
    document.querySelector("#basketball").innerHTML = data.basketball;
    document.querySelector("#padel").innerHTML = data.padel;
    document.querySelector("#tennis").innerHTML = data.tennis;
    document.querySelector("#others").innerHTML = data.others;

}

function load_logged_options(data) {
    let notlogged_section = document.querySelector("#not_logged").querySelectorAll("a");

    notlogged_section[0].innerHTML = data.option1;
    notlogged_section[1].innerHTML = data.option2;

    let logged_section = document.querySelector("#logged").querySelectorAll("a");
    logged_section[0].innerHTML = data.option3;
    logged_section[1].innerHTML = data.option4;
}

function session(option){
    sessionStorage.setItem("sessionOption",option);
    window.location.href = "/html/session.html";
}

function logOut(){
    sessionStorage.setItem("stateSession","false");
    window.location.href = "/html/intro.html";
}

function sessionState(){
    let not_loged = document.querySelector("#not_logged");
    let loged = document.querySelector("#logged");

    let not_logedA = not_loged.querySelectorAll("a");
    not_logedA[0].addEventListener("click",() =>session("log in"));
    not_logedA[1].addEventListener("click",() =>session("sign up"));

    loged.querySelectorAll("a")[1].addEventListener("click",logOut);

    if(sessionStorage.getItem("stateSession") === "true") not_loged.style = "display:none;"
    else loged.style = "display:none;";
}