import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='alt-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={false}
  >
    <LogMonitor />
  </DockMonitor>
);
export default DevTools;
