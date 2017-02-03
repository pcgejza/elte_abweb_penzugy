import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import FormButtons from '../buttons/new-edit-cost-revenue/'

@observer
export default class RevenueEntryForm extends Component {

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

  render() {
    var ptitle = 'Bevétel ' + (this.id ? 'szerkesztése' : 'rögzítése')

    return (
      <div className="row">
        <h2>{ptitle}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Bevétel értéke</label>
              <input type="text" placeholder="Árbevétel értéke Ft-ban" id="ertek" className="form-control"
                value={this.ertek}  
                onChange={e => this.change('ertek', e.target.value) }
                required
              />
            </div>
            
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Bevétel ideje</label>
              <input type="text" placeholder="Mikor keletkezett az árbevétel?" id="datum" className="form-control"
                value={this.datum}  
                onChange={e => this.change('datum', e.target.value) }
                required
              />
              <span className="help-block">Helyes dátum formátum ÉÉÉÉ.HÓ.NAP</span>
            </div>
            
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Megjegyzés</label>
              <textarea className="form-control" 
                        value={this.megjegyzes}
                        onChange={e => this.change('megjegyzes', e.target.value) }></textarea>
              <span className="help-block">Itt megadhatsz egy leírást a bevételhez</span>
            </div>

            <FormButtons 
                onBack={e => this.props.onBack()}
            />
        </form>
      </div> 
    );
  }
}
