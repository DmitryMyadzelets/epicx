from peltier import *

p = Peltier(
    S= 0.031384714082293784,
    R= 2.5449850533268723,
    K= 0.10506397704016565,
    Imax= 2.8)

I = [0.7, 1.4, 2.1, 2.8]
p.Tc = 27
p.Th = 27

print("\nInput data:")
print("Tc=", p.Tc, "Th=", p.Th)

print("\nOutput data:")
print("I" , "Qc", "V", "P", "Qh", "COP", sep="\t")
for i in range(len(I)):
    p.I = I[i]
    p.update()
    print(
        p.I,
        round(p.Qc, 2),
        round(p.V, 2),
        round(p.P, 2),
        round(p.Qh, 2),
        round(p.COP, 2),
        sep="\t"
    )

