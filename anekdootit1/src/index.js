import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const getBest = (votes) => {
  let best = 0;
  let best_i = 0;
  for(var i = 0; i < votes.length; i++){
    if(votes[i] > best){
      best = votes[i];
      best_i = i;
    }
  }
  return [best_i, best];
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  
  const vote = (x) => {
    let copy = votes
    copy[x] += 1
    setVotes(copy)
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <p>
        <Button handleClick={
          () => setSelected(Math.floor(Math.random()*props.anecdotes.length))}
          text='next anecdote' />
        <Button handleClick={() => vote(selected)} text='vote' />
      </p>

      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[getBest(votes)[0]]}</p>
      <p>has {getBest(votes)[1]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
