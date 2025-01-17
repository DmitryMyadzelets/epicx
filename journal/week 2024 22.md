## Week 22 - Compare Peltier in air, vacuum, with CPU cooler
### Risistance of Peltiers
Resistance of Peltier elements has to be measured at about 1kHz, to avoid thermoelectric effect. No LCR meter was found around, so we use a sine signal generator, amplifier and a voltage divider with a general purpose multimeter.

AC resistance of a PE-16 is caculated as: $Rp = (Ua \cdot R / Ur) - 1$, 
where:
- Ua - Amplifier output voltage
- Ur - Bridge resistor voltage
- Rp - AC resistance of the Peltier module
- R - Resistance of the voltage divider

One measurements for a PE-16:
| Ua, mV | Ur, mV | Rp, Om |
| --- | --- | --- |
| 128.4 | 85.2 | 14.4 |

The AC resistance of all the PE-16 modules is about 14 Om, the PE-51 is about 13 Om. Note that the PN pellets of Peltier modules are connected in series, the **entire module fails** if only one pellet is dammaged.

### Experiment - PE-16 in air, fixed V
The PE-16 runs under fixed 5V, temperatures stabilise, then runs under 8V:
| V | A | T hot | T cold | &#916;T |
| --- | --- | --- | --- | --- |
| 5 | 0.73 | 29.2 | -2 | ~30 |
| 8 | 1.19 | 41.6 | -7 | ~49 |

<img alt="Peltier module in air" src="/img/20240527_124013.jpg" width=400px>

## Experiment - T min -14&deg;C in air, fixed 8V
The PE-16 starts from a room temperature ander fixed 8V and I=1.5 max. What would be the minimal temperature?
| V | A | T hot | T cold | &#916;T | Note |
| --- | --- | --- | --- | --- | --- |
| 7.9 | 1.5 | 25.8 | 13 |  | Fixed I mode |
| 8 | 1.35 | 29.2 | -11 | ~40 | Fixed U mode |
| 8 | 1.35 | 30 | -14 | 44 | Min T cold |
| 8 | 1.3 | 32.5 | -14 | 46.5 | Max &#916;T |
| 8 | 1.27 | 34.4 | -13 | | T goes up |

### Experiment - T min -21&deg;C in vacuum, fixed 8V
The PE-16 starts from a room temperature under vixed 8V, in the vacuum camera. What would be the minimal temperature? We can't measure T hot due to lack of additional sensors in the vacuum camera.
| V | A | T hot | T cold | &#916;T | Note |
| --- | --- | --- | --- | --- | --- |
| 7.9 | 1.5 | | 21 |  | Fixed I mode |
| 8 | 1.27 | | -20 | | Fixed U mode |
| 8 | 1.23 | | -21 | | Min T cold |
| 8 | 1.23 | | -20 | | T goes up |

### Experiment - T min -23&deg;C in air, fixed 2.1A
The PE-16 start from a room temperature. Now we fix the current at 2.1A which is 75% of I max 2.8A. Higher currents are not reccomended. We observe minimal T cold = -23&deg;C and &#916;T = 67&deg;C before the temperatures rise.

Starting from this experiement the temperatures are recorded every second ina tab-separated file [TSV](https://en.wikipedia.org/wiki/Tab-separated_values). See the [log file](</logs/2024-05-28 163804.tsv>) for this experiment.

### Experiment - T min -31.5&deg;C in vacuum, fixed 2.1A
We [recorded](</logs/2024-05-29 113448.tsv>) minimal T cold -31.5&deg;C. For the fist time the temperature seems stable.

<img src="/img/2024-05-29 - PE-16 2.1A in the vacuum camera.png" width=400px>

**Note:** In the vacuum the minimal T cold -7.5&deg;C lower (-31.5&deg;C) then in air (-23&deg;C) in the previous experiment.

### Experiment - T min -31&deg;C in air, CPU cooler + insulation
[Recorded](</logs/2024-05-30 151429.tsv>) min T cold -30.9&deg;C, max &#916;T 63.7&deg;C, max T hot 33.d&deg;C.

<img alt="Pelter with CPU cooler and insulation" src="/img/20240529_142728.jpg" width=400px>
<img src="/img/2024-05-30 - PE-16 2.1 with a CPU cooler and polyethilen foam.png" width=400px>

### Experiment - T min -29.3&deg;C in vacuum, T hot recorded
Added the second K-type thermocouple in the vacuum camera. The temperature of the hot side of the PE-16 is [recorded now](</logs/2024-05-31 154000.tsv>).The min T cold -29.3&deg;C, max &#916;T 79.8&deg;C, max T hot 57&deg;C.

<img src="/img/2024-05-31 - PE16 in vacuum.png" width=400px>

**Note:** The temperature rises after the Al thermal mass is heated. Additional cooling is required.
