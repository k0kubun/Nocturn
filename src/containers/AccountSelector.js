import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

class AccountSelector extends React.Component {
  componentDidMount() {
    ipcRenderer.on('finish-authentication', (event, token) => {
      // dispatch token
    });
  }

  onAccountChange(event) {
    if (event.target.value === 'add-account') {
      event.preventDefault();
      ipcRenderer.send('start-authentication');
    } else {
      // dispatch
    }
  }

  render() {
    return(
      <select id='account_selector' name='account_list' onChange={this.onAccountChange.bind(this)} value={this.props.activeAccount && this.props.activeAccount.id}>
        {this.props.accounts.map((account) =>
          <option value={account.id} key={account.id}>{account.screenName}</option>
        )}
        <option value='add-account'>Add...</option>
      </select>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    activeAccount: state.accounts[state.activeAccountIndex],
  }
}

export default connect(mapStateToProps, {})(AccountSelector);
