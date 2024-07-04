## Week 20 - Working space and Lab
Setup of the working space and the lab setup.

Preliminary studing:
* CO2 reduction
* Peltier module theory and usage

Equipment in the lab:
* Vacuum camera 
* Vacuum scroll pump
* Temperature controller CAL9900, with a K-type thermocouple 
* Power supply with U/I stabilisation
* Peltier modules:
    * ET2-196-19-14, [see docs at RS](https://docs.rs-online.com/f6bf/A700000008614874.pdf), 1 module. Reffered as **PE-51** in the following.
    * ET-190-1010-1212, [see docs at RS](https://it.rs-online.com/web/p/moduli-peltier/4901430), 4 modules. Reffered as **PE-16** in the following.

Heat exchange due to thermal raiation in the vacuum camera:
$Q = \sigma e A (T_1^4 - T_2^4)$, where:
* $\sigma = 5.67e10^{-8} W/(m^2 K^4)$, Stefan-Boltzmann constant
* $e = 1$ for black body, $e = 0.03$ for Al foil
* $A = 0.01 m^2$ assumed heat exchange surface
* $T_1 = 273 + 25$ room temperature
* $T_2 = 273 - 40$ cell temperature

The maximum heat exchange, given the black bodies, is 4.47 W. Wrapping with Al foil reduces the heat exchage down to 0.045 W.

**Note:** The specification for the PE-16 module states that the heat removed from the cold side is about 5 Watts at temperature difference 65&deg;C and the current 2.1A (75% of Imax). It's the same heat amount the cold side can get due to the thermal radiation in vacuum.
## Week 21 - Peltier runs and fails
Fist measurements tests.

### Temperature measurement errors
The CAL9900 controller shows 29&deg;C while the Fluke multimeter shows 23&deg;C with the same thermocouple. No equipment is calibrated. We can expect **high measurements errors** of absolute temperature values.

Neither the CAL9900 nor Fluke have outputs for temperature registrations. An options to do it could be to use existing data aqusition modules from [Seneca](https://www.seneca.it/), in particular `Z-8TC-1` module for thermocouples. The module can be connected to a laptop by USB, the measurements recieved using Modbus RTU protocol. For the later the `mbpoll` command line utility is choosen, with some wrapper scripting for data aqusition and logging (see the [mon](./mon) and [log](./log) files).

### Peltier glued with epoxy
The first setup with PE-16 is prepared. The hot and cold sides of the module are glued to Al plates (dimensions 50x30x4 mm) with Loctite bicomponent epoxy. A hole of 1mm diameter 20mm length is drilled in each plate for termocouples. This sandwich was mounted on the Al cap of the vacuum chamber.

### Experiments
In the first test we measure T at the cold side only. The V was increased gradually untill the I reached 1.5 A. The T went down to -11&deg;C.

<img alt="Fist test of a Peltier module" src="/img/20240521_125408.jpg" width=400px>

In the second test (next day) the T went down to -4&deg;C only, much slower. The reason wasn't clear, so we decided to cool all the parts down to room temperature and start over again.

The R of the PE-16 was measured using a multimeter. It's not stable with DC, and decreases from kOms to Om gradually due to thermolectric effect.

In the third test (day later) the PE-16 had no current while increasing voltage from 0 to 15V. Resistance of the module coudn't be measured (like of isolator). It's clear the module is damaged.

To recover the glued Al plates for later use we put it to the owen at 300&deg;C for a few hours. The epoxy glue didn't burn out though. It did burn out in another owen at 350&deg;C.

The image below shows the internals of the PE-16. This module has two cascades, you can see that one cascade has about 60 simiconductor couples (also called pellets), and the second cascade has 129 couples, 189 in total. 

<img alt="Internals of th Peltier module" src="/img/20240524_101106.jpg" width=400px>

The reason the Pelter module was damaged with no obviouse reason is likely due to different expansion coefficeints of the module and adherent Al plate, wich coused shear forces. It was found that bounding by adhesive is permitted, but is limited to small sizes of Peltier elements (i.e. [25 mm](https://customthermoelectric.com/tech-info/install/tec-installation.html)). In general, bonding with a glue isn't reccomended.

*Note:** The specification for the PE-16 module states that the heat removed from the cold side is about 5 Watts at temperature difference 65&deg;C and the current 2.1A (75% of Imax). It's the same heat amount the cold side can get due to the thermal radiation in vacuum.
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
When the glue bonding was replaced with machine screws and plastic sleeves, the screwes added a heat transfer from the cold side of Peltier module to the hot side. Here we replace the metal screws with nylon screws. The both types of screws are M3 size.

[See datalog](</logs/2024-06-04 123004.tsv>). Note that after 10 minutes the vacuum camera was opened. Thus we can compare temperatures in vacuum and air with the same water cooling:
| max T hot | min T cold | max &#916;T | Note |
| --- | --- | --- | --- |
| 33.2 | -40.0 | 73.2 | In vacuum | 
| 34.5 | -33.3 | 67.7 | In air |

<img src="/img/2024-06-04 - PE-16 in vacuum and air with water cooling and nylon screws.png" width=400px>

**Note:** Again, we see the -7&deg;C improvement in the vacuum. The screws added 3.7&deg;C temperature difference (73.2 - 69.5).    

### Mathematical model for removed power at the cold side
Removed power at the cold side (Qc) depends on the hot side temperature (T hot) and &#916;T. The specification of PE-16 provides only 3 charts for T hot: 27, 50 and 75&deg;C. Using the chart for e.g. &#916;T = 70&deg;C the Qc = 3.98W at 50&deg;C and 2.05W at 27&deg;C (AVEDEV is 0.97W). To get more precise values of Qc we can make a mathematical model using data fitting.

With `Origin` software (special thanks to Raimondo Cecchini) we applied a **plane model**, and got the **function for I=2.1A**:

$$Q_c = (T_{hot} + 179.5 - 2.476 * &#916;T) / 14.68$$

Using this model we get AVEDEV 0.17W at &#916;T = 70&deg;C (versus 0.97W using the chart).

Let's substitute $&#916;T$ with $T_{hot} - T_{cold}$:

$$Q_c = T_{hot}/14.68 + 179.5/14.68 - 2.476 * T_{hot}/14.68 + 2.476 * T_{cold} / 14.68$$

$$Q_c = 12.23 - 0.10 * T_{hot} + 0.17 * T_{cold}$$

Let's express it for $T_{cold}$

$$T_{cold} = Q_c/0.17 - 12.23/0.17 + T_{hot} * 0.10 / 0.17$$

$$T_{cold} = 5.55 * Q_c - 71.93 + 0.59 * T_{hot}$$

Assuming we need constant heat removal:
$$T_{cold} = const + 0.59 * T_{hot}$$
I.e. for PE-16 with current 2.1A the **1&deg;C change at the hot side results in 0.6&deg;C change at the cold size**. 

The mathematial model for the **current 1.4A**:
$$Q_c = 9.466 - 0.0971 * T_{hot} + 0.1568 * T_{cold}$$
$$T_{cold} = const + 0.619 * T_{hot}$$
## Week 24 - Charts, heat loss
### Charts of removed heat (Qc) 
The mathematical models we created previously can be used to represent the discrete chart from the the specification for PE-16 as a continious chart, for better understanding:

<img alt="3D chart - Qc wrt T diff and T hot" src="/img/2024-06-10 - 3D chart - Qc wrt T diff and T hot.png" width=400px>

Similary, where &#916;T is replaces with T cold:

<img alt="3D chart - Qc wrt T cold and T hot" src="/img/2024-06-10 - 3D chart - Qc wrt T cold and T hot.png" width=400px>

The above chart also shows the extremums for some of our experiments:

| min Qc, W | max T hot &deg;C | min T cold &deg;C | Note |
| --: | --: | --: | --- |
| 2.14 | 33.2 | -40.0 | Vacuum, water colling, nylon fasteners | 
| 3.15 | 34.5 | -33.4 | Air, water colling, nylon fasteners | 
| 3.71 | 33.4 | -30.9 | Air, CPU cooling, insulation, metal fasteners | 

The same chart zoomed in to the experimental data:

<img alt="3D chart - Qc wrt T cold and T hot" src="/img/2024-06-10 - 3D chart - Qc wrt T cold and T hot (zoom in).png" width=400px>

## Heat loss 
From the experimental data we can now evaluate the aproximate heat loss: 
| Due to | Heat loss, W | 
| :-- | --: |
| Air in the vacuum camera | 1.0 |
| Metal fasteners | 0.52 |

Assuming the all heat removed from the cold side is due to its loss, there is still 2.14 W of heat loss due to, at least, the thermal radiation and the nylon fasteners.

## Experiment - PE-16 in vacuum camera with Al foil
To evaluate the heat loss by thermal radiation we add an aluminium kitchen foil into the vacuum camera. It's covered the bottom and partially the sides of it, 75% of the total surface. 

We estimated earlier (see week 20) the heat loss by thermal radiation as 4.47W for a black body, and as 0.045W for Al foil. We can correct now the surface area, as 20cm^2 versus 100cm^2, and increase emissivity of the kitchen Al foil (0.1 vs 0.03, suggested by Emanuele). Thus, the heat loss due to thermal ratiation is ~3W for a black body, and 0.03W for a setup with Al foil.

<img alt="Vacuum camera with Al foil" src="/img/20240611_112537.jpg " width=400px>

[See datalog](</logs/2024-06-11 113000.tsv>). Note that after 10 minutes the vacuum camera was opened. Thus we can compare temperatures in vacuum and air with the same cooling codition:
| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| 33.0 | -40.1 | 73.1 | 2.15 | In vacuum | 
| 36.0 | -33.6 | 69.6 | 2.96 | In air |

Recall the results without Al foil:
| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| 33.2 | -40.0 | 73.2 | 2.14 | In vacuum | 
| 34.5 | -33.3 | 67.7 | 3.15 | In air |

From the above we see no significant difference for the conditions in vacuum, and the 0.2W increased heat loss for the case with Al foil in air. Note that the temperature of the cooling water wasn't neither measured nor stable. Still, the addition of  **alluminium foil has no positive effect** for heat loss due to thermal radiation in our case.

## Experiment - PE-16 in vacuum camera with Al foil and insulation
We add a polyethilen foam insulatin. It supposed to have no effect in vacuum, but to reduce the heat loss in air. It's the first time we test this insulation along with the water cooling.

[See datalog](</logs/2024-06-11 121000.tsv>):
| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| 33.5 | -39.9 | 73.3 | 2.14 | In vacuum | 
| 33.8 | -38.7 | 72.4 | 2.31 | In air |

As expected, in vacuum the results are equal to the described in the previous experiment. In air, though, the insulation in air provides about -5&deg;C cooling gain versus -7&deg;C gain with vacuum.
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

**Note:** Earlier we estimated heat loss in air as ~1.0W, w.r.t. vacuum. Now it looks like the vacuum provides about 1.6W of the improvment. If we could have max T hot = 9.3&deg;C in the vacuum as in the air, then, according to the model, we would get **min T cold = -54&deg;C**.
## Week 26 - Thermal design

### We need a few steps of Peltier cooling
* -62.2&deg;C is the minimal temperature we achieved (see the week 25). It's below the temperature of the triple point of CO2 -56.6&deg;C. We take -60&deg;C as the the target temperature, as it was declared in this project.
* +4.9&deg;C is the minimal temperature at the hot side of the Peltier before it switched on, cooled with water by the ciller (see the week 25). When switched on it rised up to +9.3&deg;C. Let's assume the chiller has infinite cooling capacity. Hence the temperature rise (9.3 - 4.9 = 4.4&deg;C) is due to the water heat exchanger efficiency. When colled with water at room temperature (see the week 23) we registered max T hot 32.5&deg;C while it was 27.9&deg;C before the Peltier was switched on; the rise is 32.5 - 27.9 = 4.6&deg;C. Let's assume the (aluminium) water heat exchanger provides the 4.5&deg;C temperature rise.
* 70&deg;C is our target temperature difference (4.9 + 62.2 = 67.1&deg;C) for the calculation of the combined Pelter-water cooling.
* With one-step Peltier cooling we achieved &#916;T = 73.2&deg;C (see the week 23), but at T cold = -40&deg;C. At the minimal T cold = -62.2&deg;C we had &#916;T = 45.8&deg;C. All the results were with minimal Qc. Hence we **need more then one step of the Peltier cooling**.
* For a two-steps Peltier cooling for the heat excnahge between the modules we can use either a liquid or a direct contact.
* Usage of a liquid introduces an efficiency loss due to additional heat exchangers (and 4.5&deg;C rise as described above) but allows us to place the cumbersome parts of the system apart from the cryogenic cell.

### Two-steps Peltier cooling
Preliminary calculation by hand gives the following temperature destribution across the system:

<img alt="Two-stage cooling diagram" src="/img/2024-06-20 - Two-stage colling.png" width=400px>

### Math for two-stage cooling
In order to find optimal parameters of the two-stage cooling by Peltier elements we need to find a point where the temperature and power of the stages matches. The current numerical model we've built doesn't provide so cold "waste heat" (Qh) parameter. We try other models.

* Model of Emanuele shows good results for Qc=f(dT) function but fails for V=f(dT) and Qh=f(dT). [Files](/tools/peltier/emanuele).
* Model of Belovsky fails for all parameters. [Article](https://www.researchgate.net/publication/317584219_Mathematical_Model_of_Thermoelectric_Peltier_Module). [Files](/tools/peltier/belovski).

The above models are based on physical properties of Peltier modules wit single stage only. They fail for two-stage module we use. A two stage module requires an appropriate physical model, which seems too complicated to built. 

We refine our mumerical model of the PE-16 module by adding the missing paremeters. We use Machine Learning and Multivariate Multiple Regression to predict necessary parameters from the existing Qc=f(dT) and Qh=f(dT) charts provided by the manufacture. [See the files](/tools/peltier/mlr).

The **algorithm** to find paremeters for two-stage cooling with Peltier (let 1 be stage connected to the cell, 2 - the stage for precooling):
1. Given (Qc, Tc, I) find Th for the stage 1.
2. Given (Tc, Th, I) find Qh for the stage 1.
3. Let N be a number of Peltier modules at the stage 2. Let output T and Q of the stage 2 be the input for the stage 2, and dT is the temperature rise in the heat exchanger. I.e. Tc2 = Th2 + dT, Qc2 = Qh1 / N.
4. Given (Qc, Th, I) find Tc for the stae 2.
5. If (Tc < Tc2) then the stage 2 provides enough cooling, end. Otherwise add modules N=N+1 and go to the step 3.

The resulting temperatures and the number of the Peltier modules are shown below:

<img alt="Heat diagram for two-stage cooling" src="/img/2024-06-27 - Heat diagram.png">

These results are for the current I=2.1A for all the modules (lower currents don't improve the results). The removed power depends depends on the interstage temperature rise:
| dT between the stages, &deg;C | Qc, Watt | Note |
| --: | --: | :-- |
| 9 | 4.8 | Water cooling |
| 0 | 5.8 | Direct mounting |

We are going to use two modules for the cell, hence the total Qc and the number of the modules double.

The standard error for the models are:
| Model | Standard error |
| :-- | --: |
| Th=f(Tc,Q) | 3.1 &deg;C |
| Tc=f(Th,Q) | 1.8 &deg;C |
| Qh=f(Tc,Th) | 0.3 Watt |

With **manuall** optimisation we've found a better configuration: 2 modules at the stage 1 with I=1.4A (i.e. connected in series) and 4 modules at the stage 2 with current 2.1A can remove **Qc=7.8W**.

The above configuration may be not optimal. To find an optimal solution we can reformulate the problem as follows:

*Given &#916;T and (at most) N modules on the stages, find N s.t. Qc/N is maximal* 

## Week 27 - Cell Cooler
We've build numerical models for the PE-16 modules, and have found an optimal Qc per module performance for the two stages:

Cooling with the chiller. Qc/module = 1.31 W. P total = 197 W.
| Stage | Modules | Qc, W | Qh, W | Tc, &deg;C | Th, &deg;C | Current, A |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 4 | 15.7 | 38.0 | -60.0 | -38.9 | 1.4 |
| 2 | 8 | 38.0 | 212.5 | -38.9 | 9.4 | 2.1 |

Cooling with 24&deg;C tap water. Qc/module = 0.89 W. P total = 223 W.
| Stage | Modules | Qc, W | Qh, W | Tc, &deg;C | Th, &deg;C | Current, A |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 3 | 9.7 | 28.6 | -60.0 | -31.9 | 1.4 |
| 2 | 8 | 28.6 | 232.3 | -31.9 | 33.0 | 2.1 |

Note that the above results assume that the interstage &#916;T = 0, i.e. for the direct contact between the Peltier modules.

A general view of the cell cooler may look as follows:

<img alt="Cell cooling design" src="/img/2024-07-02 - Cell.png" width=400px>

