import React, { PropTypes } from 'react';
import AccountContainer     from '../containers/account-container';
import Authentication       from '../utils/authentication';
import EditorContainer      from '../containers/editor-container';
import HeaderContainer      from '../containers/header-container';
import TimelineContainer    from '../containers/timeline-container';
import TwitterClient        from '../utils/twitter-client';

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
        <HeaderContainer />

        <AccountContainer />
        <EditorContainer />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <TimelineContainer key={account.id} account={account} />
          )}
        </div>
      </div>
    );
  }
}
