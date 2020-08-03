import React, { PropTypes } from 'react';
import { ipcRenderer }      from 'electron';

export default class Account extends React.Component {
  static propTypes = {
    accounts:              PropTypes.array.isRequired,
    activeAccountIndex:    PropTypes.number.isRequired,
    activeAccountSelector: PropTypes.bool.isRequired,
    onAccountChange:       PropTypes.func.isRequired,
    subscribeIpc:          PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.subscribeIpc();
  }

  render() {
    return(
      <div className={`account_selector ${this.props.activeAccountSelector ? 'active' : ''}`}>
        {this.props.accounts.map((account, index) =>
          <div
            key={account.id_str}
            data-value={index}
            className={`account_option ${this.props.activeAccountIndex == index ? 'active' : ''}`}
            onClick={this.props.onAccountChange}
          >{account.screenName}</div>
        )}
        <div className='account_option' data-value='add-account' onClick={this.props.onAccountChange}>Add...</div>
      </div>
    );
  }
}
