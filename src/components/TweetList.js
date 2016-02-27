import React from 'react';

export default class TweetList extends React.Component {
  render() {
    return(
      <ul id={this.props.id} className={`tweets ${this.props.withHeader ? 'with_header' : ''} ${this.props.active ? 'active' : ''}`}>
        {this.props.children}
      </ul>
    );
  }
}
