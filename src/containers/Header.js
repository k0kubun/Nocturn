import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { shell }            from 'electron';
import TwitterClient        from '../utils/TwitterClient'
import TimelineProxy        from '../utils/TimelineProxy'
import Actions              from '../actions';

class Header extends React.Component {
  static propTypes = {
    activeAccount:     PropTypes.object,
    activeListId:      PropTypes.string,
    activeSearchQuery: PropTypes.string,
    addTweet:          PropTypes.func.isRequired,
  }

  onHomeClicked() {
    let url = `https://twitter.com/${this.props.activeAccount.screenName}`;
    shell.openExternal(url);
  }

  onRefreshClicked() {
    let client = new TwitterClient(this.props.activeAccount);
    let proxy  = new TimelineProxy(this.props.addTweet, this.props.activeAccount);

    client.homeTimeline((tweets) => {
      for (let tweet of tweets) {
        proxy.addTweet(tweet);
      }
    });
    this.refreshListsTab(client);
    this.refreshSearchTab(client);
  }

  refreshListsTab(client) {
    if (this.props.activeListId) {
      client.listsStatuses(this.props.activeListId, (tweets) => {
        for (let tweet of tweets) {
          this.props.addTweet(tweet, this.props.activeAccount, 'lists');
        }
      })
    }
  }

  refreshSearchTab(client) {
    if (this.props.activeSearchQuery) {
      client.searchTweets(this.props.activeSearchQuery, (tweets) => {
        for (let tweet of tweets) {
          this.props.addTweet(tweet, this.props.activeAccount, 'search');
        }
      })
    }
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
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeAccount: activeAccount,
    activeListId: activeAccount && state.activeListIdByUserId[activeAccount.id],
    activeSearchQuery: activeAccount && state.searchQueryByUserId[activeAccount.id],
  }
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
})(Header);
