function y(x) {
    return (1 / 3) * x ** 3 - 5*x + x*Math.log(x);
}

function calculate(x1, delta, epsilon) {
    while (true) {
        let x2 = x1 + delta;
        const y1 = y(x1);
        const y2 = y(x2);
        console.log("f(x1): ", y1, "f(x2): ", y2);

        let x3;
        if (y1 > y2) {
            x3 = x1 + 2 * delta;
        } else {
            x3 = x1 - delta;
        }
        console.log("x3: ", x3);

        while (true) {
            console.log("X:", x1, x2, x3);
            console.log("------------------------------");
            const y1 = y(x1);
            const y2 = y(x2);
            const y3 = y(x3);
            console.log("Y:", y1, y2, y3);

            let x_min, y_min;
            if (y1 === Math.min(y1, y2, y3)) {
                x_min = x1;
                y_min = y1;
            } else if (y2 === Math.min(y1, y2, y3)) {
                x_min = x2;
                y_min = y2;
            } else if (y3 === Math.min(y1, y2, y3)) {
                x_min = x3;
                y_min = y3;
            }

            if ((x2 - x3) * y1 + (x3 - x1) * y2 + (x1 - x2) * y3 === 0) {
                x1 = x_min;
                break;
            }

            console.log("Ymin = ", y_min, "значит Xmin = ", x_min);
            const x_new =
                0.5 *
                ((x2 ** 2 - x3 ** 2) * y1 +
                    (x3 ** 2 - x1 ** 2) * y2 +
                    (x1 ** 2 - x2 ** 2) * y3) /
                ((x2 - x3) * y1 + (x3 - x1) * y2 + (x1 - x2) * y3);
            const y_new = y(x_new);

            console.log("Полиномы");
            console.log("x с палкой: ", x_new);
            console.log("f(x с палкой): ", y_new);

            if (
                Math.abs((y_min - y_new) / y_new) < epsilon &&
                Math.abs((x_min - x_new) / x_new) < epsilon
            ) {
                return x_new;
            } else if (x1 <= x_new && x_new <= x3) {
                if (y_new < y2) {
                    if (x_new < x2) {
                        x3 = x2;
                        x2 = x_new;
                    } else {
                        x1 = x2;
                        x2 = x_new;
                    }
                } else {
                    if (x_new < x2) {
                        x1 = x_new;
                    } else {
                        x3 = x_new;
                    }
                }
            }

            else {
                x1 = x_new;
                console.log("Не выполнилось условие");
                break;
            }
        }
    }
}

console.log(calculate(1.75, 0.1, 0.0001));