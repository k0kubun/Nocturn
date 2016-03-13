import { connect } from 'react-redux';
import Actions     from '../actions';
import Reply       from '../components/reply';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: (event) => {
      dispatch(Actions.texts.setText(`@${props.tweet.user.screen_name} `));
      dispatch(Actions.tweets.setInReplyTo(props.tweet));

      // FIXME: Use better way to focus
      event.target.ownerDocument.getElementById('tweet_editor').focus();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
