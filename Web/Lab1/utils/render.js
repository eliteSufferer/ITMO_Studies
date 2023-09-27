import Validator from "./Validator.js";

const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', function (e){
        e.preventDefault();
        const xVal = document.querySelector('#xValue').value;
        const yVal = document.querySelector('#yValue').value;

        const chosenCheckboxes = document.querySelectorAll("input[name='rValue']:checked");
        const rVal = Array.from(chosenCheckboxes).map(checkbox => checkbox.value);

        const validator = new Validator();
        validator.validate(xVal, yVal, rVal);
        if (validator.getResponseCode() === 1){
            drawCoordsPlane(rVal);
            if (xVal > rVal || yVal > rVal || xVal < -rVal || yVal < -rVal){
                Toastify({
                    text: "Validated, but out of plot range, the point won't be shown",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        border: "1px solid white"
                    },
                    offset: {
                        x: window.innerWidth / 2 - 150,
                        y: 0
                    },
                    position: "right",
                }).showToast();
            }
            const canvasCoords = toCanvasCoords(xVal, yVal, rVal, 350);
            drawPoint(canvasCoords.x, canvasCoords.y);
            fetch(`count_values.php?xVal=${xVal}&yVal=${yVal}&rVal=${rVal}`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with bad getaway status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(result => {
                    let responseData = JSON.parse(result);
                    addToTable(xVal, yVal, rVal, responseData.result, responseData.curr_time, responseData.exec_time);
                    saveToLocalStorage(xVal, yVal, rVal, responseData.result, responseData.curr_time, responseData.exec_time);
                })
                .catch(error => {
                    alert(`There was an error processing your request: ${error.message}`)
                })
        } else {
            Toastify({
                text: validator.getMessage(),
                className: "error",
                style: {
                    background: "linear-gradient(to right, #ff6347, #ff0000)",
                    border: "1px solid white",
                    width: "100px",
                    "text-align": "center"
                },
                offset: {
                    x: window.innerWidth / 2,
                    y: 0
                },
                position: "right",
            }).showToast();
        }

    });