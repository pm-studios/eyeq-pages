import React, { Component } from 'react';
import { connect } from "react-redux";

import TopMenu from '../TopMenu'
import Footer from '../Footer'
import Description from '../Description'
import CollectionFilter from './CollectionFilter'
import CollectionList from './CollectionList'
import '../App.css'

import * as collectionActions from "../store/modules/collection";

export class Collection extends Component {
	state = {
		sort: 1,
		query: {
			page: 1,
			ordering: ''
		}
	}

	changeSort(sortId) {
		this.setState(this.getQuery(sortId), function() {
			const query = this.state.query;
			const { getQueryCollection } = this.props;
			getQueryCollection({query});
			this.props.changeSortCollection(sortId);
		});
	}
	
	getQuery = (sortId, page = 1) => {
		const retState = Object.assign({}, this.state);

		if(sortId !== this.state.sort) {
			retState.sort = sortId;
			retState.query.ordering = '';
		}
		retState.query.page = page;

    	switch (sortId) {
			case 1:
				retState.query.ordering = '-updated_at';
				break;
			case 2:
				retState.query.ordering = '-value';
				break;
      		default:
				retState.query.ordering = '-updated_at';
		}

		return retState;
	}
	
	getQueryCollection = () => {
		this.setState(this.getQuery(this.state.sort), function() {
			const query = this.state.query;
			const { getQueryCollection } = this.props;
			getQueryCollection({query});
		});
	}

	refreshPage = () => {
		this.getQueryCollection();
		this.props.changeSortCollection(this.state.sort);
	}

	componentDidMount() {
		this.refreshPage();
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
				this.setState(this.getQuery(this.state.sort, Math.ceil(this.props.ratings.length/20) + 1), function() {
					const query = this.state.query;
					const { getQueryCollection } = this.props;
					getQueryCollection({query});
				});
			}
		}
	};

	render() {
		const { ratings } = this.props;
		return (
			<div>
				<TopMenu activeMenuId={3} />
        		<div id="box">
          			<div id="nav">
						<div className="vertical-direction">
							<CollectionFilter activeSortId={this.props.sort? this.props.sort:this.state.sort} changeSort={this.changeSort.bind(this)}/>
							<Footer />
						</div>
						<CollectionList />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sort: state.collection.sort,
	ratings: state.collection.ratings,
	isLast: state.collection.isLast,
	isLoading: state.collection.isLoading,
	logged: state.auth.logged,
	error: state.auth.error
});

const mapDispatchToProps = dispatch => {
	return {
		getQueryCollection: ({query}) => {
			dispatch(collectionActions.getQueryCollection({query}));
		},
		changeSortCollection: (sort) => {
			dispatch(collectionActions.changeSortCollection(sort));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Collection);