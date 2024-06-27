/*
This file is to check if the mathematical model from the article is valid.
Article: "Belovski, Staneva et - Mathematical Model of Thermoelectric Peltier Module - 2017"
*/

// Returns Quality Factor, 1/Kelvin
// dt_max - delta T max from the specification
// th - T hot
function quality (dt_max, th) {
    return 2 * dt_max / ((th - dt_max) * (th - dt_max))
}

// Returns Thermal Power, Volt/Kelvin
// u_max - Maximum voltage from the specification
function seebeck (u_max, th) {
    return u_max / th
}

// Returns Therma Conductivity
function conductivity (dt_max, u_max, i_max, th) {
    return ((th - dt_max) * u_max * i_max) / (2 * dt_max * th)
}

function resistivity (dt_max, u_max, i_max, th) {
    return ((th - dt_max) * u_max) / (i_max * th)
}

function heatPumped (a, k, r, i, tc, th) {
    return a * i * tc - 0.5 * i * i * r - k * (th - tc)
}


const dt = 273.15 + 85
const th = 273.15 + 27
const z = quality(dt, th)
const s = seebeck(16.4, th)
const k = conductivity(dt, 15.7, 2.8, th)
const r = resistivity(dt, 15.7, 2.8, th)

console.log({s, r, k})

const currents = [0.7, 1.4, 2.1, 2.8]

currents.forEach(i => {
    qc = heatPumped(s, k, r, i, th, th)
    console.log([i, qc])
})
