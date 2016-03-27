import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Search        from '../components/search';
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
        dispatch(Actions.setSearchQuery(event.target.value, props.account));
        dispatch(Actions.loadSearch(event.target.value, props.account, true))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
