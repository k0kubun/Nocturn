import * as accounts from './accounts';
import * as lists    from './lists';
import * as tabs     from './tabs';
import * as texts    from './texts';
import * as tweets   from './tweets';

export default {
  ...Object.assign(
    accounts,
    lists,
    tabs,
    texts,
    tweets,
  ),
  ...{
    accounts,
    lists,
    tabs,
    texts,
    tweets,
  }
}
