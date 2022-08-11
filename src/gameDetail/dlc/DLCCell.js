import React, { Component } from 'react';

import '../../App.css';
import './DLCCell.css'


export class DLCCell extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="dlcCell">
        <div className="dlcCell-cover">
          <img src={this.props.thumb} alt="" />
        </div>
        <div className="dlcCell-title">
          {this.props.title}
        </div>
        <p>$9.99</p>
      </div>
    );
  }
}

export default DLCCell;
