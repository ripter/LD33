'use strict';

// poor man's debounce, using phaser's event timer
// Returns a function that can only be called after the deplay.
// If func can not be called, returns false.
// If func can be called, returns result of func
export function debounce(delay) {
  let isReady = true;
  
  return (eventTimer, func) => {
    // ignore calls until ready
    if (!isReady) { return false; }
    // We are going to call func, so we are not ready.
    isReady = false;
    
    // Start the delay
    eventTimer.add(delay, () => {
      isReady = true;
    });
    
    // call the function
    return func();
  };
}
