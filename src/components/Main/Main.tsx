// React hooks
import { useState, useEffect } from 'react'

// Import function
import handleClick from './handleClick'

// Stylesheet
import '../styles.css'

function Main() {
  /*
    ------- Use State Hooks -------
  */
  // Use state hook for activating configs container
  const [configActive, setConfigActive] = useState(false)

  // Use state hook for closing log container
  const [logActive, setLogActive] = useState(false)

  // Use state hook for setting timer value
  const DEFAULT_VALUE = 3
  const [timer, setTimer] = useState(DEFAULT_VALUE)

  // Use state hook for setting number of clicks
  const [nClicks, setClicks] = useState(0)

  // Use state hook for setting the previous entries
  let list: number[] = []
  const [prevClicks, setPrevClicks] = useState(list)
 
  /*
    ------- Functions -------
  */
  // Function that sets state of 'active' to its opposite (activate or deactivate)
  function showConfig() {
    setConfigActive(!configActive)
  }

  // Function that gets the current value of "range.valueAsNumber"
  function getRangeValue() {
    // Initialize variable that gets the range input as a HTMLInputElement (this way script can get its properties)
    // Using "as HTMLInputElement" so even if range is null it value will be get
    const range: HTMLInputElement = document.querySelector('input[type="range"]') as HTMLInputElement
    return range.valueAsNumber
  }

  // Function that gets the clicks per second performed within the given interval
  function getCps(clicks: number, interval: number) {
    return Math.round((clicks / interval) * 10) / 10
  }

  // Function that calculates the cps average getting the array of previous clicks and the current clicks (that aren't in the array yet) then returns the rounded average
  function averageCps(arr: number[], n2: number) {
    // Get the number of elements
    const nOfElements = arr.length + 1

    // Get the average ((sum of elements of array + number of clicks at the moment) / number of elements)
    const average = (((arr.reduce((prevValue, currValue) => prevValue + currValue)) + n2) / nOfElements)
    
    return Math.round((average) * 10) / 10
  }

  /*
    ------- Use Effect Hooks -------
  */
  // Use effect hook to watch for changes in the value of logActive
  useEffect(
    () => {    
      // When log active is true, then set the prevClicks to the number of clicks performed in the last interval
      if (!logActive)
        return
        
      // Set oldList to be the prevClicks (gets all the other clicks performed before this interval)
      const oldList = prevClicks // Preserving immutability of prevClicks

      // Get cps and push the new number of clicks performed
      oldList.push(getCps(nClicks, timer))
      // If there are already 5 elements in the list, then remove the first one
      if (prevClicks.length > 5) 
        oldList.shift()  
      
      // Update state of prevClicks
      setPrevClicks(oldList)
    }, 
    [logActive]
  )

  return (
    <main>
      {/* Div that contains the h2 and the configuration */}
      <div className="container">
        <button id='config' aria-label='config button' onClick={showConfig}></button>
        <h2>Test the <span>speed</span> you click</h2>
        {configActive && <section className='glass-container' id='config-container'>
          <h3>Set the interval to count</h3>
          <input type="range" name="interval of time to count" defaultValue={DEFAULT_VALUE} min="1" max="10" step="1" onInput={() => setTimer(getRangeValue())}/>
        </section>}
      </div>

      {/* Div that contains the main button */}
      {/* Button starts the timer, then fires the setLogActive and setClicks functions */}
      {<div className="btn">
        <button 
          id='counter' 
          // When log is showing, then disable the button
          disabled={logActive}
          onClick={
            () => { 
              handleClick(
                timer, () => setLogActive(true), 
                (n: number) => setClicks(n)
                )
              }}>Click</button>
      </div>}

      {/* Div that contains the log content */}
      {/* Show when logActive is true and outputs click speed in cps*/}
      {logActive && <div className="glass-container" id="log">
        <h2>Your click speed is: <span>{ getCps(nClicks, timer) }cps</span></h2>
        <button className="close-btn" onClick={() => setLogActive(false)}></button>
        {/* If there are previous clicks, then display the tags below */}
        <div className="info">
        {(prevClicks.length > 0) && <h3 className="text-center">Average speed: {averageCps(prevClicks, nClicks)}</h3>}
        {(prevClicks.length > 0) && <h3 className='text-center'>Previous tests: {
          // Output array with elements separated by "-" and space
          prevClicks.join(' - ') 
        }</h3>}
        </div>
      </div>}
    </main>
  );
}
 
export default Main;