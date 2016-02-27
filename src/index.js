import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root'

render(
  <Root />,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  require('./openDevTools')
}
