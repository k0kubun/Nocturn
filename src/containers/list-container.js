import Actions     from '../actions';
import { connect } from 'react-redux';
import List        from '../components/list'

const mapStateToProps = (state, props) => {
  return {
    lists:  state.listsByUserId[props.account.id] || [],
    active: state.selectedTabByUserId[props.account.id] === 'lists',
  };
}

export default connect(mapStateToProps, {
  ...Actions.lists,
  ...Actions.tweets,
})(List);
