// private object literal
function createVault() {
  let secretGold = 100; 
  
  // 1. You need to return an object containing two methods.
  // 2. "stealGold" should take an (amount) and deduct it from secretGold.
  // 3. "checkVault" should simply return the current secretGold.
  
  return {
    // WRITE YOUR CODE IN HERE

    // fat fnc inside object literal
    // method  1
    stealGold: () => {

        let input = parseInt(prompt("How much gold do you want to steal?"));

        // subtraction
        secretGold -= input;
        return secretGold;
    },
    // method  2
    checkVault: () => {
        return secretGold;
    }
  };
}

const myVault = createVault();
