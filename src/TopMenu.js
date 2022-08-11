import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import TextMenu from './common/TextMenu'
import './TopMenu.css';
import './App.css';


const menus = [
	{
		id: 1,
		title: "Rating"
	},
	{
		id: 2,
		title: "Recommendation"
	},
	{
		id: 3,
		title: "Collection"
	}
]


export default class Menu extends Component {
	static propTypes = {
		activeMenuId: PropTypes.number.isRequired,
	}
	
	constructor(props) {
		super(props)

		this.state = {
			redirect: false,
		}
	}

	handleMenuChanged = (menuId) => {
		console.log(menuId);
		if(this.props.activeMenuId !== menuId) {
			this.activeMenuId = menuId;
			this.setState({redirect: true});
		}
	}

	render() {
		if (this.state.redirect) {
			switch(this.activeMenuId) {
				case 1: return <Redirect push to='/rating'/>;
				case 2: return <Redirect push to='/recommendation'/>;
				case 3: return <Redirect push to='/collection'/>;
				default: return <Redirect push to='/'/>;
			}
		}

		return (
			<div className="topMenu">
				<div className="container">
					<TextMenu
						menus={menus}
						onItemClick={this.handleMenuChanged}
						activeItemId={this.props.activeMenuId} />
				</div>				
			</div>
		)
	}
}
