## Week 29 - 2-step cooling
This is the **first experiment** with 2-step Peltier cooling. 

Limitations:
* In the wacuum camera we have only 4 electrical contacts apart from the integrated thermocouple. The contacts are used to power two Peltier modules. We can monitor only one temperature T cold.
* We have only one power supply with a current source, we use it to power one stage. Another stage is powered from a PC power supply 12V (12.38V with no load).
* The temperature of the chiller is set to 4 &deg;C. It manages to cool the water only down to 10 &deg;C.
* We use the numerical models with fixed currents. The actual current from the PC supply was 2.3A, not 2.1 as shows the model for the 2nd stage.

<img alt="Two Peltier modules in stack" src="/img/20240716_143453.jpg">

The results of the experiment are in the table below. Measured values are in bold, other values are calculated. 

| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 2.02 | **-58.5** | -41.36 | 1 | **0.7** | 1.74 |
| 2 | 3.76 | -41.36 | **16** | 1 | 2.1 | 23.24 |

Let's assume the Qc=2.02 W is a heat loss we can't avoid. Than with &minus;40 &deg;C...

| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 3.58 | -40 | -32.07 | 1 | 0.7 | 1.78 |
| 2 | 5.36 | -32.07 | 15.99 | 1 | 2.1 | 22.92 |
