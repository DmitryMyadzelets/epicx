## Week 25 - Freezing Peltier 

### Experiment - Cooling PE-16 with cold water
This experiment is an intermidiate step before the experiement in the climate camera. We exploit the existing setup for water cooling.

<img alt="Cooling Pelter with cold water" src="/img/20240617_113001.jpg" width=400px>

Logs with [water at 24&deg;C](</logs/2024-06-17 100000.tsv>) and [water at 5&deg;C](</logs/2024-06-17 121523.tsv>).

| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| 33.0 | -33.6 | 65.6 | 3.34 | Water 24&deg;C | 
| 9.3 | -45.3 | 53.6 | 3.75 | Water 5&deg;C |

We used water for domestic usage and a 800W chiller to cool it down. The temperature of the warm water was measured with a mercury thermometer. The temprerature of the cooled water was measured by the chiller.

**Note** We can't calculate the performance of the cooling sistem due to the lack of mesurement data, though we can state that its performance was sufficient to achieve stable thermal conditions of the PE-16.

### Experiment - PE-16 in the climate chamber 
This experiment is to confirm that lower temperatrues can be achieved by cooling down the hot side of the module, and compare the results against the mathematical model of the PE-16 we built earlier. 

We use a climate chamber at the Department of Physics at Univercity of Bologna. The results:

| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| -4.1 | -55.5 | 55.5 | 3.35 | Climate control set for -13&deg;C | 
| -15.9 | -62.2 | 45.8 | 3.39 | Climate control set for -25&deg;C |

It should be noted that the temperatures set by the climate control, and the temperatures we observed with our sensor at the hot side of the PE-16 before it was powered on, are different:

| T set | T measured | Error |
| --: | --: | --: | 
| -13 | -9.6 | 3.4 | 
| -25 | -20.8 | 4.2 |

See the [records for -13&deg;C](</logs/2024-06-17 163254.tsv>) and [for -25&deg;C](</logs/2024-06-17 170748.tsv>).

The chart below depicts some of the experimental data. Cooling with water is colored by blue, air - by white. The circle imply the cases under atmospheric pressue, the romb - use of the vacuum camera.

<img alt="3D chart with cooling with water and in air" src="/img/2024-06-11 - 3D chart - Qc wrt T cold and T hot.png" width=400px>

L

