# EPICX journal
Year 2025
- [Week 5 - Condenser clamp](<journal/2025 week 05.md>)
- [Week 4 - Condenser holder prototype @ NEMA 2000 connectors](<journal/2025 week 04.md>)
- [Week 3 - Testing the condenser camera and the flange](<journal/2025 week 03.md>)
- [Week 2 - Machining the condenser camera and a flange](<journal/2025 week 02.md>)

Year 2024
- [Week 43 - The CO2 condenser (continued)](<journal/2024 week 43.md>)
- [Week 41 - The copper electrode](<journal/2024 week 41.md>)
- [Week 40 - The CO2 condenser](<journal/2024 week 40.md>)
- [Week 39 - Heat transfer through the cell](<journal/2024 week 39.md>)
- [Week 38 - Liquid CO2 in the climate chamber](<journal/2024 week 38.md>)
- [Week 30 - Strength calculation](<journal/2024 week 30.md>)
- [Week 29 - Testing 2-stage cooling](<journal/2024 week 29.md>)
- [Week 28 - Energy for CO2](<journal/2024 week 28.md>)
- [Week 27 - 2-stage Cooler, Model's Quality](<journal/2024 week 27.md>)
- [Week 26 - Thermal design](<journal/2024 week 26.md>)
- [Week 25 - Freezing Peltier](<journal/2024 week 25.md>)
- [Week 24 - Charts, heat loss](<journal/2024 week 24.md>)
- [Week 23 - Water cooling, lower heat loss, mathematical model](<journal/2024 week 23.md>)
- [Week 22 - Compare Peltier in air, vacuum, with CPU cooler](<journal/2024 week 22.md>)
- [Week 21 - Peltier runs and fails](<journal/2024 week 21.md>)
- [Week 20 - Working space and Lab](<journal/2024 week 20.md>)

## TODO

- [x] Valuate two-step cooling approaches
    - [x] Check if the PE-16 in the climate chamber at -10...-20&deg;C. can reach -60&deg;C at the cold side
    - [x] Calculate parameters for the 2-step water cooling
    - [x] Calculate parameters for the 2-step direct cooling
    - [x] Test two-step modules
- [ ] Valuate the process with only the climate chamber at DIFA/UNIBO
    - [x] Check if the existing cell made from PEEK withstand 1MPa
    - [x] Check if CO2 can be liquified in the chamber
    - [x] Check if the cell's interfaces withstand 1MPa in the chamber
    - [ ] Conduct the electrolysis process
- [x] Sketch the cell
    - [x] Possible two-step variants
    - [x] A separate CO2 condenser with the Peltiers
    - [x] Mounting for the Peltiers 
    - [x] Connections
- [x] Prepare additional equipment
    - [x] The gas pressure measurement
        - [x] Check the sensor works with a Seneca module Z-8AI
        - [x] Calibrate the sensor 
- [ ] Make the CO2 condenser
    - [x] Choose and get the connectors
        - [x] Gaseous CO2 inlet: 1 x Camozzi S6510 4-1/4
        - [x] Liquid CO2 outlet: 1 x Camozzi S6510 4-1/4 or Camozzi S6510 6-1/4
    - [x] Make the condencer camera (aluminium)
        - [x] Prepare a drawing for machining
        - [x] Mashining
        - [x] Assemble with connectors
        - [x] Check the tightness
    - [ ] Make the Peltier cooler/holder
        - [x] Check the Peltier modules work (one is second hand?)
        - [ ] Make the holder
            - [x] Decide on the force control (pressure sensor 30...70 kg = 50 kg)
            - [x] Decide on the force source (springs)
            - [x] Test we can measure a force
            - [x] Test the springs provide the required 500 N force
            - [x] Decide on the clamp
            - [ ] Make the clamp
            - [ ] Make a support for the clamp
- [ ] Make the vacuum chamber
    - [ ] Choose and get the connectors
        - [x] Water cooling inlets/outlets: 4 x [WX-KPC-6-M6](https://www.aliexpress.com/item/1005003339030118.htm)
        - [x] CO2 gas inlet: 1 x [SMC KQ2H04-M5A](https://it.rs-online.com/web/p/raccordi-per-pneumatica/7715068)
        - [x] Vacuum pump: 1 x [Leybond G1/2 DN16 flange](https://www.leyboldproducts.com/products/flanges-and-fittings/iso-kf/flanges-adapters/483/screw-in-flanges-iso-kf?number=88631)
        - [ ] Electric: 4 x [GX16 4 pole male](https://www.amazon.it/dp/B0CKVWC2CB)
    - [ ] Make the base plate (aluminium 12 mm thick)
        - [x] Prepare the drawing for machining
        - [x] Mashining for the O-ring and the vacuum inlet
        - [x] Check the tightness
        - [x] Machining for the gas/liguid/electric connectors
        - [ ] Assemble connectors
        - [ ] Check the tightness
 - [ ] Make electric box


## Order list
### RS Components
RS code x Items - Description - Note
- [x] 490-1430 x 4 - [Peltier Adaptive, 15.7V, 2.8A, 16.2W, 30x30x6.5mm](https://it.rs-online.com/web/p/moduli-peltier/4901430) - And we have 2 additional modules as a reserve 
- [x] 693-5075 x 5 [Peltier, 16.1V, 8.5A, 51.6W, 40x40x7mm](https://it.rs-online.com/web/p/moduli-peltier/6935075) - 1 is as reserve
- [x] 122-2219 x 3 - [Alimentatore DIN 12V 5A, current control](https://it.rs-online.com/web/p/alimentatori-per-guida-din/1222219) - for 2 Peltiers of the 1-st "cold" stage, and 1 for the pump/reserve.
- [x] 428-483 x 4 - [Alimentatore DIN 12V 7.5A, non control, adjustable to 15V](https://it.rs-online.com/web/p/alimentatori-per-guida-din/0428483) - for 4 Peltiers of the 2-nd "hot" stage, support "big" modules. No reserve. 
- [x] 180-5299 x 1 - [Grasso termico 7W/mK -50...+200&deg;C](https://it.rs-online.com/web/p/grasso-termico/1805299)
- [x] 257-357 x 5 - [Shunt 3A](https://it.rs-online.com/web/p/shunt/0257357) - To measure the current of the Peltier modules
- [x] 444-1247 x 5 - [Termocoppia diametro 0.5 mm con passante filettato](https://it.rs-online.com/web/p/termocoppie/4441247)
- [x] 455-9758 x 10 - [Connettore termocoppia femmina](https://it.rs-online.com/web/p/accessori-per-sensori/4559758)
- [x] 455-9764 x 10 - [Connettore termocoppia maschio](https://it.rs-online.com/web/p/accessori-per-sensori/4559764)

Replace and order from AliExpress/Amazon:
- [x] 702-6885 x 1 - [Pompa 12V 2.8L/min](https://it.rs-online.com/web/p/pompe-per-acqua/7026885)
- [x] 169-4404 x 2 - [Scambiatore di calore x Peltier](https://it.rs-online.com/web/p/scambiatori-di-calore-a-piastre/1694404) - 10 euro at Aliexpress, see [here](https://it.aliexpress.com/item/1005005489417933.html) and [there](https://it.aliexpress.com/item/32839597996.html)

### Other suppliers
- [x] x 2 - Water cooler copper block 40x40 mm @ [AliExpress](https://it.aliexpress.com/item/1005005489417933.html)
- [x] x 1 - Water pipe OD 6mm, 2m @ [AliExpress](https://www.aliexpress.com/item/1005005489417933.html)
- [x] x 15 - PC2-M6 Tube connector @ [AliExpress](https://www.aliexpress.com/item/1005003339030118.html)
- [x] x 1 - Pressure sensor 50 kg @ [Amazon](https://www.amazon.it/gp/product/B09VD4JPVZ)
- [x] x 4 - Compression spring 134 N (13.7 kg) @ [Amazon](https://www.amazon.it/dp/B0CJ33P2JM)
- [x] x 1 - Compression spring 568 N (60 kg) @ [AliExpress](https://www.aliexpress.com/item/1005006179898963.html)
- [ ] x 4 - Electrical connector NMEA2000 @ [AliExpress](https://www.aliexpress.com/item/1005004985187840.html)
- [x] x 1 - Water pump 12 V, 12 LPM, 0.6 Bar @ [Amazon](https://www.amazon.it/gp/product/B01NA6CBZ0)

### Whish list
Euro / Quantity / Description
- 20 / 5 / Fast pneumatic connector
- 160 / 1 / Water pump
- 1566 / 1 / [Campana vuoto](https://www.castrocompositesshop.com/it/materiali-di-vuoto/1546-campana-a-vuoto-17-litri.html)
- 700 / 1 / [Chiller aqua](https://www.lasermake.it/product/26238829/chiller-cw-5200-per-ricircolo-raffreddamento-acqua)
