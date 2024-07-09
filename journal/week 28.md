## Week 28 - CO2 needs Power 
### What's required
Let's calculate the amount of energy we need to operate with CO2.

Parameters of CO2:
* Density of gas: 44.9 mol/m3 - [source](https://www.engineeringtoolbox.com/CO2-carbon-dioxide-properties-d_2017.html)
* Density of liquid: 25017 mol/m3 - [source](https://www.engineeringtoolbox.com/CO2-carbon-dioxide-properties-d_2017.html)
* Liquefaction heat: 16.4 kJ/mol - [source](https://www.researchgate.net/publication/349366110_Kerogen_nanoscale_structure_and_CO2_adsorption_in_shale_micropores) - Confirmation required!
* Specific heat capacity (isobaric): 37.35 J/mol K - [source](https://www.engineeringtoolbox.com/CO2-carbon-dioxide-properties-d_2017.html)

Energy, required to change temperature of 1 ml of CO2 from 25 &deg;C to -40 &deg;C:
```
25017 * 37.35 * (25 + 40) / 1e6 = 0.735 kJ/ml = 0.204 Wh/ml
```

Energy, required to liquefy 1 ml of CO2:
```
25017 * 16.4 / 1e6 = 0.410279 kJ/ml = 0.114 Wh/ml
```

Total energy, required to cool down and liqufiy 1 ml of CO2:
```
0.204 + 0.114 = 0.318 Wh/ml
```

### What Peltier cell cooler provides 
Parameters of the cell cooler based on 2-stage configuration with PE-16 modules, and usage of tap water:
| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 8 | -50 | -30.17 | 4 | 0.7 | 7.94 |
| 2 | 15.94 | -30.17 | 32.5 | 4 | 2.1 | 101.69 |

Assuming the cell has no heat loss, it would require ~3 minutes to liqufy 1 ml of CO2.


<img alt="Some cell cooler variants" src="/img/2024-07-09 - Cells.png">
