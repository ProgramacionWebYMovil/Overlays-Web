function addEventsListener() {
    var overlaysButtons = document.getElementsByClassName("card_button");
    for (var i = 0; i < overlaysButtons.length; i++) {
        overlaysButtons[i].addEventListener("click", function () {
            console.log(sessionStorage.getItem("stateSession"));
            if (sessionStorage.getItem("stateSession") != "true") {
                window.location.href = "/html/session.html";
            } else {
                //Se inserta el overlay
               // var jsonStorage = JSON.stringify(sessionStorage.getItem("userOverlays"));
                //console.log(jsonStorage);
            }
            
            
        });
    }
    
}
