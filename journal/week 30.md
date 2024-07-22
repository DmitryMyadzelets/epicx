# Strength calculation
The calculations are made according to the GOST 34233.2-2017 standard: "Vessels and apparatus. Norms and methods of strength calculation. Calculation of cylindric and conic shells, convex and flat bottoms and covers"

## Cylindrical shell
Symbols:
- $D$ - diameter of the cylinder, mm
- $s$ - thikness of the cylinder's wall, mm
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
Symbols:
- $K$ - coefficent, 0.4 for a flat lid
- $K_0$ - coefficient, 1 if the lid has no holes

Thikness of a lid:

$s = K \times K_0 \times D \sqrt{ 1 / (\psi \times \sigma)}$

### Pure aluminium

$s = 0.4 \times 1 \times D \sqrt{ 1 / (1 \times 90 / 3.5)} = 0.079 \times D$

Example: a lid ⌀ 50mm must be at least 3.95 mm thick.

## Other materials
- PEEK [design guide](https://drakeplastics.com/wp-content/uploads/2020/01/Ketaspire-Design-Guide.pdf)
