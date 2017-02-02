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
      
    const costPanel = <CostPanel 
        title='Kiadások' 
        items={this.costs}
        handleAddCostClick={e => this.props.handleAddCostClick(e)}
      />
    
    const revenuePanel = <RevenuePanel 
          title='Bevételek' 
          items={this.revenues}
          handleAddRevenueClick={e => this.props.handleAddRevenueClick(e)}
        />

    return (
        <div className="row">
          {revenuePanel}
          {costPanel}
        </div> 
    );
  }
}
