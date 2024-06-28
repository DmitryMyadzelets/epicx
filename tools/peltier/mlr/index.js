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

// Let's use 2 modules at the 1st stage in series. Then:
config.q /= 2

// The currents from the charts
const currents = [0.7, 1.4, 2.1, 2.8]

;(() => {
    console.log("Config:", config)

    // Stage 1
    var th = getTh(config.q, config.tc, config.i1)
    console.log("Th at the cell:", th)
    if (th < config.tc) {
        throw new Error("Th < Tc, the model isn't valid outside reality")
    }
    const q = getQh(config.tc, th, config.i1)
    console.log("Qh at the cell:", q)

    // Stage 2
    th -= config.dt
    console.log("Target Tc at the second stage:", th)

    // Given Qc and Tc from the 1st stage
    // Returns a number of modules s.t. the Tc is <= t
    function secondStage(q, t, th, current) {
        let modules = 0
        let tc

        do {
            modules += 1
            tc = getTc(q / modules, th, current)
            //console.log(m, "modules, Tc at the cooler:", tc)
        } while ((tc > t) && (modules < config.maxModules))
        return { modules, tc, current }
    }

    console.log("Second stage:")
    currents.forEach(current => {
        const stage2 = secondStage(q, th, config.th, current)
        // Recalculate the 1st stage backward
        const qc = getQc(config.tc, stage2.tc + config.dt, current)
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

