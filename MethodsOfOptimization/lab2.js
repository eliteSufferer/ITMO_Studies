let a = 1.5;
let b = 2;
const e = 0.02;

function f(x) {
    return (1 / 3) * Math.pow(x, 3) - 5 * x + x*Math.log(x);
}

function diff(x){
    return x**2 - 4 + Math.log(x)
}

function halfDivision(a, b, e) {
    let oldA = a
    let oldB = b

    let i = 0

    while (true){
        let x1 = (oldA + oldB - e) / 2
        let x2 = (oldA + oldB + e) / 2

        let y1 = f(x1)
        let y2 = f(x2)

        if (y1 > y2){
            oldA = x1
        } else {
            oldB = x2
        }

        i++

        console.log(`step ${i}: x1 = ${x1} x2 = ${x2} y1 = ${y1} y2 = ${y2}`)

        console.log(oldA, oldB)
        if (oldB - oldA <= 2*e){
            return (oldA + oldB) / 2
        }
    }
}

function goldenRatio(a, b, e) {
    let oldA = a;
    let oldB = b;

    let x1 = oldA + 0.382 * (oldB - oldA);
    let x2 = oldA + 0.618 * (oldB - oldA);

    let y1 = f(x1);
    let y2 = f(x2);

    let i = 0

    console.log(`step ${i}: x2 = ${x2} x1 = ${x1} y1 = ${y1} y2 = ${y2}`)

    while (true) {
        i++
        if (y1 < y2) {
            oldB = x2;
            x2 = x1;
            y2 = y1;
            x1 = oldA + 0.382 * (oldB - oldA);
            y1 = f(x1);

            console.log(`step ${i}: b = x2 = ${oldB} x2 = x1 = ${x2} x1 = ${x1} y1 = ${y1} y2 = ${y2}`)
        } else {
            oldA = x1;
            x1 = x2;
            y1 = y2;
            x2 = oldA + 0.618 * (oldB - oldA);
            y2 = f(x2);

            console.log(`step ${i}: a = x1 = ${oldA} x1 = x2 = ${x1} x2 = ${x2} y1 = ${y1} y2 = ${y2}`)
        }
        if (Math.abs(oldB - oldA) < e) {
            return (oldA + oldB) / 2;
        }
    }
}


function chordMethod(a, b, e) {
    let oldA = a;
    let oldB = b;

    let i = 0

    while (true) {
        i++
        const x_tilda = oldA - (diff(oldA) / (diff(oldA) - diff(oldB))) * (oldA - oldB);
        const diff_tilda = diff(x_tilda);

        console.log(`step ${i}: x_t = (${diff(oldA)}) / (${diff(oldA)}) - (${diff(oldB)}) * (${oldA} - ${oldB}) = ${x_tilda} diff_xt = ${diff_tilda}`)

        if (Math.abs(diff_tilda) <= e) {
            return x_tilda;
        }


        if (diff_tilda < 0) {
            oldA = x_tilda;
            console.log(`a = ${oldA}`)
        } else {
            oldB = x_tilda;
            console.log(`b = ${oldB}`)

        }
    }
}

function secondDiff(x) {
    return (2 * x**2 + 1) / x
}

function newtonMethod(a, b, e, x0) {
    if (x0 >= a && x0 <= b) {
        let i = 0
        while (true) {
            i++
            if (Math.abs(diff(x0)) <= e) {
                return x0;
            }
            console.log(x0)
            console.log(`diff = ${diff(x0)} second_diff = ${secondDiff(x0)}`)
            x0 -= diff(x0) / secondDiff(x0);

            console.log(x0)
        }
    } else {
        return "Введите значение x0 строго из промежутка";
    }
}


console.log("Метод половинного деления\nМинимум функции:", halfDivision(a, b, e));
console.log()
console.log("Метод золотого сечения\nМинимум функции:", goldenRatio(a, b, e));
console.log()
console.log("Метод хорд\nМинимум функции:", chordMethod(a, b, e));
console.log()
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question("Введите x0 из диапазона [1.5, 2]: ", x0 => {
    console.log("Метод Ньютона\nМинимум функции:", newtonMethod(a, b, e, parseFloat(x0)));
    readline.close();
});
