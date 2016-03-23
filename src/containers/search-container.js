import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Search        from '../components/search';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    active: state.selectedTabByUserId[props.account.id_str] === 'search',
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchFieldKeyDown: (event) => {
      if (event.keyCode === Keycode.ENTER) {
        event.preventDefault();

        let query = event.target.value;
        let client = new TwitterClient(props.account);
        client.searchTweets(query, 50, (tweets) => {
          dispatch(Actions.setSearchQuery(query, props.account));
          dispatch(Actions.clearAndSetTweets(tweets, props.account, 'search'));
        });
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
