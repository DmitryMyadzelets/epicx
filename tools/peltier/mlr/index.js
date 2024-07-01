import { getQc, getQh, getTc, getTh } from "./model.js"

// Config
const config = {
    tc:  -60, // Temperature in the cell, Celsius
    th: 9.4, // Temperature Th from the cold water
    i1: 1.4, // Constant current for the all Peltiers @ 1st stage
    i2: 2.1, // Constant current for the all Peltiers @ 2nd stage
    dt: 0, // Temperature rise in the interstage heat exchange
    q: 7.8, // Power we need to remove from the cell, W
    maxModules: 10 // Maximum amount of modules we can afford
}

const stages = [{
    qc: 7.8/2,
    tc: -60,
    current: 1.4,
    modules: 1
}, {
    th: 9.4,
    current: 2.1,
    modules: 2
}]

// Let's use 2 modules at the 1st stage in series. Then:
config.q /= 2

// The currents from the charts
const currents = [0.7, 1.4, 2.1, 2.8]
//const currents = [2.1]

;(() => {
    return
    // Use .sort to access two stages
    // Going from cold stage (a) to hot stage (b)
    stages.sort((b, a) => {
        a.th = getTh(a.qc / a.modules, a.tc, a.current)
        a.qh = getQh(a.tc, a.th, a.current) * a.modules
        b.qc = a.qh
        b.tc = a.th -= config.dt
    })
    console.log(stages)

    stages
    .sort(ignore => -1) // flip the array
    // Going backward from hot stage (b) go cold stage (a)
    .sort((a, b) => {
        b.tc = getTc(b.qc / b.modules, b.th, b.current)
        //console.log("A>>", b.qc, b.modules, b.current, b.tc)
        b.qh = getQh(b.tc, b.th, b.current) * b.modules
        a.th = b.tc + config.dt
        a.qc = getQc(a.tc, a.th, a.current) * a.modules
    })
    .sort(ignore => -1) // flip the array

    console.log(stages)
})()

;(() => {
    console.log("Config:", config)

    // Stage 1
    function firstStage(qc, tc, current) {
        const th = getTh(qc, tc, current)
        const qh = getQh(tc, th, current)
        return { th, qh }
    }

    console.log("Stage 1:")
    const stage1 = firstStage(config.q, config.tc, config.i1)
    console.log(stage1)
    /*if (th < config.tc) {
        throw new Error("Th < Tc, the model isn't valid outside reality")
    }*/

    // Stage 2

    // Given Qc and Tc from the 1st stage
    // Returns a number of modules s.t. the Tc is <= t
    function secondStage(qc, t, th, current) {
        let modules = 0
        let tc

        do {
            modules += 1
            tc = getTc(qc / modules, th, current)
            //console.log("B>>", qc, modules, current, tc)
            //console.log(m, "modules, Tc at the cooler:", tc)
        } while ((tc > t) && (modules < config.maxModules))
        return { modules, tc, current }
    }

    console.log("Stage 2, iterative:")
    currents.forEach(current => {
        const q = stage1.qh
        const t = stage1.th -= config.dt
        const stage2 = secondStage(q, t, config.th, current)
        // Recalculate the 1st stage backward
        const qc = getQc(config.tc, stage2.tc + config.dt, config.i1)
        console.log(stage2, "Qc", qc)
    })
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

