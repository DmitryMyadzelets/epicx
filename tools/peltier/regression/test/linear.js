import model from "../model/linear.js"

const [{ qcdt, qhdt }] = model 

console.log("\nTest for the Linear Regression Model \"model/linear.js\"\n")

console.log("Mean Square Error (MSE):")
const mse = arr => arr
    .map(([predicted, y]) => predicted - y)
    .map(err => err * err)
    .reduce((sum, err) => sum + err) / arr.length

console.log("getTc, C:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    mse(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    mse(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)
console.log("Tc=f(Qh, Tc), C:",
    mse(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
)

console.log("Mean Absolute Error (MAE):")
const mae = arr => arr
    .map(([predicted, y]) => Math.abs(y - predicted))
    .reduce((sum, err) => sum + err) / arr.length

console.log("getTc, C:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    mae(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    mae(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)

console.log("Tc=f(Qh, Tc), C:",
    mae(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
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
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTc(qc, th, i), tc]))
)

console.log("getTh, C:",
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getTh(qc, tc, i), th]))
)

console.log("getQc, W:",
    rsq(qcdt.data.map(([tc, qc, th, i]) => [qcdt.getQc(tc, th, i), qc]))
)

console.log("getQh, W:",
    rsq(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getQh(tc, th, i), qh]))
)

console.log("Tc=f(Qh, Tc), C:",
    rsq(qhdt.data.map(([tc, qh, th, i]) => [qhdt.getTc(qh, th, i), tc]))
)

console.log("Experimental data:")
console.log("Th -15.9, Tc -62.2, I 2.1A, Qc (expected 3.39W)", qcdt.getQc(-62.2, -15.9, 2.1))
