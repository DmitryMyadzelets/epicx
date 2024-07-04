import model from "../model/polynomial.js"

const [{ getQc, getQh, getTc, getTh, qcdt, qhdt }] = model 

console.log("\nTest for the Polynomial Regression Model \"model/polynomial.js\"\n")

console.log("Mean Square Error (MSE):")
const mse = arr => arr
    .map(([predicted, expected]) => predicted - expected)
    .map(err => err * err)
    .reduce((sum, err) => sum + err) / arr.length

console.log("getTc, C:",
    mse(qcdt.map(([tc, qc, th, i]) => [getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    mse(qcdt.map(([tc, qc, th, i]) => [getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    mse(qcdt.map(([tc, qc, th, i]) => [getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    mse(qhdt.map(([tc, qh, th, i]) => [getQh(tc, th, i), qh]))
)

console.log("Mean Absolute Error (MAE):")
const mae = arr => arr
    .map(([predicted, expected]) => Math.abs(expected - predicted))
    .reduce((sum, err) => sum + err) / arr.length

console.log("getTc, C:",
    mae(qcdt.map(([tc, qc, th, i]) => [getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    mae(qcdt.map(([tc, qc, th, i]) => [getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    mae(qcdt.map(([tc, qc, th, i]) => [getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    mae(qhdt.map(([tc, qh, th, i]) => [getQh(tc, th, i), qh]))
)

console.log("R squared:")
const rsq = arr => {
    const mean = arr
        .map(([predicted, y]) => y)
        .reduce((sum, y) => sum + y) / arr.length
    const ssr = arr
        .map(([predicted, y]) => y - predicted)
        .map(e => e * e)
        .reduce((sum, ee) => sum + ee)
    const sst = arr
        .map(([predicted, y]) => y - mean)
        .map(v => v * v)
        .reduce((sum, vv) => sum + vv)
    return 1 - ssr/sst
}

console.log("getTc, C:",
    rsq(qcdt.map(([tc, qc, th, i]) => [getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    rsq(qcdt.map(([tc, qc, th, i]) => [getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    rsq(qcdt.map(([tc, qc, th, i]) => [getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    rsq(qhdt.map(([tc, qh, th, i]) => [getQh(tc, th, i), qh]))
)

console.log("Experimental data:")
console.log("Th -15.9, Tc -62.2, I 2.1A, Qc", getQc(-62.2, -15.9, 2.1))
