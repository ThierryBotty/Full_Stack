
const reducer = (state = '', action) => {
  let s = state
  if(action.type === 'NEW_NOTIFICATION'){ s = action.notification }
  return s
}

export const notify = notification => {
  return {type: 'NEW_NOTIFICATION', notification: notification}
}

export default reducer
