let pageInfo;

function loadPage(){

    getUlElements(document.querySelector("#sessionForm ul").childNodes);
    loadPageContent("/json/session-content.json",addEventsListener);
}

function loadPageContent(url,callBack){
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