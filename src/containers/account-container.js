import Account         from '../components/account';
import Actions         from '../actions';
import TwitterClient   from '../utils/twitter-client';
import { connect }     from 'react-redux';
import { ipcRenderer } from 'electron';

const mapStateToProps = (state) => {
  return {
    accounts:           state.accounts,
    activeAccountIndex: state.activeAccountIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAccountChange: (event) => {
      if (event.target.value === 'add-account') {
        event.preventDefault();
        ipcRenderer.send('start-authentication');
      } else {
        dispatch(Actions.activateAccount(event.target.value));
      }
    },
    subscribeIpc: () => {
      ipcRenderer.on('finish-authentication', (event, token) => {
        dispatch(Actions.addAccount(token));

        let client = new TwitterClient(token);
        client.verifyCredentials((user) => {
          dispatch(Actions.refreshUserInfo(user));
        });
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
