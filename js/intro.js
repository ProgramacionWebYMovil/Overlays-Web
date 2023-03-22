/*MANERA 1*/

//Creo una solicitud
//let xhr = new XMLHttpRequest();
/*GET para pedir informacion
 * la imformaci�n que pido
 * true para decir que es asincrono*/
//xhr.open('GET', "/templates/header.html", true);
//Send para mandar la solicitud
//xhr.send();

/*Dos opciones distintas de a�adir el listener a un metodo*/
//xhr.addEventListener("readystatechange", processRequest, false);
//xhr.onreadystatechange = processRequest;

/*Metodo que har� el procesamiento*/
//function processRequest(e) {
    /*La respuesta tiene unos c�dgos, cuando esta en 4 es que todo se ha completado
     * el codigo de status es 200 porque es retornado del servidor cuando la solicitud ha sido exitosa*/
//    if (xhr.readyState == 4 && xhr.status == 200) {
        //xhr.responseText para obtener el texto de la solicitud
//        console.log(xhr.responseText);
//    }
//}


/*MANERA 2*/

//Metodo para comprobar que la web admite los templates
/*const supportsTemplate = function () {
    //Crea un template element y se asegura de que tiene la propiedad 'content'
    return 'content' in document.createElement('template');
}*/


//METODO PARA FETCH
function loadTemplate(fileName, id, js) {

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

            if(js) loadJs(js);
        });

        
}

function loadJs(js){
    let footerScript = document.createElement("script");
                
    fetch(js).then(response => {
        return response.text();
    }).then(data => {
        footerScript.innerHTML= data;
        
        document.head.appendChild(footerScript);

        loadFooterContent();
    
    })
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



loadTemplate("/templates/header.html", "header");
loadTemplate("/templates/footer.html", "footer","/js/footer.js");
fetchJson("/json/intro.json");
