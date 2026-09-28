function createTaskManager() {
  let tasks = []; // Private data array
  
  return {
    // Implement your three methods here
    addTask: function(task) {
      tasks.push(task);
      return `Added: ${task}`;
    },
    count: function() {
      return tasks.length;
    },
    getTasks: function() {
      return tasks.slice(); // Return a copy of the tasks array
    } 
  };
}

// HOW TO TEST IT
const myManager = createTaskManager();
console.log(myManager.addTask("Learn Closures")); // "Added: Learn Closures"
console.log(myManager.addTask("Master This"));     // "Added: Master This"
console.log(myManager.count());                   // 2
console.log(myManager.getTasks());                // ["Learn Closures", "Master This"]
