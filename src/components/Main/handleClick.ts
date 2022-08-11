// Variables of handleClick function
let start = false               // Boolean value indicating start of time 
let counter = 0                 // Number of clicks
// timer = 3000 (default value) Time in milliseconds that the timer will run
    
// Count clicks
// TIMER SHOULD BE PASSED AS SECONDS
// Runs [timer] amount of milliseconds and then fires two callback functions
function handleClick(timer: number, callback1: Function, callback2: Function) {
  // Turn seconds into milliseconds
  timer *= 1000 //x 1000

  // Activate the timer if this is the first click
  if (start == false) {
    counter = 0

    setTimeout(function(){
      console.log(counter);
      start = false
      console.log(start)
      
      // Fires the callback functions
      callback1()

      // Fires callback function that receives as argument the number of clicks (counter)
      callback2(counter)
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

