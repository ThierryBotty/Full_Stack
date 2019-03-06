import React from 'react'
import { connect } from 'react-redux'
import { addA } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {

  const add = event => {
    event.preventDefault()
    props.addA(event.target.anecdote.value)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  )
}

const ConnectedForm = connect(null, { addA })(AnecdoteForm)

export default ConnectedForm
