import React, { PropTypes } from 'react';

export default class BaseContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }
}
