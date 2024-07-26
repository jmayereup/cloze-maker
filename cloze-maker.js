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
                // let wordlength = word.length;
                let boxsize = 12;
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
                    border: 1px solid rgba(27, 31, 35, .15);
                    border-radius: 6px;
                    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                    
                background-color: #f1f1f1;
                border: 2px solid black;
                padding: 10px;
                margin: 20px auto;
                font-size: larger;
                margin-bottom: 10px;
                }

                #cloze-text {
                    border: 1px solid rgba(27, 31, 35, .15);
                    border-radius: 6px;
                    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                    
                line-height: 1.3;
                background: #f1f1f1;
                color: black;
                font-size: large;
                border: 2px solid black;
                padding: 5px;
                white-space: pre-line;
                }
                .button {
                    appearance: none;
                    background-color: #2ea44f;
                    border: 1px solid rgba(27, 31, 35, .15);
                    border-radius: 6px;
                    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                    box-sizing: border-box;
                    color: #fff;
                    cursor: pointer;
                    display: inline-block;
                    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 20px;
                    padding: 6px 16px;
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;
                    vertical-align: middle;
                    white-space: nowrap;
                  }
                  
                  .button:focus:not(:focus-visible):not(.focus-visible) {
                    box-shadow: none;
                    outline: none;
                  }
                  
                  .button:hover {
                    background-color: #2c974b;
                  }
                  
                  .button:focus {
                    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
                    outline: none;
                  }
                  
                  .button:disabled {
                    background-color: #94d3a2;
                    border-color: rgba(27, 31, 35, .1);
                    color: rgba(255, 255, 255, .8);
                    cursor: default;
                  }
                  
                  .button:active {
                    background-color: #298e46;
                    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
                  }    

            </style>
            </head>
            <div class="cloze">
            <div class="word-bank"> <b>Word Bank:</b> ${shuffledWords.join(", ")} </div>
            <form autocomplete="off" id="cloze-text">${clozeText}</form>
            <br>
            <button class="button">Check My Work</button>
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
