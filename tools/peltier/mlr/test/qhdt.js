import model from "../model/linear.js"

// This is to check the Qq=f(dT) chart

const [{ qhdt }] = model 
const currents = [0.7, 1.4, 2.1, 2.8]
const th = -40

currents.forEach(i => {
    const delta = [0, 20, 40, 60, 80]
    delta.forEach(dt => {
        const tc = th - dt
        const qh = qhdt.getQh(tc, th, i)
        console.log([tc, th, th-tc, i, qh])
    })
})

