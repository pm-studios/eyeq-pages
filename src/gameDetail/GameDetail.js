import React, { Component } from 'react';
import { connect } from "react-redux";
import Moment from 'react-moment';

import * as gamesActions from "../store/modules/games";
import { GameBannerImg, renderWebsite } from '../GameAPI';
import GameAPI from '../GameAPI.js'

import TopInfo from './TopInfo';
import Share from './Share';
import Price from './Price';
import Media from './media/Media';
import LiveStream from './liveStream/LiveStream';
import Pulse from './pulse/Pulse';
import Review from './review/Review';
import DLC from './dlc/DLC';
import Similar from './similar/Similar';
import ExpandableLabel from '../common/ExpandableLabel'

import '../App.css';
import './GameDetail.css'


export class GameDetail extends Component {
  constructor(props) {
    super(props)
    this.getDetailGame(this.props.match.params.slug);

    //console.log(this.props.games);
    ///console.log(this.props.recommends);
    //console.log(this.props.collects);

    this.state = {
			twitchUrl: '',
		};
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getDetailGame = (slug_) => {
    //const { getDetailGame } = this.props;
    //getDetailGame(slug);
    this.game = GameAPI.all().find(({ slug }) => slug === slug_);
	}
	  
  getThumbnailContent = (game) => {
    return (
      <img src={game.thumbnail} width={120} height={90}/>
    );
  }
  
  renderTime2Beat = (text) => {
    if(text === '' || text.split('|').length < 2) return '';

    let mode = text.split('|')[0];
    let seconds = parseInt(text.split('|')[1]);
    let sMode;
    
    switch (mode) {
      case 'hastly':
        sMode = 'Hasty';
        break;
      case 'normally':
        sMode = 'Normal';
        break;
      case 'completely':
        sMode = 'Complete';
        break;
      default:
        sMode = 'Normal';
        break;
    }

    return `${Math.round(seconds/3600)}h (${sMode} mode), `;
  }
  
  renderTime2Beats = (texts) => {
    return (
      String(texts).split(',').map((text) => this.renderTime2Beat(text))
    );
  }

  renderRatingImage = (rating_ref, index) => {
    if(rating_ref === '' || rating_ref.split('|').length < 2) return '';

    let kind = rating_ref.split('|')[0];
    let level = parseInt(rating_ref.split('|')[1]);
    let sImagePath = '/eyeq-pages/images/';

    if (kind === 'esrb') {
      sImagePath = `${sImagePath}ESRB_`;

      switch (level) {
        case 1:
          sImagePath = `${sImagePath}Pending.svg`;
          break;
        case 2:
          sImagePath = `${sImagePath}Everyone.svg`;
          break;
        case 3:
          sImagePath = `${sImagePath}Everyone.svg`;
          break;
        case 4:
          sImagePath = `${sImagePath}Everyone10.svg`;
          break;
        case 5:
          sImagePath = `${sImagePath}Teen.svg`;
          break;
        case 6:
          sImagePath = `${sImagePath}Mature17.svg`;
          break;
        case 7:
          sImagePath = `${sImagePath}Adult18.svg`;
          break;
        default:
          sImagePath = `${sImagePath}Pending.svg`;
          break;
      }
    }
    else if (kind === 'pegi') {
      sImagePath = `${sImagePath}PEGI_`;
        
      switch (level) {
        case 1:
          sImagePath = `${sImagePath}3.svg`;
          break;
        case 2:
          sImagePath = `${sImagePath}7.svg`;
          break;
        case 3:
          sImagePath = `${sImagePath}12.svg`;
          break;
        case 4:
          sImagePath = `${sImagePath}16.svg`;
          break;
        case 5:
          sImagePath = `${sImagePath}18.svg`;
          break;
        default:
          sImagePath = `${sImagePath}4.svg`;
          break;
      }
    }

    return (
      index > 0? <img src={sImagePath} className="padding-l-16" />
      : <img src={sImagePath} />
    );
  }

  renderRatingImages = (rating_refs) => {
    return (
        String(rating_refs).split(',').map((rating_ref, index) => rating_ref !== '' ? 
          this.renderRatingImage(rating_ref, index) : '')
    );
  }

  renderDLCs = (dlcs) => {
    if (dlcs.length == 0)
      return null
      
    return (
      <div>
        <div className="divider" />
        <DLC games={dlcs} />
      </div>
      );
  }

  render() {
    if(!this.game.summary) return null;

    return (
      <div className="gameDetail">
        <div className="banner">
          <GameBannerImg gameData={this.game} />
        </div>
        <div className="container">
          <TopInfo gameData={this.game} />
          <div className="infoGroup" >
            <div className="infoLeft" >
              <div className="padding-t-16"/>
              <ExpandableLabel lines={5} children={this.game.summary} />
              <div className="padding-t-16"/>
              <p><b>Release Date:</b> <Moment format='Do MMM, YYYY'>{this.game.released_at}</Moment></p>
              <p><b>Categories:</b> <ExpandableLabel lines={1} children={this.game.categories} urlPath={"category"} /></p>
              <p><b>Developer:</b> <ExpandableLabel lines={1} children={this.game.developers} urlPath={"company"} /></p>
              <p><b>Publisher:</b> <ExpandableLabel lines={1} children={this.game.publishers} urlPath={"company"} /></p>
              <p><b>Time to beat:</b> {this.renderTime2Beats(this.game.time_to_beat)}</p>
              <p><b>Tags:</b> <ExpandableLabel lines={1} children={this.game.tags} urlPath={"Keyword"} /></p>
              
              <div className="website padding-t-16 horizontal-direction" >
                <a href={renderWebsite(this.game.websites, 1)} target="_blank" className="vertical-center"> Official Website</a>
                <a href={renderWebsite(this.game.websites, 1)} target="_blank"><img src={'/eyeq-pages/images/icon_link.svg'} /></a>
              </div>

              <div className="padding-t-16" >
                {this.renderRatingImages(this.game.rating_refs)}
              </div>
            </div>
            
            <div className="infoRight">
              <Price game={this.game} />
              <Share />
            </div>
          </div>

          <div className="divider margin-t-16" />
          <Review game={this.game} />

          <div className="divider margin-t-16" />
          <LiveStream game={this.game} />

          <div className="divider margin-t-16" />
          <Media game={this.game} />

          {this.renderDLCs(this.game.dlc_games)}
          
          <div>
            <div className="divider" />
            <Similar games={this.game.similar_games} />
          </div>

          <div>
            <div className="divider" />
            <Pulse gameId={this.game.igdb_id} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  recommends: state.recommendation.games,
  collects: state.collection.ratings,
  game: state.games.game,
  logged: state.auth.logged,
  needed: state.auth.needed,
});

const mapDispatchToProps = dispatch => {
  return {
    getDetailGame: (slug) => {
      dispatch(gamesActions.getDetailGame(slug));
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
)(GameDetail);
