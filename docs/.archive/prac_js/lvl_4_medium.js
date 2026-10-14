function createTriggers() {
  const functions = [];
  
  // Notice the use of 'var' here!

  // for (var i = 0; i < 3; i++) {
  
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  
  return functions;
}

const triggers = createTriggers();

console.log(triggers[0]()); // What will this print?
console.log(triggers[1]()); // What will this print?
console.log(triggers[2]()); // What will this print?