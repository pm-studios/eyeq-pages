import React, { Component } from 'react';

import ReviewCell from './ReviewCell';

import '../../App.css';
import './Review.css'


export class Review extends Component {
  constructor(props) {
    super(props)
  }
  
  onLoadmore = () => {
    console.log("load more");
  }

  render() {
    return (
      <div className="review">
        <h2>Reviews</h2>            
        <div>
          <ReviewCell mine={true} />
        </div>

        <div className="divider margin-t-26" />
        <div>
          <ReviewCell />
          <ReviewCell />
        </div>

        <div className="center padding-t-16 padding-b-40">
          <p className="loadmore" onClick={this.onLoadmore}>Load more</p>
        </div>
      </div>
    );
  }
}

export default Review;
