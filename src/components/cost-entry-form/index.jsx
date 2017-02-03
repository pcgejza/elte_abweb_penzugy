import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import FormButtons from '../buttons/new-edit-cost-revenue/'
import ForintInput from '../form-elements/forint-input/'

@observer
export default class CostEntryForm extends Component {

  @observable ertek = ''
  @observable datum = ''
  @observable megjegyzes = ''

  constructor(props) {
    super(props);
    this.copyEntry(this.props.entry)
  }

  @action copyEntry(entry) {
    Object.assign(this, entry)
  }

  @action change(key, value) {
    this[key] = value
  }

  isValid() {
    return true//this.food !== '' && this.quantity !== ''
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      const { ertek, datum, megjegyzes } = this
      this.props.onSubmit({
        ertek, datum, megjegyzes
      })
    }
  }
  
  changeErtek(e){
      this.change('ertek', e.target.value)
  }

  render() {
    var ptitle = 'Kiadás ' + (this.id ? 'szerkesztése' : 'rögzítése')
    
    return (
      <div className="row">
        <h2>{ptitle}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Kiadás értéke</label>
              <ForintInput 
                value={this.ertek}
                placeholder="Kiadás értéke Ft-ban"
                ch={e => this.changeErtek(e)}
                />
            </div>
            
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Kiadás keletkezésének ideje</label>
              <input type="text" placeholder="Mikor keletkezett a kiadás?" id="datum" className="form-control"
                value={this.datum}  
                onChange={e => this.change('datum', e.target.value) }
                required
              />
              <span className="help-block">Helyes dátum formátum ÉÉÉÉ.HÓ.NAP</span>
            </div>
            
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Megjegyzés</label>
              <textarea className="form-control" 
                        onChange={e => this.change('megjegyzes', e.target.value) }>{this.megjegyzes}</textarea>
              <span className="help-block">Itt megadhatsz egy leírást a költséghez</span>
            </div>
            
            <FormButtons 
                onBack={e => this.props.onBack()}
            />
        </form>
      </div> 
    );
  }
}
