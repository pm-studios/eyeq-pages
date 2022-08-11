import React, { Component } from 'react';

import SimilarCell from './SimilarCell';

import '../../App.css';
import './Similar.css'


export class Similar extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="similar">
        <h2>You might like</h2>
        <div className="similar-container">
          <SimilarCell title="Red Dead Redemption 2" genres="Adventure, Role-playing (RPG), Shooter" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/yfk9f2lbo0r7slytuhra.jpg" />
          <SimilarCell title="Assassin's Creed: Odyssey" genres="Adventure, Role-playing (RPG)" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/f9jvrf3nwdgdil287sla.jpg" />
          <SimilarCell title="Metro Exodus" genres="Adventure, Shooter" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/co1iuj.jpg" />
          <SimilarCell title="Monster Hunter: World" genres="Adventure, Role-playing (RPG)" thumb="https://images.igdb.com/igdb/image/upload/t_cover_big/fxgwm1nnyexhvauqv0ds.jpg" />
        </div>
      </div>
    );
  }
}

export default Similar;
