// Variables of handleClick function
let start = false               // Boolean value indicating start of time 
let counter = 0                 // Number of clicks
// timer = 3000 (default value) Time in milliseconds that the timer will run
    
// Count clicks
// TIMER SHOULD BE PASSED AS SECONDS
function handleClick(timer: number) {
  // Turn seconds into milliseconds
  timer *= 1000

  // Activate the timer if this is the first click
  if (start == false) {
    counter = 0

    setTimeout(function(){
      console.log(counter);
      start = false
      console.log(start)
      return start
    }
    , timer) 
  }

  // After first click, it won't reset the timer
  start = true

  // Add the click to counter
  ++counter
  console.log('x')
  return start
}

export default handleClick

