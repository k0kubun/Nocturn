import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { ipcRenderer }      from 'electron';
import Actions              from '../actions';
import TwitterClient        from '../utils/twitter-client';

class AccountSelector extends React.Component {
  static propTypes = {
    activeAccount:   PropTypes.object,
    accounts:        PropTypes.array.isRequired,
    addAccount:      PropTypes.func.isRequired,
    refreshUserInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    ipcRenderer.on('finish-authentication', (event, token) => {
      this.props.addAccount(token);

      let client = new TwitterClient(token);
      client.verifyCredentials((user) => {
        this.props.refreshUserInfo(user);
      });
    });
  }

  onAccountChange(event) {
    if (event.target.value === 'add-account') {
      event.preventDefault();
      ipcRenderer.send('start-authentication');
    } else {
      this.props.activateAccount(event.target.value);
    }
  }

  render() {
    return(
      <select id='account_selector' name='account_list' onChange={this.onAccountChange.bind(this)} value={this.props.activeAccountIndex}>
        {this.props.accounts.map((account, index) =>
          <option value={index} key={account.id}>{account.screenName}</option>
        )}
        <option value='add-account'>Add...</option>
      </select>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts:           state.accounts,
    activeAccountIndex: state.activeAccountIndex,
  }
}

export default connect(mapStateToProps, {
  ...Actions.accounts,
})(AccountSelector);
