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

const Statistics = (props) => {
  const statistics = "statistics"

  return (
    <div>
      <Title text={statistics}/>
      <Display text={props.stats[0].name} value={props.stats[0].value}/>
      <Display text={props.stats[1].name} value={props.stats[1].value}/>
      <Display text={props.stats[2].name} value={props.stats[2].value}/>
      <Display text={props.stats[3].name} value={props.stats[3].value}/>
      <Display text={props.stats[4].name} value={props.stats[4].value}/>
      <Display text={props.stats[5].name } value={props.stats[5].value+"%"}/>
    </div>
  )
}

const App = () => {
  const feedback = "give feedback"
  

  const goodText = "good"
  const neutralText = "neutral"
  const badText = "bad"
  const allText = "all"
  const averageText = "average"
  const positiveText = "positive" 

  const goodIntVal = 1
  const neutralIntVal = 0
  const badIntVal = -1

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countAll = () => {
    return good + neutral + bad
  }
  
  const calcAverage = () => {
    return countAll() === 0 ? 0 : ((good * goodIntVal + neutral * neutralIntVal + bad * badIntVal)/countAll())
  }

  const calcPositive = () => {
    return countAll() === 0 ? 0 : (good * 100)/countAll()
  }

  const stats = [
    {
      name: goodText,
      value: good
    },
    {
      name: neutralText,
      value: neutral
    },
    {
      name: badText,
      value: bad
    },
    {
      name: allText,
      value: countAll()
    },
    {
      name: averageText,
      value: calcAverage()
    },
    {
      name: positiveText,
      value: calcPositive()
    }
  ]

  return (
    <div>
      <Title text={feedback}/>
      <Button handleClick={() => setGood(good + 1)} text={goodText}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutralText}/>
      <Button handleClick={() => setBad(bad + 1)} text={badText}/>
      <Statistics stats={stats}/>

    </div>
  )
}

export default App