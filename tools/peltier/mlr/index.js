import { getQc, getQh, getTc, getTh } from "./model.js"

// Config
const config = {
    tc:  -60, // Temperature in the cell, Celsius
    th: 9.4, // Temperature Th from the cold water
    i1: 1.4, // Constant current for the all Peltiers @ 1st stage
    i2: 2.1, // Constant current for the all Peltiers @ 2nd stage
    dt: 0, // Temperature rise in the interstage heat exchange
    q: 7.8 // Power we need to remove from the cell, W
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
    console.log("Tc at the cooler:", th)

    console.log("Modules:")
    for (let m=1; m<10; m++) {
        const tc = getTc(q / m, config.th, config.i2)
        console.log(m, "modules, Tc at the cooler:", tc)
        if (tc < th)  { break }
    }
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

