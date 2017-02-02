import React, { Component } from 'react';
import { observer } from 'mobx-react'

@observer(['state'])
class RevenuePanel extends Component {
  render() {

    const { title, items } = this.props
    const tableRows = items.map((item, i) => 
      <tr key={i} onClick={() => this.props.state.selectRevenueEntry(item)}>
        <td>{item.ertek}</td>
        <td>{item.datum}</td>
        <td>{item.megjegyzes}</td>
        <td>
            <button type='button' 
            onClick={() => this.props.state.deleteRevenueEntry(item)}
            className="btn btn-danger">Törlés</button>
        </td>
      </tr>
    )


    return (
      <div className="panel panel-primary panel-revenues">
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

export default RevenuePanel;

