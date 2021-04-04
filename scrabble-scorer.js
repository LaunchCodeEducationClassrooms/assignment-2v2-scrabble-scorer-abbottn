// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point',
  scorerFunction: function(word) {
    return word.length;
  }
}

let vowel = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt',
  scorerFunction: function(word) {
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      let isVowel = false;
      switch(word[i]) {
        case 'a':
        isVowel = true;
        break;
        case 'e':
        isVowel = true;
        break;
        case 'i':
        isVowel = true;
        break;
        case 'o':
        isVowel = true;
        break;
        case 'u':
        isVowel = true;
        break;
      }
      if(isVowel) {
        score += 3;
      } else {
        score++;
      }
    }
    return score;
  }
}

let scrabble = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm',
  scorerFunction: oldScrabbleScorer
}

let improvedScrabble = {
  name: 'Scrabble',
  description: 'The improved scoring algorithm',
  scorerFunction: function(word) {
    word = word.toLowerCase();
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      let key = word[i];
      scrabbleScore += newPointStructure[key];
    }
    return scrabbleScore;
    
  }
}

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //console.log("Let's play some scrabble! Enter a word:");
   console.log("Let's play some scrabble!\n");
   let word = input.question('Enter a word to score: ');
   //let breakdown = oldScrabbleScorer(word);
   //console.log(breakdown);
   return word;
};

let simpleScore;

let vowelBonusScore;

let scrabbleScore = 0;

// const scoringAlgorithms = [simple, vowel, scrabble];
const scoringAlgorithms = [simple, vowel, improvedScrabble];


function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let option = input.question("Enter 0, 1, or 2: ");
  console.log("Score for '" + word + "':" ,scoringAlgorithms[option].scorerFunction(word));


}

function transform(badStructure) {
  let goodStructure = {};
  for (const pointValue in badStructure) {
    let letters = badStructure[pointValue];
    for (let i = 0; i < letters.length; i++){
      let key = letters[i].toLowerCase();
      goodStructure[key] = Number(pointValue);
    }
  }
  return goodStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  //initialPrompt();
  let word = initialPrompt();
  scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

