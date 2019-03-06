import React from 'react'

import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!props.store.getState().notification) return null
  setTimeout(() => {props.store.dispatch(notify(null))}, 5000)

  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification
