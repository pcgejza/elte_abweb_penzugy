import React, { Component } from 'react';
import { observer } from 'mobx-react'
import TableButtons from '../../form-elements/forint-input/'

@observer(['state'])
class MyMoneyPanel extends Component {
  render() {

    return (
        <h3>Ennyi pénzem van jelenleg: 
            <span className="label label-primary">{this.props.myMoney} Ft</span>
        </h3>
    );
  }
}

export default MyMoneyPanel;

