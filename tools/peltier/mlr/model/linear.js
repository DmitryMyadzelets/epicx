import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import MLR from "ml-regression-multivariate-linear"
import load from "./load.js"

const dir = dirname(fileURLToPath(import.meta.url))

// Convert dT to T cold
const convert = ([dt, q, th, i]) => [th-dt, q, th, i]

// Get models from the Peltier's Qc=f(dT) chart 
const qcdt = function (fname ) {
    const source = load(fname).data.map(convert)
    
    const getQc = function () {
        return function (tc, th, current) { 
            const data = source.filter(([tc, q, th, i]) => i == current)
            const x = data.map(([tc, q, th, i]) => [tc, th, i])
            const y = data.map(([tc, q, th, i]) => [q]) // Outputs
            const model = new MLR(x, y) // Learn

            const [ q ] = model.predict([tc, th, current])
            return q 
        }
    }

    const getTc = function () {
        return function (q, th, current) { 
            const data = source.filter(([tc, q, th, i]) => i == current)
            const x = data.map(([tc, q, th, i]) => [th, q, i]) // Inputs
            const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
            const model = new MLR(x, y) // Learn

            const [ tc ] = model.predict([th, q, current])
            return tc
        }
    }

    const getTh = function (degree) {
        return function (q, tc, current) {
            const data = source.filter(([tc, q, th, i]) => i == current)
            const x = data.map(([tc, q, th, i]) => [tc, q, i]) // Inputs
            const y = data.map(([tc, q, th, i]) => [th])  // Output
            const model = new MLR(x, y) // Learn

            const [ th ] = model.predict([tc, q, current])
            return th
        }
    }

    return {
        getQc: getQc(),
        getTc: getTc(),
        getTh: getTh(),
        data: source
    }
}

// Get models from the Peltier's Qh=f(dT) chart 
const qhdt = function (fname) {
    const source = load(fname).data.map(convert)

    const getTc = function () {
        return function (qh, th, current) {
            const data = source.filter(([tc, q, th, i]) => i == current)
            const x = data.map(([tc, q, th, i]) => [q, th, i]) // Inputs
            const y = data.map(([tc, q, th, i]) => [tc]) // Outputs
            const model = new MLR(x, y) // Learn

            const [ tc ] = model.predict([qh, th, current])
            return tc 
        }
    }

    const getQh = function () {
        return function (tc, th, current) {
            const data = source.filter(([tc, q, th, i]) => i == current)
            const x = data.map(([tc, q, th, i]) => [tc, th, i])
            const y = data.map(([tc, q, th, i]) => [q])
            const model = new MLR(x, y) // Learn

            const [ q ] = model.predict([tc, th, current])
            return q 
        }
    }

    return {
        getTc: getTc(),
        getQh: getQh(),
        data: source
    }
}

const peltier = [{
    qcdt: qcdt(join(dir, "ET-190-1010-1212/qcdt.json")),
    qhdt: qhdt(join(dir, "ET-190-1010-1212/qhdt.json"))
}]

export default peltier
