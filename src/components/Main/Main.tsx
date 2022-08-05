import '../styles.css'

function Main() {
  // Initialize variables of handleClick function
  let time = 2000     // Time in milliseconds that the timer will run
  let start = false   // Boolean value indicating start of time 
  let counter = 0     // Number of clicks
  
  // Count clicks
  function handleClick() {
    
    // Activate the timer if this is the first click
    if (start == false) {
      counter = 0

      setTimeout(function(){
        console.log(counter);
        start = false
      }
      , time) }

    // After first click, it won't reset the timer
    start = true

    // Add the click to counter
    ++counter
  }

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