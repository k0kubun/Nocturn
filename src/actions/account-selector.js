export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';

export const activateAccount = (index) => {
  return { type: ACTIVATE_ACCOUNT, index: parseInt(index) }
}
