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

  @computed get meals() {
    const date = this.localDateString
    const { entries } = this

    const entriesByDate = 
      entries.filter(entry => entry.date === date)

    const meals = new Set(entriesByDate.map(entry => entry.meal))

    const itemsByMeal = new Map()
    meals.forEach(meal => itemsByMeal.set(meal, entriesByDate.filter(entry=>entry.meal === meal)))
    
    return itemsByMeal
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
    
    const meals = new Set(revenueEntries.map(entry => entry.revenue))

    const itemsByRevenue = new Map()
    meals.forEach(revenue => itemsByRevenue.set(revenue, revenueEntries.filter(entry=>entry.revenue === revenue)))
    
    return itemsByRevenue
  }
  
  // Visszaadja az összes kiadást
  @computed get costs() {
    const { costEntries } = this
    
    const costs = new Set(costEntries.map(entry => entry.cost))

    const itemsByCosts = new Map()
    costs.forEach(cost => itemsByCosts.set(cost, costEntries.filter(entry=>entry.cost === cost)))
    
    return itemsByCosts
  }
  
  @action updateCostEntry(entry, data) {
    Object.assign(entry, data)
  }
  
  @action updateRevenueEntry(entry, data) {
    Object.assign(entry, data)
  }
  
}