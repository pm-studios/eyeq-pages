import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

import ServiceMenu from './serviceMenu/ServiceMenu'
import Signup from './signup/Signup'
import Signin from './signup/Signin'
import { API_HOST, getAuthUserInfo } from './GameAPI';

import './Header.css';

import * as authActions from "./store/modules/auth";

export class Header extends Component {
	static contextTypes = {
		router: PropTypes.object
	}
	
	state = {
		visibleSignupPopup: false,
		visibleSigninPopup: false,
		visibleServiceMenu: false,
		visibleWarningPopup: true,
		search: '',
	}

	componentDidMount() {
		this.checkUser();
	}

	componentDidUpdate(prevProps, prevState) {
		const { logged, needed, needLogin } = this.props;
		if(!logged && needed) {
			this.handleOpenSignin();
			needLogin(false);
		}
	}

	handleSignout = () => {
		this.props.logout();
	}

	handleOpenSignup = () => {
		this.redirectLandingMap();
		this.setState({ visibleSignupPopup: true });
	}

	handleCloseSignup = () => {
		this.setState({ visibleSignupPopup: false });
	}

	handleOpenSignin = () => {
		this.setState({ visibleSigninPopup: true });
	}

	handleCloseSignin = () => {
		this.setState({ visibleSigninPopup: false });
	}

	handleOpenServiceMenu = () => {
		this.setState({ visibleServiceMenu: true });
	}

	handleCloseServiceMenu = () => {
		this.setState({ visibleServiceMenu: false });
	}

	handleClosWarningPopup = () => {
		this.setState({ visibleWarningPopup: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		if(name === 'search') this.setState({ search: value.trim() });
	}
	
	handleKeyPress(e) {
		if (e.key === "Enter" && this.state.search !== '') {
			this.context.router.history.push(`/search/${this.state.search}`);
			return;
		}
	}

	renderSignupPopup = () => (
		<Signup onClose={this.handleCloseSignup} onSignin={this.handleOpenSignin} />
	)

	renderSigninPopup = () => (
		<Signin onClose={this.handleCloseSignin} onSignup={this.handleOpenSignup}  />
	)

	renderServiceMenu = () => (
		<ServiceMenu onClose={this.handleCloseServiceMenu} />
	)

	checkUser = () => {
		const userInfo = getAuthUserInfo();
		if (userInfo) this.props.setUserTemp(userInfo);
		this.props.checkUser();
	};

	redirectLandingMap = () => {
		if(API_HOST === '') return;
		window.location = 'https://www.playgroundz.net?siteMap=0';
	}

	render() {
		if (!getAuthUserInfo()) {
			this.redirectLandingMap();
		}

		const { logged, userInfo } = this.props;
		return (
			<div className="header">
				<div className="container">
					<div className="logo vertical-center">
						<Link to={'/'}><img src={'/images/playgroundz_logo.svg'} alt='Playgroundz' /></Link>
					</div>
					<div className="search vertical-center">
						<img src={'/images/search.svg'} />
						<input type="search" name="search" placeholder="Search" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
					</div>
					<div className="menu horizontal-direction" style={{width: logged ? '160px' : '280px'}}>
						<div className="service vertical-center" onClick={this.handleOpenServiceMenu} >
							<img src={'/images/icon_service_menu.svg'} />
						</div>
						<div className="notification vertical-center">
							<img src={'/images/icon_notification.svg'} />
						</div>
						<div className="signin_ vertical-center" onClick={logged ? this.handleSignout : this.handleOpenSignin} >
							{logged ? <img src='/images/profile_placeholder.svg' /> : <p>Sign In</p>}
						</div>
						{!logged && <div className="signup_" onClick={this.handleOpenSignup} ><p>Get Started</p></div>}
					</div>
				</div>
				{this.state.visibleServiceMenu && this.renderServiceMenu()}
				{this.state.visibleSignupPopup && this.renderSignupPopup()}
				{this.state.visibleSigninPopup && this.renderSigninPopup()}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	logged: state.auth.logged,
	needed: state.auth.needed,
	userInfo: state.auth.userInfo
});
  
const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(authActions.logout());
		},
		checkUser: () => {
			dispatch(authActions.checkUser());
		},
		setUserTemp: (userInfo) => {
			dispatch(authActions.setUserTemp(userInfo));
		},
        needLogin: (needed) => {
            dispatch(authActions.needLogin(needed));
        }
	};
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);