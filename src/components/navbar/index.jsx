import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
        <div className="navbar-header">
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Pénztárca</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
            <li className="active"><a href="#" onClick={e => this.props.onBack()}>Bevételek-kiadások <span className="sr-only">(current)</span></a></li>
            <li><a href="#"  onClick={e => this.props.state.clearDatasAndSetRandomValues()}>Táblák feltöltése véletlenszerű értékekkel</a></li>
            
            </ul>
        </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

