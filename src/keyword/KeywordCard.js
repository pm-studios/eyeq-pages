import React, { Component } from 'react';
import Rating from 'react-rating';
import Moment from 'react-moment';
import { connect } from "react-redux";

import GameReview from '../GameReview'
import { GameCoverImg } from '../GameAPI';
import './KeywordCard.css';

import * as authActions from "../store/modules/auth";
import * as gamesActions from "../store/modules/games";

export class KeywordCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleReviewWindow: false,
			review: ''
		}

		this.randomPredict = (2.0 + Math.random() * (5.0 - 2.0)).toFixed(1);
	}

	componentDidMount() {
		const { item } = this.props;
		if(item.my_review)
			this.handleChangeReview(JSON.parse(item.my_review.content).blocks[0].text);
	}

	componentDidUpdate(prevProps, prevState) {
		const { item } = this.props;
		if(prevState.review === '' && item.my_review)
			this.handleChangeReview(JSON.parse(item.my_review.content).blocks[0].text);
	}

	handleChangeReview = (review) => {
		this.setState({ review });
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

	handleOpenComment = () => {
		const { logged, needLogin } = this.props;
		if(!logged) {
			needLogin(true);
			return;
		}
		this.setState({ visibleReviewWindow: true });
	}

	handleCloseComment = () => {
		this.setState({ visibleReviewWindow: false });
	}

	renderReviewWindow = () => (
		<GameReview item={this.props.item} onClose={this.handleCloseComment} onChangeReview={this.handleChangeReview.bind(this)}/>
	)

	render() {
		const { item } = this.props;
		return (
			<div className="ratingCard">			
				<div className="cover">
					<a href={'/game/' + this.props.item.slug} target="_self">
						<GameCoverImg gameData={item} />
					</a>
				</div>
				<div className="rc-container horizontal-direction">
					<div className="rc-left">
						<h1>{item.title}</h1>
						<p><Moment format='Do MMM, YYYY'>{item.released_at}</Moment> • {item.platforms}</p>
						<Rating
							emptySymbol={<img src="/eyeq-pages/images/rate_star_empty.svg" className="icon" alt="" />}
							fullSymbol={<img src="/eyeq-pages/images/rate_star_full.svg" className="icon" alt="" />}
							fractions={2}
							initialRating={item.my_rating? parseFloat(item.my_rating.value) : 0}
							style={{ ...Rating.style, 'marginLeft': '-3px', 'paddingTop': '7px' }}
							onChange={this.handleRated}
						/>
					</div>
					<div className="rc-right">
						<div className="predict horizontal-direction" >
              				<div className="label vertical-center">Predicted</div>
              				<div className="score vertical-center">{this.randomPredict}</div>
            			</div>
						<div className="review" onClick={this.handleOpenComment}>
							<img src={'/eyeq-pages/images/button_write_review.svg'} alt='icon' />
							<p>Review</p>
						</div>
					</div>
				</div>
				<div className="bottomLine" />
				{this.state.visibleReviewWindow && this.renderReviewWindow()}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	games: state.games.games,
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
        }
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordCard);
