let pageInfo;

document.addEventListener('DOMContentLoaded',loadPage);

function loadPage(){

    loadTemplate("/templates/header.html","header");
    loadTemplate("/templates/templateSession.html","main", () => loadPageContent("/json/session-content.json",addEventsListener));

    
}

function loadTemplate(url,typeElement,callBack){

    fetch(url).then(response => {
        return response.text();
    }).then(data => {
        data = data.split("</head>");
        let main = document.createElement(typeElement);
        main.innerHTML = data[1];
        document.querySelector("head").innerHTML += data[0].replace("<head>","");
        document.querySelector("body").appendChild(main);

        if(callBack) callBack();
    })

    
}

function loadPageContent(url,callBack){
    getUlElements(document.querySelector("#sessionForm ul").childNodes);
    fetch(url).then(response => response.json()).then(data => {
        switch(navigator.language){
            case "es":
            case "es-ES":
                pageInfo = data.spanish;
                break;
            
            default:
                pageInfo = data.english;;      
        }
        setPageData();
        

        if(callBack) callBack();
        
    })
}

function setPageData(){
    document.querySelector("#titleForm").innerHTML = pageInfo.title2;

    setInputsTitles();
    setInputsLabels();
    setSessionOptionsData();

}

function setSessionOptionsData(){
    document.querySelector("#submit").value = pageInfo.submitValue2;
    document.querySelector("form").onsubmit = () => {
        onSubmit();
        return false;
    }
    let button = document.querySelector("#changeButton");
    button.value = pageInfo.buttonChangeOption2;
    document.querySelector("#changeSessionOptions").innerHTML = pageInfo.textChangeOption2 + `${button.outerHTML}`;
}

function setInputsLabels(){
    let labels =document.querySelectorAll("label");
    labels.forEach(data =>{
        switch(data.htmlFor){
            case "name":
                data.innerHTML = pageInfo.name;
                break;
            case "mail":
                data.innerHTML = pageInfo.mail;
                break;
            case "password":
                data.innerHTML = pageInfo.password;
                break;
            case "passwordRepeat":
                data.innerHTML = pageInfo.repeatPassword;
                break;
        }
    })

}
function setInputsTitles(){
    document.querySelector("#name").title = pageInfo.nameInfo;
    document.querySelector("#mail").title = pageInfo.mailInfo;
    document.querySelector("#password").title = pageInfo.passwordInfo;
    document.querySelector("#passwordRepeat").title = pageInfo.passwordInfo;
}
