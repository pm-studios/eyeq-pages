import React, { Component } from 'react';
import Truncate from './Truncate';
import LinesEllipsis from 'react-lines-ellipsis'


export class ExpandableLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        expanded: false,
        truncated: false
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
        this.setState({
            truncated
        });
    }
  }

  toggleLines(event) {
    event.preventDefault();

    this.setState({
        expanded: !this.state.expanded
    });
  }

  childrenToString() {
    let text = '';
  }
  /*
  render() {
    const { game } = this.props;
    const { expanded, truncated } = this.state;

    return (
      <span>
        <Truncate 
          width={560}
          lines={!expanded && this.props.lines} 
          portrait={1} 
          breakWord={true} 
          ellipsis={(
            <span>...<a href='#' onClick={this.toggleLines}>Read more</a></span>
          )}
          dangerouslySetInnerHTML={{
            __html: this.props.htmlText
           }}
          onTruncate={this.handleTruncate} />
        {!truncated && expanded && (
          <span><a href='#' onClick={this.toggleLines}>{'<< Show less'}</a></span>
        )}
      </span>
    );
  }
  */
 
  render() {
    const { game } = this.props;
    const { expanded, truncated } = this.state;

    return (
      <span>
        <Truncate 
          width={530}
          lines={!expanded && this.props.lines} 
          ellipsis={(
            <span>...<a href='#' onClick={this.toggleLines}> read more</a></span>
          )}
          onTruncate={this.handleTruncate}
          urlPath={this.props.urlPath}
        >
        {this.props.children}
        </Truncate>
        {!truncated && expanded && (
          <span><a href='#' onClick={this.toggleLines}>{' << show less'}</a></span>
        )}
      </span>
    );
  }
}

export default ExpandableLabel;
