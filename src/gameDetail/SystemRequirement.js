import React, { Component } from 'react';

import '../App.css';
import './SystemRequirement.css'


export class SystemRequirement extends Component {
  constructor(props) {
    super(props)
  }

  requirementDetail = (cpu, memory, video, storage) => {
    return (
      <div>
        <p><b>CPU:</b> {cpu}</p>
        <p><b>Memory:</b> {memory}</p>
        <p><b>Video:</b> {video}</p>
        <p><b>Storage:</b> {storage}</p>
      </div>
    )
  }
  
  render() {
    return (
      <div className="requirement" >
        <h2>System Requirements</h2>
        <div>
          <h3>MINIMUM</h3>
          {this.requirementDetail(
            "Intel i5-4690K @ 3.5 GHz or AMD FX-8320 @ 3.5 GHz", 
            "8 GB RAM", 
            "Nvidia GeForce GTX 660 or Radeon R7 370 (2 GB VRAM)", 
            "26 GB")}
        </div>
        <div>
          <h3>RECOMMENDED</h3>
          {this.requirementDetail(
            "Intel i5-4690K @ 3.5 GHz or AMD FX-8320 @ 3.5 GHz", 
            "8 GB RAM", 
            "Nvidia GeForce GTX 660 or Radeon R7 370 (2 GB VRAM)", 
            "26 GB")}
        </div>
      </div>
    );
  }
}

export default SystemRequirement;
