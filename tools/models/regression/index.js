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

var { data } = load("./qcdt.json")
// var { data } = load("./qhdt.json")

// Convert dT to T cold
data = data.map(([dt, q, th, i]) => [th-dt, q, th, i])

// The condition for a filter by the current I
const byCurrent = ([tc, q, th, i]) => i === 2.1

// Inputs
const x = data
    //.filter(byCurrent)
    //.map(([tc, q, th, i]) => [tc, th, i])
    .map(([tc, q, th, i]) => [tc, q, i])

// Outputs
const y = data
    //.filter(byCurrent)
    .map(([tc, q, th, i]) => [th])

const mlr = new MLR(x, y)
// Standard error for Qc:
// 1.24 Watt when the I is used for ML
// 0.32 Watt when the I isn't used for the model
// 
// Standard error for Qh:
// 3.04 Watt when the I is used for ML
// 4.25 Watt when the I isn't used for the model
//
// Standard error for Th:
// 10.1 degrees C when the I is used for ML
// 3.10 degrees C when the I isn't used for the model
console.log(mlr.predict([27, 14.6, 2.1]))
console.log(mlr.predict([50, 16.1, 2.1]))
console.log(mlr.toJSON())

