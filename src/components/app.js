import React, { PropTypes } from 'react';
import AccountContainer     from '../containers/account-container';
import Authentication       from '../utils/authentication'
import Editor               from '../containers/editor';
import Header               from '../containers/header';
import Timeline             from '../containers/timeline';
import TwitterClient        from '../utils/twitter-client'

export default class App extends React.Component {
  static propTypes = {
    accounts:        PropTypes.array.isRequired,
    addAccount:      PropTypes.func.isRequired,
    refreshUserInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initializeAccounts();
  }

  initializeAccounts() {
    let accounts = Authentication.allAccounts();
    for (let account of accounts) {
      this.props.addAccount(account);

      let client = new TwitterClient(account);
      client.verifyCredentials((user) => {
        this.props.refreshUserInfo(user);
      });
    }
  }

  render() {
    return(
      <div className={`timeline_container ${process.platform}`}>
        <Header />

        <AccountContainer />
        <Editor />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline key={account.id} account={account} />
          )}
        </div>
      </div>
    );
  }
}
