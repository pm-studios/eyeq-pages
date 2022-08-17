import React, { Component } from 'react';

import '../App.css';
import './Feature.css'


export class Feature extends Component {
  constructor(props) {
    super(props)
  }

  getFeatureCell = (feature) => {
    var imgSrc;
    var title;

    switch (feature) {
      case 1:
        imgSrc = "/eyeq-pages/images/feature_single.svg";
        title = "Single Player"
        break;

      case 2:
        imgSrc = "/eyeq-pages/images/feature_local.svg";
        title = "Local Multi Player"
        break;
        
      case 3:
        imgSrc = "/eyeq-pages/images/feature_online.svg";
        title = "Online Multi Player"
        break;
        
      case 4:
        imgSrc = "/eyeq-pages/images/feature_pvp.svg";
        title = "PvP"
        break;
        
      case 5:
        imgSrc = "/eyeq-pages/images/feature_controller.svg";
        title = "Controller Support"
			  break;
		}

		return (
      <div className="fc-cell horizontal-direction">
        <img src={imgSrc} />
        <p className="vertical-center padding-l-8">{title}</p>
      </div>
    );
	}
  
  render() {
    const myFeaturesList = [1,2,3,4,5];
    return (
      <div className="feature">
        <h2>Features</h2>
        <div className="feature-container">
	        {myFeaturesList.map((feature) => (
            <div key={feature}>
              {this.getFeatureCell(feature)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Feature;
