# Heat transfer through the cell

Having succefully liqufied CO2 in the climate chamber last week we now valuate how this cell could be used when CO2 is liquified with Peltier modules, which provide much less cooling power.

<img alt="The photo of the cell made of PEEK at UNIBO" src="/img/20240919_143224.jpg" width=400px>

<img alt="The dwawing of the cell made of PEEK at UNIBO" src="/img/2024-09-30 - Drawing of the cell.png" width=400px>

Parameters of the cell:
* $`77 \times 10^{-4} \, m^2`$ - external surface
* $`20.8 \times 10^{-4} \, m^2`$ - internal surface
* $`6.87 \, ml`$ - internal volume

## Heat transfer by conduction

The thermal conductivity of Polyetheretherketone (PEEK) is about $`k = 0.3 \, W/mK`$ (see [here](https://thermtest.com/application/thermal-conductivity-of-peek), [here](https://www.hpp-performance.com/fileadmin/user_upload/user_upload/fluteck_K_300-FLS_v15.03_datenblatt_PEEK.pdf) and [here](https://www.directplastics.co.uk/pdf/datasheets/PEEK%20Data%20Sheet.pdf)). Thus, the thermal conductance of the cell (assume the internal volume is covered with a lid made of PEEK with the same thikness as the cell's body, i.e. 1 cm): 
* At the interal surface: $`k\times A/L = 0.3 \times 20.8 \times 10^{-4}/1 \times 10^{-2} = 0.0924 \, W/K`$;
* At the external surface: $`k\times A/L = 0.3 \times 77 \times 10^{-4}/1 \times 10^{-2} = 0.231 \, W/K`$;
* Total (simplified): $`1/(1/0.0924 + 1/0.231) = 0.1848\, W/K`$.

With the liquid CO2 at the temperature -45&deg;C in the cell, and the external room temperature -25&deg;C (&#916;T = 70&deg;C) the heat flow through the cell's body:

$`Q = (k \times A / L) \times \Delta T = 0.1848 \times 70 = 12.936\, W`$.

## Heat transfer by radiation

If the cell put in a vacuum the heat would radiate from cell's surface. For the sake of simplicity assume the surface temperature equal to the internal, i.e. -45&deg;C. The amount of the radiated heat:

$`Q = \sigma \times e \times A \times (T_1^4 - T_2^4)`$, where:
* $`\sigma = 5.67 \times 10^{-8} \, W/(m^2 K^4)`$ - Stefan-Boltzmann constant;
* $`e = 0.95`$ - emissivity of PEEK ([the source](https://repositories.lib.utexas.edu/server/api/core/bitstreams/4e1e9d12-d3e4-4226-afe1-46baf0e80249/content));
* $`A = 77 \times 10^{-4} \, m^2`$ - radiating surface;
* $`T_1 = (273 + 25) \, K`$ - ambient temperature;
* $`T_2 = (273 - 45) \, K`$ - cell temperature.

$`Q = 5.67 \times 10^{-8} \times 0.95 \times 77 \times 10^{-4} \times (298^4 - 228^4) = 2.15 \, W`$.

If the cell would be wraped with an aluminium foil (k = 0.04, see the [source](https://www.engineeringtoolbox.com/emissivity-coefficients-d_447.html)), then the amount of radiated heat would be:

$`Q = 5.67 \times 10^{-8} \times 0.04 \times 77 \times 10^{-4} \times (298^4 - 228^4) = 0.0905 \, W`$.

Observations:
* The rough aluminium has emmisivity 0.07, which is close to the value 0.04 of the aluminium foil. That's why observed no improvement of thermal performance in the experiment in the [week 24](</journal/week 24.md>).
* The surface area is linearly proportional to amount of conducted and radiated heat. We need to keep the cell's size as small as possible.

## Heat transfer by conduction and radiation
If the cell is put in vacuum we may need to calculate the amount of resulting heat transfer and the temperature of the cell's external surface. The same amount of heat is transfered by the both condaction and radiation:

$`Q_{conduction} = Q_{radiation}`$, where:  
$`Q_{radiation} = \sigma \times e \times A \times (T_{ambient}^4 - T_{surface}^4)`$,
$`Q = (k \times A / L) \times (T_{surface} - T_{internal})`$.
