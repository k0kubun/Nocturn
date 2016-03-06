import * as app      from './app';
import * as editor   from './editor';
import * as timeline from './timeline';
import * as accountSelector from './account-selector';

export default Object.assign(
  app,
  accountSelector,
  editor,
  timeline
)
