import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchCard from './SearchCard'
import './SearchList.css';

export class SearchList extends Component {
	render() {
		const { games } = this.props;
		return (
			<div className="ratingList">
				{games.map((game, i) => (
					<SearchCard key={i} item={game} />
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
)(SearchList);
