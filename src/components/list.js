import React, { PropTypes } from 'react';
import TwitterClient        from '../utils/twitter-client'

export default class List extends React.Component {
  static propTypes = {
    account:           PropTypes.object.isRequired,
    active:            PropTypes.bool.isRequired,
    lists:             PropTypes.array.isRequired,
    clearAndSetTweets: PropTypes.func.isRequired,
    setActiveListId:   PropTypes.func.isRequired,
  }

  onListChanged(event) {
    let listId = event.target.value;
    if (listId > 0) {
      this.props.setActiveListId(listId, this.props.account);

      let client = new TwitterClient(this.props.account);
      client.listsStatuses(listId, (tweets) => {
        this.props.clearAndSetTweets(tweets, this.props.account, 'lists');
      });
    }
  }

  render() {
    return(
      <div className={`tweets_header list_selector ${this.props.active ? 'active' : ''}`}>
        <select className='list_field' onChange={this.onListChanged.bind(this)}>
          <option value='0'>Select List...</option>
          {this.props.lists.map((list) =>
            <option key={list.id} value={list.id}>{list.full_name}</option>
          )}
        </select>
      </div>
    );
  }
}
