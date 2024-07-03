import { PolynomialRegressor } from '@rainij/polynomial-regression-js';
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

const degree = 2
const model = new PolynomialRegressor(degree)

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

const getTh = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)

    return function (q, tc, current) {
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [th])  // Output
        model.fit(x, y) // Learn
        const [[ th ]] = model.predict([[tc, q, current]])
        return th
    }
})()

const getTc = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)

    return function (q, th, current) { 
        const data = source
        const x = data.map(([tc, q, th, i]) => [th, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
        model.fit(x, y) // Learn
        const [[ tc ]] = model.predict([[th, q, current]])
        return tc
    }
})()

const getQc = (function () {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load("./qcdt.json").data.map(convert)

    return function (tc, th, current) { 
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        model.fit(x, y) // Learn
        const [[ q ]] = model.predict([[tc, th, current]])
        return q 
    }
})()

const getQh = (function () {
    // Get data from the Peltier's Qh=f(dT) chart
    const source = load("./qhdt.json").data.map(convert)

    return function (tc, th, current) {
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        model.fit(x, y) // Learn
        const [[ q ]] = model.predict([[tc, th, current]])
        return q 
    }
})()

export { getQc, getQh, getTc, getTh }

