function loadTemplate(fileName, id) {

    //FETCH 
    fetch(fileName)
        //Primer .then se especifica que queremos del objeto (html) bruto que nos devolverá la llamada fetch
        .then((response) => { return response.text(); })
        /*Segundo .then se llama despues de que el primero se haya completado
         * se procesa la información retornada*/
        .then((text) => {
            //console.log(text);
            document.querySelector(id).innerHTML = text;
        })
}

loadTemplate("/templates/header.html", "header");
loadTemplate("/templates/footer.html", "footer");
loadTemplate("/templates/overlayCard.html","#overlays");