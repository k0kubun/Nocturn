import { connect } from 'react-redux';
import Actions     from '../actions';
import Reply       from '../components/reply';

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {
  ...Actions.texts,
  ...Actions.tweets,
})(Reply);
