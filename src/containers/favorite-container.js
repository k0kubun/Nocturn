import Actions     from '../actions';
import Favorite    from '../components/favorite';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
})(Favorite);
