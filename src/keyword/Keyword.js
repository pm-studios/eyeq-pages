import React, { Component } from 'react';
import { connect } from "react-redux";

import TopMenu from '../TopMenu'
import Footer from '../Footer'
import KeywordCategory from './KeywordCategory'
import Description from '../Description'

import KeywordList from './KeywordList'
import '../App.css'

import * as gameActions from "../store/modules/games";

export class Keyword extends Component {
	state = {
		sort: 2,
		query: {
			page: 1,
			tag: this.props.match.params.tag,
			ordering: '',
			platforms: '',
			categories: ''
		}
	}

	changeSort(sortId) {
		this.setState(this.getQuery(sortId), function() {
			const query = this.state.query;
			const { getQueryGames } = this.props;
			getQueryGames({query});
			this.props.changeSortGames(sortId);
		});
	}

	refreshPage = () => {
		this.getQueryGames();
		this.props.changeSortGames(this.state.sort);
	}
	
	componentDidMount() {
		if(this.props.games.length === 0) {
			this.refreshPage();
		}
		window.addEventListener("scroll", this.handleScroll);
	}

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.logged !== this.props.logged) {
			this.refreshPage();
		}
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
				retState.query.ordering = '-released_at';
				break;
			case 2:
				retState.query.ordering = '-critic_rating';
				break;
			case 3:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 2;
				break;
			case 4:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 1;
				break;
			case 5:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 5;
				break;
			case 6:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 6;
				break;
			case 7:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 3;
				break;
			case 8:
				retState.query.ordering = '-critic_rating_count';
				retState.query.platforms = 9;
				break;
			case 9:
				retState.query.ordering = '-critic_rating_count';
				retState.query.platforms = 12;
				break;
			case 10:
				retState.query.ordering = '-critic_rating_count';
				retState.query.categories = 38;
				break;
      default:
				retState.query.ordering = '-critic_rating';
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
		return (
			<div>
        <TopMenu activeMenuId={1} />
        <div id="box">
          <div id="nav">
						<div className="vertical-direction">
							<KeywordCategory activeSortId={this.props.sort? this.props.sort:this.state.sort} changeSort={this.changeSort.bind(this)}/> {/*left*/}
							<Footer />
						</div>
						<KeywordList />
          </div>
        </div> 
      </div>
		);
	}
}

const mapStateToProps = state => ({
	sort: state.games.sort,
	games: state.games.games,
	query: state.games.query,
  isLast: state.games.isLast,
  isLoading: state.games.isLoading,
	logged: state.auth.logged,
	error: state.auth.error
});

const mapDispatchToProps = dispatch => {
  return {
    getQueryGames: ({query}) => {
      dispatch(gameActions.getQueryGames({query}));
    },
    changeSortGames: (sort) => {
      dispatch(gameActions.changeSortGames(sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyword);