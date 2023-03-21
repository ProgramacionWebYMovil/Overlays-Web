

// ul elements
let fullNameLi;
let mailLi;
let passwordLi;
let passwordConfirmLi;
let sessionOptionsLi;

// content data




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
            inputElement.setCustomValidity(pageInfo.fieldRequirementText);
            break;
        
        case "patternMismatch":

            switch(inputElement.name){
                case "name":
                    inputElement.setCustomValidity(pageInfo.nameInfo);
                    break;

                case "mail":
                    inputElement.setCustomValidity(pageInfo.mailInfo);
                    break;

                default:
                    inputElement.setCustomValidity(pageInfo.passwordInfo);
                    break;    
                
            }

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

    document.querySelector("#changeButton").addEventListener("click",changeButton => changePage(changeButton));

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
    if( passwordRepeat.value !== document.querySelector("#password").value) passwordRepeat.setCustomValidity(pageInfo.repeatPasswordMatch);
    else passwordRepeat.setCustomValidity("");
}

function changeContent(buttonValue,submitButtonValue,titleInner,textChangeInner){
    let textChange = document.querySelector("#changeSessionOptions");
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
        case pageInfo.buttonChangeOption2:
            changeContent(pageInfo.buttonChangeOption1,pageInfo.submitValue1,pageInfo.title1,pageInfo.textChangeOption1);
            passwordConfirmLi = formList.removeChild(passwordConfirmLi);
            fullNameLi = formList.removeChild(fullNameLi);
            break;

        default:
            changeContent(pageInfo.buttonChangeOption2,pageInfo.submitValue2,pageInfo.title2,pageInfo.textChangeOption2)
            formList.insertBefore(fullNameLi,mailLi);
            formList.insertBefore(passwordConfirmLi,sessionOptionsLi);
    }
    document.querySelector("#changeButton").addEventListener("click",() => changePage(changeButton));
}

function onSubmit(){

    fetch("/json/userOverlays.json").then(data => { return data.json() }).then(items => { 
        sessionStorage.setItem("json",JSON.stringify(items));
        sessionStorage.setItem("stateSession",true);
        window.location.href="/html/myOverlays.html";
    });
}