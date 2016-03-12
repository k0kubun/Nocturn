import { connect } from 'react-redux';
import Actions     from '../actions';
import App         from '../components/app'

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  }
}

export default connect(mapStateToProps, {
  ...Actions.accounts,
})(App);
