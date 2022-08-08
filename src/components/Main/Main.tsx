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
  const [active, setActive] = useState(false)

  // Use state hook for setting timer value
  const DEFAULT_VALUE = 3
  const [timer, setTimer] = useState(DEFAULT_VALUE)
 
  /*
    ------- Functions -------
  */
  // Function that sets state of 'active' to its opposite (activate or deactivate)
  function showConfig() {
    setActive(!active)
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
        {active && <section id='config-container'>
          <h3>Set the interval to count</h3>
          <input type="range" name="interval of time to count" defaultValue={DEFAULT_VALUE} min="1" max="10" step="1" onInput={() => setTimer(getRangeValue())}/>
        </section>}
      </div>

      {/* Div that contains the main button */}
      <div className="btn">
        <button id='counter' onClick={() => handleClick(timer)}>Click</button>
      </div>
    </main>
  );
}
 
export default Main;