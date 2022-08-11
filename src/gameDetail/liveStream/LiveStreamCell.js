import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

import '../../App.css';
import './LiveStreamCell.css'


class LiveStreamCell extends Component {
  constructor(props) {
    super(props)
  }

	handleClick = () => {
		this.props.onItemClick(this.props.data);
	}

  renderTwitchThumbnail() {
    let url = this.props.data.thumbnail_url.replace('{width}x{height}','320x180');
    return (
      <img src={url} />
    );
  }

	render() {
    return (
	  	<div className="liveStream-cell" onClick={this.handleClick.bind(this)}>
        {this.renderTwitchThumbnail()}
        <p>{this.props.data.viewer_count} viewers</p>
        <div className="lsc-title">
          <LinesEllipsis
            text={this.props.data.title}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'/>
          </div>
        <p>{this.props.data.user_name}</p>
      </div>
    );
  }
}

export default LiveStreamCell;
