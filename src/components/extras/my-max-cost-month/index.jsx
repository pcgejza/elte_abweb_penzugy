import React, { Component } from 'react';
import { observer } from 'mobx-react'
import TableButtons from '../../form-elements/forint-input/'

@observer(['state'])
class MyMaxCostsMonth extends Component {
  render() {

    return (
        <h3>Melyik hónapban fogyott el a legtöbb pénz és mennyi?
            <span className="label label-danger">{this.props.maxCostsText}</span>
        </h3>
    );
  }
}

export default MyMaxCostsMonth;

