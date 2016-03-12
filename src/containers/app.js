import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import AccountContainer     from './account-container';
import Authentication       from '../utils/authentication'
import Editor               from './editor';
import Header               from './header';
import Timeline             from './timeline';
import TwitterClient        from '../utils/twitter-client'
import Actions              from '../actions';

class App extends React.Component {
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

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  }
}

export default connect(mapStateToProps, {
  ...Actions.accounts,
})(App);
