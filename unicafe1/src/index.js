import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad] = [props.good, props.neutral, props.bad]

  let total = good + bad + neutral
  const average = () => ((good - bad) / total)
  const percent = () => (good / total * 100 + " %")

  if (total === 0){
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic name={'hyvä'} value={good} />
          <Statistic name={'neutraali'} value={neutral} />
          <Statistic name={'yhteensä'} value={total} />
          <Statistic name={'keskiarvo'} value={average()} />
          <Statistic name={'positiivisia'} value={percent()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Anna palautetta </h1>
      <p>
        <Button handleClick={() => setGood(good + 1)} text = "hyvä" />
        <Button handleClick={() => setNeutral(neutral + 1)} text = "neutraali" />
        <Button handleClick={() => setBad(bad + 1)} text = "huono" />
      </p>
      <h1>Statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
