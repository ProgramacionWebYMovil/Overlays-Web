let overlays = null;
/*DEFINO ESTAS VARIABLES COMO GLOBALES PARA PODER
 * USARLAS OTRA VEZ SIN NECESIDAD DE USAR EL FETCH OTRA VEZ*/
let json = null;
let cardHTML = null;

/*VARIABLES PARA LA NAVEGACIÓN DE MYOVERLAYS*/
let currentPage = 1;
let nPages = 0;
let cardsPerPage = 0;

function loadTemplate(fileName, id, callback) {

    //FETCH 
    fetch(fileName)
        //Primer .then se especifica que queremos del objeto (html) bruto que nos devolverá la llamada fetch
        .then((response) => { return response.text(); })
        /*Segundo .then se llama despues de que el primero se haya completado
         * se procesa la información retornada*/
        .then((text) => {
            text = text.split("</head>");
            document.querySelector("head").innerHTML += text[0].replace("<head>", "");
            document.querySelector(id).innerHTML = text[1];

        })
}

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



    /*CALCULAMOS INFORMACION DEL GRID
     *  - Páginas que hay
     *  - Cards por páginas
     */
    pageCalculator();

    /*DEPENDIENDO DE EN QUE DISPOSITIVO ESTE, CARGARÉ MÁS CARTAS O MENOS
     * amountInsert será la cantidad maxima que aguanta el grid 
     *      (si no hay tantos overlyas se añaden los que hay)
     * mismatch será el que indique que overlays se insertan, dependiendo de que pagina estemos
     */
    loadCards(cardsPerPage, (currentPage - 1) * cardsPerPage);




}



/*FUNCION LOADCARDS para cargar las cartas en el dom
 * amountInsert: numero que nos indica cuantas cartas hay que cargar
 * mismatch: numero de cartas que nos hemos saltado porque estamos en otra página*/
function loadCards(amountInsert, mismatch) {
    /*INSERTAR Y CREAR LAS CARTAS*/
    let df = new DocumentFragment();

    /*Condición ternaria para recorrer lo necesario
     * No recorreremos elementos en el array que no existan
     */
    var number = (mismatch + amountInsert > json.length ?
        json.length :
        amountInsert + mismatch);

    for (var i = mismatch; i < number; i++) {
        /*Creo un div con class cardOverlay que será el template de cada card*/
        let cardTemplate = document.createElement("div");
        cardTemplate.innerHTML = cardHTML;
        cardTemplate.className = "cardOverlay";

        let cardInfo = json[i];
        /*Inserto todas las caracteristicas de las cartas*/
        cardTemplate.querySelector(".image_card").firstElementChild.src = cardInfo.image_card;
        var language = window.navigator.language.toString();
        if (language.includes("en")) {
            cardTemplate.querySelector(".overlay_name").innerHTML = cardInfo.overlay_name_EN;
            cardTemplate.querySelector(".overlay_description").innerHTML = cardInfo.overlay_description_EN;
        } else {
            cardTemplate.querySelector(".overlay_name").innerHTML = cardInfo.overlay_name;
            cardTemplate.querySelector(".overlay_description").innerHTML = cardInfo.overlay_description;
        }
        
        cardTemplate.removeChild(cardTemplate.getElementsByClassName("info-cardOverlay")[0]);
        
        //cardTemplate.appendChild()
        /*cardTemplate.querySelector(".use_overlay")
            .addEventListener("click", function useOverlay() {

            });*/
        

        //Inserto la carta en el document fragment
        df.appendChild(cardTemplate);
        cardTemplate = null;
    }

    let overlays = document.querySelector("#overlays");
    /*Meto todo el documentFragment en el section #overlays
     * de un golpe, asi evito tener que estar editando el DOM
     * en cada paso*/
    overlays.appendChild(df);

    addEventsListener();
}

/*FUNCION PAGECALCULATOR
 * calculamos informacion del grid:
 *  - Páginas que hay
 *  - Cards por páginas
 */
function pageCalculator() {
    let nPagesOld = nPages;
    /*COMPROBAR CUANTAS PÁGINAS DE CARTAS HABRÁ
 * Primero averiguo cuantas cartas entran en el grid actual
 */
    var windowSize = window.innerWidth;

    if (windowSize >= 1024) {
        cardsPerPage = 8;
    } else {
        cardsPerPage = 4;
    }

    //Ahora calculamos el numero de páginas que habría
    nPages = json.length / cardsPerPage;
    /*Comprobar que sea un numero entero
     * si no lo es, añadimos una pagina mas*/
    if (nPages % 1 != 0) {
        nPages = Math.trunc(nPages);
        nPages++;
    }

    //SI se borra alguna card, no se quede currentPage en una pagina donde no sale nada
    if (nPagesOld > nPages && currentPage != 1) {
        currentPage--;
    }



    setPageText();



}

function setPageText() {
    document.querySelector("#actualPage").innerHTML = currentPage;
    document.querySelector("#nPages").innerHTML = nPages;
    if (nPages == 1 || nPages == 0) {
        document.querySelector("#nextPage").style.visibility = "hidden";
        document.querySelector("#previousPage").style.visibility = "hidden";
    }
}

function nextPage() {
    if (currentPage < nPages) {
        currentPage++;
        deleteCards();
        loadCards(cardsPerPage, (currentPage - 1) * cardsPerPage);
        setPageText();
    }

    if (currentPage == nPages) {
        document.querySelector("#nextPage").style.visibility = "hidden";
    }

    document.querySelector("#previousPage").style.visibility = "initial";

}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        deleteCards();
        loadCards(cardsPerPage, (currentPage - 1) * cardsPerPage);
        setPageText();
    }

    if (currentPage == 1) {
        document.querySelector("#previousPage").style.visibility = "hidden";
    }

    document.querySelector("#nextPage").style.visibility = "initial";
}

loadTemplate("/templates/header.html", "header");
loadTemplate("/templates/footer.html", "footer");
fetchCards("/templates/overlayCard.html","/json/overlays.json");
