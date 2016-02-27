import React from 'react';
import { render } from 'react-dom';
import Timeline from './components/timeline'

render(
  <Timeline />,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  require('./open-dev-tools')
}
