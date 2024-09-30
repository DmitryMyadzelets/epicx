# Heat transfer through the cell

Having succefully liqufied CO2 in the climate chamber last week we now valuate how this cell could be used when CO2 is liquified with Peltier modules, which provide much less cooling power.

<img alt="The photo of the cell made of PEEK at UNIBO" src="/img/20240919_143224.jpg" width=400px>

<img alt="The dwawing of the cell made of PEEK at UNIBO" src="/img/2024-09-30 - Drawing of the cell.png" width=400px>

Parameters of the cell:
* $`77 \times 10^{-4} \, m^2`$ - external surface
* $`20.8 \times 10^{-4} \, m^2`$ - internal surface
* $`6.87 \, ml`$ - internal volume

The thermal conductivity of Polyetheretherketone (PEEK) is about $`k = 0.3 \, W/mK`$ (see [here](https://thermtest.com/application/thermal-conductivity-of-peek), [here](https://www.hpp-performance.com/fileadmin/user_upload/user_upload/fluteck_K_300-FLS_v15.03_datenblatt_PEEK.pdf) and [here](https://www.directplastics.co.uk/pdf/datasheets/PEEK%20Data%20Sheet.pdf)). Thus, the thermal conductance of the cell (assume the internal volume is covered with a lid made of PEEK with the same thikness as the cell's body, i.e. 1 cm): 
* At the interal surface: $`kA/L = 0.3 \times 20.8 \times 10^{-4}/1 \times 10^{-2} = 0.0924 \, W/K`$;
* At the external surface: $`kA/L = 0.3 \times 77 \times 10^{-4}/1 \times 10^{-2} = 0.231 \, W/K`$;
* Average: $`0.1617 \, W/K`$.


With the liquid CO2 at the temperature -45&deg;C in the cell, and external room temperature -25&deg;C (&#916;T = 70&deg;C) the heat flow through the cell's body is $`0.1617 \times 70 = 11.319 \, W`$.

If the cell put in vacuum the heat would radiate from its surface, as the emissivity of PEEK is about 0.95 
Let's calculate this amount of heat.

Heat exchange due to thermal radiation:

$`Q = \sigma \times e \times A \times (T_1^4 - T_2^4)`$, where:
* $`\sigma = 5.67 \times 10^{-8} W/(m^2 K^4)`$, Stefan-Boltzmann constant;
* $`e = 0.95`$ - emissivity of PEEK ([the source](https://repositories.lib.utexas.edu/server/api/core/bitstreams/4e1e9d12-d3e4-4226-afe1-46baf0e80249/content));
* $`A = 77 \times 10^{-4} \, m^2`$ - the radiating surface
* $`T_1 = 273 + 25`$ ambient temperature
* $`T_2 = 273 - 45`$ cell temperature

$`Q = 5.67 \times 0.95 \times 77 \times (298^4 - 228^4) = `$

For the sake of simplicity assume the external temerature of cell equal to the internal one, i.e. -45&deg;C.
