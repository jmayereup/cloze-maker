let inputText = document.querySelector("#inputText");
const outputText = document.querySelector("#outputText");

function copyToClipboard() {
  if (!inputText.value) {inputText.value = "You *forgot* to *add* a value."};
  let myHtml = outputText.value;
  navigator.clipboard.writeText(myHtml);
};

function generateCloze() {
  const text = inputText.value;
  clozeText = text;
  let i = 0;
  wordbank = [];

  const words = text.split('*').filter((_, index) => index % 2 === 1);

  for (const word of words) {
    
    wordbank.push(word);
    clozeText = clozeText.replace(
      `*${word}*`,
      `<input type="text" id="word${i}" data-answer="${word}">`
    );
    i++;
  }


  const shuffledWords = shuffle(wordbank);
  function shuffle(array) {
    let wordbankArray = [...array]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return wordbankArray;
  }

  outputText.value = `<!-- Begin CLOZE Exercise -->
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Cloze Exercise Generator</title>
  
<style>
  input[type="text"] {
  border: none;
  border: 2px solid #ccc;
  margin: 0 5px;
}

input[type="text"].correct {
  border-color: green;
}

input[type="text"].incorrect {
  border-color: red;
}

    .word-bank {
      background-color: lightgray;
      border: 2px solid black;
      padding: 10px;
      margin: 20px auto;
      font-size: larger;
      margin-bottom: -2px;
    }

    #cloze-text {
      line-height: 1.5;
      background: lightgrey;
      color: black;
      font-size: large;
      border: 2px solid black;
      padding: 5px;
      white-space: pre-line;
    }

</style>
</head>
<details class="kg-card kg-toggle-card">
<summary> Click for a CLOZE activity </summary>
<div class="cloze">
  <div class="word-bank"> <b>Word Bank:</b> ${shuffledWords.join(", ")} </div>
  <form autocomplete="off" id="cloze-text">${clozeText}</form>
  <br>
  <button onclick="checkAnswers()">Check My Work</button>
</div>
</details>

<script>
  function checkAnswers() {
    const inputs = document.querySelectorAll('input[data-answer]');
    inputs.forEach(input => {
        if (input.value.toLowerCase() === input.dataset.answer.toLowerCase()) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
}
</script>
</html>
<!-- End CLOZE Exercise -->
`;
}