w3IncludeHTML(loadPage);

// ul elements
let fullNameLi;
let mailLi;
let passwordLi;
let passwordConfirmLi;
let sessionOptionsLi;



function loadPage(){
    getUlElements(document.querySelector("#sessionForm ul").childNodes);
    addEventsListener();
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
            inputElement.setCustomValidity(inputElement.title);
            break;
    }

}

function getUlElements(ul){
    fullNameLi = ul[1];
    mailLi = ul[3];
    passwordLi = ul[5];
    passwordConfirmLi = ul[7];
    sessionOptionsLi = ul[9];
}

function addEventsListener(){

    document.querySelector("#changeButton").addEventListener("click",() => changePage(changeButton));

    document.querySelector("#submit").addEventListener("click",checkPasswordRepeat);

    let inputs = document.querySelectorAll("input");
    for(let i = 0;i<inputs.length;i++) {
        formValidate(inputs[i]);
        inputs[i].addEventListener("blur", 
            function(event) {
                event.target.classList.add('interacted'); 

                event.target.setCustomValidity("");
                
                formValidate(event.target);

            }
        );
    }  
}

function checkPasswordRepeat(){
    let passwordRepeat = document.querySelector("#passwordRepeat");
    if( passwordRepeat.value !== document.querySelector("#password").value) passwordRepeat.setCustomValidity("Passwords don't match.");
    else passwordRepeat.setCustomValidity("");
}

function changeContent(buttonValue,submitButtonValue,titleInner,textChangeInner){
    let textChange = document.querySelector("#changeSessionOptions").querySelector("p");
    let submitButton = document.querySelector("#submit");
    let title = document.querySelector("#titleForm");
    let changeButton = document.querySelector("#changeButton");

    changeButton.value = buttonValue;
    submitButton.value = submitButtonValue;
    title.innerHTML = titleInner;
    textChange.innerHTML = textChangeInner + `${changeButton.outerHTML}`;

}

function changePage(button){
    let formList = document.querySelector("#sessionForm ul");
    switch(button.value){
        case "log in":
            changeContent("sign up","Log in","LOG IN",`If you don't have an account,<br/>please `);
            passwordConfirmLi = formList.removeChild(passwordConfirmLi);
            fullNameLi = formList.removeChild(fullNameLi);
            break;

        default:
            changeContent("log in","Sign up","CREATE ACCOUNT",`If you have already an account,<br /> please `)
            formList.insertBefore(fullNameLi,mailLi);
            formList.insertBefore(passwordConfirmLi,sessionOptionsLi);
    }
    document.querySelector("#changeButton").addEventListener("click",() => changePage(changeButton));
}