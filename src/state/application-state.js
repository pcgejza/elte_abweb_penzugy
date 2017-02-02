import { observable, computed, action, reaction } from 'mobx'
import uuid from 'uuid'

export default class AppState {
  _id = 10
  @observable date = new Date()
  @observable selectedRevenueEntry = null
  @observable selectedCostEntry = null
  @observable revenueEntries = [
        {
          'id' : 1,
          'ertek' : 1500,
          'datum' : '2016.10.14',
          'megjegyzes' : 'Eladtam a flakonokat',
      }
  ] // Bevételek
  @observable costEntries = [
       {
          'id' : 1,
          'ertek' : 6200,
          'datum' : '2016.10.20',
          'megjegyzes' : 'Auchan vásárlás',
      },
       {
          'id' : 2,
          'ertek' : 3252,
          'datum' : '2016.10.20',
          'megjegyzes' : 'Auchan 213',
      }
  ] // Kiadások
  dates = new Set()


  constructor() {
    reaction(
      () => this.localDateString,
      date => this.getEntriesForDate(date) 
    )
  }

  getEntriesForDate(date) {
    if (this.dates.has(date)) return
  }

  @computed get localDateString() {
    return this.date.toLocaleDateString()
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

  @action selectEntry(entry) {
    this.selectedEntry = entry
  }

  @action decreaseDate() {
    this.date = new Date(this.date.getTime() - 1000*60*60*24)
  }

  @action increaseDate() {
    this.date = new Date(this.date.getTime() + 1000*60*60*24)
  }


  @action deleteRevenueEntry(entry) {
    const index = this.revenueEntries.indexOf(entry)
    this.revenueEntries.splice(index, 1)
  }

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
      
        return money;
  }
  
}