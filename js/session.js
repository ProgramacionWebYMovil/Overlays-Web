w3IncludeHTML(loadPage);

//elements

let passwordConfirm;
let fullName;

function loadPage(path){
    let changeButton = document.getElementById("changeButton");
    passwordConfirm = document.querySelector("#sessionForm ul").childNodes[7];
    fullName = document.querySelector("#sessionForm ul").childNodes[1];
    
    changeButton.addEventListener("click",() => changePage(changeButton));
    

}

function changePage(button){
    let textChange = document.querySelector("#changeSessionOptions").querySelector("p");
    let submitButton = document.querySelector("#submit");
    let formList = document.querySelector("#sessionForm ul");
    let title = document.querySelector("#titleForm");
    switch(button.value){
        case "log in":
            button.value = "sign up";
            submitButton.value = "Log in";
            title.innerHTML = "LOG IN"
            passwordConfirm = formList.removeChild(passwordConfirm);
            fullName = formList.removeChild(fullName);
            textChange.innerHTML = 
            `If you don't have an account,<br/>please  ${button.outerHTML}`;
            console.log(button.outerHTML);
            break;
        default:
            button.value = "log in";
            submitButton.value = "Sign up";
            title.innerHTML = "CREATE ACCOUNT"
            textChange.innerHTML = 
            `If you have already an account,<br /> please ${button.outerHTML}` ;
            console.log(button.outerHTML);
            
    }
    document.querySelector("#changeButton").
    addEventListener("click",() => changePage(changeButton));
}