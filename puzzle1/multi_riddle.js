document.addEventListener('DOMContentLoaded', () => {
    // ======= SHARED VARIABLES & FUNCTIONS =======
    let currentLevel = 1;
    const levels = document.querySelectorAll('.puzzle-container');
    
    // Function to switch levels
    function switchToLevel(level) {
        // Hide all levels
        levels.forEach(lvl => {
            lvl.classList.remove('active');
        });
        
        // Show the selected level
        document.querySelector(`.puzzle-container[data-level="${level}"]`).classList.add('active');
        currentLevel = level;
        
        // Update the challenge title
        const challengeTitle = document.getElementById('current-challenge-title');
        if (level === 1) {
            challengeTitle.textContent = 'Secret Code Challenge';
            challengeTitle.classList.add('animate-title');
        } else {
            challengeTitle.textContent = 'Emoji Mystery';
            challengeTitle.classList.add('animate-title');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            challengeTitle.classList.remove('animate-title');
        }, 500);
        
        // Clear any previous result messages
        document.querySelectorAll('.result').forEach(el => {
            el.textContent = '';
            el.className = 'result';
        });
        
        // Adjust viewport on mobile if needed
        if (window.innerWidth <= 768) {
            window.scrollTo(0, 0);
        }
    }
    
    // Function to create celebration effects
    function celebrate() {
        const puzzle = document.querySelector('.puzzle-container.active');
        puzzle.classList.add('celebrate');
        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    }
    
    // ======= LEVEL 1: SECRET CODE PUZZLE =======
    // Symbol mapping for each letter - using special characters for the secret code
    const symbolMapping = {
        'A': '::',
        'B': '%#',
        'C': '&#',
        'D': '@@',
        'E': '$$',
        'F': '++',
        'G': '##',
        'H': '**',
        'I': '!!',
        'J': '??',
        'K': '&&',
        'L': '%%',
        'M': '##',
        'N': '^^',
        'O': '~~',
        'P': '><',
        'Q': '[]',
        'R': '{}',
        'S': '//',
        'T': '\\\\',
        'U': '()',
        'V': '<>',
        'W': '==',
        'X': '--',
        'Y': '||',
        'Z': '##'
    };

    // List of words for Level 1
    const level1Words = ['CAT', 'DOG', 'SUN', 'FUN', 'PLAY', 'STAR', 'GOOD', 'CAKE'];
    let currentWord1 = '';
    let currentWord1Index = 0;
    
    // Set total puzzle count for level 1
    document.getElementById('total-puzzles-1').textContent = level1Words.length;

    // Function to get symbol for a letter
    const getSymbolForLetter = (letter) => symbolMapping[letter.toUpperCase()] || '??';

    // Function to convert word to symbols
    const wordToSymbols = (word) => {
        return word.split('').map(letter => getSymbolForLetter(letter));
    };

    // Function to setup input handlers for level 1
    function setupLevel1InputHandlers() {
        const inputs = document.querySelectorAll('#secret-code-puzzle .letter-input');
        inputs.forEach((input, index) => {
            // Remove existing event listeners by cloning
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            // Add new event listeners
            newInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                // Get fresh reference to inputs
                const currentInputs = document.querySelectorAll('#secret-code-puzzle .letter-input');
                if (e.target.value && index < currentInputs.length - 1) {
                    FeedbackSystem.showClick();
                    currentInputs[index + 1].focus();
                }
            });

            newInput.addEventListener('keydown', (e) => {
                // Get fresh reference to inputs
                const currentInputs = document.querySelectorAll('#secret-code-puzzle .letter-input');
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    currentInputs[index - 1].focus();
                }
                
                // Submit on Enter key
                if (e.key === 'Enter') {
                    checkLevel1Answer();
                }
            });
        });
    }

    // Function to setup new puzzle for level 1
    function setupLevel1Puzzle() {
        currentWord1 = level1Words[currentWord1Index];
        const symbols = wordToSymbols(currentWord1);
        
        // Update puzzle counter
        document.getElementById('current-puzzle-1').textContent = currentWord1Index + 1;
        
        // Update symbols guide with a code-like layout
        const symbolsGuide = document.querySelector('#secret-code-puzzle .symbols-guide');
        symbolsGuide.innerHTML = Object.entries(symbolMapping)
            .map(([letter, symbol]) => `
                <div class="symbol">
                    <div class="symbol-code">${symbol}</div>
                    <div class="symbol-letter">${letter}</div>
                </div>
            `).join('');

        // Update the secret message with the current word's symbols
        const secretMessage = document.querySelector('#secret-code-puzzle .secret-message');
        secretMessage.innerHTML = symbols
            .map(symbol => `<span class="symbol-box">${symbol}</span>`)
            .join(' ');

        // Update answer inputs
        const answerInputs = document.querySelector('#secret-code-puzzle .answer-inputs');
        answerInputs.innerHTML = '';
        
        for (let i = 0; i < currentWord1.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'letter-input';
            input.dataset.position = i;
            answerInputs.appendChild(input);
        }

        // Setup input handlers
        setupLevel1InputHandlers();
        
        // Focus first input
        document.querySelector('#secret-code-puzzle .letter-input').focus();
        
        // Clear result message
        const resultMessage = document.getElementById('result-message-1');
        resultMessage.textContent = '';
        resultMessage.className = 'result';
    }

    // Function to check answer for level 1
    function checkLevel1Answer() {
        const inputs = document.querySelectorAll('#secret-code-puzzle .letter-input');
        const userAnswer = Array.from(inputs).map(input => input.value).join('');
        const resultMessage = document.getElementById('result-message-1');
        
        if (userAnswer === currentWord1) {
            // Show success message
            FeedbackSystem.showSuccess('🎯 Wow! You broke the code! 🌟');
            resultMessage.textContent = 'DECODED! Get ready for the next secret message...';
            resultMessage.className = 'result success';
            celebrate();
            
            // Move to next word or level
            currentWord1Index++;
            
            // If all puzzles in level 1 are completed, move to level 2
            if (currentWord1Index >= level1Words.length) {
                setTimeout(() => {
                    switchToLevel(2);
                    setupLevel2Puzzle(); // Initialize level 2
                }, 3000);
            } else {
                // Otherwise, setup next word in level 1
                setTimeout(() => {
                    setupLevel1Puzzle();
                }, 3000);
            }
        } else {
            // Show error message briefly
            FeedbackSystem.showError('Keep trying! You can crack this code! 💪');
            resultMessage.textContent = 'Not quite right - try again!';
            resultMessage.className = 'result error';
            
            // Clear error message after a short delay
            setTimeout(() => {
                resultMessage.textContent = '';
                resultMessage.className = 'result';
            }, 2000);
        }
    }

    // ======= LEVEL 2: EMOJI PUZZLE =======
    // List of emojis to use for letters
    const emojiMapping = {
        'A': '😄',
        'B': '🐻',
        'C': '🍪',
        'D': '🦮',
        'E': '🦅',
        'F': '🌸',
        'G': '🦒',
        'H': '🏠',
        'I': '🍦',
        'J': '🤹',
        'K': '🪁',
        'L': '🦁',
        'M': '🌙',
        'N': '📝',
        'O': '🍊',
        'P': '🐼',
        'Q': '👸',
        'R': '🌈',
        'S': '⭐',
        'T': '🌳',
        'U': '☔',
        'V': '🌋',
        'W': '🌊',
        'X': '❌',
        'Y': '🪀',
        'Z': '⚡'
    };

    // List of words for Level 2
    const level2Words = ['STAR', 'MOON', 'BEAR', 'CAKE', 'TREE', 'FISH', 'LION', 'DUCK'];
    let currentWord2 = '';
    let currentWord2Index = 0;

    // Set total puzzle count for level 2
    document.getElementById('total-puzzles-2').textContent = level2Words.length;

    // Function to get emoji for a letter
    const getEmojiForLetter = (letter) => emojiMapping[letter.toUpperCase()] || '❓';

    // Function to convert word to emojis
    const wordToEmojis = (word) => {
        return word.split('').map(letter => getEmojiForLetter(letter));
    };

    // Function to setup input handlers for level 2
    function setupLevel2InputHandlers() {
        const letterInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
        letterInputs.forEach((input, index) => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            newInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                const currentInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
                if (e.target.value && index < currentInputs.length - 1) {
                    FeedbackSystem.showClick();
                    currentInputs[index + 1].focus();
                }
            });

            newInput.addEventListener('keydown', (e) => {
                const currentInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    currentInputs[index - 1].focus();
                }
                
                // Submit on Enter key
                if (e.key === 'Enter') {
                    checkLevel2Answer();
                }
            });
        });
    }

    // Function to setup new puzzle for level 2
    function setupLevel2Puzzle() {
        currentWord2 = level2Words[currentWord2Index];
        const emojis = wordToEmojis(currentWord2);
        
        // Update puzzle counter
        document.getElementById('current-puzzle-2').textContent = currentWord2Index + 1;
        
        // Update symbols guide
        const symbolsGuide = document.querySelector('#emoji-puzzle .symbols-guide');
        symbolsGuide.innerHTML = Object.entries(emojiMapping)
            .map(([letter, emoji]) => `
                <div class="symbol">
                    <div class="symbol-emoji">${emoji}</div>
                    <div class="symbol-letter">${letter}</div>
                </div>
            `)
            .join('');

        // Update secret message
        const secretMessage = document.querySelector('#emoji-puzzle .secret-message');
        secretMessage.innerHTML = emojis
            .map(emoji => `<span>${emoji}</span>`)
            .join('');

        // Update input boxes
        const answerInputs = document.querySelector('#emoji-puzzle .answer-inputs');
        answerInputs.innerHTML = '';
        
        for (let i = 0; i < currentWord2.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'letter-input';
            input.dataset.position = i;
            answerInputs.appendChild(input);
        }

        // Reset result message
        const resultMessage = document.getElementById('result-message-2');
        resultMessage.textContent = '';
        resultMessage.className = 'result';
        
        // Setup input handlers
        setupLevel2InputHandlers();
        
        // Focus first input
        document.querySelector('#emoji-puzzle .letter-input').focus();
    }

    // Function to check answer for level 2
    function checkLevel2Answer() {
        const inputs = document.querySelectorAll('#emoji-puzzle .letter-input');
        const userAnswer = Array.from(inputs).map(input => input.value).join('');
        const resultMessage = document.getElementById('result-message-2');

        if (userAnswer === currentWord2) {
            resultMessage.textContent = '🎉 Fantastic! The emoji code is solved! Ready for the next puzzle? 🌟';
            resultMessage.className = 'result success';
            
            // Play success animation and sound only once
            FeedbackSystem.showSuccess('🎯 Amazing work! You\'re an emoji master! 🌟');
            celebrate();
            
            // Move to next word
            currentWord2Index++;
            
            // If all puzzles in level 2 are completed, show completion message
            if (currentWord2Index >= level2Words.length) {
                setTimeout(() => {
                    resultMessage.textContent = '🏆 CONGRATULATIONS! You have completed all puzzles! 🏆';
                    resultMessage.className = 'result success';
                }, 3000);
            } else {
                // Otherwise, setup next word in level 2
                setTimeout(() => {
                    setupLevel2Puzzle();
                }, 3000);
            }
        } else {
            FeedbackSystem.showError('😅 Almost there! Try matching the emojis again! 💪');
            resultMessage.textContent = 'Not quite right - try again!';
            resultMessage.className = 'result error';
            
            // Clear error message after a short delay
            setTimeout(() => {
                resultMessage.textContent = '';
                resultMessage.className = 'result';
            }, 2000);
        }
    }

    // ======= EVENT LISTENERS =======
    
    // Challenge title click handler to toggle between puzzles
    document.getElementById('current-challenge-title').addEventListener('click', function() {
        if (currentLevel === 1) {
            // Only allow switching if level 1 is completed
            if (currentWord1Index >= level1Words.length) {
                switchToLevel(2);
                setupLevel2Puzzle();
            }
        } else {
            switchToLevel(1);
            setupLevel1Puzzle();
        }
    });

    // Level 1 Check Answer button handler
    document.getElementById('check-answer-1').addEventListener('click', checkLevel1Answer);
    
    // Level 1 Previous button handler
    document.getElementById('prev-puzzle-1').addEventListener('click', () => {
        FeedbackSystem.showClick('Going to previous puzzle...');
        if (currentWord1Index > 0) {
            currentWord1Index--;
            setupLevel1Puzzle();
        }
    });
    
    // Level 1 Next button handler
    document.getElementById('next-puzzle-1').addEventListener('click', () => {
        FeedbackSystem.showClick('Going to next puzzle...');
        if (currentWord1Index < level1Words.length - 1) {
            currentWord1Index++;
            setupLevel1Puzzle();
        } else {
            switchToLevel(2);
            setupLevel2Puzzle();
        }
    });

    // Level 2 Check Answer button handler
    document.getElementById('check-answer-2').addEventListener('click', checkLevel2Answer);
    
    // Level 2 Previous button handler
    document.getElementById('prev-puzzle-2').addEventListener('click', () => {
        FeedbackSystem.showClick('Going to previous puzzle...');
        if (currentWord2Index > 0) {
            currentWord2Index--;
            setupLevel2Puzzle();
        } else {
            switchToLevel(1);
            setupLevel1Puzzle();
        }
    });
    
    // Level 2 Next button handler
    document.getElementById('next-puzzle-2').addEventListener('click', () => {
        FeedbackSystem.showClick('Going to next puzzle...');
        if (currentWord2Index < level2Words.length - 1) {
            currentWord2Index++;
            setupLevel2Puzzle();
        }
    });
    
    // Restart button handler
    document.getElementById('restart-game').addEventListener('click', () => {
        FeedbackSystem.showClick('Restarting all puzzles...');
        
        // Reset all game data
        currentWord1Index = 0;
        currentWord2Index = 0;
        
        // Switch back to level 1
        switchToLevel(1);
        
        // Setup first puzzle
        setupLevel1Puzzle();
    });

    // Initialize first puzzle
    setupLevel1Puzzle();
});
