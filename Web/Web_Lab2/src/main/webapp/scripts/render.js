import Validator from "./Validator.js";
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function (e){
    e.preventDefault();
    const xVal = document.querySelector('#xValue').value;

    const chosenCheckboxes = document.querySelectorAll("input[name='rValue']:checked");
    const rVal = Array.from(chosenCheckboxes).map(checkbox => checkbox.value);

    const validator = new Validator();
    validator.validate(xVal, yVal, rVal);
    if (validator.getResponseCode() === 1){
        //const canvasCoords = toCanvasCoords(xVal, yVal, rVal, 350);


        //drawPoint(canvasCoords.x, canvasCoords.y);
        sendRequest(xVal, yVal, rVal, "sendValue");
            } else {
        Toastify({
            text: validator.getMessage(),
            className: "error",
            style: {
                background: "linear-gradient(to right, #ff6347, #ff0000)",
                border: "1px solid white"
            },
            offset: {
                x: window.innerWidth / 2 - 75,
                y: 0
            },
            position: "right",
        }).showToast();
            }

})
