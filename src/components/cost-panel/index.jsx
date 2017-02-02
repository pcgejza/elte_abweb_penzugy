import React, { Component } from 'react';
import { observer } from 'mobx-react'
import TableButtons from '../buttons/table/'

@observer(['state'])
class CostPanel extends Component {
  render() {
      
    const { title, items } = this.props
    
    var tableRows = [];
    if(items.length > 0){
        var _this = this;
        items.forEach(function(item,i){
           tableRows.push(<tr key={i}>
            <td>{item.ertek}</td>
            <td>{item.datum}</td>
            <td>{item.megjegyzes}</td>
            <td>
                <TableButtons
                    deleteEntry={() => _this.props.state.deleteCostEntry(item)}
                    selectEntry={() => _this.props.state.selectCostEntry(item)}
                    item={item}
                />
            </td>
          </tr>)
        });
    }else{
        tableRows = <tr><td colSpan="4">Nincs rögzített érték</td></tr>
    }
    
    return (
      <div className="panel panel-primary panel-costs">
        <div className="panel-heading">
            {title}
            <button className="btn btn-success add-cost-button pull-right"
                onClick={e => this.props.handleAddCostClick(e)}>
                <i className="glyphicon glyphicon-plus"></i>
            </button>
        </div>
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

