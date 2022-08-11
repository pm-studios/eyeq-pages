import React, { Component } from 'react';
import { connect } from "react-redux";

import Footer from '../Footer'
import TopMenu from '../TopMenu'
import Description from '../Description'
import RecommendationFilter from './RecommendationFilter'
import RecommendationList from './RecommendationList'
import '../App.css'

import * as recommendationActions from "../store/modules/recommendation";

export class Recommendation extends Component {
	state = {
		sort: 1,
		query: {
			page: 1,
			ordering: '',
			platforms: '',
			categories: ''
		}
	}

	changeSort(sortId) {
		this.setState(this.getQuery(sortId), function() {
			const query = this.state.query;
			const { getQueryRecommendation } = this.props;
			getQueryRecommendation({query});
		});
	}
	
	componentDidMount() {
		this.getQueryRecommendation();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	getQuery = (sortId, page = 1) => {
		const retState = Object.assign({}, this.state);

		if(sortId !== this.state.sort) {
			retState.sort = sortId;
			retState.query.ordering = '';
			retState.query.platforms = '';
			retState.query.categories = '';
		}
		retState.query.page = page;

    	switch (sortId) {
			case 1:
				retState.query.ordering = '-igdb_id';
				retState.query.categories = 1;
				retState.query.platforms = 1;
				break;
			case 2:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 1;
				retState.query.platforms = 2;
				break;
      		default:
				retState.query.ordering = '-igdb_id';
				retState.query.categories = 1;
				retState.query.platforms = 1;
		}

		return retState;
	}
	
	getQueryRecommendation = () => {
		this.setState(this.getQuery(this.state.sort), function() {
			const query = this.state.query;
			const { getQueryRecommendation } = this.props;
			getQueryRecommendation({query});
		});
	}

	handleScroll = () => {
		const { innerHeight } = window;
		const documentHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);

		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if (documentHeight - innerHeight - scrollTop < 100 && documentHeight - innerHeight - scrollTop > 0) {
			if (!this.props.isLoading && !this.props.isLast) {
				this.setState(this.getQuery(this.state.sort, Math.ceil(this.props.games.length/20) + 1), function() {
					const query = this.state.query;
					const { getQueryRecommendation } = this.props;
					getQueryRecommendation({query});
				});
			}
		}
	};
	
	render() {
		const { games } = this.props;
		return (
			<div>
				<TopMenu activeMenuId={2} />
				<div id="box">
					<div id="nav">
						<div className="vertical-direction">
							<RecommendationFilter />
							<Footer />
						</div>
						<RecommendationList games={games} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	games: state.recommendation.games,
	isLast: state.recommendation.isLast,
	isLoading: state.recommendation.isLoading
});

const mapDispatchToProps = dispatch => {
	return {
		getQueryRecommendation: ({query}) => {
			dispatch(recommendationActions.getQueryRecommendation({query}));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recommendation);