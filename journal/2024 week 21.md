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
