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

/*VARIABLES PARA LA NAVEGACIÓN DE MYOVERLAYS*/
let currentPage = 1;
let nPages = 0;
let cardsPerPage = 0;


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


    let overlays = document.querySelector("#overlays");
    /*Meto todo el documentFragment en el section #overlays
     * de un golpe, asi evito tener que estar editando el DOM
     * en cada paso*/
    overlays.appendChild(df);


}

function deleteCards() {
    let overlays = document.querySelector("#overlays");
    overlays.innerHTML = "";
}


/*FUNCION PAGECALCULATOR
 * calculamos informacion del grid:
 *  - Páginas que hay
 *  - Cards por páginas
 */
function pageCalculator() {

    let overlays = document.querySelector("#overlays");
    /*COMPROBAR CUANTAS PÁGINAS DE CARTAS HABRÁ
 * Primero averiguo cuantas cartas entran en el grid actual
 */
    let nColums = window.getComputedStyle(overlays).
        getPropertyValue('grid-template-columns').split(" ").length;
    let nRows = window.getComputedStyle(overlays).
        getPropertyValue('grid-template-rows').split(" ").length;
    //Ahora calculamos el numero de páginas que habría
    nPages = jsonSort.length / (nColums * nRows);
    //Y el número de cards que caben en una pagina
    cardsPerPage = nColums * nRows;
    /*Comprobar que sea un numero entero
     * si no lo es, añadimos una pagina mas*/
    if (nPages % 1 != 0) {
        nPages = Math.trunc(nPages);
        nPages++;
    }

    setPageText();


    
}

function setPageText() {
    document.querySelector("#actualPage").innerHTML = currentPage;
    document.querySelector("#nPages").innerHTML = nPages;
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
fetchCards("/templates/overlayCard.html", "/json/myOverlays.json");

document.querySelector("#nextPage").addEventListener("click", nextPage, false);
document.querySelector("#previousPage").addEventListener("click", previousPage, false);
document.querySelector("#previousPage").style.visibility = "hidden";

