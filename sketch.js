let inputField;
let generateButton;
let poemLines = [];

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

function generatePoem() {
  let sentence = inputField.value().trim();
  inputField.value('');  // Clear the input after pressing the button

  if (sentence === "") {
    poemLines.push("Error: Please enter a sentence.");
    return;
  }

  poemLines = [];  // Clear previous poem lines
  poemLines.push(`Original: ${sentence}`);

  let words = RiTa.tokenize(sentence);  // Tokenize input sentence
  let posTags = RiTa.posTags(sentence);  // Get part-of-speech tags for the sentence

  console.log("Words:", words);
  console.log("POS Tags:", posTags);

  // Generate poem lines
  let nounLine = generateReplacementLine(words, posTags, 'nn', 'Noun Replaced Line', 'nn');
  let verbLine = generateReplacementLine(words, posTags, 'vb', 'Verb Replaced Line', 'vb');
  let adjLine = generateReplacementLine(words, posTags, 'jj', 'Adjective Replaced Line', 'jj');

  poemLines.push(nounLine);
  poemLines.push(verbLine);
  poemLines.push(adjLine);
}

function generateReplacementLine(words, posTags, targetTag, lineLabel, replacementTag) {
  let replaced = false;  // Track if any replacement happened
  let replacedWords = words.map((word, index) => {
    if (posTags[index].startsWith(targetTag)) {
      replaced = true;
      return RiTa.randomWord({ pos: replacementTag });  // Replace based on target part of speech
    }
    return word;
  });

  // If no replacements were made, force at least one replacement
  if (!replaced) {
    replacedWords[0] = RiTa.randomWord({ pos: replacementTag });  // Force replace the first word
  }

  let newLine = RiTa.untokenize(replacedWords);
  return `${lineLabel}: ${newLine}`;
}

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
