import React, { Component } from 'react';

import '../App.css';
import './Overall.css'


export class Overall extends Component {
  constructor(props) {
    super(props)

    this.randomPredict = (2.0 + Math.random() * (5.0 - 2.0)).toFixed(1);
    this.reviewCount = (50 + Math.random() * (3000 - 50)).toFixed(0);
  }

  render() {
    return (
      <div className="overall4" style={{backgroundImage: 'url(/eyeq-pages/images/overall_rating.svg)'}}>
        <div className="overall4-container vertical-center">
          <h2>{this.randomPredict}</h2>
          <h3>{this.reviewCount}</h3>
        </div>
      </div>
    );
  }
}

export default Overall;
