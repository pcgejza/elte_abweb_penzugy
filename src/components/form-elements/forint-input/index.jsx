import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class ForintInput extends Component {

  render() {
    return (
        <div className="input-group">
          <input type="text" className="form-control" 
                 id="ertek" 
                 placeholder={this.props.placeholder} 
                 value={this.props.value}
                 onChange={e => this.props.ch(e)}
          />
          <span className="input-group-addon">Ft</span>
        </div>
    );
  }
}
