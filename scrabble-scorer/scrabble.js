const input = require('readline-sync');
const { newPointStructure } = require('./scrabbleScorer');

const vowels = ["a", "e", "i", "o", "u"]

const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
  };

// const transformHelper = (accum, letters, pointValue) => letters.reduce((accum, letter) => ({...accum, [letter]: pointValue}), accum) 
// const transform = (oldPointStructure) => Object.entries(oldPointStructure).reduce((accum, [k, v]) => transformHelper(accum, v, parseInt(k)), {})


const transform = (oldPointStructure) => {
  newPointStructure = {}
  const onePointers = oldPointStructure["1"]
  for (let i; i < onePointers.length; i++) {
    newPointStructure[onePointers[i]] = 1
  }

  const twoPointers = oldPointStructure["2"]
  for (let i; i < twoPointers.length; i++) {
    newPointStructure[onePotwoPointers[i]] = 2
  }
  const threePointers  = oldPointStructure["3"]
  for (let i; i < threePointers.length; i++) {
    newPointStructure[threePointers[i]] = 3
  }
// const fourPointers  = oldPointStructure[4]  
// const fivePointers  = oldPointStructure[5]
// const eightPointers  = oldPointStructure[8]
// const tenPointers  = oldPointStructure[10]

return newPointStructure
}


const simpleScorer = (word) => word.length
const vowelBonusScorer = (word) => word.split("").reduce((score, char) => vowels.includes(char.toLowerCase()) ? score + 3 : score + 1, 0)


const scrabbleScorer = (word) => {
    const pointStructure = transform(oldPointStructure)    
    // return word.split("").reduce((score, char) => score + pointStructure[char], 0)
    score = 0
    for (let i = 0; i < word.length; i++) {
      score += pointStructure[word[i]]
    }
    return score
}


const scoringAlgorithms = [
    {
     name: "Simple Score", 
     description: "Each letter is worth 1 point.", 
     scoringFunction: simpleScorer
    },
     
    {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1pt",
      scoringFunction: vowelBonusScorer
    },
    
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scoringFunction: scrabbleScorer
    }
  ];


  const displaySelection = (selection, idx) => {
    console.log(`${idx} - ${selection.name}: ${selection.description}`)
  }


  const getUserSelection = () => {
    const validInputs = ["0", "1", "2"]  
    const userInput = input.question("Enter 0, 1 or 2: ");
    if (!validInputs.includes(userInput)) {
        console.log("You must select 0,1 or 2. Please try again")
        getUserSelection()
      }
    
    return userInput
  }

  const getUserWord = () => {
    const userInput = input.question("Enter a word to be scored.")
    return userInput.toUpperCase()
  }
  
  
  const scrabblePrompt = () => {
    console.log("Let's play some scrabble!");
    
    const word = getUserWord()
    console.log(`Which scoring algorithm would you like to use?`)
    scoringAlgorithms.forEach((scoringSel, idx) => displaySelection(scoringSel, idx))
    const selection = getUserSelection()
    
    const score = scoringAlgorithms[selection].scoringFunction(word)
    
    console.log(`Points for ${word}: ${score}.`)
 };


 function runProgram() {
    scrabblePrompt();
}

module.exports = {runProgram}

  
