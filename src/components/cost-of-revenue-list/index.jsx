import React, { Component } from 'react';
import RevenuePanel from '../revenue-panel/'
import CostPanel from '../cost-panel/'
import MyMoneyPanel from '../extras/my-money/'
import MyMaxCostsMonth from '../extras/my-max-cost-month/'

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
            <div>
                <div className="row">
                  {revenuePanel}
                  {costPanel}
                </div> 
                <hr />
                
                <MyMoneyPanel 
                    myMoney={this.props.myMoney}
                />
                <MyMaxCostsMonth 
                    maxCostsText={this.props.maxCostsText}
                />
            </div>
    );
  }
}
