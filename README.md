# WORKSHOP-6.1 Nonsense Poem Generator
Link to repository: https://github.com/adra086/WORKSHOP-6.1

## Overview
This project is an interactive nonsense poem generator built using p5.js and RiTa.js. The user inputs any sentence, and the program generates three nonsense versions by replacing specific parts of speech with randomly selected words. The output includes a version where nouns, verbs, and adjectives have been replaced, creating a fun and creative transformation of the input sentence.

## Features

    Interactive Sentence Input: The user provides any sentence, and the generator produces three versions with randomly replaced words.
    Part-of-Speech-Based Substitutions: The generator replaces nouns, verbs, and adjectives using RiTa.js functions to detect parts of speech.
    Guaranteed Replacements: Even for simple or ambiguous sentences, at least one noun, verb, or adjective is always replaced.
    Minimal and clean interface: The program runs in a simple web interface built using p5.js.

## Learning Objectives
    Understand how to use natural language processing (NLP) in creative coding projects.
    Learn how to detect and manipulate parts of speech using the RiTa.js library.
    Explore how dynamic content can be generated based on user input.
    Learn the basics of p5.js for interactive web-based applications.

## How It Works
    The user enters a sentence in the input box and clicks the “Generate Nonsense Poem” button.
    The sentence is tokenized, and part-of-speech tagging is applied to detect nouns, verbs, and adjectives.
    Each version of the nonsense poem replaces specific parts of speech:
        Noun Replaced Line: All detected nouns are replaced with random nouns.
        Verb Replaced Line: All detected verbs are replaced with random verbs.
        Adjective Replaced Line: All detected adjectives are replaced with random adjectives.
    If no words of a certain type are detected, the program forces at least one replacement to ensure creative output.

## Code Extracts and Explanation
### 1. Input Field Setup

This section creates the input field and button that allow the user to interact with the generator.

``` javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F5EFE0');

  // Input field for user sentence
  inputField = createInput("").attribute("placeholder", "Enter any sentence");
  inputField.position(50, 100);
  inputField.style('padding', '8px');
  inputField.style('border', '1px solid #8B6B36');
  inputField.style('background', '#FFF9E5');

  // Button to generate the poem
  generateButton = createButton("Generate Nonsense Poem");
  generateButton.position(inputField.x + inputField.width + 10, 100);
  generateButton.style('background', '#FFF9E5');
  generateButton.style('border', '1px solid #8B6B36');
  generateButton.style('padding', '8px');
  generateButton.mousePressed(generatePoem);
}
```

### 2. Part-of-Speech Replacement for Nouns

This function replaces all detected nouns with randomly selected nouns. If no nouns are found, the first word is replaced to guarantee at least one substitution.

``` javascript
function generateNounReplacedLine(words) {
  let replacedWords = words.map((word) => {
    if (RiTa.isNoun(word)) {
      return RiTa.randomWord({ pos: 'nn' });  // Replace nouns
    }
    return word;
  });

  // Force replace if no noun replacement occurred
  if (!words.some(word => RiTa.isNoun(word))) {
    replacedWords[0] = RiTa.randomWord({ pos: 'nn' });  // Force replace the first word
  }

  let nounLine = RiTa.untokenize(replacedWords);
  poemLines.push(`Noun Replaced Line: ${nounLine}`);
}
```

### 3. Generating Output

Once the input sentence is processed, the poem is displayed on the canvas using p5.js.

``` javascript
function draw() {
  background('#F5EFE0');

  textSize(30);
  fill('#6B4C25');
  textAlign(CENTER);
  text("Nonsense Poem Generator", width / 2, 20);

  textSize(14);
  text("Enter a sentence and let nonsense poetry take over!", width / 2, 60);

  // Display the poem lines
  textSize(18);
  textAlign(LEFT);
  let yOffset = 150;
  for (let line of poemLines) {
    fill('#6B4C25');
    text(line, 50, yOffset, width - 100);
    yOffset += 40;
  }
}
```

### Example Outputs
#### Example 1:

User Input:
The quick brown fox jumps over the lazy dog.

Generated Nonsense Poem:

Original: the quick brown fox jumps over the lazy dog.
Noun Replaced Line: the quick brown tiger lifts over the sleepy bridge.
Verb Replaced Line: the quick brown fox dances over the lazy dog.
Adjective Replaced Line: the shiny silly fox jumps over the bright dog.

#### Example 2:

User Input:
The cat in the hat.

Generated Nonsense Poem:

Original: the cat in the hat.
Noun Replaced Line: the tiger in the chair.
Verb Replaced Line: the cat flies in the hat.
Adjective Replaced Line: the fuzzy cat in the worn hat.

## Screenshots

Initial Input Screen:
![image](https://github.com/user-attachments/assets/b2ca6234-990c-46e7-835e-826858e0726f)

Generated Output Example:
![image](https://github.com/user-attachments/assets/84c184fc-0c35-4ca5-9c0f-1cf8ddaf6088)


### Future Improvements

    Allow users to choose which parts of speech to replace (nouns, verbs, or adjectives).
    Add visual effects like word animations or transitions.
    Include more randomization by allowing synonyms or related words for replacements or other effects such as rhyming.

### Resources and References

    p5.js Documentation
    RiTa.js Documentation
    Course Materials: Concepts learned from coding workshops and lectures.
