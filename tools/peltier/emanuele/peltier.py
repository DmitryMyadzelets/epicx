class Peltier:# for details see peltier.odt
    def __init__(self,S=0,R=0,K=0,Imax=0):# S, R and K can be obtained from performance curve using script extract_peltier_parameters.py
        self.S=S
        self.K=K
        self.R=R
        self.Imax=Imax
        self.Tc=0# °C
        self.Th=0# °C
        self.I=0
        self.V=0
        self.Qc=0
        self.Qh=0
        self.P=0
        self.COP=0
    def update(self):# given Tc, Th, I calculates Qc, Qh, V, P, COP
        self.Qc=self.S*self.I*(self.Tc+273.15)-self.K*(self.Th-self.Tc)-0.5*self.R*self.I**2
        self.V=self.S*(self.Th-self.Tc)+self.R*self.I
        self.P=self.V*self.I
        self.Qh=self.P+self.Qc
        self.COP=self.Qc/self.P
    def findIfromQh(self,Qh):# given Tc, Th, Qh find and set I
        self.I=self.Imax/2
        self.update()
        dI=self.I/2
        for i in range(20):
            if self.Qh>Qh:self.I=self.I-dI
            if self.Qh<Qh:self.I=self.I+dI
            dI=dI/2
            self.update()
    def findIfromQc(self,Qc):# given Tc, Th, Qc find and set I
        self.I=self.Imax/2
        self.update()
        dI=self.I/2
        for i in range(20):
            if self.Qc>Qc:self.I=self.I-dI
            if self.Qc<Qc:self.I=self.I+dI
            dI=dI/2
            self.update()
