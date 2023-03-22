function addEventsListener() {
    var overlaysButtons = document.getElementsByClassName("card_button");

    for (var i = 0; i < overlaysButtons.length; i++) {
        overlaysButtons[i].addEventListener("click", function () {
            if (sessionStorage.getItem("stateSession") !=true) {
                window.location.href = "/html/session.html";
            }
            //Hay que insertar el overlay
            //var jsonStorage = JSON.parse(sessionStorage.getItem("userOverlays"));
            
        });
    }
    
}
