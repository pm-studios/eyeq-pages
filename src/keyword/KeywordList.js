import React, { Component } from 'react';
import { connect } from "react-redux";

import KeywordCard from './KeywordCard'
import './KeywordList.css';

export class KeywordList extends Component {
	render() {
		const { games } = this.props;
		return (
			<div className="ratingList">
				{games.map((game, i) => (
					<KeywordCard key={i} item={game} />
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
)(KeywordList);
