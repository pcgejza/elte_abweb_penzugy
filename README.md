# Adatbázisok a web-en REACT-mobx beadandó

Based on [mobx-react-boilerplate](https://github.com/mobxjs/mobx-react-boilerplate).


## Telepítés és indítás

```
npm install
npm start
open http://localhost:3000
```

## Rövid leírás

### Véletlen értékeket generáló funkció

Létrehoztam egy funkciót, ami véletlen értékekkel tölti fel az adatbázist, annak érdekében, hogy 
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


