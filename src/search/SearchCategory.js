import React, { Component } from 'react';

import TextMenu from '../common/TextMenu'
import './SearchCategory.css';

const categories = [
	{
		id: 1,
		title: "Release Date",
	},
	{
		id: 2,
		title: "Top Critic Rating",
	},
	{
		id: 3,
		title: "Adventure",
	},
	{
		id: 4,
		title: "Action",
	},
	{
		id: 5,
		title: "Role-playing",
	},
	{
		id: 6,
		title: "Strategy",
	},
	{
		id: 7,
		title: "Sports",
	},
	{
		id: 8,
		title: "Xbox One",
	},
	{
		id: 9,
		title: "Nintendo Switch",
	},
	{
		id: 10,
		title: "Indie",
	}
]

export default class SearchCategory extends Component {
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
