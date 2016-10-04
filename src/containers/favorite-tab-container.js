import Actions     from '../actions';
import TweetTab    from '../components/tweet-tab';
import { connect } from 'react-redux';

const mapStateToProps = () => {
  // TODO

  return {
    unread: 0
  }
};

export default connect(mapStateToProps, null)(TweetTab)
