document.addEventListener("DOMContentLoaded",loadPage);

function loadPage(){
    loadTemplate("/templates/header.html","header");
    loadTemplate("/templates/templatePaymentGateway.html","main");
    loadContent("/json/payment.json");


    
}

function loadTemplate(fileName, id, js) {

    //FETCH 
    fetch(fileName)
        .then((response) => { return response.text(); })
        .then(async (text) => {
            //console.log(text);
            text = text.split("</head>");

            document.querySelector("head").innerHTML += text[0].replace("<head>", "");
            document.querySelector(id).innerHTML = text[1];

            if(js) loadJs(js);
        });

        
}


function loadContent(json) {
    let pageInfo;
    fetch(json).then(response => {
        return response.json();
    }).then(data => {

        switch(navigator.language){
            case "es":
            case "es-ES":
                pageInfo = data.spanish;
                break;
            
            default:
                pageInfo = data.english;;      
        }

        document.querySelector("#titlePayment").innerHTML = pageInfo.title;
        loadLabels(pageInfo.labels);
    })

}


function loadLabels(labels){
    for(key in labels){
        key === "li6" ? 
        document.querySelector("#" + key)
        .querySelector("input").value = labels[key] :
        document.querySelector("#" +key)
        .querySelector("label").innerHTML = labels[key];
    }
}