const company = {
  brandName: "Odoo",
  
  // Method 1: Regular function
  announceRegular: function() {
    setTimeout(function() {
      console.log(`Welcome to ${this.brandName}`);
    }.bind(company) , 100);
  },

  // Method 2: Arrow function callback
  announceArrow: function() {
    setTimeout(() => {
      console.log(`Welcome to ${this.brandName}`);
    }, 100);
  }
};



company.announceRegular(); // Output X
company.announceArrow();   // Output Y