import React, { Component } from 'react';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis'
import Moment from 'react-moment';

import { abbreviateNumber } from '../../GameAPI';

import '../../App.css';
import './MediaVideoCell.css'

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/videos'

export class MediaVideoCell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',      
      channel: '',
      publishedAt: '',
      viewCount: 0,
      isLoading: true,
    };

    this.getYoutubeDetail();
  }

  getYoutubeDetail() {
    // get game id
    axios.get(YOUTUBE_API + '?id=' + this.props.data.src + '&key=AIzaSyC9_LeWuJ_g87OQjRUFg8jN36HsHZ_Dg8s&part=snippet,statistics')
    .then(response => {
      if (200 != response.status) {
        return;
      }

      if (0 == response.data.items) {
        return;
      }

      var snippet = response.data.items[0].snippet;
      var statistics = response.data.items[0].statistics;

      this.setState({
        title: snippet.title,
        channel: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        viewCount: statistics.viewCount,
        isLoading: false
      });
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="mediaVideoCell">
        <a href={this.props.data.src} onClick={(e) => this.props.onItemClick(this.props.data, e)}>
          <img src={'https://img.youtube.com/vi/' + this.props.data.src + '/sddefault.jpg'} />
          <div className="mvc-overlay">
            <img src={'/eyeq-pages/images/youtube.png'} />
          </div>
          <div className="mvc-title">
            <LinesEllipsis
              text={this.state.title}
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'/>
          </div>
          <div>
            {this.state.channel}
          </div>
          <div>
            {abbreviateNumber(this.state.viewCount)} views • <Moment fromNow ago>{this.state.publishedAt}</Moment> ago
          </div>
        </a>
      </div>
    );
  }
}

export default MediaVideoCell;
