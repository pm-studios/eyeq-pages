import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import PhotoGallery from '../../common/PhotoGallery'
import MediaImageCell from './MediaImageCell';
import MediaVideoCell from './MediaVideoCell';

import '../../App.css';
import './Media.css'

export class Media extends Component {
  constructor(props) {
    super(props)

    console.log(props);

    this.state = {
      videoUrl: '',
      videoAutoplay: false,
      showChildCount: 4,
    };

    this.videos = this.props.game.youtube.split(',').map((id, i) => ({ 
      index: i,
      src: id 
    }));

    this.images = this.props.game.img_screenshots.split(',').map((id, i) => (id !== '' ? {
        index: i,
        src: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/' + id + '.jpg'
      } : {
        index: i,
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'
      }));
  }

  componentDidMount() {
    if (0 < this.videos.length)
      this.setState({ videoUrl: this.videos[0].src });
  }

  onItemImageClick = (data, e) => {
    this.pg.openLightbox(data.index, e)
  }

  onItemVideoClick = (data, e) => {
    e.preventDefault();
    
    if (this.state.videoUrl !== data.src) {
      if (this.rp.player) {
        this.rp.player.isLoading = false
      }
  
      this.setState({ 
        videoUrl: data.src,
        videoAutoplay: true 
      });
    }
  }

  onLoadmore = () => {
    this.setState({
      showChildCount: this.state.showChildCount + 4
    })
  }

  createChild = () => {
    let child = []
    let index = 0;
    for (let i = 0; i < this.videos.length; ++i) {
      if (index >= this.state.showChildCount)
        break;

      child.push(<MediaVideoCell key={index++} data={this.videos[i]} onItemClick={this.onItemVideoClick}/>);
    }

    for (let i = 0; i < this.images.length; ++i) {
      if (index >= this.state.showChildCount)
        break;

      child.push(<MediaImageCell key={index++} data={this.images[i]} onItemClick={this.onItemImageClick}/>);
    }

    return child;
  }

  renderLoadMore() {
    return (
      <div className="center padding-t-16">
        <p className="md-loadmore" onClick={this.onLoadmore}>Load more</p>
      </div>
    );
  }

  renderChild() {
    return (
      <div className="media-container">
        {this.createChild()}
      </div>
    );
  }

  render() {
    return (
      <div className="media">
        <h2>Media</h2>
        <div className="media-video">
          <ReactPlayer 
            ref={rp => this.rp = rp} 
            url={'https://www.youtube.com/watch?v=' + this.state.videoUrl} 
            width='940px'
            height='526px' 
            playing={this.state.videoAutoplay}
            controls />
        </div>
        <div className="media-container">
          {this.renderChild()}
        </div>
        {this.videos.length + this.images.length > this.state.showChildCount ? this.renderLoadMore() : ''}
        
        <div className="photo">
          <PhotoGallery 
            ref={pg => this.pg = pg} 
            images={String(this.props.game.img_screenshots).split(',').map((img) => (img !== '' ? {
              src: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/' + img + '.jpg'
            } : {
              src: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'
            }))}
          />
        </div>
      </div>
    );
  }
}

export default Media;
