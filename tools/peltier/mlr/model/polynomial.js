import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PolynomialRegressor } from '@rainij/polynomial-regression-js';
import load from "./load.js"

const dir = dirname(fileURLToPath(import.meta.url))

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

// Get models from the Peltier's Qc=f(dT) chart 
const qcdt = function (fname ) {
    const data = load(fname).data.map(convert)
    
    const getQc = function (degree) {
        const x = data.map(([tc, q, th, i]) => [tc, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [q]) // Outputs
        const model = new PolynomialRegressor(degree)
        model.fit(x, y) // Learn

        return function (tc, th, current) { 
            const [[ q ]] = model.predict([[tc, th, current]])
            return q 
        }
    }

    const getTc = function (degree) {
        const x = data.map(([tc, q, th, i]) => [th, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
        const model = new PolynomialRegressor(degree)
        model.fit(x, y) // Learn

        return function (q, th, current) { 
            const [[ tc ]] = model.predict([[th, q, current]])
            return tc
        }
    }

    const getTh = function (degree) {
        const x = data.map(([tc, q, th, i]) => [tc, q, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [th])  // Output
        const model = new PolynomialRegressor(degree)
        model.fit(x, y) // Learn

        return function (q, tc, current) {
            const [[ th ]] = model.predict([[tc, q, current]])
            return th
        }
    }

    return {
        getQc: getQc(2),
        getTc: getTc(2),
        getTh: getTh(2),
        data
    }
}

// Get models from the Peltier's Qh=f(dT) chart 
const qhdt = function (fname) {
    let data = load(fname).data
    //console.log(JSON.stringify(data))
    data = data.map(convert)
    //console.log(data)

    const getTc = function (degree) {
        const x = data.map(([tc, q, th, i]) => [q, th, i]) // Inputs
        const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
        const model = new PolynomialRegressor(degree)
        model.fit(x, y) // Learn

        return function (qh, th, current) {
            const [[ tc ]] = model.predict([[qh, th, current]])
            return tc 
        }
    }

    const getQh = function (degree) {
        const x = data.map(([tc, q, th, i]) => [tc, th, i])
        const y = data.map(([tc, q, th, i]) => [q])
        const model = new PolynomialRegressor(degree)
        model.fit(x, y)

        return function (tc, th, current) {
            const [[ q ]] = model.predict([[tc, th, current]])
            return q 
        }
    }

    return {
        getTc: getTc(2),
        getQh: getQh(2),
        data
    }
}

const peltier = [{
    qcdt: qcdt(join(dir, "ET-190-1010-1212/qcdt.json")),
    qhdt: qhdt(join(dir, "ET-190-1010-1212/qhdt.json"))
}]

export default peltier
