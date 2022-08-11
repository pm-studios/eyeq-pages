import React, { Component } from 'react';

import '../App.css';
import './Share.css'


export class Share extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="share2">
        <h2>Share</h2>
        <div className="share-container">
          <img src="/images/icon_share_facebook.svg" />
          <img src="/images/icon_share_twitter.svg" />
          <img src="/images/icon_share_url.svg" />
        </div>
      </div>
    );
  }
}

export default Share;
