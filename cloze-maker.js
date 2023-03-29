class ClozeMaker extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        // const clone = shadow.content.cloneNode(true);

        const text = this.textContent.trim();
        const wordbank = [];
        let shuffledWords = [];
        let clozeText = generateCloze();
    

        function generateCloze() {
            let newText = text;
            let i = 0;

            const words = text.split('*').filter((_, index) => index % 2 === 1);

            for (const word of words) {

                wordbank.push(word);
                let wordlength = word.length;
                let boxsize = wordlength + 12;
                console.log(word);
                newText = newText.replace(
                    `*${word}*`,
                    `<input type="text" id="word${i}" size="${boxsize}" data-answer="${word}">`
                );
                i++;
            }
            shuffledWords = shuffle(wordbank);

            return newText;
        }
        
        function shuffle(array) {
            let wordbankArray = [...array]
            for (let i = wordbankArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [wordbankArray[i], wordbankArray[j]] = [wordbankArray[j], wordbankArray[i]];
            }

            return wordbankArray;
        }

        function checkAnswers(e) {
            console.log('hello');
            const game = document.getElementById(gameId).shadowRoot;
            const inputs = game.querySelectorAll('input[data-answer]');
            inputs.forEach(input => {
                input.value = input.value.trim();
                input.value = input.value.replace(" ✔", "");
                input.classList.remove('incorrect');
                input.classList.remove('correct');

                console.log(input.value);
                if (input.value.toLowerCase() === input.dataset.answer.toLowerCase()) {
                    input.classList.add('correct');
                    input.value = input.value += " ✔";

                } else {
                    input.classList.add('incorrect');

                }
            });
        }

        const clozeMakerElement = this.shadowRoot.host;
        const gameId = clozeMakerElement.getAttribute('id');
        console.log(gameId);
        


        shadow.innerHTML = `
        <!-- Begin CLOZE Exercise -->
        
        <div id="${gameId}" class="cloze-game">

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
                background-color: #a8ffbc;
                border: 2px solid black;
                padding: 10px;
                margin: 20px auto;
                font-size: larger;
                margin-bottom: 10px;
                }

                #cloze-text {
                line-height: 1.2;
                background: #a8ffbc;
                color: black;
                font-size: large;
                border: 2px solid black;
                padding: 5px;
                white-space: pre-line;
                }

            </style>
            </head>
            <div class="cloze">
            <div class="word-bank"> <b>Word Bank:</b> ${shuffledWords.join(", ")} </div>
            <form autocomplete="off" id="cloze-text">${clozeText}</form>
            <br>
            <button>Check My Work</button>
            </div>
        </div>
        
        <!-- End CLOZE Exercise -->
            `;
        // console.log("shadow", shadow.innerHTML);
        const button = shadow.querySelector('button');
        button.addEventListener('click', checkAnswers, { composed: true });
   }
}

customElements.define('cloze-maker', ClozeMaker);
