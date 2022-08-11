import React, { Component } from 'react';
import { connect } from "react-redux";

import TopMenu from './TopMenu'
import SideMenu from './SideMenu'
import FeaturedList from './featured/FeaturedList'
import GenreList from './genre/GenreList'
import './App.css'

import { Link, withRouter } from 'react-router-dom'
import * as gameActions from "./store/modules/games";


export class Home extends Component {
	state = {
		listType: 0, //0:grid, 1:list

		sort: 1,
		query: {
			page: 1,
			ordering: '',
			platforms: '',
			categories: ''
		}
	}

	refreshList(menuId) {
		this.setState(this.getQuery(menuId), function() {
			const query = this.state.query;
			const { getQueryGames } = this.props;
			getQueryGames({query});
		});
	}
	
	onChangedSideMenu(menuId) {
		this.refreshList(menuId);
	}

	componentDidMount() {
		console.log(this.props.match);

		switch (this.props.match.path) {
			case '/new':
				this.refreshList(2);
				break;
	
			case '/topsellers':
				this.refreshList(3);
				break;
	
			case '/genre/:genre':
				this.refreshList(100);
				break;
	
			default: //featured
				this.refreshList(1);
		}

		//this.getDetailGame(this.props.match.params.genre);
		//var search = new URLSearchParams(this.props.location.search);

		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		console.log(this.props.match);
		window.removeEventListener("scroll", this.handleScroll);
	}

	getQuery = (sortId, page = 1) => {
		const retState = Object.assign({}, this.state);

		if(sortId !== this.state.sort) {
			retState.sort = sortId;
			retState.query.ordering = '';
			retState.query.platforms = '';
			retState.query.categories = '';

			if (sortId == 1)
				retState.listType = 0;
			else
				retState.listType = 1;
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
	
	getQueryGames = () => {
		this.setState(this.getQuery(this.state.sort), function() {
			const query = this.state.query;
			const { getQueryGames } = this.props;
			getQueryGames({query});
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
					const { getQueryGames } = this.props;
					getQueryGames({query});
				});
			}
		}
	};
	
	render() {
		const { games } = this.props;
		return (
			<div>
				<TopMenu />
				<div id="box">
					<div id="nav">
						<SideMenu onChangedMenu={this.onChangedSideMenu.bind(this)}/> {/*left*/}
						{this.state.listType === 0 ?
							<FeaturedList games={games} /> :
							<GenreList games={games} /> }
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	count: state.games.count,
	games: state.games.games,
	isLast: state.games.isLast,
	isLoading: state.games.isLoading
});

const mapDispatchToProps = dispatch => {
	return {
		getQueryGames: ({query}) => {
			dispatch(gameActions.getQueryGames({query}));
		}
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Home));