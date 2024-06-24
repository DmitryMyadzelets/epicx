## Week 26 - Thermal design

### We need a few steps of Pelter cooling
* -62.2&deg;C is the minimal temperature we achieved (see the week 25). It's below the temperature of the triple point of CO2 -56.6&deg;C. We take -60&deg;C as the the target temperature, as it was declared in this project.
* +4.9&deg;C is the minimal temperature at the hot side of the Peltier before it switched on, cooled with water by the ciller (see the week 25). When switched on it rised up to +9.3&deg;C. Let's assume the chiller has infinite cooling capacity. Hence the temperature rise (9.3 - 4.9 = 4.4&deg;C) is due to the water heat exchanger efficiency. When colled with water at room temperature (see the week 23) we registered max T hot 32.5&deg;C while it was 27.9&deg;C before the Peltier was switched on; the rise is 32.5 - 27.9 = 4.6&deg;C. Let's assume the (aluminium) water heat exchanger provides the 4.5&deg;C temperature rise.
* 70&deg;C is our target temperature difference (4.9 + 62.2 = 67.1&deg;C) for the calculation of the combined Pelter-water cooling.
* With one-step Peltier cooling we achieved &#916;T = 73.2&deg;C (see the week 23), but at T cold = -40&deg;C. At the minimal T cold = -62.2&deg;C we had &#916;T = 45.8&deg;C. All the results were with minimal Qc. Hence we **need more then one step of the Peltier cooling**.
* For a two-steps Peltier cooling for the heat excnahge between the modules we can use either a liquid or a direct contact.
* Usage of a liquid introduces an efficiency loss due to additional heat exchangers (and 4.5&deg;C rise as described above) but allows us to place the cumbersome parts of the system apart from the cryogenic cell.

### Two-steps Pelter cooling
<img alt="Two-stage cooling diagram" src="/img/2024-06-20 - Two-stage colling.png" width=400px>
