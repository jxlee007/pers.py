// YOUR BLUEPRINT
function createScraper(characterSymbol) {
  // Return a function that takes a text string
  return (text) => {
    return `${characterSymbol}${text}${characterSymbol}`;
  };
}

// HOW YOU WILL TEST IT
const starScraper = createScraper("*");
const dollarScraper = createScraper("$");

console.log(starScraper("JavaScript")); // Expected stdout: "*JavaScript*"
console.log(dollarScraper("Odoo"));     // Expected stdout: "$Odoo$"
    