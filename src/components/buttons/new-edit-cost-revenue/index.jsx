import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class FormButtons extends Component {

  render() {
    return (
        <div className="form-group">
            <div className="btn-group pull-right">
                <button type="button" className="btn btn-default" onClick={e => this.props.onBack()}>
                   <i className="glyphicon glyphicon-menu-left"></i> Vissza     
                </button>
                <button type="submit" className="btn btn-primary">
                    <i className="glyphicon glyphicon-floppy-disk"></i> Rögzítés
                </button>
            </div>
        </div>
    );
  }
}
