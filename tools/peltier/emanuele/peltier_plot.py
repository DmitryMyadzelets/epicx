from pylab import *
from peltier import *

p30=Peltier(S=0.027027780876938527,R=1.6916664342296106,K=0.17522220982557923,Imax=4)

I=[0.8,1.6,2.4,3.2,4.0]

p30.Th=25

dT=range(-80,1)
Qc=[[],[],[],[],[]]

for i in range(len(I)):
    for dt in dT:
        p30.I=I[i]
        p30.Tc=p30.Th+dt
        p30.update()
        Qc[i].append(p30.Qc)
    plot(dT, Qc[i], color="blue", linewidth=2, label=str(I[i]))

xlim((-80,0))
ylim((0,25))
xlabel('Delta T')#,fontsize=20)
ylabel('Qc')#,fontsize=20)

grid(True)
show()
