import MLR from "ml-regression-multivariate-linear"
import fs from "fs"

// Returns an object from a JSON file
function load (fname) {
    try {
        const json = fs.readFileSync(fname, "utf8")
        return JSON.parse(json)
    } catch (e) {
        console.error(e)
    }
}

(() => {
    console.log("hey")
})()

var { data } = load("./qcdt.json")
var { data } = load("./qhdt.json")

// Convert dT to T cold
data = data.map(([dt, q, th, i]) => [th-dt, q, th, i])

// The condition for a filter by the current I
const current = 2.1
const byCurrent = ([tc, q, th, i]) => i === current 

// Inputs
const x = data
    .filter(byCurrent)
    .map(([tc, q, th, i]) => [tc, th])
    //.map(([tc, q, th, i]) => [tc, q, i])

// Outputs
const y = data
    .filter(byCurrent)
    .map(([tc, q, th, i]) => [q])

const mlr = new MLR(x, y)
// Standard error for Qc:
// 1.24 Watt when the I is used for ML
// 0.32 Watt when the I isn't used for the model
// 
// Standard error for Qh:
// 4.01 Watt when the I is used for ML
// 0.26 Watt when the I isn't used for the model
//
// Standard error for Th:
// 10.1 degrees C when the I is used for ML
// 3.10 degrees C when the I isn't used for the model
console.log(mlr.predict([27, 27, current]))
console.log(mlr.predict([50, 50, current]))
console.log(mlr.toJSON())

