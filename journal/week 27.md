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

<img alt="Cell cooling design" src="/img/2024-07-02 - Cell.jpg" width=400px>

