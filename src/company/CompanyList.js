import React, { Component } from 'react';
import { connect } from "react-redux";

import CompanyCard from './CompanyCard'
import './CompanyList.css';

export class CompanyList extends Component {
	render() {
		const { games } = this.props;
		return (
			<div className="ratingList">
				{games.map((game, i) => (
					<CompanyCard key={i} item={game} />
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
)(CompanyList);
