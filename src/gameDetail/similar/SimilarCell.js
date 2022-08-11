import React, { Component } from 'react';

import '../../App.css';
import './SimilarCell.css'


export class SimilarCell extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="similarCell">
        <div className="similarCell-cover">
          <img src={this.props.thumb} alt="" />
        </div>
        <div className="similarCell-title">
          {this.props.title}
        </div>
        <p>{this.props.genres}</p>
        <div className="similarCell-price">
          <br/>
        </div>
      </div>
    );
  }
}

export default SimilarCell;
