import '../styles.css'

import handleClick from './handleClick'

function Main() {
  let active = true
  return (
    <main>
      <div className="container">
        <button id='config' aria-label='config button'></button>
        <h2>Test the <span>speed</span> you click</h2>
        {active && <section id='config-container'>
          <h3>Set the interval to count</h3>
          <input type="range" name="interval of time to count" min="1" max="10" step="1"/>
        </section>}
      </div>
      <div className="btn">
        <button id='counter' onClick={handleClick}>Click</button>
      </div>
    </main>
  );
}
 
export default Main;