import React         from 'react';
import ListSelector  from '../components/ListSelector'
import SearchBox     from '../components/SearchBox'
import TweetList     from '../components/TweetList'
import Tweet         from '../components/Tweet'
import TweetTab      from '../components/TweetTab'
import { connect }   from 'react-redux';
import { addTweet }  from '../actions';
import TwitterClient from '../utils/TwitterClient'

export default class Timeline extends React.Component {
  componentDidMount() {
    this.loadHome();
    this.startStreaming();
  }

  loadHome() {
    let client = new TwitterClient(this.props.account);
    client.homeTimeline((tweets) => {
      for (let tweet of tweets.reverse()) {
        this.props.addTweet(tweet);
      }
    })
  }

  startStreaming() {
    let client = new TwitterClient(this.props.account);
    client.userStream((tweet) => {
      this.props.addTweet(tweet);
    });
  }

  render() {
    return(
      <div className={this.props.account.userId == this.props.activeAccountId ? 'timeline active' : 'timeline'}>
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
  return {
    activeAccountId: state.activeAccountId,
    tweets: state.tweets,
  }
}

export default connect(mapStateToProps, {
  addTweet,
})(Timeline);
