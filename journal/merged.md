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

Heat exchange due to thermal radiation:
$Q = \sigma \times e \times A (T_1^4 - T_2^4)$, where:
* $\sigma = 5.67\times10^{-8} W/(m^2 K^4)$, Stefan-Boltzmann constant
* $e = 1$ for black body, $e = 0.03$ for Al foil, emissivity of the surface
* $A = 0.01 m^2$ assumed heat exchange surface
* $T_1 = 273 + 25$ room temperature
* $T_2 = 273 - 40$ cell temperature

The maximum heat exchange, given the black bodies, is 4.47 W. Wrapping with Al foil reduces the heat exchage down to 0.045 W.

**Note:** The specification for the PE-16 module states that the heat removed from the cold side is about 5 Watt at the temperature difference 65&deg;C and the current 2.1A (75% of Imax). It's the same heat amount the cold side can get due to the thermal radiation.
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

## Week 27 - 2-stage Cooler, Model's Quality
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

### Quality of the modelels for the Peltier
Despite the fact the numerical models we developed for the PE-16 module are in line with the experimintal results, we need to evaluate them using common apprache. The best evaluation metrics for regression models are Mean Square Error (MSE), Mean Absolute Error (MAE) and R squared. These metrics applied for our models are following:

Linear regression models:
| Model | MSE | MAE | R^2 |
| :-- | :-- | :-- | :-- |
| Tc=f(Qc, Th) | 0.85 &deg;C | 0.72 &deg;C | 0.99 |
| Th=f(Qc, Tc) | 2.21 &deg;C | 1.11 &deg;C | 0.99 |
| Qc=f(Tc, Th) | 0.02 W | 0.12 W | 0.99 |
| Qh=f(Tc, Th) | 0.06 W | 0.19 W | 0.99 |
| Tc=f(Qh, Th) | 3.53 &deg;C | 1.46 &deg;C | 0.99 |

Polynomial (quadratic) regression models:
| Model | MSE | MAE | R^2 |
| :-- | :-- | :-- | :-- |
| Tc=f(Qc, Th, I) | 1.55 &deg;C | 0.99 &deg;C | 0.99 |
| Th=f(Qc, Tc, I) | 1.32 &deg;C | 0.94 &deg;C | 0.99 |
| Qc=f(Tc, Th, I) | 0.02 W | 0.11 W | 0.99 |
| Qh=f(Tc, Th, I) | 0.05 W | 0.18 W | 0.99 |
| Tc=f(Qh, Th, I) | 2.66 &deg;C | 1.30 &deg;C | 0.99 |

The R^2 metric (1 is considerd the best) - coefficient of determination, is very high, but it just confirms that the depended variables can be predicted from the independed ones. In our case it's logical cince our data are from the chart which describe phisical properties of the Peltier module. 

The MSE metric is sensible for the spikes in the data. It helped us find typos done during the extrations numerical values from the charts.

The MAE metric show average errors we would get during computation.

Note, that the linear regression models are built for the **fixed current** only. If the current put as an input parameter the models would have low quality metrics (not shown here, just trust us). If we need to use the current at the input the **polynomial models have acceptable quality** metrics. However, the models should be used as little as possible in itarative computation in order to reduce **error propagation**, as shown below.

Assume we have 3 stages of PE-16 modules. We fix the (Qc, Tc) values at the coldest stage (number 1), calcuate all the parameters for the stages forward, and, and than backward. If the models are perfect we should get the same parameters on the input. But we wouldn't, see the the table:

| Stage | I | Qc | Tc | Th | Qh |
| --: | --: | --: |  --: |  --: | --: |
| 1 | 0.7 | 0 | -60 | -43 | 8.3 |
| 2 | 1.4 | 8.3 | -43 | -18 | 25 |
| 3 | 2.8 | 25 | -18 | -22 | 88 |
| 3 | 2.8 | 29 | -10 | -22 | 88 |
| 2 | 1.4 | 12 | -30 | -10 | 29 |
| 1 | 0.7 | 3.8 | -45 | -30 | 12 |

So, we've got (3.8W, -45&deg;C) at the first stage instead of (0W, -60&deg;C) after 16 computations (4 interstage parameters for 2 interstages forward, and the 4x2 backward). We predicted the parameters from the predictions, so the error propagated and accumulated quite significantly.

One of the reasons the errors are high even if the models have the good metrics is that we use temperatures (Tc and Th) which are far away from the numbers the models are trained from. The Th ranges from 27 to 75 &deg;C in the training data while we use e.g -43&deg;C . From this point of view a **physical model of PE-16 my be more predictable**.

## Week 28 - Energy for CO2
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

### What the Peltier cooler provides 
Parameters of the cell cooler based on 2-stage configuration with PE-16 modules, and usage of tap water:
| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: |
| 1 | 8 | -50 | -30.17 | 4 | 0.7 | 7.94 |
| 2 | 15.94 | -30.17 | 32.5 | 4 | 2.1 | 101.69 |

Assuming the cell has no heat loss, it would require ~3 minutes to liqufy 1 ml of CO2.


<img alt="Some cell cooler variants" src="/img/2024-07-09 - Cells.png">
## Week 29 - Testing 2-stage cooling
### Experiment
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

Let's assume Qc=1.93 W be the constant heat loss. Than, if we need Tc=&minus;40 &deg;C the Qc would be 3.58 W according to the model, as shown in the table below. 
| Stage | Qc, W | Tc, &deg;C | Th, &deg;C | &#916;T, &deg;C | Modules | I, A | P, W |
| --: | --: | --: | --: | --: | --: | --: | --: |
| 1 | 3.58 | -40 | -32.07 | 7.93 | 1 | 0.7 | 1.78 |
| 2 | 5.36 | -32.07 | 16 | 48.06 | 1 | 2.1 | 22.92 |

Thus the usefull Qc = 3.58 &minus; 1.93 = 1.65 W (6.6 W for a PEC with 4 two-stage stacks). 

Note, that the **two stages** in the later case provide the cooling values (Tc=&minus;40 &deg;C, Qc=3.58 W) **similar as one stage only** in the former case (Tc=&minus;41.86 &deg;C, Qc=3.67 W).


### The (Qc, Qh)=f(Tc) chart
This chart derives from the numerical model of the PE-16 and depicts the both Qc and Qh power of the module at the constant current.

<img alt="Curves of Qc and Qh" src="/img/2024-07-17 - (Qc, Qh)=f(Tc).png" width=400px>

Some observations from the chart:
- Given a constant Qc, the 10&deg;C change of Th rusults in ~6&deg;C change of Tc (as was stated in week 23);
- The slop of Tc is steeper then the slop of Th, i.e. the efficiency is lower at low temperatures;
- Given a constant Tc, the efficiency of the module grows with lower Th.

# Strength calculation
The calculations are made according to the GOST 34233.2-2017 standard: "Vessels and apparatus. Norms and methods of strength calculation. Calculation of cylindric and conic shells, convex and flat bottoms and covers"

## Cylindrical shell
Symbols:
- $D$ - diameter of the cylinder, mm
- $s$ - thickness of the cylinder's wall, mm
- $p$ - overpressure, MPa
- $\sigma$ - allowable stress in the material, MPa
- $\psi$ - welding factor (1 if no welding)
- $R_{m/20}$ - minimum yield strength at 20&deg;C
- $n_x$ - safety factor for ultimate strength

Assumptions:
- $D \leq 200$
- $s/D \leq 0.3$

Allowable stress:

$\sigma = R_{m/20} / n_x$

Thickness of the wall:

$s = p \times D / \left( 2 \times \sigma \times \psi - p \right)$

### Pure aluminium (alloys have grater strength)
- $n_x$ = 3.5
- $R_{m/20}$ = 90 MPa

$\sigma = 90/3.5 = 25.71 MPa$

$s = 1 \times D / \left( 2 \times 25.71 \times 1 - 1 \right) = D / 50.42$

Example: for a cylinder ⌀ 50mm the wall's thickness must be at least 1 mm.

## Lid
Symbols:
- $K$ - coefficient, 0.4 for a flat lid
- $K_0$ - coefficient, 1 if the lid has no holes

If the lid has holes ⌀ $d$ on a chord of the circle:

$K_0 = \sqrt{(1 - (\sum d / D)^3)/(1 - (\sum d / D))}$

Thickness of a lid:

$s = K \times K_0 \times D \sqrt{ 1 / (\psi \times \sigma)}$

### Pure aluminium

$s = 0.4 \times 1 \times D \sqrt{ 1 / (1 \times 90 / 3.5)} = 0.079 \times D$

Example: for a lid ⌀ 50mm the thickness must be at least 3.95 mm.

### Quartz/fuzed glass
The Design Tensile Strength is 48 MPa [source](https://technicalglass.com/technical-properties/), [source](https://qsiquartz.com/mechanical-properties-of-fused-quartz/). Some recommend using 6.89 MPa/1000 psi (i.e. 7 times less) in practice, as for a normal glass [source](https://kindle-tech.com/faqs/what-is-the-allowable-stress-for-a-quartz-tube).

The thickness of a lid:

$s = 0.4 \times 1 \times D \sqrt{ 1 / (1 \times 6.89)} = 0.152 \times D$

Example: for a glass window ⌀ 32mm (at DIFA/UNIBO) the thickness must be at least 4.87 mm.

### PEEK
The thinkness of a lid:

$s = 0.4 \times 1 \times D \sqrt{ 1 / (1 \times (95/1.5))} = 0.05 \times D$

Example: for a lid ⌀ 50mm (at DIFA/UNIBO) the thickness must be at least 2.51 mm.

## Screws
### Lid screws
Assumptions:
- Pressure is applied to a lid's surface ⌀ 50mm
- Screw/bolt M5 made of steel

The force applied to the lid, N:

$F = p \times S = 1e6 \times 3.14 \times (0.05/2)^2 = 1963.5$

According to the [design properties](https://eurocodeapplied.com/design/en1993/bolt-design-properties) for metric hexagonal bolts:
- Tensile resistance = 1700 N for the lowest material class 4.3, and safety factor 3

Number of the screws: $round(1963.5 / 1700) = 2$

The same results provides [the online calculator (in Russian)](https://stresscalc.ru/pin/pin.php).

Minimal thread engagment length, according to [the online calculator](https://www.bossard.com/global-en/assembly-technology-expert/technical-information-and-tools/online-calculators-and-converters/thread-engagement-length-calculator/) = 3.11 mm.

### G1/4 push-in pneumatic fitting, S6510 from Camozzi
Parameters of the fitting' S6510 G1/4 thread:
- $D$ - major diameter, 13.156 mm
- $D2$ - pitch diameter, 11.445 mm
- $H1$ - depth, 0.856 mm
- $z$ - number of lines, 2

The surface of the fitting:

$A = \pi \times (13.156 / 2)^2 = 136$ mm2

The compressing forse from the gas at pressure $p$ = 1 MPa:

$F = p \times A = 1 \times 136 = 136$ N

The tension of the threads:

$\tau = F / (\pi \times D_2 \times H_1 \times z) = 136 / (\pi \times 11.445 \times 0.856 \times 2) = 2$ MPa

Example: the PEEK has tension strength 95 MPa. The actual safety factor is $95 / 2 = 42.5$.

## Links
### Polyether ether ketone (PEEK)
- PEEK [design guide](https://drakeplastics.com/wp-content/uploads/2020/01/Ketaspire-Design-Guide.pdf)
- The safety factor for plastics is [recommended to be 1.5](https://www.researchgate.net/publication/240421046_Design_criteria_and_safety_factors_for_plastic_components_design)
- The ultimate strength ranges from 95 MPa [source](https://drakeplastics.com/wp-content/uploads/2020/01/Ketaspire-Design-Guide.pdf) to 110 MPa [source](https://www.bearingworks.com/uploaded-assets/pdfs/retainers/peek-datasheet.pdf)

# Liquid CO2 in the climate chamber

## Experiment - Liquification of CO2
This is our first attempt to liquify CO2. The schematic of the experimental setup is depicted below.

<img alt="Drawing of the experiment setup" src="/img/2024-09-18 - Experiment setup.jpg" width=400px>

The tank with CO2 at about 40 Bar is connected to the pressure regulator which was set to reduce the pressure down to 10 Bar (i.e. ~1 MPa). The CO2 in gaseous state is then delivered to the cell via the tube. The cell and tube were preliminary emptied from the air with the vacuum pump. The climate chamber was gradually set down to -45&deg;C until the liquification of CO2 was observed via the window of the chamber.

In order to measure the temperature in the cell, a K-type thermocouple was put into the cell. However, we detected a leakage of the gas, and then attached the thermocouple to the gas inlet at the top of the camera, as it has presumably the closest temperature to the temperature of the gas. Additionally, we measured the temperature of the air inside the chamber.

At the end of the experiment, the CO2 in the cell would be heated up to the ambient temperature, thus passing from liquid to gaseous phase at some point. In order to avoid overpressure in the system, a security gas valve set to 10 Bar was added.

<img alt="Equimpent in the room" src="/img/20240919_113345.jpg" width=400px>

The photo below shows the amount of the liquified CO2 (~3 ml) condenced in the cell during the experiment. 

<img alt="The cell in the chamber" src="/img/20240919_125246.jpg" width=400px>

The following image depicts the [temperature dynamics](</logs/2024-09-19 113036.tsv>). See the log list below for details (time is in form hours:minutes from the beginning of the experiment).

<img alt="Temperature curves in the chamber" src="/img/2024-09-19 - Temperatures in the chamber during the liquification of CO2.png" width=400px>

* 00:00 - The initial temperature is 33&deg;C, the target temperature of the climate chamber is set to 0&deg;. The cell is vacuumed and has no CO2.
* 00:05 - The cell is filled with CO2 till the pressure reached 10 Bar. New setpoint is -20&deg;. 
* 00:23 - The temperature of the camera is stabilized. The pressure of gas observed at the manometer an the security valve decreased from 10 to 9.2 Bar.
* 00:30 - The cell is refilled up to 10 Bar. New setpoint is -30&deg; (we set it wrongly to +30&deg; for short time).
* 00:53 - The pressure gradually but fast went down to 0 Bar.
* 00:58 - We observe some liquid CO2 in the cell.
* 01:30 - The cell seems to be in equilibrium conditions at 7.6 Bar and 38&deg;C.
* 01:25 - We start to heat up the chamber. New setpoint is -30&deg;c.
* 01:33 - The pressure slowly goes up, and reached 9.8 Bar.
* 01:50 - The liquid CO2 is evaporated. The pressure is 10 Bar.

At the end of the experiment we found that the glass window of the cell has a crack while the remaing pressure in the cell was ~4 Bar. 

A possible reason for the damage could be high strain in the glass due to different thermal expantion of the materials, i.e. of the glass window tighly put into the frame made of PEEK.

The coefficients of thermal expansion (CTE):
* Quartz: 0.5
* PEEK: 26...43

The PEEK frame changed its size for about 0.2 mm in the temperature range going from 33&deg; to -45&deg;C, while the quarz glass - for about 0.002 mm.

Another reason for the damage could be high difference of the temperatures in the cell and in the air during heating it up, to which the glass window was exposed. The evaporating CO2 maintained low temperature inside the cell for long time untill is fully evaporated, while the air in the chamber went from -45&deg; up to positive values.

### Observations
The amount of heat exchange between internal and external areas of the cell is through, according to calculations:
* 76.2% - gas fitting, made of brass
* 23.3% - window, made of quartz glass
* 0.5% - cell body, made of PEEK

It could be seen that drops of the condenced CO2 were coming from the gas inlet.

## Experiment - Liquification with electrodes
The goal of this experiment was to validate that the existing cell and electrodes could withstand the pressure of 10 Bar during the liquification. The experiment was conducted as the previous one, though without measurement of the temperatures.

One of the electrodes was pusshed out of the cell at the first try. The electrodes were then secured with plastic ties.

<img alt="The cell in the chamber" src="/img/2024-09-24 - Cell with probes.jpg" width=400px>

To avoid high temperature difference between the intermal and external areas of the cell the proccess of heating up was modified. The pressure in the cell was lowered from 10 Bar down to 0 Bar by mean of the regulator of the security valve, while the temperature in the chamber remained low. At certain point the liquified CO2 evaporated, and then the system was heated up quickly with no risk of damage due to different CTE.
# Heat transfer through the cell

Having succefully liqufied CO2 in the climate chamber last week we now valuate how this cell could be used when CO2 is liquified with Peltier modules, which provide much less cooling power.

<img alt="The photo of the cell made of PEEK at UNIBO" src="/img/20240919_143224.jpg" width=400px>

<img alt="The drawing of the cell made of PEEK at UNIBO" src="/img/2024-09-30 - Drawing of the cell.png" width=400px>

Parameters of the cell:
* $`77 \times 10^{-4} \, m^2`$ - external surface
* $`20.8 \times 10^{-4} \, m^2`$ - internal surface
* $`6.87 \, ml`$ - internal volume

## Heat transfer by conduction

The thermal conductivity of Polyetheretherketone (PEEK) is about $`k = 0.3 \, W/mK`$ (see [here](https://thermtest.com/application/thermal-conductivity-of-peek), [here](https://www.hpp-performance.com/fileadmin/user_upload/user_upload/fluteck_K_300-FLS_v15.03_datenblatt_PEEK.pdf) and [here](https://www.directplastics.co.uk/pdf/datasheets/PEEK%20Data%20Sheet.pdf)). Thus, the thermal conductance of the cell (assume the internal volume is covered with a lid made of PEEK with the same thikness as the cell's body, i.e. 1 cm): 
* At the interal surface: $`k\times A/L = 0.3 \times 20.8 \times 10^{-4}/1 \times 10^{-2} = 0.0924 \, W/K`$;
* At the external surface: $`k\times A/L = 0.3 \times 77 \times 10^{-4}/1 \times 10^{-2} = 0.231 \, W/K`$;
* Total (simplified): $`1/(1/0.0924 + 1/0.231) = 0.1848\, W/K`$.

With the liquid CO2 at the temperature -45&deg;C in the cell, and the external room temperature 25&deg;C (&#916;T = 70&deg;C) the heat flow through the cell's body:

$`Q = (k \times A / L) \times \Delta T = 0.1848 \times 70 = 12.936\, W`$.

## Heat transfer by radiation

If the cell put in a vacuum the heat would radiate from cell's surface. For the sake of simplicity assume the surface temperature equal to the internal, i.e. -45&deg;C. The amount of the radiated heat:

$`Q = \sigma \times e \times A \times (T_1^4 - T_2^4)`$, where:
* $`\sigma = 5.67 \times 10^{-8} \, W/(m^2 K^4)`$ - Stefan-Boltzmann constant;
* $`e = 0.95`$ - emissivity of PEEK ([the source](https://repositories.lib.utexas.edu/server/api/core/bitstreams/4e1e9d12-d3e4-4226-afe1-46baf0e80249/content));
* $`A = 77 \times 10^{-4} \, m^2`$ - radiating surface;
* $`T_1 = (273 + 25) = 298 \, K`$ - ambient temperature;
* $`T_2 = (273 - 45) = 228\, K`$ - cell temperature.

$`Q = 5.67 \times 10^{-8} \times 0.95 \times 77 \times 10^{-4} \times (298^4 - 228^4) = 2.15 \, W`$.

If the cell would be wraped with an aluminium foil (k = 0.04, see the [source](https://www.engineeringtoolbox.com/emissivity-coefficients-d_447.html)), then the amount of radiated heat would be:

$`Q = 5.67 \times 10^{-8} \times 0.04 \times 77 \times 10^{-4} \times (298^4 - 228^4) = 0.0905 \, W`$.

Observations:
* The rough aluminium has emmisivity 0.07, which is close to the value 0.04 of the aluminium foil. That's why we observed no improvement of thermal performance in the experiment in the [week 24](</journal/week 24.md>).
* The surface area is linearly proportional to amount of conducted and radiated heat. We need to keep the cell's size as small as possible.

## Heat transfer by conduction and radiation
If the cell is put in vacuum we may need to calculate the amount of resulting heat transfer and the temperature of the cell's external surface. The same amount of heat is transfered by the both conduction and radiation:

$`Q_{conduction} = Q_{radiation}`$;  
$`Q_{conduction} = (k \times A / L) \times (T_{surface} - T_{internal})`$,  
$`Q_{radiation} = \sigma \times e \times A \times (T_{ambient}^4 - T_{surface}^4)`$. 

i.e.:  
$`(k \times A / L) \times (T_{surface} - T_{internal}) = \sigma \times e \times A \times (T_{ambient}^4 - T_{surface}^4)`$. 

The $`T_{surface}`$ is unknown. Let's find it for the above example of the cell made of PEEK (we use the external surface parameters only) put in vacuum:

$`(0.3 \times 77 \times 10^{-4} / 1 \times 10^{-2}) \times (T_{surface} - 228) - 5.67 \times 10^{-8} \times 0.95 \times 77 \times 10^{-4} \times (298^4 - T_{surface}^4) = 0`$;  
$`4.1476 \times 10^{-10} \times T_{surface}^4 + 0.231 \times T_{surface} + 55.939 = 0`$;

The above equation, [when solved](https://planetcalc.ru/7715/), gives us the results:

$`T_{surface} = 236.54\degree K = -36.46 \degree C`$;  
$`Q_{conduction} = Q_{radiation} = 1.973 \, W`$.
# The CO2 condenser 

## Why we need a condenser
[The early designs](</journal/week 28.md>) of the CO2 cell assumed that the CO2 condensation and electrolysis would occur in the same volume of the cell. The internal surface of the cell has to satisfy to at least two criteria:
* High thermal conductivity;
* High resistance to chemicals, and compatibility with electrolytes.

These criteria contradict each other as it seems we have no one material which would satisfy the both.

Aluminium is considered for the cell as it has high thermal conductivity (240 W/mK), it's cheap and easy for machining. However, electrolisys favors aluminium corrosion, and it may influence an outcome of the process.

Polyetherether Ketone (PEEK) is compatible with almost any of the solvents, but it has low thermal conductivity (0.3 W/mK). Though we currently use it for the cell to liquify CO2 in the climate chamber (see [the experiment](</journal/week 38.md>)).

To solve the above contradiction we can separate the processes of condensation and electrolisys, and conduct them in dedicated volumes. This way we can use the same cell made of PEEK as earlier, for electrolysis. Then we need a condenser for liquification of CO2. 

## Design
The condenser is shown at the right of the image below. At the left - the condenser in the plastic 3D-printed holder, connected to the electrolytic cell.
<img alt="The sketch of the condenser" src="/img/2024-10-04 - Condenser.png" width=400px>

The gaseous CO2 is condensed in the camera made of aluminium. The gas pipes are connected to the camera via [Camozzi C6510-4-1/4 male connectors](https://media.camozzi.com/pdf/6000-ENG.pdf). The camera is cooled down by a stack of two two-staged Peltier modules (four stages in total). The heat from the modules is then transfered away by a water-cooling system.

The condensed CO2 is collected in the electrolytic cell made of PEEK. The evaporating CO2 returns to the condenser where it's condensed again. 

Given the constant pressure in the system, a temperature of the liquid CO2 in the electrolytic cell would remain constant as well.
# The Cu electrode for the cell
In order to conduct new experiments in the electrolytic cell it's requred to have a copper electrode, as proposed by Raffello. There is currently no any "off-the-shelf" electrode available, so we would make an our own.

A few approaches are considered:
* A plain 6 mm copper rod, with no outer
* A 1-3mm copper rod glued into a 6 mm glass tube
* A 1-3mm copper rod glued into a plastic holder

The version of the electrode made of a glass tube and a copper rode glued into it may be problematic due to different coefficients of thermal expansion of the materials. Particularly, the [LOCTITE EA 9497 adhesive](https://datasheets.tdx.henkel.com/LOCTITE-EA-9497-en_GL.pdf) has 50×10-6 as such, while a quatz glass has it 0.55x10-6. The borosilicate glass (e.g. used for [some glass tubes](https://it.aliexpress.com/item/32899234262.htm)) has 3×10-6 as such.

An example of an "off-the-shelf" electrode with the holder in the cell is depicted below:

<img alt="An elecrode in the cell" src="/img/20241014_110920.jpg" width=400px>

Example of handmade electrodes:

<img alt="Two examples of handmade electrodes" src="/img/20241014_114330.jpg" width=400px>


## The electrode holder

The plastic holder currently used at DIFA/UNIBO is shown below. It's designed to hold 6mm electrodes, with help of an o-ring and an additional threaded part (not shown).

<img alt="The sketch of the condenser" src="/img/2024-10-09 - Electrode Holder from DIFA.png" width=400px>

We've designed a new plastic holder, with a 6mm hole, for 3D printing.

<img alt="The sketch of the condenser" src="/img/2024-10-11 - Electrode Holder.png" width=400px>

Note: Google SketchUp software is used as a CAD tool. Watch [the tutorial](https://www.youtube.com/watch?v=k8AC5LNMo-g) for a screw thread design, with [ISO metric parameters](https://en.wikipedia.org/wiki/ISO_metric_screw_thread) for a M10x1.5 screw. This software, however, have some limitations, e.g. we have to design the part scaled up 10 times, and then scale it down, to overcome some of them. 

The tools and materials used for 3D printing (with the aid of Federico Zardi):
* [PreForm print preparation software](https://formlabs.com/uk/software/preform/)
* The 3D printer "Form 3" from Formlabs
* The [standard resin from Formlabs](https://formlabs-media.formlabs.com/datasheets/Standard-DataSheet.pdf), with tensile strength at least 38 MPa.

The two results of the our approaches for handmade electrodes are shown below:

<img alt="The handmade copper electrode" src="/img/2024-10-16 - Copper electrode.jpg" width=400px>

<img alt="The handmade copper electrode" src="/img/2024-10-17 - Copper electrode.jpg" width=400px>

# The CO2 condenser (continued)
This week was dedicated to the design of a structure to convey the experiments at IMM. One of the requirements was usage of available materials and tools.

The past experiments have shown that the electrochemical cell made at DIFA/UNIBO is suitable to be used at target conditions: pressue 1M Pa, temperature -45 &deg;C. We now continue to design the CO2 condenser to be used in the vacuum chamber at IMM.

The rationaly and initial design of the CO2 condenser is described [earlier](</journal/week 40.md>). For convenience, it's shown below.

<img alt="The cell with the condenser" src="/img/2023-10-28 - iso 1.png" width=400px>

It's [advised](https://www.uweelectronic.de/en/temperaturmanagement-2/peltierelemente.html) to provide the contact pressure on the Peltier modules of 0.3-0.8 MPa. The pressure should be even. In the current design we use a clamp, with screws for the pressure adjustment, as shown below.

<img alt="The clamp" src="/img/2023-10-28 - iso 2.png" width=400px>

To provide the given pressue we have to apply a force:

$`F = P \times A`$, where:
* $`P = 0.5 MPa = 0.5 \times 10^6 N/m^2`$;
* $` A = 4 \times 4 = 16 cm^2 = 0.0016 m^2`$ - the surface of the Peiltier modules.

$`F = 0.5 \times 10^6 \times 0.0016 = 800 N`$.

For the given force we need to apply a torque on the screw:

$`\tau = (F \times L) / (2 \times \pi \times \eta)`$, where:
* $`L`$ - screw lead;
* $`\eta = 0.2`$ - efficiency of the screw (depends on lubrification, etc).

The calculated torque for some screws:

| Screw | Lead, mm | $`\tau`$, Nm | 
| --: | --: | --: |
| M4 | 0.4 | 0.45 |
| M6 | 1.0 | 0.64 |
| M8 | 1.25 | 0.8 |

The thermal paste used to increase the heat exchange between the parts of the assemply favors to lower its mechanical rigidity. To prevent it the 3D-printed holders are used, as shown below:

<img alt="The holders" src="/img/2023-10-28 - iso 3.png" width=400px>

The assembled condenser is then mounted to the (new) aluminium cap of the vacuum camera:

<img alt="The holders" src="/img/2023-10-28 - iso 4.png" width=400px>

The cap has inlets and outlets for the CO2, water and electrical connections.

Note: the thermal expansion of the assembly may loosen the contact pressure on the Peltier modules. We may need to compensate it with e.g. a spring.
