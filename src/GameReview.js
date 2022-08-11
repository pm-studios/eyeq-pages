import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Moment from 'react-moment';
import { connect } from "react-redux";

import Overlay from './common/Overlay'
import ReviewEditor from './common/ReviewEditor.js';
import { GameCoverImg, GameBannerImg } from './GameAPI';
import './GameReview.css';

import * as authActions from "./store/modules/auth";
import * as gamesActions from "./store/modules/games";

export class GameReview extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.item.my_review && this.props.item.my_review.content
    }
  }

  handleRated = (rate) => {
		const { logged, needLogin, item, createRating, updateRating } = this.props;
		if(!logged) {
			needLogin(true);
			return;
		}
		const value = rate
		const slug = item.slug;
		if(item.my_rating) {
			const id = item.my_rating.id;
			updateRating({slug, id, value});
			return;
		}
		createRating({slug, value});
  }

  handleContentChange = (content) => {
    this.setState({
      content: JSON.stringify(content),
    });
  }

  handlePost = () => {
		const { logged, needLogin, item, createReview, updateReview, onClose, onChangeReview } = this.props;
		if(!logged) {
			needLogin(true);
			return;
		}

    const content = this.state.content;
    if(!content) return;

		const slug = item.slug;
		if(item.my_review) {
			const id = item.my_review.id;
			updateReview({slug, id, content});
    }
    else
      createReview({slug, content});
    
    onChangeReview(JSON.parse(content).blocks[0].text);
    onClose();
  }
  
  render() {
    const { item, onClose } = this.props;
    return (
      <Overlay>
        <div className="gameReview" >
          <div className="gr-bg" onClick={onClose}/>
          <div className="gr-container" >
            <div className="gr-banner" >
              <GameBannerImg gameData={item} />
            </div>
            <div className="gr-cover" >
              <GameCoverImg gameData={item} />
            </div>
            <div className="gr-info" >
              <Rating
                emptySymbol={<img src="/images/rate_star_empty_sm.svg" className="gr-icon" alt="" />}
                fullSymbol={<img src="/images/rate_star_full_sm.svg" className="gr-icon" alt="" />}
                fractions={2}
                initialRating={item.my_rating? parseFloat(item.my_rating.value) : 0}
                style={{...Rating.style, 'marginLeft': '-3px'}}
                onChange={this.handleRated}
              />
              <h1>{this.props.item.title}</h1>
              <p><Moment format='Do MMM, YYYY'>{item.released_at}</Moment> • {item.platforms}</p>
            </div>
            <div className="divider" />

            <div>
              <ReviewEditor content={item.my_review && item.my_review.content} onContentChange={this.handleContentChange.bind(this)}/>
            </div>

            <div className="buttons">
              <div onClick={onClose} className="close">
                Cancel
              </div>
              <div onClick={this.handlePost} className="submit">
                Post Review
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    )
  }
}

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
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
    createReview: ({slug, content}) => {
      dispatch(gamesActions.createReview({slug, content}));
    },
    updateReview: ({slug, id, content}) => {
      dispatch(gamesActions.updateReview({slug, id, content}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameReview);
