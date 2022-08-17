import React from 'react';

import './App.css';
import './Footer.css';

export default function Footer() {
	return (
		<div className="footer">
			<img src={'/eyeq-pages/images/playgroundz_logo_gray.svg'} alt='icon' />
			<p>About  •  IOG Token  •  FAQ</p>
			<p className="margin-t-8">Privacy Policy, User Agreement</p>
			<p>©2018 Playgroundz Foundation</p>
			<p>All rights reserved.</p>
        </div>
	)
}
