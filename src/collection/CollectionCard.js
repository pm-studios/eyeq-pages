import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { GameCoverImg, getPlatformsName } from '../GameAPI';
import '../common/Common.css'
import './CollectionCard.css';


export default class CollectionCard extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
			redirect: false,
		}
	}
	
	handleClickCard = () => {		
		this.setState({redirect: true});
	}

	render() {
		console.log(this.props);
		//const { item } = this.props;
		const { game } = this.props;

		if (this.state.redirect) {
			return <Redirect push to={'/game/' + game.slug} />;
		}

		return (
			<div className="collectionCard" onClick={this.handleClickCard}>
				<div className="cover">
					<GameCoverImg gameData={game} />
				</div>
				<div className="info">
					<h1>{this.props.title}</h1>
					<p>{this.props.platforms}</p>
				</div>
				<div className="ratingTag vertical-align" style={{backgroundImage: "url('images/rating_tag.svg')"}} >
					{parseFloat(this.props.value).toFixed(1)}
				</div>
			</div>
		)
	}
}
