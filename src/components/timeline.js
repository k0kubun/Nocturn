import React, { PropTypes } from 'react';
import ListContainer        from '../containers/list-container';
import SearchContainer      from '../containers/search-container';
import TimelineProxy        from '../utils/timeline-proxy';
import TweetListContainer   from '../containers/tweet-list-container';
import TweetTabContainer    from '../containers/tweet-tab-container';
import TwitterClient        from '../utils/twitter-client';

export default class Timeline extends React.Component {
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
    }, { count: 50 })
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
          <TweetTabContainer account={this.props.account} tab='home'>Timeline</TweetTabContainer>
          <TweetTabContainer account={this.props.account} tab='mentions'>Mentions</TweetTabContainer>
          <TweetTabContainer account={this.props.account} tab='lists'>Lists</TweetTabContainer>
          <TweetTabContainer account={this.props.account} tab='search'>Search</TweetTabContainer>
        </ul>

        <TweetListContainer account={this.props.account} tab='home' />
        <TweetListContainer account={this.props.account} tab='mentions' />
        <TweetListContainer account={this.props.account} tab='lists'  withHeader={true} />
        <TweetListContainer account={this.props.account} tab='search' withHeader={true} />

        <ListContainer account={this.props.account} />
        <SearchContainer account={this.props.account} />
      </div>
    );
  }
}
