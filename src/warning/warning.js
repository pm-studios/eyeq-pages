import React, { Component } from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import Overlay from '../common/Overlay'
import './warning.css';

class Warning extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  handleClickOk = () => {
    this.props.onClose();
  }

  handleClickCancel = () => {
    this.props.onClose();
  }

  render() {
    return (
      <Overlay>
        <div className="warning" >
          <div className="bg" onClick={this.props.onClose}/>
          <div className="container" >
            <h1>You are testing the Playgroundz Internal Test Server.<br/>Database is not active.</h1>
            <div className="buttons">
              <div onClick={this.handleClickOk} className="submit">
                Ok
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    )
  }
}

export default Warning;
