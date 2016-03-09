import React         from 'react';
import ListSelector  from './ListSelector'
import SearchBox     from './SearchBox'
import TweetList     from '../components/TweetList'
import Tweet         from '../components/Tweet'
import TweetTab      from './TweetTab'
import Actions       from '../actions';
import TwitterClient from '../utils/TwitterClient'
import TimelineProxy from '../utils/TimelineProxy'
import { connect }   from 'react-redux';

export default class Timeline extends React.Component {
  componentDidMount() {
    this.loadHome();
    this.loadMentions();
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

  startStreaming() {
    let proxy = new TimelineProxy(this.props.addTweet, this.props.account);
    this.client().userStream((tweet) => {
      proxy.addTweet(tweet, this.props.account, 'home');
    });
  }

  tabPropsFor(tab) {
    return {
      account:     this.props.account,
      selectedTab: this.props.selectedTab,
      tab:         tab,
    };
  }

  listPropsFor(tab) {
    return {
      selectedTab: this.props.selectedTab,
      tab:         tab,
      tweets:      this.props.tweetsByTab[tab] || [],
    };
  }

  client() {
    return new TwitterClient(this.props.account);
  }

  render() {
    return(
      <div className={this.props.account.id == this.props.activeAccount.id ? 'timeline active' : 'timeline'}>
        <ul className='tabs clearfix'>
          <TweetTab {...this.tabPropsFor('home')}>Timeline</TweetTab>
          <TweetTab {...this.tabPropsFor('mentions')}>Mentions</TweetTab>
          <TweetTab {...this.tabPropsFor('lists')}>Lists</TweetTab>
          <TweetTab {...this.tabPropsFor('search')}>Search</TweetTab>
        </ul>

        <TweetList {...this.listPropsFor('home')} />
        <TweetList {...this.listPropsFor('mentions')} />
        <TweetList {...this.listPropsFor('lists')}  withHeader='true'/>
        <TweetList {...this.listPropsFor('search')} withHeader='true'/>

        <ListSelector account={this.props.account} />
        <SearchBox account={this.props.account} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeAccount: state.accounts[state.activeAccountIndex],
  };
}

export default connect(mapStateToProps, Actions)(Timeline);
