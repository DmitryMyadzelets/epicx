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

We use a climate chamber at the Department of Physics at Univercity of Bologna. 

<img alt="Internal camera of the climate chamber" src="/img/20240614_165333.jpg" width=400px>

The results:
| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| -4.1 | -55.5 | 55.5 | 3.36 | Climate control set for -13&deg;C | 
| -15.9 | -62.2 | 45.8 | 3.39 | Climate control set for -25&deg;C |

It should be noted that the temperatures set by the climate control, and the temperatures we observed with our sensor at the hot side of the PE-16 before it was powered on, are different (for unknown reason):

| T set | T measured | Error |
| --: | --: | --: | 
| -13 | -9.6 | 3.4 | 
| -25 | -20.8 | 4.2 |

See the [records for -13&deg;C](</logs/2024-06-17 163254.tsv>) and [for -25&deg;C](</logs/2024-06-17 170748.tsv>).

The chart below depicts some of the experimental data. Cooling with water is colored by blue, air - by white. The circles imply the cases under atmospheric pressue, the romb - use of the vacuum camera.

<img alt="3D chart with cooling with water and in air" src="/img/2024-06-11 - 3D chart - Qc wrt T cold and T hot.png" width=400px>

### Temperature measurement errors
Given the maximum 4.2&deg;C difference between our measuremnts in the climate chamber and its preset values have raised a concern about precision of the equipment we use. We have conducted an experiment comparing readings from a mercury thermometer with readings from the Seneca's Z-8TC-1 module and the K-type thermocouples (marked as they were used in the previous expreriments).

| T mercury | T hot | T cold | Condition |
| --: | --: | --: | :-- |
| 100.0 | 101.5 | 99.8 | Boiling water |
| 30.5 | 30.0 | 30.5 | Room temperature |

The maximal difference is -0.5 ... +1.5&deg;C. This is the error range we may and should take into account during the measurements. 

### Experiment - PE-16 in vacuum with cold water colling
This experiment is to check the minimal temperature we can achieve with currently existing (at CNR) equipment, and to confirm the temperature gain the vacuum camera provides.

For comparision, in the table below the results in air are added. The minimal temperature of the hot side `min T hot` is added to show the significant difference of the setups for heat transwer water to the hot side of the Peltier module. 
| min T hot | max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | --: | :-- |
| 9.2 | 13.6 | -52.1 | 65.8 | 2.08 | In vacuum, water 6.1&deg;C |
| 4.9 | 9.3 | -45.3 | 53.6 | 3.75 | In air with insulation, water 5.1&deg;C |

**Note:** Earlier we estimated heat loss in air as ~1.0W, w.r.t. vacuum. Now it looks like the vacuum provides about 1.6W of the improvment. If we could have in the vacuum the max T hot = 9.3&deg;C as in the air then, according to the model, **min T cold = -54&deg;C**.
