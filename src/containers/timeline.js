import React, { PropTypes } from 'react';
import ListSelector         from './list-selector'
import SearchBox            from './search-box'
import TweetList            from './tweet-list'
import TweetTab             from './tweet-tab'
import Actions              from '../actions';
import TwitterClient        from '../utils/twitter-client'
import TimelineProxy        from '../utils/timeline-proxy'
import { connect }          from 'react-redux';

class Timeline extends React.Component {
  static propTypes = {
    account:  PropTypes.object.isRequired,
    active:   PropTypes.bool.isRequired,
    addTweet: PropTypes.func.isRequired,
    setLists: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.loadHome();
    this.loadMentions();
    this.loadLists();
    this.startStreaming();
  }

  loadHome() {
    let proxy = new TimelineProxy(this.props.addTweet, this.props.account);
    this.client().homeTimeline((tweets) => {
      for (let tweet of tweets) {
        proxy.addTweet(tweet, this.props.account, 'home');
      }
    })
  }

  loadMentions() {
    let proxy = new TimelineProxy(this.props.addTweet, this.props.account);
    this.client().mentionsTimeline((tweets) => {
      for (let tweet of tweets) {
        proxy.addTweet(tweet, this.props.account, 'mentions');
      }
    })
  }

  loadLists() {
    this.client().listsList((lists) => {
      for (let list of lists) {
        this.props.setLists(lists, this.props.account);
      }
    });
  }

  startStreaming() {
    let proxy = new TimelineProxy(this.props.addTweet, this.props.account);
    this.client().userStream((tweet) => {
      proxy.addTweet(tweet, this.props.account, 'home');
    });
  }

  client() {
    return new TwitterClient(this.props.account);
  }

  render() {
    return(
      <div className={`timeline ${this.props.active ? 'active' : ''}`}>
        <ul className='tabs clearfix'>
          <TweetTab account={this.props.account} tab='home'>Timeline</TweetTab>
          <TweetTab account={this.props.account} tab='mentions'>Mentions</TweetTab>
          <TweetTab account={this.props.account} tab='lists'>Lists</TweetTab>
          <TweetTab account={this.props.account} tab='search'>Search</TweetTab>
        </ul>

        <TweetList account={this.props.account} tab='home' />
        <TweetList account={this.props.account} tab='mentions' />
        <TweetList account={this.props.account} tab='lists'  withHeader={true} />
        <TweetList account={this.props.account} tab='search' withHeader={true} />

        <ListSelector account={this.props.account} />
        <SearchBox account={this.props.account} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let activeAccount = state.accounts[state.activeAccountIndex] || {};
  return {
    active: activeAccount.id == props.account.id,
  };
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
  ...Actions.lists,
})(Timeline);
