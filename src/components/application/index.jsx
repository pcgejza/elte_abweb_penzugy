import React, { Component } from 'react';
import NavBar from '../navbar/'
import CostOfRevenueList from '../cost-of-revenue-list/'
import RevenueEntryForm from '../revenue-entry-form/'
import CostEntryForm from '../cost-entry-form/'

import { observer } from 'mobx-react'

let id = 10

@observer(['state'])
class Application extends Component {

  handleAddRevenueClick(e) {
    this.props.state.selectRevenueEntry({})
  }

  handleAddCostClick(e) {
    this.props.state.selectCostEntry({})
  }

  handleRevenueEntrySubmission(data) {
    if (this.props.state.selectedRevenueEntry.id) {
      this.props.state.updateRevenueEntry(this.props.state.selectedRevenueEntry, data)
      this.props.state.selectRevenueEntry(null)
    } else {
      this.props.state.addRevenueEntry(data)
      this.props.state.selectRevenueEntry(null)
    }
  }
  
  handleCostEntrySubmission(data) {
    if (this.props.state.selectedCostEntry.id) {
      this.props.state.updateCostEntry(this.props.state.selectedCostEntry, data)
      this.props.state.selectCostEntry(null)
    } else {
      this.props.state.addCostEntry(data)
      this.props.state.selectCostEntry(null)
    }
  }

  handleCancelEntry() {
    this.props.state.selectRevenueEntry(null)
    this.props.state.selectCostEntry(null)
  }

  handleDeleteEntry() {
    this.props.state.deleteEntry(this.props.state.selectedEntry)
    this.props.state.selectEntry(null)
  }

  render() {
      console.log('Current state:', this.props.state.uiState)
    const date = this.props.state.localDateString

    const compMapping = {
      'list': <CostOfRevenueList 
        revenues={this.props.state.revenues}
        costs={this.props.state.costs} 
        handleAddRevenueClick={e => this.handleAddRevenueClick(e)}
        handleAddCostClick={e => this.handleAddCostClick(e)}
        myMoney={this.props.state.calcMyMoney()}
      />,
      'revenue_form': <RevenueEntryForm 
        onSubmit={data => this.handleRevenueEntrySubmission(data)}
        entry={this.props.state.selectedRevenueEntry} 
        onBack={() => this.handleCancelEntry()}
        onDelete={() => this.handleDeleteEntry()}
      />,
      'cost_form': <CostEntryForm 
        onSubmit={data => this.handleCostEntrySubmission(data)}
        entry={this.props.state.selectedCostEntry} 
        onBack={() => this.handleCancelEntry()}
        onDelete={() => this.handleDeleteEntry()}
      />
    }
    const comp = compMapping[this.props.state.uiState]

    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>Bevételek és kiadások</h1>
          <div className="row">
          
          </div>

          {comp}

        </div>
        
      </div>
    );
  }
}

export default Application;
