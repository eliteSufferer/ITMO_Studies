function f(x1, x2, x3){
    return x1**3 + x2**2 + 2*x3**2 -x2*x3 - x2
}

const diffs = [
    {
        diffX: (x) => 3 * x**2
    },
    {
        diffY: (y, z) => 2*y - 2*z - 1
    },
    {
        diffZ: (y, z) => 4*z - 2*y
    }
]

let x1 = 0
let x2 = 0
let x3 = 0
let step = 0.1
let e = 0.01

while (true){
    let currentF = f(x1, x2, x3)

}