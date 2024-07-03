import { getQc, getQh, getTc, getTh } from "./model.poly.js"

// Config
const config = {
    dt: 0, // Temperature rise in the interstage heat exchange
    maxModules: 12 
}

// The currents from the charts
const currents = [0.7, 1.4, 2.1]
const stages = [] 

const initStages = () => {
    stages.length = 0
    stages.push({
        qc: 0,
        tc: -60,
        current: 1.4,
        modules: 4
    })
    stages.push({
        th: 9.4,
        current: 2.1,
        modules: 8
    })
}

initStages()

// Helper to check if the object is "broken" wrt its numerical values
function broken (o) {
    const values = Object.values(o)
    return values.some(isNaN) || !values.every(isFinite)
}


// Solves thermal balance for the stages
function balance () {
    // Use .sort to access two stages at once
    // Going from cold stage (a) to hot stage (b)
    stages.sort((b, a) => {
        a.th = getTh(a.qc / a.modules, a.tc, a.current)
        a.qh = getQh(a.tc, a.th, a.current) * a.modules
        b.qc = a.qh
        b.tc = a.th -= config.dt
    })
    .sort(ignore => -1) // flip the array
    // Going backward from hot stage (b) go cold stage (a)
    .sort((a, b) => {
        b.tc = getTc(b.qc / b.modules, b.th, b.current)
        b.qh = getQh(b.tc, b.th, b.current) * b.modules
        a.th = b.tc + config.dt
        a.qc = getQc(a.tc, a.th, a.current) * a.modules
        a.qh = getQh(a.tc, a.th, a.current) * a.modules
      })
    .sort(ignore => -1) // flip the array
}

console.log(stages)
balance()
console.log(stages)

const results = []

;(() => {
    currents.forEach(i => {
        currents.forEach(j => {
            for (let n = 1; n <= config.maxModules; n++) {
                for (let m = 1; m <= config.maxModules - n; m++) {
                    initStages()
                    stages[0].modules = n
                    stages[1].modules = m
                    stages[0].current = i
                    stages[1].current = j
                    balance()
                    if (stages.some(broken)) { continue }
                    results.push(stages.map(o => Object.assign({}, o)))
                }
            }
        })
    })
})()

;(() => {
    // Reductor, returns number of modules on all stages
    const modules = (sum, { modules }) => sum + modules // reductor
    const qm = stages => stages[0].qc / stages.reduce(modules, 0) 
    // Returns total electrical power
    const power = (sum, { qc, qh }) => sum + qh - qc
    const pw = stages => stages.reduce(power, 0)
    
    const report = results
        //.filter(arr => arr[0].modules == 4)
        //.filter(arr => arr[1].modules == 8)
        .filter(arr => arr.every(({ qc }) => qc > 0))
        .filter(arr => arr.every(({ qc, qh }) => qc < qh))
        .filter(arr => arr.every(({ tc, th }) => tc < th))
        .sort((b, a) => qm(a) - qm(b))
        .filter((ignore, i) => i < 3) // Top 3

    console.log("Top stages:\n", report)
    console.log("Top Qc/modules:\n", report.map(qm))
    console.log("P total:\n", report.map(pw))
})()

