import React from 'react';
import { connect }   from 'react-redux';
import { shell } from 'electron';
import TwitterClient from '../utils/TwitterClient'
import Actions       from '../actions';

export default class Header extends React.Component {
  onHomeClicked() {
    let url = `https://twitter.com/${this.props.activeAccount.screenName}`;
    shell.openExternal(url);
  }

  onRefreshClicked() {
    let client = new TwitterClient(this.props.activeAccount);
    client.homeTimeline((tweets) => {
      for (let tweet of tweets.reverse()) {
        this.props.addTweet(tweet, this.props.activeAccount, 'home');
      }
    });
  }

  render() {
    return(
      <div className='header clearfix'>
        <div className='button_wrapper'>
          <div className='button home_button' onClick={this.onHomeClicked.bind(this)}>
            <i className='fa fa-home'></i>
          </div>
          Home
        </div>
        <div className='button_wrapper'>
          <div className='button refresh_button' onClick={this.onRefreshClicked.bind(this)}>
            <i className='fa fa-refresh'></i>
          </div>
          Refresh
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeAccount: state.accounts[state.activeAccountIndex],
  }
}

export default connect(mapStateToProps, Actions)(Header);
