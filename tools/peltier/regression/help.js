//gitimport model from "./model/polynomial.js"
import model from "./model/linear.js"

const [{ qcdt, qhdt }] = model
// Rounds to 2 decimals
const hundreds = x => Math.round(x * 100) / 100

console.log("Helper to get some data points for the presentation of the platform\n")

var Th, dT, Qc, I = 2.1

function log() {
    console.log("dT", hundreds(dT), ", Qc", hundreds(Qc))
}

Th = -10

dT = 0
Qc = qcdt.getQc(Th - dT, Th, I)
log()

Qc = 0
dT = Th - qcdt.getTc(Qc, Th, I)
log()

Qc = 5
dT = Th - qcdt.getTc(Qc, Th, I)
log()
