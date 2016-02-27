import React from 'react';

export default class TweetList extends React.Component {
  render() {
    return(
      <ul id={this.props.id} className={this.props.className}>
        {this.props.children}
      </ul>
    );
  }
}
