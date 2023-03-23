﻿function loadTemplate(fileName, id, callback) {

    //FETCH 
    fetch(fileName)
        //Primer .then se especifica que queremos del objeto (html) bruto que nos devolverá la llamada fetch
        .then((response) => { return response.text(); })
        /*Segundo .then se llama despues de que el primero se haya completado
         * se procesa la información retornada*/
        .then((text) => {
            if (callback) {
                callback(text);
            } else {
                text = text.split("</head>");

                document.querySelector("head").innerHTML += text[0].replace("<head>", "");
                document.querySelector(id).innerHTML = text[1];


            }
            
        })
}

/*FUNCION PARA AÑADIR EL CONTENIDO DE LOS TEMPLATES FOOTER Y HEADER*/
function loadJs(js) {
    let footerScript = document.createElement("script");

    fetch(js).then(response => {
        return response.text();
    }).then(data => {
        footerScript.innerHTML = data;

        document.head.appendChild(footerScript);

        loadFooterContent();

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



function loadCardsTemplate(data) {

    //Cargo el json desde el sessionStorage
    loadJSON();

    /*ORDENAR EL JSON POR FECHA, MAS RECIENTE A MENOS RECIENTE*/
    jsonSort = sortJSON(json);

    cardHTML = data;


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

function fetchJson(json) {
    fetch(json)
        .then(data => {
            return data.json()
        })
        .then(items => {
            
            loadJsonPage(items);
        })
}

function loadJsonPage(jsonPage) {
    var data;
    //Ingles
    var language = window.navigator.language.toString();
    if (language.includes("en")) {
        data = jsonPage.english;
        //Espa�ol
    } else {
        data = jsonPage.spanish;
    }

    

    let body = document.querySelector('body');
    /*Recorro el json
     * data es json.english
     * key ser� cada clave
     * data[key] es el valor de cada clave
     */
    let key;
    for (key in data) {
        body.querySelector("#" + key).innerHTML = data[key];
    }
}


function loadJSON() {
    json = JSON.parse(sessionStorage.getItem("userOverlays"));
}

function storeJSON(){
    sessionStorage.setItem("userOverlays", JSON.stringify(json))
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
        cardTemplate.id = cardInfo.id;
        cardTemplate.querySelector(".image_card").firstElementChild.src = cardInfo.image_card;
        cardTemplate.querySelector(".overlay_name").innerHTML = cardInfo.overlay_name;
        cardTemplate.querySelector(".overlay_description").innerHTML = cardInfo.overlay_description;
        cardTemplate.querySelector(".overlay_date").innerHTML = cardInfo.overlay_date;
        cardTemplate.removeChild(cardTemplate.getElementsByClassName("card_button")[0]);


        /*EVENTO PARA DESPLEGAR EL DROPDOWN DE LOS TRES PUNTITOS*/
        cardTemplate.querySelector(".card_dropdown_button")
            .addEventListener("click", function dropDown() {
            /*Event.currentTarget es el objeto que ha lanzado el evento
             *Tengo que seleccionar el id del cardOverlay*/
                //Selecciono el card overlay que activó el evento
                var cardOverlay = event.currentTarget.parentElement.parentElement.parentElement;
                //Selecciono el contenido que se va a desplegar o cerrar
                var card_dropdown_content = cardOverlay.children[3].children[1].children[1];
                if (card_dropdown_content.style.display == "block") {
                    card_dropdown_content.style.display = "none";
                } else {
                    card_dropdown_content.style.display = "block";
                }
         
            });

        cardTemplate.querySelector(".use_overlay")
            .addEventListener("click", function useOverlay() {
                
            });

        cardTemplate.querySelector(".edit_overlay")
            .addEventListener("click", function editOverlay() {
                console.log("Hola2");
            });

        //DELETE OVERLAY EVENT
        cardTemplate.querySelector(".delete_overlay")
            .addEventListener("click", function deleteOverlay() {
                //Buscar el overlay-card y coger el id para borrarlo de la BD
                var id = event.currentTarget.parentElement.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.id;
                for (i in json) {
                    if (json[i].id == id) {
                        delete json[i];
                    }
                }
                //QUITO EL ELEMENTO NULL QUE SE QUEDA CUANDO SE HACE UN DELETE
                json = cleanJSON(json);
                //VUELVO A ORDENAR EL NUEVO JSON
                jsonSort = sortJSON(json);
                //BORRO DE LA PANTALLA LOS OVERLAYS
                deleteCards();
                //CALCULO LAS PAGINAS POR SI HAY QUE CAMBIAR EL NUMERO DE PAGINAS ETC
                pageCalculator();
                //GUARDO EL JSON EN EL SESSION STORAGE
                storeJSON();
                //CARGO LOS OVERLAYS RESTANTES
                loadCards(cardsPerPage, (currentPage - 1) * cardsPerPage);
            });

        //Inserto la carta en el document fragment
        df.appendChild(cardTemplate);
        cardTemplate = null;
    }

    if (json.length == 0) {
        document.querySelector("#messageNoOverlays").style.display = "block";
        currentPage = 0;
        setPageText();
    } else {
        document.querySelector("#messageNoOverlays").style.display = "none";
    }

    let overlays = document.querySelector("#overlays");
    /*Meto todo el documentFragment en el section #overlays
     * de un golpe, asi evito tener que estar editando el DOM
     * en cada paso*/
    overlays.appendChild(df);

    //localStorage.setItem("prueba", JSON.stringify(json));


}

/*Cuando se elimina un elemento del JSON, se queda empty
 * Uso este metodo para limpiarme el JSON que se pasa por parametro*/
function cleanJSON(jsonToClean) {
    return jsonToClean.filter(e => e != null);
}

function sortJSON(jsonToSort) {
    return jsonToSort.sort((a, b) =>
        new Date(b.overlay_date).getTime() -
        new Date(a.overlay_date).getTime()); 
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
    let nPagesOld = nPages;
    /*COMPROBAR CUANTAS PÁGINAS DE CARTAS HABRÁ
 * Primero averiguo cuantas cartas entran en el grid actual
 */
    var windowSize = window.innerWidth;

    if (windowSize >= 1250) {
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
loadJs("/js/footer.js");
loadTemplate("/templates/overlayCard.html", "", loadCardsTemplate);

fetchJson("/json/myOverlays-page.json");


document.querySelector("#nextPage").addEventListener("click", nextPage, false);
document.querySelector("#previousPage").addEventListener("click", previousPage, false);
document.querySelector("#previousPage").style.visibility = "hidden";



