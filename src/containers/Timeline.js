import React         from 'react';
import ListSelector  from '../components/ListSelector'
import SearchBox     from '../components/SearchBox'
import TweetList     from '../components/TweetList'
import Tweet         from '../components/Tweet'
import TweetTab      from '../components/TweetTab'
import Actions       from '../actions';
import TwitterClient from '../utils/TwitterClient'
import { connect }   from 'react-redux';

export default class Timeline extends React.Component {
  componentDidMount() {
    this.loadHome();
    this.startStreaming();
  }

  loadHome() {
    let client = new TwitterClient(this.props.account);
    client.homeTimeline((tweets) => {
      for (let tweet of tweets.reverse()) {
        this.props.addTweet(tweet, this.props.account);
      }
    })
  }

  startStreaming() {
    let client = new TwitterClient(this.props.account);
    client.userStream((tweet) => {
      this.props.addTweet(tweet, this.props.account);
    });
  }

  render() {
    return(
      <div className={this.props.account.id == this.props.activeAccount.id ? 'timeline active' : 'timeline'}>
        <ul className='tabs clearfix'>
          <TweetTab selector='#home' active='true'>Timeline</TweetTab>
          <TweetTab selector='#mentions'>Mentions</TweetTab>
          <TweetTab selector='#lists' activate='.list_selector'>Lists</TweetTab>
          <TweetTab selector='#search' activate='.search_box'>Search</TweetTab>
        </ul>

        <TweetList id='home' active='true' tweets={this.props.tweets} />
        <TweetList id='mentions' tweets={this.props.tweets} />
        <TweetList id='lists' withHeader='true' tweets={this.props.tweets} />
        <TweetList id='search' withHeader='true' tweets={this.props.tweets} />

        <ListSelector />
        <SearchBox />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];

  return {
    activeAccount: activeAccount,
    tweets: (activeAccount && state.tweetsByUserId[activeAccount.id]) || [],
  }
}

export default connect(mapStateToProps, Actions)(Timeline);
