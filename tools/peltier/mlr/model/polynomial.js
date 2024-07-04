import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PolynomialRegressor } from '@rainij/polynomial-regression-js';
import load from "./load.js"

const dir = dirname(fileURLToPath(import.meta.url))

const degree = 2
const model = new PolynomialRegressor(degree)

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

const getTh = function (fname) {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load(fname).data.map(convert)

    return function (q, tc, current) {
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [th])  // Output
        model.fit(x, y) // Learn
        const [[ th ]] = model.predict([[tc, q, current]])
        return th
    }
}

const getTc = function (fname) {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load(fname).data.map(convert)

    return function (q, th, current) { 
        const data = source
        const x = data.map(([tc, q, th, i]) => [th, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
        model.fit(x, y) // Learn
        const [[ tc ]] = model.predict([[th, q, current]])
        return tc
    }
}

const getQc = function (fname) {
    // Get data from the Peltier's Qc=f(dT) chart
    const source = load(fname).data.map(convert)

    return function (tc, th, current) { 
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        model.fit(x, y) // Learn
        const [[ q ]] = model.predict([[tc, th, current]])
        return q 
    }
}

const getQh = function (fname) {
    // Get data from the Peltier's Qh=f(dT) chart
    const source = load(fname).data.map(convert)

    return function (tc, th, current) {
        const data = source
        const x = data.map(([tc, q, th, i]) => [tc, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        model.fit(x, y) // Learn
        const [[ q ]] = model.predict([[tc, th, current]])
        return q 
    }
}

const peltier = [{
    getQc: getQc(join(dir, "ET-190-1010-1212/qcdt.json")),
    getQh: getQh(join(dir, "ET-190-1010-1212/qhdt.json")),
    getTc: getTc(join(dir, "ET-190-1010-1212/qcdt.json")),
    getTh: getTh(join(dir, "ET-190-1010-1212/qcdt.json")),
    qcdt: load(join(dir, "ET-190-1010-1212/qcdt.json")).data.map(convert),
    qhdt: load(join(dir, "ET-190-1010-1212/qhdt.json")).data.map(convert)
}]

export default peltier
