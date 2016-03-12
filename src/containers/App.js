import React from 'react';
import { connect } from 'react-redux';
import AccountSelector from './AccountSelector';
import Authentication  from '../utils/Authentication'
import Editor          from './Editor';
import Header          from './Header';
import Timeline        from './Timeline';
import TwitterClient   from '../utils/TwitterClient'
import Actions         from '../actions';

class App extends React.Component {
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

        <AccountSelector />
        <Editor />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline
              key={account.id}
              account={account}
              tweetsByTab={this.props.tabsByUserId[account.id] || {}}
              selectedTab={this.props.selectedTabByUserId[account.id] || 'home'}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts:            state.accounts,
    selectedTabByUserId: state.selectedTabByUserId,
    tabsByUserId:        state.tabsByUserId,
  }
}

export default connect(mapStateToProps, Actions)(App);
