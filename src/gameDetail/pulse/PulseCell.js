import React, { Component } from 'react';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis'
import ogs from "open-graph-scraper"

import { GameCoverImg } from '../../GameAPI';
import '../../App.css';
import './PulseCell.css'

const IGDB_API = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/';
//const API = 'https://api-v3.igdb.com/';

export class PulseCell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: this.props.pulseData.image,
      url: '',
      source: '',
    };

    // get url
    this.getPulseUrl(this.props.pulseData.website);
    this.getPulseSource(this.props.pulseData.pulse_source);
  }

  getPulseSource = (source) => {
    axios.get(IGDB_API + 'pulse_sources?filter[id][eq]=' + source + '&fields=name', {
      headers: {'user-key': '7f3621448c8483ea34fdba2d6277594d'},
    })
    .then((response) => {
      if (200 !== response.status || 0 == response.data.length)
        return;

      this.setState({source: response.data[0].name})
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  getPulseUrl = (website) => {
    axios.get(IGDB_API + 'pulse_urls?filter[id][eq]=' + website + '&fields=url', {
      headers: {'user-key': '7f3621448c8483ea34fdba2d6277594d'},
    })
    .then((response) => {
      if (200 !== response.status || 0 == response.data.length)
        return;

      this.url = response.data[0].url;

      this.setState({url: this.url,})

      // validate data
      if (undefined === this.props.pulseData.image || 0 === this.props.pulseData.image.length)
        this.getImageFromMetadata();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // 이미지 정보가 없는 경우 해당 url의 메타데이터에서 직접 가져옴
  getImageFromMetadata = () => {
    var options = {'url': 'https://cors-anywhere.herokuapp.com/' + this.url};
      ogs(options, (error, results) => {
        if (!results.success)
        {
          this.setState({isLoading: false})
          return;
        }

        if (results.data.hasOwnProperty("ogImage") && 0 < results.data.ogImage.url.length)
          this.image = results.data.ogImage.url;
        else if (results.data.hasOwnProperty("twitterImage") && 0 < results.data.twitterImage.url.length)
          this.image = results.data.twitterImage.url;

        this.setState({
          image: this.image,
        })
    });
  }

  onImageLoadFailed() {
    console.log('onImageLoadFailed');
    console.log(this.props.pulseData);
    this.getImageFromMetadata();
  }

  renderPublishedDate() {
    return new Date(this.props.pulseData.published_at * 1000).toLocaleDateString();
  }

  render() {
    return (
      <div className="pulseCell">
        <a href={this.state.url} target="_blank">
          <div className="pulseCell-cover">
            <img src={this.state.image} alt={this.props.pulseData.title} onError={this.onImageLoadFailed.bind(this)}/>
          </div>
          <div className="pulseCell-title">
            <LinesEllipsis
              text={this.props.pulseData.title}
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'/>
          </div>
          <div className="pulseCell-desc">
            <p>{this.renderPublishedDate()}</p>
            <p><b>{this.state.source}</b></p>
            <p>
              <LinesEllipsis
                text={this.props.pulseData.summary}
                maxLine='3'
                ellipsis='...'
                trimRight
                basedOn='letters'/>
            </p>
          </div>
        </a>
      </div>
    );
  }
}

export default PulseCell;
