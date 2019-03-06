const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(x => {
        if (x.id === action.data.id) return {
          ...x,
          votes: x.votes + 1
        }
      return x
    }).sort((a,b) => b.votes-a.votes)
  case 'ADD':
    return state.concat(asObject(action.data.content))
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const initA = anecdotes => {
  return {type: 'INIT', data: { anecdotes }}
}

export const voteA = id => {
  return {type: 'VOTE', data: { id }}
}

export const addA = content => {
  return {type: 'ADD', data: { content }}
}
export default reducer
