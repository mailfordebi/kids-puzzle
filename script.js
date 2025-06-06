document.addEventListener('DOMContentLoaded', () => {
    // Symbol mapping for each letter
    const symbolMapping = {
        'A': '::',
        'B': '::#',
        'C': '%%',
        'D': '##',
        'E': '@@',
        'F': '@#',
        'G': '&&',
        'H': '##@',
        'I': '!!',
        'J': '!@',
        'K': '**',
        'L': '*#',
        'M': '$$',
        'N': '$#',
        'O': '++',
        'P': '+#',
        'Q': '^^',
        'R': '^#',
        'S': '==',
        'T': '=#',
        'U': '??',
        'V': '?#',
        'W': '~~',
        'X': '~#',
        'Y': '||',
        'Z': '|#'
    };

    // List of words to use in puzzles
    const wordList = ['CAT', 'DOG', 'SUN', 'FUN', 'PLAY', 'STAR', 'GOOD', 'CAKE'];
    let currentWord = '';
    let currentWordIndex = 0;

    // Function to get symbol for a letter
    const getSymbolForLetter = (letter) => symbolMapping[letter.toUpperCase()] || '??';

    // Function to convert word to symbols
    const wordToSymbols = (word) => {
        return word.split('').map(letter => getSymbolForLetter(letter));
    };

    // Function to setup new puzzle
    const setupNewPuzzle = () => {
        currentWord = wordList[currentWordIndex];
        const symbols = wordToSymbols(currentWord);
        
        // Update symbols guide
        const symbolsGuide = document.querySelector('.symbols-guide');
        symbolsGuide.innerHTML = Object.entries(symbolMapping)
            .map(([letter, symbol]) => `
                <div class="symbol">
                    <div class="symbol-letter">${letter}</div>
                    <div class="symbol-code">${symbol}</div>
                </div>
            `)
            .join('');

        // Update secret message
        const secretMessage = document.querySelector('.secret-message');
        secretMessage.innerHTML = symbols
            .map(symbol => `<span>${symbol}</span>`)
            .join('');

        // Update input boxes
        const answerInputs = document.querySelector('.answer-inputs');
        answerInputs.innerHTML = currentWord
            .split('')
            .map((_, index) => `<input type="text" maxlength="1" class="letter-input" data-position="${index}">`)
            .join('');

        // Reset result message
        document.getElementById('result-message').textContent = '';
        
        // Setup input handlers
        setupInputHandlers();
    };

    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and puzzles
            navButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.puzzle-container').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding puzzle
            btn.classList.add('active');
            const puzzleId = btn.dataset.puzzle;
            const puzzle = document.getElementById(puzzleId + '-puzzle');
            if (puzzle) puzzle.classList.add('active');
        });
    });

    // Letter inputs handling
    const letterInputs = document.querySelectorAll('.letter-input');
    letterInputs.forEach((input, index) => {
        // Auto-focus next input when a letter is entered
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
            if (e.target.value && index < letterInputs.length - 1) {
                letterInputs[index + 1].focus();
            }
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                letterInputs[index - 1].focus();
            }
        });
    });

    // Function to setup input handlers
    const setupInputHandlers = () => {
        const letterInputs = document.querySelectorAll('.letter-input');
        letterInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                if (e.target.value && index < letterInputs.length - 1) {
                    letterInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    letterInputs[index - 1].focus();
                }
            });
        });
    };

    // Check answer button
    const checkButton = document.getElementById('check-answer');
    const resultMessage = document.getElementById('result-message');

    checkButton.addEventListener('click', () => {
        const letterInputs = document.querySelectorAll('.letter-input');
        const userAnswer = Array.from(letterInputs)
            .map(input => input.value)
            .join('');

        if (userAnswer === currentWord) {
            resultMessage.textContent = '🎉 Fantastic! You cracked the code! Ready for the next word? 🌟';
            resultMessage.className = 'result success';
            
            // Add celebration animation
            celebrate();
            
            // Setup next word after a short delay
            setTimeout(() => {
                resultMessage.textContent = '🌟 Get ready for the next word! 🌟';
                setTimeout(() => {
                    currentWordIndex = (currentWordIndex + 1) % wordList.length;
                    setupNewPuzzle();
                }, 3000);
            }, 2000);
        } else {
            resultMessage.textContent = '😅 Not quite right. Try again!';
            resultMessage.className = 'result error';
        }
    });

    // Initialize the first puzzle
    setupNewPuzzle();

    // Simple celebration animation
    function celebrate() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'];
        for (let i = 0; i < 50; i++) {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }
    }

    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(.25,.46,.45,.94)'
        });

        animation.onfinish = () => confetti.remove();
    }
});
