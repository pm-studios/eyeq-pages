import React, { Component } from 'react';
import { connect } from "react-redux";
import GameAPI from '../GameAPI.js'
import RatingCard from './RatingCard'
import './RatingList.css';

export class RatingList extends Component {
	render() {
		const { games } = GameAPI.all();
		return (
			<div className="ratingList">
				{GameAPI.all().map((game, i) => (
					<RatingCard key={i} item={game} />
				))}
			</div>
 		)
 	}
}

const mapStateToProps = state => ({
	games: state.games.games,
	logged: state.auth.logged
});

export default connect(
	mapStateToProps
)(RatingList);
