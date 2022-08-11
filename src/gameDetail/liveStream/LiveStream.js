import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Iframe from 'react-iframe'
import axios from 'axios';
import Spinner  from 'react-spinkit';

import LiveStreamCell from './LiveStreamCell';

import '../../App.css';
import './LiveStream.css'

const TWITCH_API = 'https://api.twitch.tv/helix/'


export class LiveStream extends Component {
  constructor(props) {
    super(props)

    this.state = {
      twitchUrl: '',      
      twitchChannels: '',
      showChildCount: 4,
      failed: false,
      isLoading: true,
    };
    
    this.getTwitchGameId();
  }

  getTwitchGameId() {
    // get game id
    axios.get(TWITCH_API + 'games?name=Godofwar', {
      headers: {'Client-ID': '6ommlp4pxwnk3pi97hsemyrltm5n2e'},
      timeout: 1000 * 5, // Wait for 5 seconds
    })
    .then(response => {
      if (200 !== response.status || 0 == response.data.data.length) {
        this.responseError();
        return;
      }

      this.twitchGameId = response.data.data[0].id;

      this.getGameChannelList();
    })
    .catch(error => this.responseError());
  }

  responseError() {
    this.setState({
      failed: true,
      isLoading: false,
    });
  }

  getUserIdFromThumbnailUrl(thumbnailUrl) {
    var start = thumbnailUrl.indexOf('/live_user_') + '/live_user_'.length;
    var end = thumbnailUrl.indexOf('-{width}x{height}');
      
    return thumbnailUrl.substr(start, end - start);
  }

  getGameChannelList() {
    // get game id
    axios.get(TWITCH_API + 'streams?game_id=' + this.twitchGameId, {
      headers: {'Client-ID': '6ommlp4pxwnk3pi97hsemyrltm5n2e'}
    })
    .then(response => {
      if (200 !== response.status || 0 === response.data.data.length) {
        this.setState({
          failed: true,
          isLoading: false,
        });

        return;
      }

      this.setState({
        twitchUrl: this.getUserIdFromThumbnailUrl(response.data.data[0].thumbnail_url),
        twitchChannels: response.data.data,
        isLoading: false
      });
    })
    .catch(error => console.error('Error:', error));
  }

  onChangeTwitch = (data) => {
    var userId = this.getUserIdFromThumbnailUrl(data.thumbnail_url);

    if(this.state.twitchUrl !== userId) {
      if (this.rp.player) {
        this.rp.player.isLoading = false
      }

      this.setState({twitchUrl: userId});
    }
  }

  onLoadmore = () => {
    console.log("load more");

    this.setState({showChildCount: this.state.showChildCount + 4})
  }

  renderFailed() {
    return (
      <div className="liveStream-container">
        <p>There are no live channels.</p>
      </div>
    );
  }

  renderChild = () => {
    let child = []
    for (let i = 0; i < this.state.twitchChannels.length; ++i) {
      child.push(<LiveStreamCell key={i} data={this.state.twitchChannels[i]} onItemClick={this.onChangeTwitch} />);

      if (i >= this.state.showChildCount - 1)
        break;
    }

    return child;
  }

  renderLoadMore() {
    return (
      <div className="center padding-t-16">
        <p className="ls-loadmore" onClick={this.onLoadmore}>Load more</p>
      </div>
    );
  }

  renderTwitch() {
    return (
      <div className="liveStream-video">
        <div className="horizontal-direction">
          <ReactPlayer 
            ref={rp => this.rp = rp} 
            url={'https://www.twitch.tv/' + this.state.twitchUrl} 
            width='660px'
            height='526px' 
            controls />
          <Iframe url={'https://www.twitch.tv/embed/' + this.state.twitchUrl + '/chat'}
            width="300px"
            height="526px"
            id="chat_embed"
            className="myClassname"
            display="initial"
            position="relative" 
            frameBorder='0' />
        </div>
        <div className="liveStream-container">
          {this.renderChild()}
        </div>
        {this.state.twitchChannels.length > this.state.showChildCount ? this.renderLoadMore() : ''}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className='liveStream-loading'>
        <Spinner name='pacman' color="lightgray"/>
      </div> 
    );
  }

  render() {
    /*
    <ReactTwitchEmbedVideo channel={this.state.twitchUrl} width='940px' autoplay={false} />

    <ReactPlayer 
            url={'https://www.twitch.tv/' + this.state.twitchUrl} 
            width='660px'
            height='526px' 
            controls />
          <Iframe url={'https://www.twitch.tv/embed/' + this.state.twitchUrl + '/chat'}
            width="300px"
            height="526px"
            id="chat_embed"
            className="myClassname"
            display="initial"
            position="relative" 
            frameBorder='0' />
    */
    return (
      <div className="liveStream">
        <h2>Live Streams</h2>
        {this.state.isLoading ? this.renderLoading() : 
          this.state.failed ? this.renderFailed() : this.renderTwitch()}
      </div>
    );
  }
}

export default LiveStream;
