## Week 27 - 2-stage Cooler, Model's Quality
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

<img alt="Cell cooling design" src="/img/2024-07-02 - Cell.png" width=400px>

### Quality of the modelels for the Peltier
Despite the fact the numerical models we developed for the PE-16 module are in line with the experimintal results, we need to evaluate them using common apprache. The best evaluation metrics for regression models are Mean Square Error (MSE), Mean Absolute Error (MAE) and R squared. These metrics applied for our models are following:

Linear regression models:
| Model | MSE | MAE | R^2 |
| :-- | :-- | :-- | :-- |
| Tc=f(Qc, Th) | 0.85 &deg;C | 0.72 &deg;C | 0.99 |
| Th=f(Qc, Tc) | 2.21 &deg;C | 1.11 &deg;C | 0.99 |
| Qc=f(Tc, Th) | 0.02 W | 0.12 W | 0.99 |
| Qh=f(Tc, Th) | 0.06 W | 0.19 W | 0.99 |
| Tc=f(Qh, Th) | 3.53 &deg;C | 1.46 &deg;C | 0.99 |

Polynomial (quadratic) regression models:
| Model | MSE | MAE | R^2 |
| :-- | :-- | :-- | :-- |
| Tc=f(Qc, Th, I) | 1.55 &deg;C | 0.99 &deg;C | 0.99 |
| Th=f(Qc, Tc, I) | 1.32 &deg;C | 0.94 &deg;C | 0.99 |
| Qc=f(Tc, Th, I) | 0.02 W | 0.11 W | 0.99 |
| Qh=f(Tc, Th, I) | 0.05 W | 0.18 W | 0.99 |
| Tc=f(Qh, Th, I) | 2.66 &deg;C | 1.30 &deg;C | 0.99 |

The R^2 metric (1 is considerd the best) - coefficient of determination, is very high, but it just confirms that the depended variables can be predicted from the independed ones. In our case it's logical cince our data are from the chart which describe phisical properties of the Peltier module. 

The MSE metric is sensible for the spikes in the data. It helped us find typos done during the extrations numerical values from the charts.

The MAE metric show average errors we would get during computation.

Note, that the linear regression models are built for the **fixed current** only. If the current put as an input parameter the models would have low quality metrics (not shown here, just trust us). If we need to use the current at the input the **polynomial models have acceptable quality** metrics. However, the models should be used as little as possible in itarative computation in order to reduce **error propagation**, as shown below.

Assume we have 3 stages of PE-16 modules. We fix the (Qc, Tc) values at the coldest stage (number 1), calcuate all the parameters for the stages forward, and, and than backward. If the models are perfect we should get the same parameters on the input. But we wouldn't, see the the table:

| Stage | I | Qc | Tc | Th | Qh |
| --: | --: | --: |  --: |  --: | --: |
| 1 | 0.7 | 0 | -60 | -43 | 8.3 |
| 2 | 1.4 | 8.3 | -43 | -18 | 25 |
| 3 | 2.8 | 25 | -18 | -22 | 88 |
| 3 | 2.8 | 29 | -10 | -22 | 88 |
| 2 | 1.4 | 12 | -30 | -10 | 29 |
| 1 | 0.7 | 3.8 | -45 | -30 | 12 |

So, we've got (3.8W, -45&deg;C) at the first stage instead of (0W, -60&deg;C) after 16 computations (4 interstage parameters for 2 interstages forward, and the 4x2 backward). We predicted the parameters from the predictions, so the error propagated and accumulated quite significantly.

One of the reasons the errors are high even if the models have the good metrics is that we use temperatures (Tc and Th) which are far away from the numbers the models are trained from. The Th ranges from 27 to 75 &deg;C in the training data while we use e.g -43&deg;C . From this point of view a **physical model of PE-16 my be more predictable**.

