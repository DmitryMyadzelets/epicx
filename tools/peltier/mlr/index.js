import { getQc, getQh, getTc, getTh } from "./model.js"

// Config
const config = {
    dt: 0, // Temperature rise in the interstage heat exchange
    maxModules: 10 // Maximum amount of modules we can afford
}

// The currents from the charts
const currents = [0.7, 1.4, 2.1, 2.8]

const stages = [{
    qc: 0,
    tc: -60,
    current: 1.4,
    modules: 2
}, {
    th: 9.4,
    current: 2.1,
    modules: 4
}]

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

balance()
console.log(stages)
