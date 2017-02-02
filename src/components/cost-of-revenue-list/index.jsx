import React, { Component } from 'react';
import RevenuePanel from '../revenue-panel/'
import CostPanel from '../cost-panel/'

export default class CostOfRevenueList extends Component {

  get revenues() {
    return this.props.revenues
  }
  
  get costs() {
    return this.props.costs
  }

  render() {
    const revenuePanel = Array.from(this.revenues.keys()).map(revenue => 
      <RevenuePanel 
        title='Bevételek' 
        items={this.revenues.get(revenue)}
        key={revenue}
      />
    )
    
    var costPanel;
        
    if(this.costs.size > 0){
        costPanel = Array.from(this.costs.keys()).map(cost => 
          <CostPanel 
            title='Kiadások' 
            items={this.costs.get(cost)}
            key={cost}
          />
        )
    }else{
        costPanel = <CostPanel 
            title='Kiadások' 
            items=''
            key=''
          />
    }

    return (
        <div>
            <div className="row">
              {revenuePanel}
              {costPanel}
            </div> 
            <div className="row">
                <button className="btn btn-primary add-cost-button"
                  onClick={e => this.props.handleAddRevenueClick(e)}>+ Bevétel hozzáadása</button>
                <button className="btn btn-success add-revenue-button"
                  onClick={e => this.props.handleAddCostClick(e)}>+ Kiadás hozzáadása</button>
            </div>
       </div>
    );
  }
}
