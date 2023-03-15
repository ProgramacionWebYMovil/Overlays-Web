//Creo una solicitud
let xhr = new XMLHttpRequest();
/*GET para pedir informacion
 * la imformaci�n que pido
 * true para decir que es asincrono*/
xhr.open('GET', "/templates/header.html", true);
//Send para mandar la solicitud
xhr.send();

/*Dos opciones distintas de a�adir el listener a un metodo*/
//xhr.addEventListener("readystatechange", processRequest, false);
xhr.onreadystatechange = processRequest;

/*Metodo que har� el procesamiento*/
function processRequest(e) {
    /*La respuesta tiene unos c�dgos, cuando esta en 4 es que todo se ha completado
     * el codigo de status es 200 porque es retornado del servidor cuando la solicitud ha sido exitosa*/
    if (xhr.readyState == 4 && xhr.status == 200) {
        //xhr.responseText para obtener el texto de la solicitud
        console.log(xhr.responseText);
    }
}