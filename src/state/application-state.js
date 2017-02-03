import { observable, computed, action, reaction } from 'mobx'
import uuid from 'uuid'

export default class AppState {
  _id = 10
  
  RANDOM_INFO = { // Random értékeket generáló függvénynek információs objektum
      datas_count: 100, // Ennyi darab random értéket generál
      max_cost: 15000, // Maximális költség forintban
      max_revenue : 20000, // Maximális bevétel forintban
      year: 2016, // Ettől az évtől kezdve generál
      month: 5 // Ettől a hónaptól kezdve generál
  }
  
  @observable date = new Date()
  @observable selectedRevenueEntry = null
  @observable selectedCostEntry = null
  @observable myMoney = 0
  @observable maxCostsText = ''
  @observable revenueEntries = [
      
  ] // Bevételek
  @observable costEntries = [
      
  ] // Kiadások

  constructor() {
      
  }

  @computed get uiState() {
    if(this.selectedRevenueEntry){
        return 'revenue_form';
    }
    
    if(this.selectedCostEntry){
        return 'cost_form';
    }
      
    return 'list'
  }

  // Bevétel elem törlése
  @action deleteRevenueEntry(entry) {
    const index = this.revenueEntries.indexOf(entry)
    this.revenueEntries.splice(index, 1)
  }

  // Kiadás elem törlése
  @action deleteCostEntry(entry) {
    const index = this.costEntries.indexOf(entry)
    this.costEntries.splice(index, 1)
  }
  
  // Bevétel elem kiválasztása
  @action selectRevenueEntry(revenueEntry) {
    this.selectedRevenueEntry = revenueEntry
  }
  
  // Kiadás elem kiválasztása
  @action selectCostEntry(costEntry) {
    this.selectedCostEntry = costEntry
  }
  
  // Új bevétel elem hozzáadása
  @action addRevenueEntry(data) {
    data.id = uuid.v1()
    this.revenueEntries.push(data)
  }
  
  // Új kiadás elem hozzáadása
  @action addCostEntry(data) {
    data.id = uuid.v1()
    this.costEntries.push(data)
  }
  
  // Visszaadja az összes bevételt
  @computed get revenues() {
    const { revenueEntries } = this
        
    return revenueEntries
  }
  
  // Visszaadja az összes kiadást
  @computed get costs() {
    const { costEntries } = this
    
    return costEntries
  }
  
  @action updateCostEntry(entry, data) {
    Object.assign(entry, data)
  }
  
  @action updateRevenueEntry(entry, data) {
    Object.assign(entry, data)
  }
  
  // A függvény visszaadja, hogy mennyi pénzem van jelenleg
  @action calcMyMoney(){
        var money = 0;
        const { costEntries, revenueEntries } = this
      
        revenueEntries.forEach(function(item,i){
           money += parseInt(item.ertek)
        });
        
        costEntries.forEach(function(item,i){
           money -= parseInt(item.ertek)
        });
        
        this.myMoney = this.moneyFormat(money);
  }
  
    // Véletlen adatokkal töltjük fel az "adatbázist"
    @action clearDatasAndSetRandomValues(){
        this.revenueEntries = [];
        this.costEntries = [];
        
        var dateFrom = new Date(this.RANDOM_INFO.year, this.RANDOM_INFO.month-1, 1);
        var dateTo = new Date();
        
        for(var i=0; i<this.RANDOM_INFO.datas_count; i++){
            this.revenueEntries.push(  
                {
                  'id' : i+1,
                  'ertek' : this.randomMoney(this.RANDOM_INFO.max_revenue),
                  'datum' : this.randomDate(dateFrom, dateTo),
                  'megjegyzes' : 'Bevétel '+(i+1),
                }
            )
        }
        for(var i=0; i<this.RANDOM_INFO.datas_count; i++){
            this.costEntries.push(  
                {
                  'id' : i+1,
                  'ertek' : this.randomMoney(this.RANDOM_INFO.max_cost),
                  'datum' : this.randomDate(dateFrom, dateTo),
                  'megjegyzes' : 'Kiadás '+(i+1),
                }
            )
        }
    }
    
    // Véletlen dátumot generáló függvény
    randomDate(start, end) {
        return this.formatDate(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
    }
    
    // Véletlen pénzösszeget generáló függvény
    randomMoney(max){
        return Math.floor((Math.random() * max) + 200);
    }
    
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

  
    // Véletlen adatokkal töltjük fel az "adatbázist"
    @action calcMyMaxCosts(){
        var text = '';
        const { costEntries, revenueEntries } = this
        
        var costsByMonths = []
        var month
        
        costEntries.forEach(function(item,i){
            month = item.datum.substring(0, 7)
            if(!costsByMonths[month]){
                costsByMonths[month] = 0;
            }
            costsByMonths[month] += parseInt(item.ertek)
        })
        
        if(Object.keys(costsByMonths).length > 0){
            // Maximum keresés 
            var maxValIndex = null;
            for(var k in costsByMonths){
                if(maxValIndex == null || costsByMonths[maxValIndex] < costsByMonths[k]){
                    maxValIndex = k;
                }
            }

            var maxVal = this.moneyFormat(costsByMonths[maxValIndex]);
            
            text = 'A legtöbb költséged '+maxValIndex+' hónapban volt, ami '+maxVal+'Ft';
        }else{
            text = 'Nem volt még költséged'
        }
        
        this.maxCostsText = text
    }
    
    moneyFormat(money){
        return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")
    }
  
}