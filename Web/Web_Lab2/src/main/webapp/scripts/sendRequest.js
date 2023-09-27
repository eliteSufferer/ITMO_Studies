function sendRequest(xVal, yVal, rVal, pointType){
    fetch(`controller`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            xVal: xVal,
            yVal: yVal,
            rVal: rVal
        }).toString()
    })
        .then(response => {
            if (!response.ok){
                throw new Error(`Server answered with code ${response.status} : ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            const table = document.getElementById('resultsTable');
            const row = table.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = xVal;
            cell1.className = "new-cell"
            cell2.textContent = yVal;
            cell2.className = "new-cell"
            cell3.textContent = rVal;
            cell3.className = "new-cell"
            cell4.textContent = data.result;

            if (data.result === "In"){
                cell4.className = "result-cell-in"
            } else {
                cell4.className = "result-cell-out"
            }

            const canvasCoords = toCanvasCoords(xVal, yVal, rVal, 350);
            if (pointType === "sendValue"){
                drawPoint(canvasCoords.x, canvasCoords.y, data.result === "In" ? 'green' : 'red');
            } else{
                drawPoint(canvasCoords.x, canvasCoords.y, data.result === "In" ? 'green' : 'red')
            }
        })
        .catch(error => {
            Toastify({
                text: "There was an error processing your request:" + error.message,
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
        });
}