<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="models.ResultBean" %>
<%@ page import="models.Point" %>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html>
<html>
<head>
    <title>Results Table</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
</head>

<body>

<table class="main-table">

    <thead>
    <tr>
        <th class="header-text">
            Nazemtsev Sergei Dmitryevitch P3211 3102
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="canvas-row">
            <canvas id="canvas" class="draw">Unsupported</canvas>
        </td>
    </tr>


    <tr>
        <td>
            <form id="myForm">
                <table class="form-container">
                    <tr>
                        <td>
                            <label for="xValue">Coordinate X ((-3; 5))</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="xValue" id="xValue" class="coords-input" maxlength="10">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="yValue">Coordinate Y</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div id="yValue" style="width: 150px; margin-left: 3%">
                                <input type="button" class="y-button" value="-3">
                                <input type="button" class="y-button" value="-2">
                                <input type="button" class="y-button" value="-1">
                                <input type="button" class="y-button" value="0">
                                <input type="button" class="y-button" value="1">
                                <input type="button" class="y-button" value="2">
                                <input type="button" class="y-button" value="3">
                                <input type="button" class="y-button" value="4">
                                <input type="button" class="y-button" value="5">

                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <fieldset style="width: 185%; max-width: 200px">
                                <legend>Range R</legend>

                                <input type="checkbox" id="rValue1" name="rValue" value="1">
                                <label for="rValue1">1</label> <br>

                                <input type="checkbox" id="rValue2" name="rValue" value="1.5">
                                <label for="rValue2">1.5</label> <br>

                                <input type="checkbox" id="rValue3" name="rValue" value="2">
                                <label for="rValue3">2</label> <br>

                                <input type="checkbox" id="rValue4" name="rValue" value="2.5">
                                <label for="rValue4">2.5</label> <br>

                                <input type="checkbox" id="rValue5" name="rValue" value="3">
                                <label for="rValue5">3</label> <br>
                            </fieldset>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="button" value="Send" class="submit-btn"><br>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
    <tr>
        <% ResultBean resultBean = (ResultBean) request.getSession().getAttribute("resultBean");
            if (resultBean == null) {
        %>

        <td>
            <table id="resultsTable">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                </tr>

            </table>

        <% } else {
            DecimalFormat df = new DecimalFormat("0.########");%>
        <td>
            <table id="resultsTable">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                </tr>

                <% for (Point point : resultBean.getResults()) { %>
                <tr>
                    <td>
                        <%= df.format(point.getX())%>
                    </td>

                    <td>
                        <%= df.format(point.getY())%>
                    </td>

                    <td>
                        <%=df.format(point.getR())%>
                    </td>

                    <td>
                        <%= point.isInArea() ? "<span>In</span>" : "<span>Out</span>"%>
                    </td>
                </tr>
                <% } %>
            </table>
            <% } %>
        </td>

    </tr>

    </tbody>


</table>


<script type="module" src="scripts/render.js"></script>
<script type="text/javascript" src="scripts/drawing.js"></script>
<script type="text/javascript" src="scripts/sendRequest.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</body>
</html>

<script>

    window.onload = function () {
        drawCoordsPlane();
    }


    let yVal;

    const yButtons = document.querySelectorAll('.y-button');
    yButtons.forEach((button) => {
        button.style.border = "1px solid green";
        button.style.borderRadius = "10px";
        button.style.fontSize = "16px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "12px"
        button.addEventListener('click', function(event) {
            event.preventDefault();

            yButtons.forEach((btn) => {
                btn.style.background = null;
                btn.style.color = null;
                btn.style.padding = null;
            });

            this.style.background = "#45a049";
            this.style.color = "white";



            yVal = this.value;
        });
    });



    const checkboxes = document.querySelectorAll("input[name='rValue']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes.forEach(box => {
                    if (box !== this) {
                        box.checked = false;
                    }
                });
            }
        });
    });


    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('click', function (event){
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const chosenCheckboxes = document.querySelectorAll("input[name='rValue']:checked");
        const rVal = Array.from(chosenCheckboxes).map(checkbox => checkbox.value);


        const normalCoords = toNormalCoords(x, y, rVal, 350);

        if (rVal.length !== 0){
            sendRequest(normalCoords.x, normalCoords.y, rVal, "canvasPoint");
            //drawPoint(x, y);
        } else {
            Toastify({
                text: "You must have chosen R range",
                className: "error",
                style: {
                    background: "linear-gradient(to right, #ff6347, #ff0000)",
                    border: "1px solid white",
                    'font-size': "20px"
                },
                offset: {
                    x: 0,
                    y: 0
                },
                position: "center",
            }).showToast();
        }


    })
</script>

