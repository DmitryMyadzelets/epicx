import MLR from "ml-regression-multivariate-linear"
import load from "./load.js"

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

const getTh = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./model/qcdt.json").data.map(convert)
   
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
    const source = load("./model/qcdt.json").data.map(convert)

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
    const source = load("./model/qcdt.json").data.map(convert)

    return function (tc, th, current) { 
        const data = source.filter(([tc, q, th, i]) => i == current)
        const x = data.map(([tc, q, th, i]) => [tc, th]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        const mlr = new MLR(x, y) // Learn 
        // Debug: show error
        // console.log("Qc=f(Tc,Th)", mlr.toJSON().summary.regressionStatistics)
        const [ q ] = mlr.predict([tc, th, current])
        return q 
    }
})()

const getQh = (function () {
    // Get data from the Peltier's Qh=f(dT) chart
    const source = load("./model/qhdt.json").data.map(convert)

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

export { getQc, getQh, getTc, getTh }

