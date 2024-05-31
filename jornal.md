# EPICX jornal
## Week 22
## Week 21
Fist measurements tests.

The CAL9900 controller shows 29 degrees whild the Fluke meter shows 23 degrees, with same thermocouple. No equipment is calibrated. We can expect hight measurements errors.

Neither the CAL9900 nor Fluke have ouptuts for temperature registrations. An options to do it could be to use existing data aqusition modules from [Seneca](https://www.seneca.it/), in particular Z-8TC-1 module for thermocouples.The module can be connected to laptop by USB, the measurements recieved using Mudbus RTU protocol. For the later the `mbpoll` command line utility is choosen, with some wrapper scripting for data aqusition and logging.

The first setup with Peltier modue is prepared. The hot and cold sides of the module are glued to Al plates (dimensions 50x30x4 mm) with Loctite bicomponent epoxy. A hole of 1mm diameter 20mm length is drilled in each plate for termocouples. This sandwich was mounted on the Al cap of the vacuum chamber.

In the first test we measure T at the cold side only. The V was increased gradually untill the I reached 1.5 A. The T went down to -11 degrees.

![img/20240521_125408.jpg]

In the second test (next day) the T went down to -4 degrees only, much slower. The reason wasn't clear, so we decided to cool all the parts down to room temperature and start over again.

The reistance (R) of the Peltier module was measured using multimeter. It wasn't stable but decreasing from 11.5 to 9.2 Om during measurement.

In the tird test (day later) the Peltier module had no current while increasing voltage from 0 to 15V. Resistance of the module coudn't be measured (like of isolator). It's clear the module is damaged.

To recover the glued Al plates for another Peltier module we put it to the owen at 300 degrees for a few hours. The epoxy glue didn't burn out though. It did burn out in another owen at 350 degrees.

![img/20240524_101106.jpg]

The reason the Pelter module was damaged with no obviouse reason is likely due to different expansion coefficeints of the module and adherent Al plate wich coused shear forces. It was found that bounding by adhesive is permitted but limited to small sizes of Peltier elements (i.e. [25 mm](https://customthermoelectric.com/tech-info/install/tec-installation.html). In general, gluing isn't reccomended.


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

Heat exchange due to thermal raiation in the vacuum camera:
$Q = \sigma e A (T_1^4 - T_2^4)$, where:
* $\sigma = 5.67e10^{-8} W/(m^2 K^4)$, Stefan-Boltzmann constant
* $e = 1$ for black body, $e = 0.03$ for Al foil
* $A = 0.01 m^2$ assumed heat exchange surface
* $T_1 = 273 + 25$ room temperature
* $T_2 = 273 - 40$ cell temperature

The maximum heat exchange, given the black bodies, is 4.47 W. Wrapping with Al foil reduces the heat exchage down to 0.045 W.

The Peltier specification (for the ET..1212 module) states the heat removed from the cold side is about 5 Watts at temperature difference 65 degrees and the current 2.1A (75% of Imax). It's the same heat amount the cold side can get due to the thermal radiation in vacuum.
