import React, { PropTypes } from 'react';
import ListContainer        from '../containers/list-container';
import MentionTabContainer  from '../containers/mention-tab-container';
import SearchContainer      from '../containers/search-container';
import TweetListContainer   from '../containers/tweet-list-container';
import TweetTabContainer    from '../containers/tweet-tab-container';

export default class Timeline extends React.Component {
  static propTypes = {
    account:        PropTypes.object.isRequired,
    active:         PropTypes.bool.isRequired,
    loadHome:       PropTypes.func.isRequired,
    loadLists:      PropTypes.func.isRequired,
    loadMentions:   PropTypes.func.isRequired,
    startStreaming: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadHome();
    this.props.loadMentions();
    this.props.loadLists();
    this.props.startStreaming();
  }

  render() {
    return(
      <div className={`timeline ${this.props.active ? 'active' : ''}`}>
        <ul className='tabs clearfix'>
          <TweetTabContainer account={this.props.account} tab='home'>Timeline</TweetTabContainer>
          <MentionTabContainer account={this.props.account} tab='mentions'>Mentions</MentionTabContainer>
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
