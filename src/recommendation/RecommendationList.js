import React, { Component } from 'react';
import RecommendationCard from './RecommendationCard'
import GameAPI from '../GameAPI.js'
import './RecommendationList.css';

const RecommendationList = ({
	games
}) => {
	const gameList = GameAPI.all().map((game, i) => {
		return (
			<RecommendationCard key={game.slug} item={game} />
		);
	});
	return (
		<div className="recommendationList">
			{gameList}
		</div>
	);
}

export default RecommendationList;
