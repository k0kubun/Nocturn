import React, { PropTypes } from 'react';
import { ipcRenderer }      from 'electron';

export default class Account extends React.Component {
  static propTypes = {
    activeAccount:   PropTypes.object,
    accounts:        PropTypes.array.isRequired,
    onAccountChange: PropTypes.func.isRequired,
    subscribeIpc:    PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.subscribeIpc();
  }

  render() {
    return(
      <select id='account_selector' name='account_list' onChange={this.props.onAccountChange} value={this.props.activeAccountIndex}>
        {this.props.accounts.map((account, index) =>
          <option value={index} key={account.id_str}>{account.screenName}</option>
        )}
        <option value='add-account'>Add...</option>
      </select>
    );
  }
}
