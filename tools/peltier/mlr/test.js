import { getQc, getQh, getTc, getTh } from "./model.js"
// getQc uses QcdT chart
// getQh uses QhdT chart
// getTc uses QcdT chart
// getTh uses QcdT chart
import load from "./load.js"

console.log("Test for the Linear Regression Model \"model.js\"\n")

 // Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]
const qcdt = load("./qcdt.json").data.map(convert)
const qhdt = load("./qhdt.json").data.map(convert)

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

     
