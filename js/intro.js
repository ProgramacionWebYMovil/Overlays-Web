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
function loadTemplate(fileName, id, callback) {

    //FETCH 
    fetch(fileName)
        //Primer .then se especifica que queremos del objeto (html) bruto que nos devolver� la llamada fetch
        .then((response) => { return response.text(); })
        /*Segundo .then se llama despues de que el primero se haya completado
         * se procesa la informaci�n retornada*/
        .then((text) => { 
            //console.log(text);
            document.getElementById(id).innerHTML = text;
            //Si al llamar loadTemplate, se a�ade como parametro un callback, este llamar� al m�todo
            if (callback) {
                callback();
            }
        })
}



loadTemplate("/templates/header.html", "header");
loadTemplate("/templates/footer.html", "footer");