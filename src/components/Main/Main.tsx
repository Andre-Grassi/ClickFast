import '../styles.css'

import handleClick from './handleClick'

function Main() {
  return (
    <main>
      <div className="container">
        <button id='config' aria-label='config button'></button>
        <h2>Test the <span>speed</span> you click</h2>
      </div>
      <div className="btn">
        <button id='counter' onClick={handleClick}>Click</button>
      </div>
    </main>
  );
}
 
export default Main;