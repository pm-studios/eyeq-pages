import React, { Component } from 'react';

import TextMenu from '../common/TextMenu'
import './RecommendationFilter.css';

const categories = [
	{
		id: 1,
		title: "New games in 2018",
	},
	{
		id: 2,
		title: "Upcoming games in 2019",
	},
	{
		id: 3,
		title: "Playstation 4",
	},
	{
		id: 4,
		title: "Xbox One",
	},
	{
		id: 5,
		title: "Nintendo Switch",
	},
	{
		id: 6,
		title: "PC",
	}
]

export default class RecommendationFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItemId: 1
		}
	}
		
	onItemClick = (itemId) => {
		this.setState({ activeItemId: itemId });
	}

	render() {
		return (
			<div className="recommendationFilter">
				<div className="container">
					<h1>Platform</h1>
					<TextMenu
						menus={categories}
						onItemClick={this.onItemClick}
						activeItemId={this.state.activeItemId} />
				</div>
			</div>
		)
	}
}
