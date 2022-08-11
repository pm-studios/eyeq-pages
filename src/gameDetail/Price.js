import React, { Component } from 'react';

import { renderWebsite } from '../GameAPI';

import '../App.css';
import './Price.css'


export class Price extends Component {
  state = {
		visiblePurchasePopup: false,
  }

  constructor(props) {
    super(props)
  }

	handleClosePurchase = () => {
		this.setState({ visiblePurchasePopup: false });
  }
  
  handleOpenPurchase = () => {
    this.setState({ visiblePurchasePopup: true });
  }

  render() {
    const { game } = this.props;
    return (
      <div className="buy">
        <div className="padding-l-16">
          <h2 className="padding-t-16">Buy Now</h2>
          <div className="buyGroup1">
            <a href={renderWebsite(game.websites, 13)} target="_blank"><img src={'/images/button_store_steam@3x.png'} /></a>
            <img src={'/images/button_store_ubi@3x.png'} />
          </div>
          <div className="buyGroup2">
            <img src={'/images/button_store_aki@3x.png'} />
          </div>
        </div>
      </div>
    );
  }
}

export default Price;
