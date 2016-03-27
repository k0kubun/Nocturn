import Actions       from '../actions';
import List          from '../components/list';
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
        dispatch(Actions.setActiveListId(listId, props.account));
        dispatch(Actions.loadList(listId, props.account, true));
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
