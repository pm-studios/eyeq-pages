import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

import '../../App.css';
import './MediaImageCell.css'

export class MediaImageCell extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="mediaImageCell">
        <a href={this.props.data.src}
					className="thumbnail"
					onClick={(e) => this.props.onItemClick(this.props.data, e)}>
					<img src={this.props.data.src} />
				</a>
      </div>
    );
  }
}

export default MediaImageCell;
