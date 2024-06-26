/*
This file is to model a Peltier element as in
https://thermal.ferrotec.com/technology/thermoelectric-reference-guide/thermalref11/
*/

// Returns Seebeck coefficient given temperatues
// Tc - Temperature of the cold side, Kelvins
// Th - Temperature of the hot side, Kelvins 
function seebeck(Tc, Th) {
    k1 = 1.33450e-2
    k2 = -5.37574e-5
    k3 = 7.42731e-7
    k4 = -1.27141e-9
    if (Th != Tc) {
        const s = T => k1*T + k2*T*T/2 + k3*T*T*T/3 + k4*T*T*T*T/4
        return (s(Th) - s(Tc)) / (Th - Tc)
    } else {
        const T = Th
        return k1 + k2*T + k3*T*T + k4*T*T*T
    }
}

// Returns resistance of Peltier given temperatures
// Tc - Temperature of the cold side, Kelvins
// Th - Temperature of the hot side, Kelvins 
function resistance(Tc, Th) {
    k1 = 2.08317
    k2 = -1.98763e-2
    k3 = 8.53832e-5
    k4 = -9.03143e-8
    if (Th != Tc) {
        const r = T => k1*T + k2*T*T/2 + k3*T*T*T/3 + k4*T*T*T*T/4
        return (r(Th) - r(Tc)) / (Th - Tc)
    } else {
        const T = Th
        return k1 + k2*T + k3*T*T + k4*T*T*T
    }
}

// Returns thermal conductance of Peltier given temperatures
// Tc - Temperature of the cold side, Kelvin
// Th - Temperature of the hot side, Kelvin 
function conductance(Tc, Th) {
    k1 = 4.76218e-1
    k2 = -3.89821e-6
    k3 = -8.74864e-6
    k4 = 2.20869e-8
    if (Th != Tc) {
        const r = T => k1*T + k2*T*T/2 + k3*T*T*T/3 + k4*T*T*T*T/4
        return (r(Th) - r(Tc)) / (Th - Tc)
    } else {
        const T = Th
        return k1 + k2*T + k3*T*T + k4*T*T*T
    }
}

// Returns interstage temperature for 2-stage Peltiers
// See https://thermal.ferrotec.com/technology/thermoelectric-reference-guide/thermalref12/
function interstageT (Tc, Th, I) {
    return (0.5 * I * I * (resistance(Tc, Th) + resistance(Tc, Th))
        + conductance(Tc, Th) * Tc
        + conductance(Tc, Th) * Th
        ) / (
        I * (seebeck(Tc, Th) - seebeck(Tc, Tc))
        + conductance(Tc, Th)
        + conductance(Tc, Th)
        )
}

let couples = 71 
const current = 2.8
const seebeckFixed = v => v * couples / 71
const resistanceFixed = v => v * (6 / 71) * (couples / current)
const conductanceFixed = v => v * couples * current / (6 * 71)

// Returns Qc given temperatures and current
// Tc - Temperature of the cold side, Kelvin
// Th - Temperature of the hot side, Kelvin 
// I - Maximum current of the Peltier, Amper
function heatPumped (Tc, Th, I) {
    return seebeck(Tc, Th) * Tc * I
        - resistance(Tc, Th) * 0.5 * I * I
        - conductance(Tc, Th) * (Th - Tc)
}

function heatPumpedFixed (Tc, Th, I) {
    return seebeckFixed(seebeck(Tc, Th) * Tc * I)
        - resistanceFixed(resistance(Tc, Th) * 0.5 * I * I)
        - conductanceFixed(conductance(Tc, Th) * (Th - Tc))
}

console.log("Seebeck coefficient, V/K:")
console.log(seebeck(273, 273))
console.log(seebeck(273, 273 + 25))
console.log(seebeck(273 + 25, 273 + 50))
console.log("Resistance, Ohm:")
console.log(resistance(273, 273))
console.log(resistance(273, 273.0001))
console.log("Thermal conductance, W/K:")
console.log(conductance(273, 273))
console.log(conductance(273, 273.0001))
console.log("Heat pumped Qc, W")
const t = (new Array(10))
    .fill(0)
    .map((ignore, i) => i * 10)

t.forEach(v => {
    console.log([v, heatPumped(273, 273 + v, 6)])
})

console.log("Search for a number of the couples:")
for (let i = 0; i < 100; i+=1) {
    console.log([couples, heatPumpedFixed(273+27-85, 273+27, 2.8)])
    couples += 1
}

