import React         from 'react';
import ListSelector  from '../components/ListSelector'
import SearchBox     from '../components/SearchBox'
import TweetList     from '../components/TweetList'
import TweetTab      from '../components/TweetTab'
import { connect }   from 'react-redux';
import { addTweet }  from '../actions';
import TwitterClient from '../utils/TwitterClient'

export default class Timeline extends React.Component {
  componentDidMount() {
    this.props.startStreaming(this.props.account);
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
        <TweetList id='mentions' tweets={[]}/>
        <TweetList id='lists' withHeader='true' tweets={[]} />
        <TweetList id='search' withHeader='true' tweets={[]} />

        <ListSelector />
        <SearchBox />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeAccountId: state.activeAccountId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startStreaming: (account) => {
      let accountId = account.user_id;
      let client = new TwitterClient(account);
      client.userStream((tweet) => {
        dispatch(addTweet(tweet));
      });
    },
    onTweetReceived: (tweet) => {
      dispatch(addTweet(tweet))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
