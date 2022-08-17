import React, { Component } from 'react';
import Rating from 'react-rating';

import '../../App.css';
import './ReviewCell.css'


export class ReviewCell extends Component {
  constructor(props) {
    super(props)
  }

  renderEditControl = () => {
    return (
      <div className="rc-top-buttons">
        <img src="/eyeq-pages/images/icon_review_edit.svg"/>
        <img src="/eyeq-pages/images/icon_review_delete.svg"/>
      </div>
    ); 
  }
  
  render() {
    return (
      <div className="reviewCell">
        <img src="/eyeq-pages/images/placeholder_user.svg"/>
        <div className="rc-container">
          <div className="rc-top">
            <div className="rc-top-name vertical-center">
              <h1>user name</h1>
            </div>
            {this.props.mine && this.renderEditControl()}
          </div>
          <div className="rc-content">
            <div className="rc-content-top">
              <div className="rc-content-rating horizontal-direction">
                <h1>3.5</h1>
                <Rating
							    emptySymbol={<img src="/eyeq-pages/images/rate_star_empty_sm.svg" className="icon" alt="" />}
				          fullSymbol={<img src="/eyeq-pages/images/rate_star_full_sm.svg" className="icon" alt="" />}
			            fractions={2}
				          initialRating={3}
		              style={{ ...Rating.style, 'marginLeft': '7px' }}
							    onChange={this.handleRated}
				        />
              </div>
              <div className="rc-content-date">
                <p>Nov. 21, 2018</p>
              </div>
            </div>
            <div className="rc-content-bottom">
              <p>From the story to the exploration to the combat to seemingly endless upgrades, Spider-Man is packed full of things worth doing and that are fun to do. Insomniac Games has made it seem effortless with the way they can bring this character to life in all the ways a video game can. Spider-Man is a great superhero game, a great PS4 exclusive, but most importantly a great game all its own.</p>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewCell;
