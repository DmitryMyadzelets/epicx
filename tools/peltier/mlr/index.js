import model from "./model/polynomial.js"

const [{ qcdt, qhdt }] = model

// Config
const config = {
    dt: 0, // Temperature rise in the interstage heat exchange
    maxModules: 12 
}

// The currents from the charts
//const currents = [0.7, 1.4, 2.1]
const currents = []
for (let i=0.7; i<=2.1; i+=0.5) { currents.push(i) }
const stages = [] 

const initStages = () => {
    stages.length = 0
    stages.push({
        qc: 0,
        tc: -60,
        current: 0.7,
        modules: 1
    })
    stages.push({
        current: 1.4,
        modules: 3
    })
    stages.push({
        th: 4.9,
        current: 2.1,
        modules: 9
    })
}

initStages()

// Helper to check if the object is "broken" wrt its numerical values
function broken (o) {
    const values = Object.values(o)
    return values.some(isNaN) || !values.every(isFinite)
}
 
// Reductor, returns number of modules on all stages
const modules = (sum, { modules }) => sum + modules // reductor
// Retuns Qc per module for all the stages
const getQcpm = stages => stages[0].qc / stages.reduce(modules, 0) 
// Returns total electrical power
const power = (sum, { qc, qh }) => sum + qh - qc
const getP = stages => stages.reduce(power, 0)
  
// Solves thermal balance for the stages
function balance () {
    // Use .sort to access two stages at once
    const first = stages[0]
    const last = stages[stages.length -1]
    // Going from cold stage (a) to hot stage (b)
    stages.sort((b, a) => {
        // Interstage parameters
        a.th = qcdt.getTh(a.qc / a.modules, a.tc, a.current)
        a.qh = qhdt.getQh(a.tc, a.th, a.current) * a.modules
        b.qc = a.qh
        b.tc = a.th - config.dt
        if (b == last) {
            // b.th is an enviroment temperature set by you
            // otherwise
            b.th = qcdt.getTh(b.qc / b.modules, b.tc, b.current)
            b.qh = qhdt.getQh(b.tc, b.th, b.current) * b.modules
        }
    })
    console.log("forward", stages)
    stages
    .sort(ignore => -1) // flip the array
    // Going backward from hot stage (b) to cold stage (a)
    .sort((a, b) => {
        // Interstage parameters
        b.tc = qhdt.getTc(b.qh / b.modules, b.th, b.current)
        b.qc = qcdt.getQc(b.tc, b.th, b.current)
        a.qh = b.qc
        a.th = b.tc + config.dt
        if (a == first) {
            a.tc = qhdt.getTc(a.qh / a.modules, a.th, a.current)
            a.qc = qcdt.getQc(a.tc, a.th, a.current) * a.modules
        }
      })
    .sort(ignore => -1) // flip the array
}

console.log(stages)
balance()
console.log(stages)
console.log("Qc/module, W:", getQcpm(stages))
console.log("P total, W:", getP(stages))
throw ":)"

const results = []

;(() => {
    currents.forEach(i => {
        currents.forEach(j => {
            currents.forEach(k => {
                for (let n = 1; n <= config.maxModules; n++) {
                    for (let m = 1; m <= config.maxModules - n; m++) {
                        for (let p = 1; p <= config.maxModules - m; p++) {
                            initStages()
                            stages[0].modules = n
                            stages[1].modules = m
                            stages[2].modules = p
                            stages[0].current = i
                            stages[1].current = j
                            stages[2].current = k
                            balance()
                            if (stages.some(broken)) { continue }
                            results.push(stages.map(o => Object.assign({}, o)))
                        }
                    }
                }
            })
        })
    })
})()

;(() => {
    const report = results
        //.filter(arr => arr[0].modules == 4)
        //.filter(arr => arr[1].modules == 8)
        .filter(arr => arr.every(({ qc }) => qc > 0))
        .filter(arr => arr.every(({ qc, qh }) => qc < qh))
        .filter(arr => arr.every(({ tc, th }) => tc < th))
        //.sort((b, a) => getQcpm(a) - getQcpm(b))
        .sort((b, a) => a[0].qc - b[0].qc)
        .filter((ignore, i) => i < 3) // Top 3

    console.log("Top stages:\n", report)
    console.log("Qc/module, W:\n", report.map(getQcpm))
    console.log("P total, W:\n", report.map(getP))
})()

