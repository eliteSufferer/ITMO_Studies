import Validator from "./Validator.js";

const mainForm = document.querySelector('#myForm');
    mainForm.addEventListener('submit', function (e){
        e.preventDefault();
        const xVal = parseFloat(document.querySelector('#xValue').value);
        const yVal = parseFloat(document.querySelector('#yValue').value);



        const chosenCheckboxes = document.querySelectorAll("input[name='rValue']:checked");
        const rVal = Array.from(chosenCheckboxes).map(checkbox => checkbox.value);

        const validator = new Validator();
        validator.validate(xVal, yVal, rVal);
        if (validator.getResponseCode() === 1){
            drawCoordsPlane(rVal);
            if (xVal > rVal || yVal > rVal || xVal < -rVal || yVal < -rVal){
                alert('Unable to draw a point, length of the axes exceeded')
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
            alert(validator.getMessage());
        }

    });
