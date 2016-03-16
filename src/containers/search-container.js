import Actions     from '../actions';
import Search      from '../components/search';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    active: state.selectedTabByUserId[props.account.id_str] === 'search',
  };
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
  ...Actions.texts,
})(Search);
