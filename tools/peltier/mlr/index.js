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
    th: 9.4, // Temperature Th from the cold water
    i1: 2.1, // Constant current for the all Peltiers @ 1st stage
    i2: 2.1, // Constant current for the all Peltiers @ 2nd stage
    dt: 0, // Temperature rise in the interstage heat exchange
    q: 7.8 // Power we need to remove from the cell, W
}

// Let's use 2 modules at the 1st stage in series. Then:
config.i1 = 1.4
config.q /= 2

// The currents from the charts
const currents = [0.7, 1.4, 2.1, 2.8]

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

const getTh = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)
   
    return function (q, tc, current) {
        const data = source.filter(([tc, q, th, i]) => i == current)
        const x = data.map(([tc, q, th, i]) => [tc, q]) // Inputs
        const y = data.map(([tc, q, th, i]) => [th])  // Output
        const mlr = new MLR(x, y) // Learn
        // Debug: show error
        // console.log("Th=f(Tc,Q)", mlr.toJSON().summary.regressionStatistics)
        // Predict
        const [ th ] = mlr.predict([tc, q, current])
        return th
    }
})()

const getTc = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)

    return function (q, th, current) { 
        const data = source.filter(([tc, q, th, i]) => i == current)
        const x = data.map(([tc, q, th, i]) => [th, q]) // Inputs
        const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
        const mlr = new MLR(x, y) // Learn
        // Debug: show error
        // console.log("Tc=f(Th,Q)", mlr.toJSON().summary.regressionStatistics)
        const [ tc ] = mlr.predict([th, q, current])
        return tc
    }
})()

const getQc = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)

    return function (tc, th, current) { 
        const data = source.filter(([tc, q, th, i]) => i == current)
        const x = data.map(([tc, q, th, i]) => [tc, th]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        const mlr = new MLR(x, y) // Learn 
        // Debug: show error
        // console.log("Qc=f(Tc,Th)", mlr.toJSON().summary.regressionStatistics)
        const [ q ] = mlr.predict([tc, th])
        return q 
    }
})()

const getQh = (function () {
    // Get data from the Peltier's Qh=f(dT) chart
    const source = load("./qhdt.json").data.map(convert)

    return function (tc, th, current) {
        const data = source.filter(([tc, q, th, i]) => i == current)
        const x = data.map(([tc, q, th, i]) => [tc, th]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        const mlr = new MLR(x, y) // Learn
        // Debug: show error
        // console.log("Qh=f(dT)", mlr.toJSON().summary.regressionStatistics)
        const [ q ] = mlr.predict([tc, th, current])
        return q 
    }
})()

;(() => {
    console.log("Config:", config)

    // Stage 1
    var th = getTh(config.q, config.tc, config.i1)
    console.log("Th at the cell:", th)
    if (th < config.tc) {
        throw new Error("Th < Tc, the model isn't valid outside reality")
    }
    const q = getQh(config.tc, th, config.i1)
    console.log("Qh at the cell:", q)

    // Stage 2
    th -= config.dt
    console.log("Tc at the cooler:", th)

    console.log("Modules:")
    for (let m=1; m<10; m++) {
        const tc = getTc(q / m, config.th, config.i2)
        console.log(m, "modules, Tc at the cooler:", tc)
        if (tc < th)  { break }
    }
})()

;(() => {
    return

    console.log("Config:", config)

    for (let i = 0; i < currents.length; i++) {
        const current = currents[i];
        const q = getQc(-52.1, -51.1 + 65.8, current)
        console.log("I", current, "Qc", q) 
    }
        
})()

