import '../styles.css'

import handleClick from './handleClick'

function Main() {
  return (
    <main>
      <h2>Test the <span>speed</span> you click</h2>
      <div className="btn">
        <button onClick={handleClick}>Click</button>
      </div>
    </main>
  );
}
 
export default Main;