/*
    This is to calculate heat transfer for PEC
*/

// Parts of the PEC
// k - thermal conductivity coefficient, W/(mK)
// a - area the heat goes through, m2
// l - length the heat goes through, m
const parts = [
    {
        name: "Shell PEEK",
        k: 0.24,
        a: Math.PI * 25e-3 * 10e-3, // Pi * D * H
        l: 50e-3
    }, {
        name: "Quartz glass",
        k: 1.35,
        a: Math.PI * Math.pow(25e-3/2, 2), // Pi * R^2
        l: 4e-3
    }, {
        exclude: true,
        name: "K-type thermocouple",
        k: 25,
        a: Math.PI * Math.pow(1e-3/2, 2),
        l: 25e-3 // passes through the sheel
    }, {
        name: "Gas fitting, brass",
        k: 100,
        a: Math.PI * Math.pow(13.157e-3/2, 2),
        l: 25e-3 // if passes through the sheel
        // l: Infinity // if isolated
    }, {
        exclude: true,
        name: "Needle, Cu",
        k: 386,
        a: Math.PI * Math.pow(1e-3/2, 2),
        l: 25e-3 // if passes through the shell
    }
].filter(part => !part.exclude)
 
// Rounds to 2 decimals
const hundreds = x => Math.round(x * 100) / 100

// Returns parts' total area, cm2
const totalArea = arr => arr
    .reduce((sum, { a }) => sum + a, 0)

// Returns part's thermal conductance
const conductance = ({ k, a, l }) => k * a / l
// Returns parts' total conductance, W/K
const totalConductance = arr => arr
    .map(conductance)
    .reduce((sum, v) => sum + v)

console.log("Parts", parts)
console.log("Total area, cm2:", hundreds(totalArea(parts) * 1e4))
console.log("Total conductance, W/K:", hundreds(totalConductance(parts)))
const dT = 33 - -45
console.log("dT, C:", dT)
console.log("Heat transfer, W:")
console.log(parts
    .map(part => [part, hundreds(dT * conductance(part))])
    .map(([{ name }, q]) => ({ name, q }))
)
console.log("Total heat transfer, W:", hundreds(dT * totalConductance(parts)))

