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
      
    var costPanel, revenuePanel;
      
    if(this.costs.size > 0){
        costPanel = Array.from(this.costs.keys()).map(cost => 
          <CostPanel 
            title='Kiadások' 
            items={this.costs.get(cost)}
            key={cost}
            handleAddCostClick={e => this.props.handleAddCostClick(e)}
          />
        )
    }else{
        costPanel = <CostPanel 
            title='Kiadások' 
            items=''
            key=''
            handleAddCostClick={e => this.props.handleAddCostClick(e)}
          />
    }
    
    if(this.revenues.size > 0){
        revenuePanel = Array.from(this.revenues.keys()).map(revenue => 
            <RevenuePanel 
              title='Bevételek' 
              items={this.revenues.get(revenue)}
              key={revenue}
              handleAddRevenueClick={e => this.props.handleAddRevenueClick(e)}
            />
        )
    }else{
        revenuePanel =  <RevenuePanel 
              title='Bevételek' 
              items=''
              key=''
              handleAddRevenueClick={e => this.props.handleAddRevenueClick(e)}
            />
    }

    return (
        <div className="row">
          {revenuePanel}
          {costPanel}
        </div> 
    );
  }
}
