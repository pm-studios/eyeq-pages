import React, { Component } from 'react';

import DLCCell from './DLCCell';

import '../../App.css';
import './DLC.css'


export class DLC extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="dlc">
        <h2>DLC</h2>
        <div className="dlc-container">
          <DLCCell title="Marvel's Spider-Man: Turf Wars" releaseDate="20 Nov, 2018" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/co1ib7.jpg" />
          <DLCCell title="Marvel's Spider-Man: The Heist" releaseDate="23 Oct, 2018" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/co1ib8.jpg" />
          <DLCCell title="Marvel's Spider-Man: Silver Lining" releaseDate="21 Dec, 2018" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/co1ib9.jpg" />
        </div>
      </div>
    );
  }
}

export default DLC;
