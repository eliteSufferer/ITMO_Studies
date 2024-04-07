function f(x1, x2){
    return x1**4 + x2**4 - 4*x1*x2
}

const gradient = [
    {
        diffX: (x, y) => 4*x**3 - 4*y,
        diffY: (x, y) => 4*y**3 - 4*x,
    }
]

function halfDivision(f, a, b, e) {
    let oldA = a;
    let oldB = b;

    let i = 0;

    while (true) {
        let x1 = (oldA + oldB - e) / 2;
        let x2 = (oldA + oldB + e) / 2;

        let y1 = f(x1);
        let y2 = f(x2);

        if (y1 > y2) {
            oldA = x1;
        } else {
            oldB = x2;
        }

        i++;

        if (oldB - oldA <= 2*e) {
            return (oldA + oldB) / 2;
        }
    }
}

function findMinValueGradient(x, y, step, e) {

    let x1 = x
    let x2 = y

    let iter = 0


    while (iter < 100) {
        let dx1 = gradient[0].diffX(x1, x2)
        let dx2 = gradient[0].diffY(x1, x2)

        let x1New = x1 - step * dx1
        let x2New = x2 - step * dx2

        console.log(x1New, x2New)
        let newFValue = f(x1New, x2New)
        let currFValue = f(x1, x2)

        if (newFValue >= currFValue){
            step /= 2
        }

        if (Math.abs(newFValue - currFValue) < e) return [x1New, x2New]

        x1 = x1New
        x2 = x2New

        iter++

    }

    return [x1, x2]

}

function gradientModule(x1, x2){
    let dx1 = gradient[0].diffX(x1, x2);
    let dx2 = gradient[0].diffY(x1, x2);

    return (dx1 ** 2 + dx2 ** 2) ** 0.5
}

function fastestDescent(x, y, e) {
    let x1 = x;
    let x2 = y;

    let iter = 0;

    while (iter < 100) {
        if (gradientModule(x1, x2) <= e) break

        let dx1 = gradient[0].diffX(x1, x2);
        let dx2 = gradient[0].diffY(x1, x2);


        let func = t => f(x1 - t*dx1, x2 - t*dx2);
        let [a, b] = [0, 5];
        let h = halfDivision(func, a, b, e);


        [x1, x2] = [x1 - h*dx1, x2 - h*dx2];


        iter++;
    }

    return [x1, x2];
}

let step = 0.1

const minimumPointGD = findMinValueGradient(0, 1, step, 0.001)
const minimumPointFD = fastestDescent(0, 1, 0.001)

console.log(`Точка минимума (ГС): (${minimumPointGD[0]}, ${minimumPointGD[1]})`)
console.log(`Точка минимума (НС): (${minimumPointFD[0]}, ${minimumPointFD[1]})`)
