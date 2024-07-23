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

Example: a cylinder ⌀ 50mm must be at least 1 mm thick.

## Lid
Symbols (additional to the defined above):
- $K$ - coefficient, 0.4 for a flat lid
- $K_0$ - coefficient, 1 if the lid has no holes

If the lid has holes ⌀ $d$ on a chord of the circle:

$K_0 = \sqrt{(1 - (\sum d / D)^3)/(1 - (\sum d / D))}$

Thikness of a lid:

$s = K \times K_0 \times D \sqrt{ p / (\psi \times \sigma)}$

### Pure aluminium

$s = 0.4 \times 1 \times D \sqrt{ 1 / (1 \times 90 / 3.5)} = 0.079 \times D$

Example: a lid ⌀ 50mm must be at least 3.95 mm thick.

## Lid screws
Assumptions:
- Pressure is applied to a lid's surface ⌀ 50mm
- Screw/bolt M5 made of steel

The force applied to the lid, N:

$F = p \times S = 1e6 \times 3.14 \times (0.05/2)^2 = 1963.5$

According to the [design properties](https://eurocodeapplied.com/design/en1993/bolt-design-properties) for metric hexagonal bols:
- Tensile resistance = 1700 N for the lowest meterial class 4.3, and safety factor 3

Number of the screws: $round(1963.5 / 1700) = 2$

Same results provides [the onlie calculator (in Russian)](https://stresscalc.ru/pin/pin.php).

Minimal thread engagment length, according to [the online calculator](https://www.bossard.com/global-en/assembly-technology-expert/technical-information-and-tools/online-calculators-and-converters/thread-engagement-length-calculator/) = 3.11 mm.

## Other materials
- PEEK [design guide](https://drakeplastics.com/wp-content/uploads/2020/01/Ketaspire-Design-Guide.pdf)
