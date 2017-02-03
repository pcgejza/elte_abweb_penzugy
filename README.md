# Pénztárca alkalmazás [react boilerplate](http://localhost:3000)-ben

## Telepítés és indítás

```
npm install
npm start
```

Miután ezekkel megvagy, nyisd meg a böngésződben a következő címet: [http://localhost:3000](http://localhost:3000) 

## Leírás

### Funkcionalitás
Ez egy "pénztárca" alkalmazás, ahová a felhasználó rögzítheti, hogy mennyi bevétele és kiadása volt,
valamint egy megjegyzést is meg tud adni a rendszerben.

#### Funkciók:
- új tétel felvitele
- tétel szerkesztése
- tétel törlése
- bevétel és kiadás külön tételként való kezelése
- tételek listázása
- megtakaritott pénz kijelzése
- legnagyobb költséggel járó hónap kijelzése
- véletlenszerű bevételek és költségek generálása 

### Véletlen értékeket generáló funkció

Létrehoztam egy funkciót, ami véletlen bevételekkel és költségekkel tölti fel az adatbázist, annak érdekében, hogy 
gyorsabban lehessen tesztelni

Az *src/state/application-state.js* fájl tartalmaz egy tömböt, amennyiben más random értékeket tartalmazó függvényt szeretnél futtatni, 
módosítsd az adatokat tároló objektumot:

```
  RANDOM_INFO = { // Random értékeket generáló függvénynek információs objektum
      datas_count: 100, // Ennyi darab random értéket generál
      max_cost: 15000, // Maximális költség forintban
      max_revenue : 20000, // Maximális bevétel forintban
      year: 2016, // Ettől az évtől kezdve generál
      month: 5 // Ettől a hónaptól kezdve generál
  }
```



## Licensz
Az applikáció az **ELTE Informatikai Kar**, **Adatbázisok a weben** nevű tantárgy beadandójaként készült.
Bárki szabadon felhasználhatja és terjesztheti, a forrás megjelölésével.

Budapest, 2017