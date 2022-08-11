import React, { Component } from 'react';
import axios from 'axios';
import Spinner  from 'react-spinkit';

import PulseCell from './PulseCell';

import '../../App.css';
import './Pulse.css'

const IGDB_API = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/';
//const API = 'https://api-v3.igdb.com/';

export class Pulse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pulseDataList: [],
      failed: false,
      isLoading: true,
    };
        
    this.getPulseList();
  }

  getPulseList() {
    axios.get(IGDB_API + 'pulse_groups?filter[game][eq]=' + this.props.gameId + '&fields=published_at,pulses', {
      headers: {'user-key': '7f3621448c8483ea34fdba2d6277594d'},
      timeout: 1000 * 5, // Wait for 5 seconds
    })
    .then(async (response) => {
      if (200 !== response.status || 0 === response.data.length) {
        this.responseError();
        return;
      }

      var list = [];
      response.data.sort((a, b) => b.published_at - a.published_at).map((data) => (
        data.pulses.map((pulseId) => (
          list.push(pulseId)
        ))
      ))

      // fetch는 정상인데 data가 없는 경우가 있음 (기사가 삭제된 경우?)
      // PulseCell로 넘기기전 검사를 해 본후 정상적인 데이터만 넘겨준다.
      
      // get pulse each data
      var processedList = [];
      await Promise.all(list.map(async (pulseId) => {
        let result = await axios.get(IGDB_API + 'pulses?filter[id][eq]=' + pulseId + '&fields=title,website,image,published_at,pulse_source,summary', {
          headers: {'user-key': '7f3621448c8483ea34fdba2d6277594d'},
          timeout: 1000 * 5, // Wait for 5 seconds
        })

        if (200 !== result.status || 0 == result.data.length) {
          this.responseError();
          return;
        }
          
        processedList.push(result.data[0]);
      }));

      // debug
      var deletedPulse = list.length - processedList.length;
      if (0 < deletedPulse)
        console.log('deletedPulse:' + deletedPulse);

      this.setState({
        pulseDataList: processedList,
        isLoading: false,
      });
    })
    .catch((error) => {
      console.log(error);

      this.responseError();
    });
  }

  responseError() {
    this.setState({
      failed: true,
      isLoading: false,
    });
  }

  createChild = () => {
    let child = []
    for (let i = 0; i < this.state.pulseDataList.length; ++i) {
      child.push(<PulseCell key={i} pulseData={this.state.pulseDataList[i]} />);

      if (i >= 5)
        break;
    }

    return child;
  }

  renderChild() {
    return (
      <div className="pulse-container">
        {this.createChild()}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className='pulseLoading'>
        <Spinner name='pacman' color="lightgray"/>
      </div> 
    );
  }

  renderFailed() {
    return (
      <div className="liveStream-container">
        <p>There are no news feeds.</p>
      </div>
    );
  }

  render() {
    return (
      <div className="pulse">
        <h2>News Feeds</h2>
        {this.state.isLoading ? this.renderLoading() : 
          this.state.failed ? this.renderFailed() : this.renderChild()}
      </div>
    );
  }
}

export default Pulse;
