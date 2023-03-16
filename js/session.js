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
    document.querySelector("#submit").addEventListener("click",function(event){
        //event.preventDefault();
        let passwordRepeat = document.querySelector("#passwordRepeat");
        if( passwordRepeat.value !== document.querySelector("#password").value) passwordRepeat.setCustomValidity("Passwords don't match.");
        else passwordRepeat.setCustomValidity("");
    })
    let inputs = document.querySelectorAll("input");
    
    for(let i = 0;i<inputs.length;i++) {
        formValidate(inputs[i])
        inputs[i].addEventListener("blur", 
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
            inputElement.setCustomValidity(inputElement.title);
            break;
    }

}

function checkPasswordConfirmation(original, confirmation ){
    if(original.value !== confirmation.value) alert("Password do not match");
     
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
            break;

        default:
            button.value = "log in";
            submitButton.value = "Sign up";
            title.innerHTML = "CREATE ACCOUNT";
            formList.insertBefore(fullName,mail);
            formList.insertBefore(passwordConfirm,sessionOptions);
            textChange.innerHTML =
            `If you have already an account,<br /> please ${button.outerHTML}` ;
    }
    document.querySelector("#changeButton").
    addEventListener("click",() => changePage(changeButton));
}