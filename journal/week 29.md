## Week 29 - Testing 2-stage cooling
This is the **first experiment** with 2-stage Peltier cooling. 

Limitations:
* In the wacuum camera we have only 4 electrical contacts apart from the integrated thermocouple. The contacts are used to power two Peltier modules. We can monitor only one temperature T cold.
* We have only one power supply with a current source, we use it to power one stage. Another stage is powered from a PC power supply 12V (12.38V with no load).
* The temperature of the chiller is set to 4 &deg;C. It manages to cool the water only down to 10 &deg;C.
* We use the numerical models with fixed currents. The actual current from the PC supply was 2.3A, not 2.1 as shows the model for the 2nd stage.

<img alt="Two Peltier modules in stack" src="/img/20240716_143453.jpg" width=400px>

The results of the experiment are in the table below. Measured values are in bold, other values are calculated. 

| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | &#916;T, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: | --: |
| 1 | 1.93 | **-59.5** | -41.86 | 17.64 | 1 | **0.7** | 1.74 |
| 2 | 3.67 | -41.86 | **16** | 57.85 | 1 | 2.1 | 23.25 |

The Qc=1.93 W consists from the both a model's error and a heat loss due to heat radiaton and heat transfer via the thermocouple and the plastic screws. 

Let's assume Qc=1.93 W be constant. Than, if we need Tc=&minus;40 &deg;C the Qc would be 3.58 W according to the model, as shown in the table below. 
| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | &#916;T, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: | --: |
| 1 | 3.58 | -40 | -32.07 | 7.93 | 1 | 0.7 | 1.78 |
| 2 | 5.36 | -32.07 | 16 | 48.06 | 1 | 2.1 | 22.92 |

Thus the usefull Qc = 3.58 &minus; 1.93 = 1.65 W (6.6 W for a PEC with 4 two-stage stacks). 

