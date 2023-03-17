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

/*DEFINO ESTAS VARIABLES COMO GLOBALES PARA PODER
 * USARLAS OTRA VEZ SIN NECESIDAD DE USAR EL FETCH OTRA VEZ*/
let json = null;
let jsonSort = null;
let cardHTML = null;


/*FUNCION PARA EL FETCH DE LAS CARTAS
 * realiza el fetch de cardtemplate
 * y el fetch del json
 */
async function fetchCards(fileTemplate, fileJson) {

    /*Promise.all starts fetch request in parallel, and waits
     * until all of them are resolved
     * 
     * If any request fails, then the whole parallel promise 
     * gets rejected right away with the failed request error.*/
    const [cardResponse, jsonResponse] = await Promise.all([
        fetch(fileTemplate),
        fetch(fileJson)
    ]);

    cardHTML = await cardResponse.text();
    json = await jsonResponse.json();

    /*ORDENAR EL JSON POR FECHA, MAS RECIENTE A MENOS RECIENTE*/
    jsonSort = json.sort((a, b) =>
        new Date(b.overlay_date).getTime() -
        new Date(a.overlay_date).getTime());


    //DEPENDIENDO DE EN QUE DISPOSITIVO ESTE, CARGARÉ MÁS CARTAS O MENOS
    //Para big_style
    loadCards(8,0);

    

    
}

/*FUNCION LOADCARDS para cargar las cartas en el dom
 * amountInsert: numero que nos indica cuantas cartas hay que cargar
 * mismatch: numero de cartas que nos hemos saltado porque estamos en otra página*/
function loadCards(amountInsert,mismatch) {
    /*INSERTAR Y CREAR LAS CARTAS*/
    let df = new DocumentFragment();

    /*Condición ternaria para recorrer lo necesario
     * No recorreremos elementos en el array que no existan
     */
    var number = (mismatch + amountInsert > jsonSort.length ?
        json.length :
        amountInsert + mismatch);

    for (var i = mismatch; i < number; i++) {
        /*Creo un div con class cardOverlay que será el template de cada card*/
        let cardTemplate = document.createElement("div");
        cardTemplate.innerHTML = cardHTML;
        cardTemplate.className = "cardOverlay";

        let cardInfo = jsonSort[i];
        /*Inserto todas las caracteristicas de las cartas*/
        cardTemplate.querySelector(".image_card").firstElementChild.src = cardInfo.image_card;
        cardTemplate.querySelector(".overlay_name").innerHTML = cardInfo.overlay_name;
        cardTemplate.querySelector(".overlay_description").innerHTML = cardInfo.overlay_description;
        cardTemplate.querySelector(".overlay_date").innerHTML = cardInfo.overlay_date;

        //Inserto la carta en el document fragment
        df.appendChild(cardTemplate);
        cardTemplate = null;
    }


    /*Meto todo el documentFragment en el section #overlays
     * de un golpe, asi evito tener que estar editando el DOM
     * en cada paso*/
    document.querySelector("#overlays").appendChild(df);

}

loadTemplate("/templates/header.html", "header");
loadTemplate("/templates/footer.html", "footer");
fetchCards("/templates/overlayCard.html", "/json/myOverlays.json");

