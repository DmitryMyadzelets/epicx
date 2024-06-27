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

const getTh = (function () {
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
    console.log("Th=f(Tc,Q)", mlr.toJSON().summary.regressionStatistics)
    
    return function (q, tc, i) {
        // Predict
        const [ th ] = mlr.predict([tc, q, i])
        return th
    }
})()

const getTc = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const data = load("./qcdt.json").data
        .map(convert)
        .filter(byCurrent)
    // Inputs
    const x = data.map(([tc, q, th, i]) => [th, q])
    // Outputs
    const y = data.map(([tc, q, th, i]) => [tc])
    // Learn
    const mlr = new MLR(x, y)
    // Debug: show error
    console.log("Tc=f(Th,Q)", mlr.toJSON().summary.regressionStatistics)

    return function (q, th, i) { 
        // Predict
        const [ tc ] = mlr.predict([th, q, i])
        return tc
    }
})()

const getQh = (function () {
    // Get data from the Peltier's Qh=f(dT) chart
    const data = load("./qhdt.json").data
        .map(convert)
        .filter(byCurrent)
    // Inputs
    const x = data.map(([tc, q, th, i]) => [tc, th])
    // Outputs
    const y = data.map(([tc, q, th, i]) => [q])
    // Learn
    const mlr = new MLR(x, y)
    // Debug: show error
    console.log("Qh=f(dT)", mlr.toJSON().summary.regressionStatistics)

    return function (tc, th, i) {
        // Predict
        const [ q ] = mlr.predict([tc, th, i])
        return q 
    }
})()

console.log("Config:", config)
const th = getTh(config.q, config.tc, config.current)
console.log("Th at the cell:", th)
const q = getQh(config.tc, th, config.current)
console.log("Qh at the cell:", q)

console.log("Modules:")
for (let m=1; m<10; m++) {
    const tc = getTc(q / m, th, config.current)
    console.log(m, "modules, Tc at the cooler:", tc)
    if (tc < th) { break }
}

