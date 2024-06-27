# for details see peltier.odt

# RS module 30x30 18.7 W
I1,Tc1,dT1=4.0,25-66+273.15,66# point 1
I2,Tc2,dT2=0.8,25-30+273.15,30# ponit 2
Q,I,Th=18.7,4.0,25+273.15# point 3

# Module ET-190-1010-1212 30x30 16.4W
I1, Tc1, dT1 = 2.8, 27-85+273.15, 85 # point 1
I2, Tc2, dT2 = 0.7, 27-47+273.15, 47 # ponit 2
Q, I, Th = 16.4, 2.8, 27+273.15      # point 3


A=2*(I1*Tc1/dT1-I2*Tc2/dT2)/(I1**2/dT1-I2**2/dT2)
print("R/S=",A)

S=Q/(Th*I-0.5*I**2*A)
R=S*A

print("S=",S)
print("R=",R)

K=(S*Tc1*I1-0.5*I1**2*R)/dT1

print("K=",K)

