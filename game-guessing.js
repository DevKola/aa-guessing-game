const { read } = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let numOfAttemps;

// Generate Random Number
const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Checking for guess
const checkGuess = function (num) {
  if (Number(num) > secretNumber) {
    console.log("Too High");
    return false;
  } else if (Number(num) < secretNumber) {
    console.log("Too Low");
    return false;
  } else {
    return true;
  }
};

// Asking for guess
const askGuess = () => {
  rl.question("Enter your guess: ", (num) => {
    let input = Number(num);
    numOfAttemps--;
    const res = checkGuess(input);
    if (res) {
      console.log("You Win!!! 🏆");
      rl.close();
    } else if (numOfAttemps === 0) {
      console.log("You Loose!!! 😔");
      rl.close();
    } else {
      askGuess();
    }
  });
};

// Asking for range of number
const askRange = () => {
  rl.question("Enter min number: ", (minInput) => {
    const min = Number(minInput);
    rl.question("Enter max number: ", (maxInput) => {
      const max = Number(maxInput);
      secretNumber = randomInRange(min, max);
      console.log(
        `I'm thinking of a number between ${minInput} and ${maxInput}`
      );
      // console.log(secretNumber);
      askGuess();
    });
  });
};

// Set Limit
const askLimit = () => {
  rl.question("Set your limit: ", (limit) => {
    let limitNum = Number(limit);
    numOfAttemps = limitNum;
    console.log(`You will have ${numOfAttemps} attempts to play this game`);
    askRange();
  });
};

askLimit();
