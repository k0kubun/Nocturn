import React         from 'react';
import ListSelector  from '../components/ListSelector'
import SearchBox     from '../components/SearchBox'
import TweetList     from '../components/TweetList'
import Tweet         from '../components/Tweet'
import TweetTab      from './TweetTab'
import Actions       from '../actions';
import TwitterClient from '../utils/TwitterClient'
import { connect }   from 'react-redux';

export default class Timeline extends React.Component {
  componentDidMount() {
    this.loadHome();
    this.startStreaming();
  }

  loadHome() {
    this.client().homeTimeline((tweets) => {
      for (let tweet of tweets.reverse()) {
        this.props.addTweet(tweet, this.props.account, 'home');
      }
    })
  }

  startStreaming() {
    this.client().userStream((tweet) => {
      this.props.addTweet(tweet, this.props.account, 'home');
    });
  }

  client() {
    return new TwitterClient(this.props.account);
  }

  render() {
    return(
      <div className={this.props.account.id == this.props.activeAccount.id ? 'timeline active' : 'timeline'}>
        <ul className='tabs clearfix'>
          <TweetTab tab='home'     selectedTab={this.props.selectedTab} account={this.props.account}>Timeline</TweetTab>
          <TweetTab tab='mentions' selectedTab={this.props.selectedTab} account={this.props.account}>Mentions</TweetTab>
          <TweetTab tab='lists'    selectedTab={this.props.selectedTab} account={this.props.account} activate='.list_selector'>Lists</TweetTab>
          <TweetTab tab='search'   selectedTab={this.props.selectedTab} account={this.props.account} activate='.search_box'>Search</TweetTab>
        </ul>

        <TweetList tab='home'     selectedTab={this.props.selectedTab} tweets={this.props.tweetsByTab['home'] || []} />
        <TweetList tab='mentions' selectedTab={this.props.selectedTab} tweets={this.props.tweetsByTab['mentions'] || []} />
        <TweetList tab='lists'    selectedTab={this.props.selectedTab} tweets={this.props.tweetsByTab['lists'] || []}  withHeader='true'/>
        <TweetList tab='search'   selectedTab={this.props.selectedTab} tweets={this.props.tweetsByTab['search'] || []} withHeader='true'/>

        <ListSelector />
        <SearchBox />
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
