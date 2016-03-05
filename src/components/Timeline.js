import React        from 'react';
import ListSelector from './ListSelector'
import SearchBox    from './SearchBox'
import Tweet        from './Tweet'
import TweetList    from './TweetList'
import TweetTab     from './TweetTab'

export default class Timeline extends React.Component {
  render() {
    return(
      <div className={this.props.account.userId == this.props.activeAccountId ? 'timeline active' : 'timeline'}>
        <ul className='tabs clearfix'>
          <TweetTab selector='#home' active='true'>Timeline</TweetTab>
          <TweetTab selector='#mentions'>Mentions</TweetTab>
          <TweetTab selector='#lists' activate='.list_selector'>Lists</TweetTab>
          <TweetTab selector='#search' activate='.search_box'>Search</TweetTab>
        </ul>

        // template to generate element
        <Tweet />

        <TweetList id='home' active='true' />
        <TweetList id='mentions' />
        <TweetList id='lists' withHeader='true' />
        <TweetList id='search' withHeader='true'>
          <li className='insert_target'></li>
        </TweetList>

        <ListSelector />
        <SearchBox />
      </div>
    );
  }
}
