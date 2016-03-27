import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Delete               from '../components/delete';

export default class DeleteContainer extends BaseContainer {
  shouldComponentUpdate() {
    return false;
  }

  onClick(event) {
    this.store.dispatch(
      Actions.deleteTweet(
        this.props.tweet,
        this.props.account,
        this.props.tab,
      ),
    );
  }

  render() {
    return <Delete {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
