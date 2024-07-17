//gitimport model from "./model/polynomial.js"
import model from "./model/linear.js"

const [{ qcdt, qhdt }] = model

//console.log(qcdt.getTh(0, -60, 2.1))
//throw ""

// Config
const config = {
    ambientT: 16, // Temperature at the hottest side
    dt: 0, // Temperature rise in the interstage heat exchange
    maxModules: 1 // At one stage
}

console.log("Config:", config)

// The currents from the charts
const currents = [0.7, 1.4, 2.1]
//const currents = []
//for (let i=0.5; i<=2.1; i+=0.1) { currents.push(i) }
const stages = [] 

const initStages = () => {
    stages.length = 0
    stages.push({
        qc: 0,
        tc: -59.5,
        current: 0.7,
        modules: 1
    })
    /*
    stages.push({
        current: 1.4,
        modules: 2
    })
    */
    stages.push({
        current: 2.8,
        modules: 1
    })
}

initStages()
// Add stage names for reports
stages.forEach((stage, i) => stage.name = i+1)

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
  
// Calcuates values of the stages in forward direction
// You must set the Qc and Tc of the first stage
function forward (stages) {
    const last = stages[stages.length -1]
    // Going from cold stage (a) to hot stage (b)
    stages.sort((b, a) => {
        // Interstage parameters
        a.th = qcdt.getTh(a.qc / a.modules, a.tc, a.current)
        a.qh = qhdt.getQh(a.tc, a.th, a.current) * a.modules
        a.p = a.qh - a.qc
        a.dt = a.th - a.tc
        b.qc = a.qh
        b.tc = a.th - config.dt

        if (b == last) {
            // b.th is an enviroment temperature set by you
            // otherwise
            b.th = qcdt.getTh(b.qc / b.modules, b.tc, b.current)
            b.dt = b.th - b.tc
            b.qh = qhdt.getQh(b.tc, b.th, b.current) * b.modules
            b.p = b.qh - b.qc
        }
    })
}

// Calcuates values of the stages in backward direction
function backward (stages) {
    const first = stages[0]
    stages.sort(ignore => -1) // flip the array
    // Going from hot stage (b) to cold stage (a)
    stages.sort((a, b) => {
        b.tc = qhdt.getTc(b.qh / b.modules, b.th, b.current)
        b.qc = qcdt.getQc(b.tc, b.th, b.current) * b.modules
        a.qh = b.qc
        a.th = b.tc + config.dt
        if (a == first) {
            a.tc = qhdt.getTc(a.qh / a.modules, a.th, a.current)
            a.qc = qcdt.getQc(a.tc, a.th, a.current) * a.modules
        }
    })
    stages.sort(ignore => -1) // flip the array
}

;(() => {
    const first = stages[0]
    const last = stages[stages.length -1]

    for (forward(stages); config.ambientT < last.th; ) {
        //first.tc -= 0.001
        first.qc += 0.001
        forward(stages)
    }
})()

// Show the stages as a table for Markdown
function markdown (stages) {
    const sep = ' | '
    const title = {
        name: "Stage",
        qc: "Qc, W",
        tc: "Tc, &deg;C",
        th: "Th, &deg;C",
        dt: "&#916;T, &deg;C",
        modules: "Modules",
        current: "I, A",
        p: "P, W"
    }
    function print(arr) {
        const str = sep + arr.join(sep) + sep
        console.log(str.trim())
    }
    const keys = Object.keys(title)
    print(keys.map(key => title[key]))
    print(keys.map(ignore => "--:"))
    stages.forEach(stage => {
        const vals = keys
            .map(key => stage[key])
            .map(v => Math.round(v * 100) / 100)
        print(vals)
    })
}

//console.log(stages)
markdown(stages)
console.log("Qc/module, W:", getQcpm(stages))
console.log("P total, W:", getP(stages))

throw ""

forward(stages)
backward(stages)
console.log(stages)
console.log("Qc/module, W:", getQcpm(stages))
console.log("P total, W:", getP(stages))

throw ""

const results = []

;(() => {
    currents.forEach(arr => {
        stages.forEach((stage, i) => stage.current = arr[i])

        for (let n = 1; n <= config.maxModules; n+=1) {
            for (let m = 1; m <= config.maxModules; m+=1) {
                //for (let p = 1; p <= config.maxModules; p+=1) {
                    initStages()

                    stages[0].modules = n
                    stages[1].modules = m
                    //stages[2].modules = p
//                            stages[2].current = k

                    forward(stages)
                    backward(stages)

                    //console.log(stages.map(stage => stage.modules))

                    if (stages.some(broken)) { continue }
                    results.push(stages.map(o => Object.assign({}, o)))
                //}
            }
        }
    })
})()


;(() => {
    const report = results
        //.filter(arr => arr[0].modules == 4)
        //.filter(arr => arr[1].modules == 8)
        .filter(arr => arr.every(({ qc }) => qc > 0))
        .filter(arr => arr.every(({ qc, qh }) => qc < qh))
        .filter(arr => arr.every(({ tc, th }) => tc < th))
        .filter(arr => arr[0].tc <= -55)
        //.sort((b, a) => getQcpm(a) - getQcpm(b))
        .sort((b, a) => a[0].qc - b[0].qc)
        .filter((ignore, i) => i < 3) // Top 3

    console.log("Top stages:\n", report)
    console.log("Qc/module, W:\n", report.map(getQcpm))
    console.log("P total, W:\n", report.map(getP))
})()

