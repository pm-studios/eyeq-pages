import React, { Component } from 'react';
import { connect } from "react-redux";

import CategoryCard from './CategoryCard'
import './CategoryList.css';

export class CategoryList extends Component {
	render() {
		const { games } = this.props;
		return (
			<div className="ratingList">
				{games.map((game, i) => (
					<CategoryCard key={i} item={game} />
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
)(CategoryList);
