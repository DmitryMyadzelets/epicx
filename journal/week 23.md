# Week 23 - Water cooling, lower heat loss
### Experiment - T min -37.8&deg;C in vacuum, water cooling
Here we cool down the Al cap with water flow at room temperature. 

<img alt="Vacuum camera with water cooling" src="/img/20240603_161938.jpg" width=400px>

<img src="/img/2024-06-03 - PE-16 in vacuum camera with water cooling.png" width=400px>

[See datalog](</logs/2024-06-03 162001.tsv>). The temperatures are stable now. Compare the results in air and vacuum:
| max T hot | min T cold | max &#916;T | Note |
| --- | --- | --- | --- |
| 32.5 | -37.8 | 69.5 | In vacuum, cooling with water at room T | 
| 33.4 | -30.9 | 63.7 | In air, cooling with CPU cooler |

**Note:** As was observed earlier, in the vacuum we get -7&deg;C lower w.r.t. the in air condition.

### Experiment - T min -40&deg;C in vacuum, plastic screws
When glue bonding was replaced with machine screws and plastic sleeves, we added heat transfer from the cold side of Peltier module to the hot side. Here we replace metal screws with nylon screws.

[See datalog](</logs/2024-06-04 123004.tsv>). Note that after 10 minutes the vacuum camera was opened. Thus we can compare temperatures in vacuum and air with the same water cooling:
| max T hot | min T cold | max &#916;T | Note |
| --- | --- | --- | --- |
| 33.2 | -40.0 | 73.2 | In vacuum | 
| 34.5 | -33.3 | 67.7 | In air |

<img src="/img/2024-06-04 - PE-16 in vacuum and air with water cooling and nylon screws.png" width=400px>

**Note:** Again, we see the -7&deg;C improvement in the vacuum.

### Mathematical model for removed power at the cold side
Removed power at the cold side (Qc) depends on the hot side temperature (T hot) and &#916;T. The specification of PE-16 provides only 3 charts for T hot: 27, 50 and 75&deg;C. Using the chart for e.g. &#916;T = 70&deg;C the Qc = 3.98W at 50&deg;C and 2.05W at 27&deg;C (AVEDEV is 0.97W). To get more precse values of Qc we can make a mathematical model using data fitting.

With `Origin` software (special thanks to Raimondo Cecchini) we applied a **plane model**, and got the following function:

$$Q_c = (T_hot + 179.5 - 2.476 * &#916;T) / 14.68$$

Using this model we get AVEDEV 0.17W at &#916;T = 70&deg;C.
