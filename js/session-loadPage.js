

function loadPage(){
    getUlElements(document.querySelector("#sessionForm ul").childNodes);
    addEventsListener();
    loadPageContent("/json/session-content.json");
}

function loadPageContent(url){
    fetch(url).then(response => response.json()).then(data => {
        switch(navigator.language){
            case "es":
            case "es-ES":
                init(data.spanish);
                break;
            
            default:
                init(data.english);
        }
    })
    
}