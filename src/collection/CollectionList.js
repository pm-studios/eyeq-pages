import React, { Component } from 'react';
import { connect } from "react-redux";

import CollectionCard from '../collection/CollectionCard'
import GameAPI from '../GameAPI.js'
import './CollectionList.css';
/*
{GameAPI.all().map((rating, i) => (
					<CollectionCard key={i} item={rating} />
				))}
*/
export class CollectionList extends Component {
	render() {
		const { ratings } = this.props;
		return (
			<div className="collectionList">
				
			</div>
 		)
 	}
}

const mapStateToProps = state => ({
	ratings: state.collection.ratings,
	logged: state.auth.logged
});

export default connect(
	mapStateToProps
)(CollectionList);
