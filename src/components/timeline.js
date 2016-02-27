import React        from 'react';
import ListSelector from './list-selector'
import SearchBox    from './search-box'
import Tweet        from './tweet'
import TweetList    from './tweet-list'

export default class Timeline extends React.Component {
  render() {
    return(
      <div className='timeline timeline_template'>
        // template to generate element
        <Tweet />

        <TweetList id='home' className='tweets active' />
        <TweetList id='mentions' className='tweets' />
        <TweetList id='lists' className='tweets with_header' />
        <TweetList id='search' className='tweets with_header'>
          <li className='insert_target'></li>
        </TweetList>

        <ListSelector />
        <SearchBox />
      </div>
    );
  }
}
