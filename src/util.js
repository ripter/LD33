'use strict';

// Calls function only after delay time has passed.
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

// returns the first sprite in the group that matches predicate.
export function getFirst(group, predicate) {
  const availableSet = group.filter(predicate);
  
  // are there any we can recycle?
  if (availableSet.total > 0) {
    return availableSet.first;
  }
  
  return null;
}

// http://stackoverflow.com/a/2117523
export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// Split a comma seprated string into a trimmed list.
export function splitTrim(str) {
  return str.split(',').map((s) => { return s.trim(); });
}
