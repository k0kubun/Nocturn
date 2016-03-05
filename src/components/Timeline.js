import React        from 'react';
import ListSelector from './ListSelector'
import SearchBox    from './SearchBox'
import TweetList    from './TweetList'
import TweetTab     from './TweetTab'

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
