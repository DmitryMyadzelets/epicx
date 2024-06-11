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

<img alt="Vacuum camera with Al foil" src="/img/220240611_112537.jpg " width=400px>

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
We add a polyethilen foam insulatin. It supposed to have no effect in vacuum, but to reduce the heat loss in air. It's the first time we test this insulation alogn with the water cooling.

[See datalog](</logs/2024-06-11 121000.tsv>):
| max T hot | min T cold | max &#916;T | Qc, W | Note |
| --: | --: | --: | --: | :-- |
| 33.5 | -39.9 | 73.3 | 2.14 | In vacuum | 
| 33.8 | -38.7 | 72.4 | 2.31 | In air |

As expected, in vacuum the results are equal to the described in the previous experiment. In air, though, the insulation in air provides about -5&deg;C cooling gain versus -7&deg;C gain with vacuum.
