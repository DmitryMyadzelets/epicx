//gitimport model from "./model/polynomial.js"
import model from "./model/linear.js"

const [{ qcdt, qhdt }] = model
// Rounds to 2 decimals
const hundreds = x => Math.round(x * 100) / 100

console.log("Helper to get some data points for the presentation of the platform\n")

var Tc, Th, dT, Qc, I = 2.1, Qh

function log() {
    console.log("Tc", hundreds(Tc), ", dT", hundreds(dT), ", Qc", hundreds(Qc), ", Qh", hundreds(Qh))
}

Th = -10

dT = 0
Tc = Th - dT
Qc = qcdt.getQc(Th - dT, Th, I)
Qh = qhdt.getQh(Th - dT, Th, I)
log()

Qc = 0
dT = Th - qcdt.getTc(Qc, Th, I)
Tc = Th - dT
Qh = qhdt.getQh(Th - dT, Th, I)
log()

Qc = 5
dT = Th - qcdt.getTc(Qc, Th, I)
Tc = Th - dT
Qh = qhdt.getQh(Th - dT, Th, I)
log()

console.log("For the Sankey diagram:")
Tc = qcdt.getTc(Qc = 1, Th = 5, I)
dT = Th - Tc
Qh = qhdt.getQh(Tc, Th, I) 
log()
Tc = qcdt.getTc(Qc = Qh / 3, Th = 40, I)
dT = Th - Tc
Qh = qhdt.getQh(Tc, Th, I)
log()
