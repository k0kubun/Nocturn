import Account         from '../components/account';
import Actions         from '../actions';
import { connect }     from 'react-redux';
import { ipcRenderer } from 'electron';

const mapStateToProps = (state) => {
  return {
    accounts:              state.accounts,
    activeAccountIndex:    state.activeAccountIndex,
    activeAccountSelector: state.activeAccountSelector,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAccountChange: (event) => {
      const value = event.target.dataset.value;
      if (value === 'add-account') {
        event.preventDefault();
        ipcRenderer.send('start-authentication');
      } else {
        dispatch(Actions.activateAccount(value));
      }
      dispatch(Actions.toggleAccountSelector());
    },
    subscribeIpc: () => {
      ipcRenderer.on('finish-authentication', (event, token) => {
        dispatch(Actions.addAccount(token));
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
