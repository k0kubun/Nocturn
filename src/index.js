import React from 'react';
import Root  from './components/root'
import { render } from 'react-dom';

render(<Root />, document.body);

if (process.env.NODE_ENV !== 'production') {
  require('./utils/open-dev-tools')
}
