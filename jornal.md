# EPICX jornal
## Week 22
## Week 21
## Week 20
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
    * ET2-196-19-14, [see docs at RS](https://docs.rs-online.com/f6bf/A700000008614874.pdf), 1 module.
    * ET-190-1010-1212, [see docs at RS](https://it.rs-online.com/web/p/moduli-peltier/4901430), 4 modules.

Calculation of heat exchange due to thermal raiation in the vacuum camera.
$$Q = \sigma e A (T_1^4 - T_2^4)$$, where:
* $\sigma = 5.67e10^-8 W/(m^2 K^4)$, Stefan-Boltzmann constant
* e = 1 for black body, 0.03 for Al foil
* A - heat exchange surface, assume 0.01 $m^2$
* $T_1 = 273 + 25$ room temperature
* $T_2 = 273 - 40$ cell temperature
The maximum heat exchange, given the black bodies, is 4.47 W. Wrapping with Al foil reduces the heat exchage down to 0.045 W.

