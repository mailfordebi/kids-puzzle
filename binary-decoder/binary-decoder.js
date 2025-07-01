// Binary Decoder JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Audio feedback setup
    const playSound = (type) => {
        try {
            let soundPath;
            
            // Define the sound paths
            switch (type) {
                case 'success':
                    soundPath = '../sounds/success.mp3';
                    break;
                case 'error':
                    soundPath = '../sounds/error.mp3';
                    break;
                case 'click':
                    soundPath = '../sounds/click.mp3';
                    break;
                default:
                    return;
            }
            
            // Play sound directly
            const sound = new Audio(soundPath);
            sound.volume = 0.7; // Set a reasonable volume
            
            // Force sound to load and play
            sound.load();
            
            // Play sound immediately (with fallback/error handling)
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('Sound playback issue:', err);
                    // Try again with user interaction flag
                    document.addEventListener('click', function soundPlayHandler() {
                        sound.play();
                        document.removeEventListener('click', soundPlayHandler);
                    }, { once: true });
                });
            }
        } catch (err) {
            console.log('Sound system error:', err);
        }
    };

    // Binary Decoder Variables
    let currentBinaryIndex = 0;
    let binarySolved = 0;
    let binaryLevel = 1;

    // Binary words for decoding
    const binaryWords = [
        // Level 1 - Simple Words
        { binary: ["01000011", "01000001", "01010100"], word: "CAT" },
        { binary: ["01000100", "01001111", "01000111"], word: "DOG" },
        { binary: ["01010011", "01010101", "01001110"], word: "SUN" },
        { binary: ["01010010", "01010101", "01001110"], word: "RUN" },
        { binary: ["01000110", "01010101", "01001110"], word: "FUN" },
        
        // Level 2 - Medium Words
        { binary: ["01000010", "01001001", "01010010", "01000100"], word: "BIRD" },
        { binary: ["01001010", "01010101", "01001101", "01010000"], word: "JUMP" },
        { binary: ["01010011", "01010100", "01000001", "01010010"], word: "STAR" },
        { binary: ["01000110", "01001001", "01010011", "01001000"], word: "FISH" },
        { binary: ["01000111", "01000001", "01001101", "01000101"], word: "GAME" },
        
        // Level 3 - Longer Words
        { binary: ["01010010", "01001111", "01000010", "01001111", "01010100"], word: "ROBOT" },
        { binary: ["01010011", "01010000", "01000001", "01000011", "01000101"], word: "SPACE" },
        { binary: ["01010111", "01001111", "01010010", "01001100", "01000100"], word: "WORLD" },
        { binary: ["01010000", "01001100", "01000001", "01001110", "01000101", "01010100"], word: "PLANET" },
        { binary: ["01010011", "01000011", "01001000", "01001111", "01001111", "01001100"], word: "SCHOOL" }
    ];

    // Extended ASCII to letter conversion for reference
    const binaryToLetter = {
        "01000001": "A", "01000010": "B", "01000011": "C", "01000100": "D",
        "01000101": "E", "01000110": "F", "01000111": "G", "01001000": "H",
        "01001001": "I", "01001010": "J", "01001011": "K", "01001100": "L",
        "01001101": "M", "01001110": "N", "01001111": "O", "01010000": "P",
        "01010001": "Q", "01010010": "R", "01010011": "S", "01010100": "T",
        "01010101": "U", "01010110": "V", "01010111": "W", "01011000": "X",
        "01011001": "Y", "01011010": "Z"
    };

    // Initialize Binary Activity
    initBinaryActivity();

    function initBinaryActivity() {
        currentBinaryIndex = 0;
        binarySolved = 0;
        binaryLevel = 1;
        
        updateBinaryStats();
        displayBinaryWord();
    }

    function displayBinaryWord() {
        const binaryWordContainer = document.getElementById('current-binary-word');
        const answerBoxesContainer = document.getElementById('answer-boxes');
        
        if (!binaryWordContainer || !answerBoxesContainer) return;
        
        binaryWordContainer.innerHTML = '';
        answerBoxesContainer.innerHTML = '';
        
        // Display the binary digits for the current word
        const currentWord = binaryWords[currentBinaryIndex];
        
        currentWord.binary.forEach(binaryLetter => {
            const binaryDigitDisplay = document.createElement('div');
            binaryDigitDisplay.className = 'binary-digit-display';
            
            for (let i = 0; i < binaryLetter.length; i++) {
                const digit = document.createElement('span');
                digit.className = 'binary-digit';
                digit.textContent = binaryLetter[i];
                binaryDigitDisplay.appendChild(digit);
            }
            
            binaryWordContainer.appendChild(binaryDigitDisplay);
        });
        
        // Create answer boxes for the word
        for (let i = 0; i < currentWord.word.length; i++) {
            const answerBox = document.createElement('input');
            answerBox.type = 'text';
            answerBox.className = 'answer-box';
            answerBox.maxLength = 1;
            answerBox.dataset.index = i;
            
            // Auto-focus on next box when a letter is entered
            answerBox.addEventListener('input', function() {
                if (this.value.length === this.maxLength) {
                    const nextBox = document.querySelector(`.answer-box[data-index="${parseInt(this.dataset.index) + 1}"]`);
                    if (nextBox) nextBox.focus();
                }
            });
            
            // Allow backspace to go to previous box
            answerBox.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '') {
                    const prevBox = document.querySelector(`.answer-box[data-index="${parseInt(this.dataset.index) - 1}"]`);
                    if (prevBox) prevBox.focus();
                }
            });
            
            answerBoxesContainer.appendChild(answerBox);
        }
        
        // Focus on first answer box
        const firstBox = document.querySelector('.answer-box[data-index="0"]');
        if (firstBox) firstBox.focus();
    }

    // Binary Check Answer Button
    const binaryCheckButton = document.getElementById('binary-check');
    if (binaryCheckButton) {
        binaryCheckButton.addEventListener('click', function() {
            checkBinaryAnswer();
        });
    }

    // Binary Next Button
    const binaryNextButton = document.getElementById('binary-next');
    if (binaryNextButton) {
        binaryNextButton.addEventListener('click', function() {
            nextBinaryWord();
        });
    }

    function checkBinaryAnswer() {
        const answerBoxes = document.querySelectorAll('.answer-box');
        const resultMessage = document.getElementById('binary-result');
        
        if (!resultMessage) return;
        
        let userAnswer = '';
        answerBoxes.forEach(box => {
            userAnswer += box.value.toUpperCase();
        });
        
        const correctAnswer = binaryWords[currentBinaryIndex].word;
        
        if (userAnswer === correctAnswer) {
            playSound('success');
            resultMessage.textContent = '🎉 Correct! You decoded the binary!';
            resultMessage.className = 'result-message success animated-feedback';
            binaryNextButton.disabled = false;
            
            // Update progress
            binarySolved++;
            updateBinaryStats();
            
            // Level up when appropriate
            if (binarySolved % 5 === 0 && binaryLevel < 3) {
                binaryLevel++;
                resultMessage.textContent = `🎉 Level Up! You're now at level ${binaryLevel}!`;
            }
        } else {
            playSound('error');
            resultMessage.textContent = '❌ Not quite right. Try again!';
            resultMessage.className = 'result-message error animated-feedback';
            
            // Highlight incorrect letters
            answerBoxes.forEach((box, index) => {
                if (box.value.toUpperCase() !== correctAnswer[index]) {
                    box.classList.add('shake-effect');
                    setTimeout(() => {
                        box.classList.remove('shake-effect');
                    }, 500);
                }
            });
        }
    }

    function nextBinaryWord() {
        playSound('click');
        
        // Reset UI
        const resultMessage = document.getElementById('binary-result');
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
        
        // Go to next word or finish
        currentBinaryIndex = (currentBinaryIndex + 1) % binaryWords.length;
        
        // If all words solved, show completion message
        if (binarySolved >= 10) {
            const binaryWordContainer = document.getElementById('current-binary-word');
            const answerBoxesContainer = document.getElementById('answer-boxes');
            
            if (binaryWordContainer) {
                binaryWordContainer.innerHTML = '<div style="font-size: 2rem; text-align: center; margin: 20px;">🎉 All words decoded! 🎉</div>';
            }
            
            if (answerBoxesContainer) {
                answerBoxesContainer.innerHTML = '';
            }
            
            if (resultMessage) {
                resultMessage.textContent = 'Congratulations! You\'ve completed all the binary decoder challenges!';
                resultMessage.className = 'result-message success animated-feedback';
            }
            
            if (binaryCheckButton) binaryCheckButton.disabled = true;
            if (binaryNextButton) binaryNextButton.disabled = true;
            
            return;
        }
        
        // Otherwise, display next word
        displayBinaryWord();
    }

    function updateBinaryStats() {
        const levelElement = document.getElementById('binary-level');
        const solvedElement = document.getElementById('binary-solved');
        const totalElement = document.getElementById('binary-total');
        const progressBar = document.getElementById('binary-progress');
        
        if (levelElement) levelElement.textContent = binaryLevel;
        if (solvedElement) solvedElement.textContent = binarySolved;
        if (totalElement) totalElement.textContent = 10;
        
        // Update progress bar
        if (progressBar) {
            const progressPercentage = (binarySolved / 10) * 100;
            progressBar.style.width = progressPercentage + '%';
            progressBar.setAttribute('aria-valuenow', progressPercentage);
        }
    }

    // Show More Letters button
    const showMoreButton = document.querySelector('.show-more-binary');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function() {
            const binaryReference = document.querySelector('.binary-reference .row');
            if (binaryReference) {
                // Toggle between showing/hiding full reference chart
                if (this.textContent === 'Show More Letters') {
                    // Add all the additional letters
                    const additionalLetters = [
                        { binary: "01001001", letter: "I" },
                        { binary: "01001010", letter: "J" },
                        { binary: "01001011", letter: "K" },
                        { binary: "01001100", letter: "L" },
                        { binary: "01001101", letter: "M" },
                        { binary: "01001110", letter: "N" },
                        { binary: "01001111", letter: "O" },
                        { binary: "01010000", letter: "P" },
                        { binary: "01010001", letter: "Q" },
                        { binary: "01010010", letter: "R" },
                        { binary: "01010011", letter: "S" },
                        { binary: "01010100", letter: "T" },
                        { binary: "01010101", letter: "U" },
                        { binary: "01010110", letter: "V" },
                        { binary: "01010111", letter: "W" },
                        { binary: "01011000", letter: "X" },
                        { binary: "01011001", letter: "Y" },
                        { binary: "01011010", letter: "Z" }
                    ];
                    
                    additionalLetters.forEach(item => {
                        const col = document.createElement('div');
                        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-2';
                        
                        const card = document.createElement('div');
                        card.className = 'binary-card';
                        
                        const binaryValue = document.createElement('div');
                        binaryValue.className = 'binary-value';
                        binaryValue.textContent = item.binary;
                        
                        const binaryLetter = document.createElement('div');
                        binaryLetter.className = 'binary-letter';
                        binaryLetter.textContent = item.letter;
                        
                        card.appendChild(binaryValue);
                        card.appendChild(binaryLetter);
                        col.appendChild(card);
                        binaryReference.appendChild(col);
                    });
                    
                    this.textContent = 'Show Fewer Letters';
                } else {
                    // Remove additional letters
                    const allCards = binaryReference.querySelectorAll('.col-12');
                    for (let i = 8; i < allCards.length; i++) {
                        allCards[i].remove();
                    }
                    this.textContent = 'Show More Letters';
                }
            }
        });
    }
});
