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
  let newList = [0] // New list that will contain the last click
 
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

  /*
    ------- Use Effect Hooks -------
  */
  // Use effect hook to watch for changes in the value of logActive
  useEffect(
    () => {    
      if (!logActive)
        return
        
      // When log active is true, then set the prevClicks to the number of clicks performed in the last interval
      // Get cps
      newList[0] = getCps(nClicks, timer)
      // Set oldList to be the prevClicks (gets all the other clicks performed before this interval)
      const oldList = prevClicks // Preserving immutability of prevClicks

      // Concatenate the oldList with the new clicks and sets the prevClicks to the new array generated
      /*
        Can't push because pushing will set a new value for the array, and not create a new one
        since the modified array is stateless, it will just become the value pushed 
        that's why I'm using array.concat() instead
      */
      setPrevClicks(oldList.concat(newList))
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
        <h3>Previous tests: {
          // Output array with elements separated by comma and space
          prevClicks.join(', ') 
        }</h3>
      </div>}
    </main>
  );
}
 
export default Main;