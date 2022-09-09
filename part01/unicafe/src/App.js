import { useState } from 'react'

const Button = (props) => {
    console.log("clicked")
    return(
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
  }

const Title = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const Display = (props) => {
  return(
    <div>
      {props.text} {props.value}
    </div>
  )
}

const App = () => {
  const feedback = "give feedback"
  const statistics = "statistics"

  const goodText = "good"
  const neutralText = "neutral"
  const badText = "bad"

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text={feedback}/>
      <Button handleClick={() => setGood(good + 1)} text={goodText}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutralText}/>
      <Button handleClick={() => setBad(bad + 1)} text={badText}/>

      <Title text={statistics}/>
      <Display text={goodText} value={good}/>
      <Display text={neutralText} value={neutral}/>
      <Display text={badText} value={bad}/>

    </div>
  )
}

export default App