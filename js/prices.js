/*EVENTO PARA DESPLEGAR "More Info"*/
// Selecciona todos los botones "More info"
const buttons = document.querySelectorAll('.button-moreInfo');

// Agrega un event listener a cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Selecciona las características del plan correspondiente
        const features = button.parentElement.parentElement.querySelectorAll('.features');

        // Si las características están desplegadas, se ocultan
        if (features[0].style.display === 'block') {
            features.forEach(feature => {
                feature.style.display = 'none';
            });
        } else {
            // Si las características están ocultas, se muestran
            features.forEach(feature => {
                feature.style.display = 'block';
            });
        }
    });
});



