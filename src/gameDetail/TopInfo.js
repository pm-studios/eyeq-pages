import React, { Component } from 'react';
import { connect } from "react-redux";
import Rating from 'react-rating';
import Moment from 'react-moment';

import * as authActions from "../store/modules/auth";
import * as gamesActions from "../store/modules/games";
import { GameBannerImg, GameCoverImg } from '../GameAPI';
import Overall from './Overall';

import './TopInfo.css'
import '../App.css'

export class TopInfo extends Component {
  constructor(props) {
    super(props)

    this.randomPredict = (2.0 + Math.random() * (5.0 - 2.0)).toFixed(1);
    this.wantCount = (99 + Math.random() * (3000 - 99)).toFixed(0);
  }
	
  handleRated = (rate) => {
		const { logged, needLogin, game, createRating, updateRating } = this.props;
		if(!logged) {
			needLogin(true);
			return;
		}
		const value = rate
		const slug = game.slug;
		if(game.my_rating) {
			const id = game.my_rating.id;
			updateRating({slug, id, value});
			return;
		}
		createRating({slug, value});
  }

  render() {
    return (
      <div className="topInfo">
        <div className="ti-cover" >
          <GameCoverImg gameData={this.props.gameData} />
        </div>
        <div className="ti-info horizontal-direction" >
          <div>
            <div className="predict horizontal-direction" >
              <div className="label vertical-center">Predicted</div>
              <div className="score vertical-center">{this.randomPredict}</div>
            </div>
            <Rating
              emptySymbol={<img src="/eyeq-pages/images/rate_star_empty.svg" className="icon" />}
              fullSymbol={<img src="/eyeq-pages/images/rate_star_full.svg" className="icon" />}
              fractions={2}
              initialRating={this.props.gameData.my_rating? parseFloat(this.props.gameData.my_rating.value) : 0}
              style={{...Rating.style, 'marginLeft': '-3px'}}
              onChange={this.handleRated} />
            <h1>{this.props.gameData.title}</h1>
            <p>{this.props.gameData.platforms}</p>
          </div>
          <div>
            <Overall />
          </div>
        </div>
        <div className="margin-t-16">
          <div className="ti-want horizontal-center">
            <img src="/eyeq-pages/images/icon_want.svg" />
            <p className="vertical-center">{this.wantCount} wants</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.auth.logged,
  needed: state.auth.needed,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => {
  return {
    needLogin: (needed) => {
      dispatch(authActions.needLogin(needed));
    },
    createRating: ({slug, value}) => {
      dispatch(gamesActions.createRating({slug, value}));
    },
    updateRating: ({slug, id, value}) => {
      dispatch(gamesActions.updateRating({slug, id, value}));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopInfo);
