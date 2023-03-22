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

            loadSections(headerContent);
        })
}

function loadSections(headerContent){
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
    document.querySelector("#football").querySelector("a").innerHTML = data.football;
    document.querySelector("#basketball").querySelector("a").innerHTML = data.basketball;
    document.querySelector("#padel").querySelector("a").innerHTML = data.padel;
    document.querySelector("#tennis").querySelector("a").innerHTML = data.tennis;
    document.querySelector("#others").querySelector("a").innerHTML = data.others;

}

function load_logged_options(data) {
    let notlogged_section = document.querySelector("#not_logged").querySelectorAll("a");
    notlogged_section[0].querySelector("a").innerHTML = data.option1;
    notlogged_section[1].querySelector("a").innerHTML = data.option2;

    let logged_section = document.querySelector("#logged").querySelectorAll("a");
    logged_section[0].querySelector("a").innerHTML = data.option3;
    logged_section[1].querySelector("a").innerHTML = data.option4;
}