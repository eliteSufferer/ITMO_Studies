function drawPoint(xVal, yVal){
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    const pointSize = 10;
    ctx.beginPath();
    //ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(xVal, yVal, pointSize/2, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function putDots(ctx){
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
    const radius = 4;
    ctx.beginPath();
    ctx.arc(262.5, 175, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(345, 175, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(175, 5, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(175, 87.5, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(87.5, 175, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, 175, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(175, 262.5, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(175, 345, radius, 0, Math.PI * 2);
    ctx.fill();
}
function drawCoordsPlane(r){
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = 350;
    canvas.height = 350;


    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    const quarterWidth = canvas.width / 4;
    const quarterHeight = canvas.height / 4;
    const arrowSize = 10;

    //1st quarter - square
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(halfWidth, 0, halfWidth, halfHeight);

    //3rd quarter - triangle
    ctx.beginPath();
    ctx.moveTo(0, halfHeight);
    ctx.lineTo(halfWidth, halfHeight + quarterHeight);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.closePath();
    ctx.fill();

    //4th quarter - 1/4 circle
    ctx.beginPath();
    //ctx.moveTo(halfWidth, halfHeight);
    ctx.arc(halfWidth, halfHeight, halfWidth, 0, 0.5*Math.PI);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.fill();



    //Draw axes, points and labels
    ctx.beginPath();
    putDots(ctx);
    ctx.font = "15px Arial";
    ctx.fillText('y', 150, 15);
    ctx.fillText('x', 340, 195);
    ctx.fillText(String(r/2), halfWidth+quarterWidth, halfHeight-10);
    ctx.fillText(String(r), 337, halfHeight-10);
    ctx.fillText(String(r), 190, 15);
    ctx.fillText(String(-r/2), 87.5, halfHeight-10);
    ctx.fillText(String(-r), 0, halfHeight-10);

    ctx.fillText(String(-r), 155, canvas.height);
    ctx.fillText(String(-r/2), 145, 262.5);


    // Axes
    ctx.beginPath();
    ctx.moveTo(0, halfHeight);
    ctx.lineTo(canvas.width, halfHeight);
    ctx.moveTo(halfWidth, 0);
    ctx.lineTo(halfWidth, canvas.height);

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
    ctx.stroke();

    // Стрелочки для осей
    ctx.moveTo(canvas.width - arrowSize, halfHeight - arrowSize);
    ctx.lineTo(canvas.width, halfHeight);
    ctx.lineTo(canvas.width - arrowSize, halfHeight + arrowSize);

    ctx.moveTo(halfWidth - arrowSize, arrowSize);
    ctx.lineTo(halfWidth, 0);
    ctx.lineTo(halfWidth + arrowSize, arrowSize);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();

    ctx.fillText(String(r/2), 185, 87.5);
    ctx.stroke();
}

function toCanvasCoords(x, y, r, canvasSize) {
    const scale = canvasSize / 2;
    return {
        x: scale / r * x + scale,
        y: canvasSize - (scale / r * y + scale)
    };
}