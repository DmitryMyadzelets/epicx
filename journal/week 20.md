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
$Q = \sigma e A (T_1^4 - T_2^4)$, where:
* $\sigma = 5.67 * 10^{-8} W/(m^2 K^4)$, Stefan-Boltzmann constant
* $e = 1$ for black body, $e = 0.03$ for Al foil, emissivity of the surface
* $A = 0.01 m^2$ assumed heat exchange surface
* $T_1 = 273 + 25$ room temperature
* $T_2 = 273 - 40$ cell temperature

The maximum heat exchange, given the black bodies, is 4.47 W. Wrapping with Al foil reduces the heat exchage down to 0.045 W.

**Note:** The specification for the PE-16 module states that the heat removed from the cold side is about 5 Watts at temperature difference 65&deg;C and the current 2.1A (75% of Imax). It's the same heat amount the cold side can get due to the thermal radiation in vacuum.
