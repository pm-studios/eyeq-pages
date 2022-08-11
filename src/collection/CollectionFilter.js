import React, { Component } from 'react';
import TextMenu from '../common/TextMenu'
import './CollectionFilter.css';


const filters = [
	{
		id: 1,
		title: "Rate Date"
	},
	{
		id: 2,
		title: "Rating"
	},
]


export default class CollectionFilter extends Component {
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
			<div className="collectionFilter">
				<div className="container">
					<h1>Sort by</h1>
					<TextMenu
						menus={filters}
						onItemClick={this.onItemClick}
						activeItemId={this.state.activeItemId} />
				</div>
			</div>
		)
	}
}
