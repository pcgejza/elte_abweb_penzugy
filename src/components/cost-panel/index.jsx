import React, { Component } from 'react';
import { observer } from 'mobx-react'

@observer(['state'])
class CostPanel extends Component {
  render() {

    const { title, items } = this.props
    const tableRows = items ? items.map((item, i) => 
      <tr key={i}>
        <td>{item.ertek}</td>
        <td>{item.datum}</td>
        <td>{item.megjegyzes}</td>
        <td>
            <button type='button' className="btn btn-danger"
                onClick={() => this.props.state.deleteCostEntry(item)}
                >
                <i className="glyphicon glyphicon-trash"></i>
            </button>
            <button type='button' className="btn btn-primary"
                onClick={() => this.props.state.selectCostEntry(item)}
                >
                <i className="glyphicon glyphicon-pencil"></i>
            </button>
        </td>
      </tr>
      ) : <tr><td colSpan="4">Nincs rögzített érték</td></tr>
    
    return (
      <div className="panel panel-primary panel-costs">
        <div className="panel-heading">{title}</div>
        <table className="table table-striped table-hover ">
            <thead>
                <tr>
                    <th>Érték</th>
                    <th>Dátum</th>
                    <th>Megjegyzés</th>
                    <th>Műveletek</th>
                </tr>
            </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table> 
      </div>
    );
  }
}

export default CostPanel;

