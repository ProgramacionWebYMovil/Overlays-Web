w3IncludeHTML(loadPage);

//elements

let fullName;
let mail;
let password;
let passwordConfirm;
let sessionOptions;

function loadPage(){
    let changeButton = document.getElementById("changeButton");
    let list = document.querySelector("#sessionForm ul").childNodes;
    fullName = list[1];
    mail = list[3];
    password = list[5];
    passwordConfirm = list[7];
    sessionOptions = list[9];
    changeButton.addEventListener("click",() => changePage(changeButton));
    let inputs = document.querySelectorAll("input");
    
    for(let i = 0;i<inputs.length;i++) {
        formValidate(inputs[i])
        inputs[i].addEventListener("change", 
            function(event) {
                event.target.classList.add('interacted'); 

                event.target.setCustomValidity("");
                
                formValidate(event.target);

            }
        );

    }   
}


function formValidate(inputElement){
    
    let validity = inputElement.validity;
  
    if(!validity.valid){
    
        validity.valueMissing === true ? resolveValidation(inputElement,"valueMissing"):

        resolveValidation(inputElement,"patternMismatch");

    }

}

function resolveValidation(inputElement, error){
    switch(error){
        case "valueMissing":
            inputElement.setCustomValidity("This field is required");
            break;
        
        case "patternMismatch":
            console.log(inputElement)
            inputElement.name == "passwordRepeat" ? checkPasswordConfirmation(document.querySelector("#password"),inputElement):
            inputElement.setCustomValidity(inputElement.title);
            break;
    }

}

function changePage(button){
    let textChange = document.querySelector("#changeSessionOptions").querySelector("p");
    let submitButton = document.querySelector("#submit");
    let formList = document.querySelector("#sessionForm ul");
    console.log(sessionOptions);
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
            title.innerHTML = "CREATE ACCOUNT";
            formList.insertBefore(fullName,mail);
            formList.insertBefore(passwordConfirm,sessionOptions);
            textChange.innerHTML =
            `If you have already an account,<br /> please ${button.outerHTML}` ;
            console.log(button.outerHTML);
    }
    document.querySelector("#changeButton").
    addEventListener("click",() => changePage(changeButton));
}