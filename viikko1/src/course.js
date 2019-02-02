import React from 'react'

const Header = ( {course} ) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ( {part} ) =>
    <li>{part.name} {part.exercises}</li>

const Content = ( {parts} ) => {
  return (
    <>
      { parts.map(part => <Part key={part.id} part={part}/>) }
    </>
  )
}

const Total = ( {parts} ) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>yhteensä {total} tehtävää</p>
  )
}

const Course = ( {course} ) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
