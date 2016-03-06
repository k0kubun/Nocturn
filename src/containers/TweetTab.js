import React from 'react';
import { connect }   from 'react-redux';
import Actions       from '../actions';

export default class TweetTab extends React.Component {
  isActive() {
    return this.props.selectedTab === this.props.tab;
  }

  onTabClicked() {
    this.props.selectTab(this.props.tab, this.props.account);
  }

  render() {
    return(
      <li
        className={this.isActive() ? 'tab active' : 'tab'}
        data-activate={this.props.activate || ''}
        onClick={this.onTabClicked.bind(this)}
      >
        {this.props.children}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, Actions)(TweetTab);
