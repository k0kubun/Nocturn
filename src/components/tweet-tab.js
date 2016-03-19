import React, { PropTypes } from 'react';

export default class TweetTab extends React.Component {
  static propTypes = {
    account:      PropTypes.object.isRequired,
    active:       PropTypes.bool,
    children:     PropTypes.string.isRequired,
    tab:          PropTypes.string.isRequired,
    onTabClicked: PropTypes.func.isRequired,
  }

  render() {
    return(
      <li
        className={`tab ${this.props.active ? 'active' : ''}`}
        onClick={this.props.onTabClicked}
      >
        {this.props.children}
      </li>
    );
  }
}
