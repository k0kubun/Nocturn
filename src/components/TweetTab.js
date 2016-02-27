import React from 'react';

export default class TweetTab extends React.Component {
  render() {
    return(
      <li className={this.props.active ? 'tab active' : 'tab'} data-selector={this.props.selector} data-activate={this.props.activate || ''}>
        {this.props.children}
      </li>
    );
  }
}
