import React, { Component } from 'react';

import TextMenu from '../common/TextMenu'
import './CategoryCategory.css';

const categories = [
	{
		id: 1,
		title: "Release Date",
	},
	{
		id: 2,
		title: "Top Critic Rating",
	},
]

export default class CategoryCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItemId: props.activeSortId
		}
	}
		
	onItemClick = (itemId) => {
		this.setState({ activeItemId: itemId });
		this.props.changeSort(itemId);
	}

	render() {
		return (
			<div className="ratingCategory">
				<div className="container">
					<h1>Sort by</h1>
					<TextMenu
						menus={categories}
						onItemClick={this.onItemClick}
						activeItemId={this.state.activeItemId} />
				</div>
			</div>
		)
	}
}
