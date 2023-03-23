/*EVENTO PARA DESPLEGAR "More Info"*/
// Selecciona todos los botones "More info"
const buttons = document.querySelectorAll('.button-moreInfo');

// Agrega un event listener a cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Selecciona las características del plan correspondiente
        const features = button.parentElement.parentElement.querySelectorAll('.features');

        // Si las características están desplegadas, se ocultan
        if (features[0].style.display === 'block') {
            features.forEach(feature => {
                feature.style.display = 'none';
            });
        } else {
            // Si las características están ocultas, se muestran
            features.forEach(feature => {
                feature.style.display = 'block';
            });
        }
    });
});

/*BOTÓN "Purchase"*/
function irAPagina() {
    window.location.href = "payment.html";
}

//METODO PARA FETCH
function loadTemplate(fileName, id, url) {

    //FETCH 
    fetch(fileName)
        //Primer .then se especifica que queremos del objeto (html) bruto que nos devolver� la llamada fetch
        .then((response) => { return response.text(); })
        /*Segundo .then se llama despues de que el primero se haya completado
         * se procesa la informaci�n retornada*/
        .then(async (text) => {
            //console.log(text);
            text = text.split("</head>");

            document.querySelector("head").innerHTML += text[0].replace("<head>", "");
            document.querySelector(id).innerHTML = text[1];

            if (url) loadJs(url, id);
        });


}

function loadJs(js, id) {
    let jsScript = document.createElement("script");

    fetch(js).then(response => {
        return response.text();
    }).then(data => {
        jsScript.innerHTML = data;

        document.head.appendChild(jsScript);

        switch (id) {
            case "header":
                loadHeaderContent();
                break;

            case "footer":
                loadFooterContent();
                break;
        }
    })
}


function loadJson(json) {
    var data;
    //Ingles
    var language = window.navigator.language.toString();
    if (language.includes("en")) {
        data = json.english;
        //Espa�ol
    } else {
        data = json.spanish;
    }

    let body = document.querySelector('body');
    /*Recorro el json
     * data es json.english
     * key ser� cada clave
     * data[key] es el valor de cada clave
     */
    for (key in data) {
        body.querySelector("#" + key).innerHTML = data[key];
    }
}


function fetchJson(json) {
    fetch(json)
        .then(data => {
            return data.json()
        })
        .then(items => {
            loadJson(items);
        })
}

loadTemplate("/templates/header.html", "header", "/js/header.js");
loadTemplate("/templates/footer.html", "footer", "/js/footer.js");
fetchJson("/json/prices.json");





