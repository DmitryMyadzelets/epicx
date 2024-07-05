import model from "../model/polynomial.js"

const [{ qcdt, qhdt }] = model 

console.log("\nTest for the Polynomial Regression Model \"model/polynomial.js\"\n")

console.log("Mean Square Error (MSE):")
const mse = arr => arr
    .map(([predicted, expected]) => predicted - expected)
    .map(err => err * err)
    .reduce((sum, err) => sum + err) / arr.length

console.log("qcdt.getTc, C:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("qcdt.getTh, C:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("qcdt.getQc, W:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("qhdt.getQh, W:",
    mse(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)

console.log("qhdt.getTc, C:",
    mse(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
)


console.log("Mean Absolute Error (MAE):")
const mae = arr => arr
    .map(([predicted, expected]) => Math.abs(expected - predicted))
    .reduce((sum, err) => sum + err) / arr.length

console.log("qcdt.getTc, C:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("qcdt.getTh, C:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("qcdt.getQc, W:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("qhdt.getQh, W:",
    mae(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)

console.log("qhdt.getTc, C:",
    mae(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
)

console.log("R squared (R^2):")
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

console.log("qcdt.getTc, C:",
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("qcdt.getTh, C:",
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("qcdt.getQc, W:",
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("qhdt.getQh, W:",
    rsq(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)

console.log("qhdt.getTc, C:",
    rsq(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
)


console.log("Experimental data:")
console.log("Th -15.9, Tc -62.2, I 2.1A, Qc", qcdt.getQc(-62.2, -15.9, 2.1))
