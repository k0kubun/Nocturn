import React, { PropTypes } from 'react';

export default class TweetTab extends React.Component {
  static propTypes = {
    account:      PropTypes.object.isRequired,
    active:       PropTypes.bool,
    children:     PropTypes.string.isRequired,
    tab:          PropTypes.string.isRequired,
    unread:       PropTypes.number.isRequired,
    onTabClicked: PropTypes.func.isRequired,
  }

  unreadMarker() {
    if (this.props.unread == 0) return '';
    return <span className='unread_counter'>{this.props.unread}</span>;
  }

  render() {
    return(
      <li
        className={`tab ${this.props.active ? 'active' : ''} ${this.props.tab}_tab`}
        onClick={this.props.onTabClicked}
      >
        {this.props.children}
        {this.unreadMarker()}
      </li>
    );
  }
}
