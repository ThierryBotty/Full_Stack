import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  const Header = () => {
    return (
      <h1>{course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.part} {props.exercise}</p>
    )
  }

  const Content = () => {
    return (
      <>
        <Part part={part1} exercise={exercises1}/>
        <Part part={part2} exercise={exercises2}/>
        <Part part={part3} exercise={exercises3}/>
      </>
    )
  }
  const Total = () => {
    return (
      <p>yhteensä {exercises1 + exercises2 + exercises3} tehtävää</p>
    )
  }

  return (
    <div>
    <Header course={course} />
    <Content />
    <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
