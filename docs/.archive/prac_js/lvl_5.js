const agent = {
  codename: "007",
  
  // Method 1: Regular function
  printCodename: function() {
    return `Agent ${this.codename}`;
  }
};

const looseFunction = agent.printCodename.bind(agent);

console.log(agent.printCodename()); // Output A
console.log(looseFunction());       // Output B
