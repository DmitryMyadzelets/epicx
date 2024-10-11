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
<img alt="The sketch of the condenser" src="/img/2024-10-04 - Condenser.png" width=400px>

The gaseous CO2 is condensed in the camera made of aluminium. The gas pipes are connected to the camera via [Camozzi C6510-4-1/4 male connectors](https://media.camozzi.com/pdf/6000-ENG.pdf). The camera is cooled down by a stack of two two-staged Peltier modules (four stages in total). The heat from the modules is then transfered away by a water-cooling system.

The condensed CO2 is collected in the electrolytic cell made of PEEK. The evaporating CO2 returns to the condenser where it's condensed again. 

Given the constant pressure in the system, a temperature of the liquid CO2 in the electrolytic cell would remain constant as well.
