import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class TableButtons extends Component {

  render() {
    return (
        <div className="form-group">
            <button type='button' className="btn btn-danger"
                onClick={() => this.props.deleteEntry(this.props.item)}
                >
                <i className="glyphicon glyphicon-trash"></i>
            </button>
            <button type='button' className="btn btn-primary"
                onClick={() => this.props.selectEntry(this.props.item)}
                >
                <i className="glyphicon glyphicon-pencil"></i>
            </button>
        </div>
    );
  }
}
