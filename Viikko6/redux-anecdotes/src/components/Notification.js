import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!props.notification) return null
  setTimeout(() => {props.notify('')}, 5000)

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {notification: state.notification}
}

const ConnectedNotification = connect(mapStateToProps, {notify} )(Notification)

export default ConnectedNotification
