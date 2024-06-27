import MLR from "ml-regression-multivariate-linear"
import fs from "fs"

// Returns an object from a JSON file
function load (fname) {
    try {
        const json = fs.readFileSync(fname, "utf8")
        return JSON.parse(json)
    } catch (e) {
        console.error(e)
    }
}

// Config
const config = {
    tc:  -60, // Temperature in the cell, Celsius
    current: 2.1, // Constant current for the all Peltiers, A
    q: 5 // Power we need to remove from the cell, W
}

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]
// The condition for a filter by the current I
const byCurrent = ([tc, q, th, i]) => i === config.current 

// Returns Th for the Peltier attached to the cell
function getTh () {
    // Get data from the Peltier's Qc=f(dT) chart
    const data = load("./qcdt.json").data
        .map(convert)
        .filter(byCurrent)

    // Inputs
    const x = data.map(([tc, q, th, i]) => [tc, q])
    // Outputs
    const y = data.map(([tc, q, th, i]) => [th])
    // Learn
    const mlr = new MLR(x, y)
    // Debug: show error
    console.log(mlr.toJSON().summary.regressionStatistics)

    // Predict
    const [ th ] = mlr.predict([config.tc, config.q, config.current])
    return th
}

console.log("Config:", config)
console.log("Th at the cell:", getTh())

function getQh () {
    // Get data from the Peltier's Qh=f(dT) chart
    const data = load("./qhdt.json").data
        .map(convert)
        .filter(byCurrent)
}

/*
// Get data from the Peltier's charts
var { data } = load("./qcdt.json") // Qc=f(dT) chart
var { data } = load("./qhdt.json") // Qh=f(dT) chart

// Inputs
const x = data
    .filter(byCurrent)
    .map(([tc, q, th, i]) => [tc, th])
    //.map(([tc, q, th, i]) => [tc, q, i])

// Outputs
const y = data
    .filter(byCurrent)
    .map(([tc, q, th, i]) => [q])

const mlr = new MLR(x, y)
// Standard error for Qc:
// 1.24 Watt when the I is used for ML
// 0.32 Watt when the I isn't used for the model
// 
// Standard error for Qh:
// 4.01 Watt when the I is used for ML
// 0.26 Watt when the I isn't used for the model
//
// Standard error for Th:
// 10.1 degrees C when the I is used for ML
// 3.10 degrees C when the I isn't used for the model
console.log(mlr.predict([27, 27, current]))
console.log(mlr.predict([50, 50, current]))
//console.log(mlr.toJSON())
*/
