## Week 26 - Thermal design

### We need a few steps of Peltier cooling
* -62.2&deg;C is the minimal temperature we achieved (see the week 25). It's below the temperature of the triple point of CO2 -56.6&deg;C. We take -60&deg;C as the the target temperature, as it was declared in this project.
* +4.9&deg;C is the minimal temperature at the hot side of the Peltier before it switched on, cooled with water by the ciller (see the week 25). When switched on it rised up to +9.3&deg;C. Let's assume the chiller has infinite cooling capacity. Hence the temperature rise (9.3 - 4.9 = 4.4&deg;C) is due to the water heat exchanger efficiency. When colled with water at room temperature (see the week 23) we registered max T hot 32.5&deg;C while it was 27.9&deg;C before the Peltier was switched on; the rise is 32.5 - 27.9 = 4.6&deg;C. Let's assume the (aluminium) water heat exchanger provides the 4.5&deg;C temperature rise.
* 70&deg;C is our target temperature difference (4.9 + 62.2 = 67.1&deg;C) for the calculation of the combined Pelter-water cooling.
* With one-step Peltier cooling we achieved &#916;T = 73.2&deg;C (see the week 23), but at T cold = -40&deg;C. At the minimal T cold = -62.2&deg;C we had &#916;T = 45.8&deg;C. All the results were with minimal Qc. Hence we **need more then one step of the Peltier cooling**.
* For a two-steps Peltier cooling for the heat excnahge between the modules we can use either a liquid or a direct contact.
* Usage of a liquid introduces an efficiency loss due to additional heat exchangers (and 4.5&deg;C rise as described above) but allows us to place the cumbersome parts of the system apart from the cryogenic cell.

### Two-steps Peltier cooling
Preliminary calculation by hand gives the following temperature destribution across the system:

<img alt="Two-stage cooling diagram" src="/img/2024-06-20 - Two-stage colling.png" width=400px>

### Math for two-stage cooling
In order to find optimal parameters of the two-stage cooling by Peltier elements we need to find a point where the temperature and power of the stages matches. The current numerical model we've built doesn't provide so cold "waste heat" (Qh) parameter. We try other models.

* Model of Emanuele shows good results for Qc=f(dT) function but fails for V=f(dT) and Qh=f(dT). [Files](/tools/peltier/emanuele).
* Model of Belovsky fails for all parameters. [Article](https://www.researchgate.net/publication/317584219_Mathematical_Model_of_Thermoelectric_Peltier_Module). [Files](/tools/peltier/belovski).

The above models are based on physical properties of Peltier modules wit single stage only. They fail for two-stage module we use. A two stage module requires an appropriate physical model, which seems too complicated to built. 

We refine our mumerical model of the PE-16 module by adding the missing paremeters. We use Machine Learning and Multivariate Multiple Regression to predict necessary parameters from the existing Qc=f(dT) and Qh=f(dT) charts provided by the manufacture. [See the files](/tools/peltier/mlr).

The **algorithm** to find paremeters for two-stage cooling with Peltier (let 1 be stage connected to the cell, 2 - the stage for precooling):
1. Given (Qc, Tc, I) find Th for the stage 1.
2. Given (Tc, Th, I) find Qh for the stage 1.
3. Let N be a number of Peltier modules at the stage 2. Let output T and Q of the stage 2 be the input for the stage 2, and dT is the temperature rise in the heat exchanger. I.e. Tc2 = Th2 + dT, Qc2 = Qh1 / N.
4. Given (Qc, Th, I) find Tc for the stae 2.
5. If (Tc < Tc2) then the stage 2 provides enough cooling, end. Otherwise add modules N=N+1 and go to the step 3.

The resulting temperatures and the number of the Peltier modules are shown below:

<img alt="Heat diagram for two-stage cooling" src="/img/2024-06-27 - Heat diagram.png">

These results are for the current I=2.1A for all the modules (lower currents don't improve the results). The removed power depends depends on the interstage temperature rise:
| dT between the stages, &deg;C | Qc, Watt | Note |
| --: | --: | :-- |
| 9 | 4.8 | Water cooling |
| 0 | 5.8 | Direct mounting |

We are going to use two modules for the cell, hence the total Qc and the number of the modules double.

The standard error for the models are:
| Model | Standard error |
| :-- | --: |
| Th=f(Tc,Q) | 3.1 &deg;C |
| Tc=f(Th,Q) | 1.8 &deg;C |
| Qh=f(Tc,Th) | 0.3 Watt |

With **manuall** optimisation we've found a better configuration: 2 modules at the stage 1 with I=1.4A (i.e. connected in series) and 2 modules at the stage 2 with current 2.1A can remove **Qc=7.8W**.

The above configuration may be not optimal. To find an optimal solution we can reformulate the problem as follows:

*Given &#916;T and (at most) N modules on the stages, maximise Qc/N* 

