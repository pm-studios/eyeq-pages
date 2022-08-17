import React, { Component } from 'react';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom'
import { GameCoverImg, GameBannerImg } from '../GameAPI';
import './RecommendationCard.css';


export default class RecommendationCard extends Component {  
  constructor(props) {
		super(props)
    
    this.state = {
			redirect: false,
		}

    this.randomPredict = (3.5 + Math.random() * (5.0 - 3.5)).toFixed(1);
  }
  
  handleClickCard = () => {
		this.setState({ redirect: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to={'/game/' + this.props.item.slug}/>;			
    	}
      
    return (
        <div className="recommendationCard" onClick={this.handleClickCard}>
          <div className="banner" >
            <GameBannerImg gameData={this.props.item} />
          </div>
          <div className="rc-container" >            
            <div className="cover" >
              <GameCoverImg gameData={this.props.item} />
            </div>
            <div className="vertical-direction">
            <div className="rc-predict" >
              <div className="label">Predicted</div>
              <div className="score">{this.randomPredict}</div>
            </div>
            <div className="rc-info" >
              <h1>{this.props.item.title}</h1>
              <p>{this.props.item.platforms}</p>
              <p><Moment format='Do MMM, YYYY'>{this.props.item.released_at}</Moment></p>
            </div>
            </div>
            <div className="divider" />
            <div className="reason" >
              <p>{this.props.item.categories.replace(",", ", ")}</p>
            </div>
          </div>
        </div>
    )
  }
}
