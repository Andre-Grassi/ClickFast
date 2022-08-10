// React hooks
import { useState, useEffect } from 'react'

// Import function
import handleClick from './handleClick'

// Stylesheet
import '../styles.css'

function Main() {
  /*
    ------- Hooks -------
  */
  // Use state hook for activating configs container
  const [configActive, setConfigActive] = useState(false)

  // Use state hook for closing log container
  const [logActive, setLogActive] = useState(true)

  // Use state hook for setting timer value
  const DEFAULT_VALUE = 3
  const [timer, setTimer] = useState(DEFAULT_VALUE)
 
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
      <div className="btn">
        <button id='counter' onClick={() => setLogActive(handleClick(timer))}>Click</button>
        {/* To solve this problem: https://stackoverflow.com/questions/54867616/console-log-the-state-after-using-usestate-doesnt-return-the-current-value/54867900#54867900 go to solved answer */}
      </div>

      {!logActive && <div className="glass-container" id="log">
        <h2>Your click <span>speed</span> is: </h2>
        <button className="close-btn" onClick={() => setLogActive(false)}></button>
        <h3>Previous tests: </h3>
      </div>}
    </main>
  );
}
 
export default Main;