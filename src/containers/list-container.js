import Actions       from '../actions';
import List          from '../components/list';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    lists:  state.listsByUserId[props.account.id_str] || [],
    active: state.selectedTabByUserId[props.account.id_str] === 'lists',
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListChanged: (event) => {
      let listId = event.target.value;
      if (listId > 0) {
        dispatch(Actions.lists.setActiveListId(listId, props.account));

        let client = new TwitterClient(props.account);
        client.listsStatuses(listId, (tweets) => {
          dispatch(Actions.tweets.clearAndSetTweets(tweets, props.account, 'lists'));
        });
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
