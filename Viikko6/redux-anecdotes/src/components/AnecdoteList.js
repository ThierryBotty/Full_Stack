import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const vote = (id) => {
    console.log('vote', id)
    props.voteA(id)
    let a = anecdotes.find(x => x.id === id)
    props.notify(`You voted '${a.content}'`)
  }

  return (
    <>
      {anecdotes.filter(x => x.content.includes(filter))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps, voteA, notify
)(AnecdoteList)
