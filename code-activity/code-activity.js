// Coding Activities JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Audio feedback setup with improved playback
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

    // Activity Selection
    const activitySelector = document.querySelectorAll('.btn-activity');
    const activityContainers = document.querySelectorAll('.activity-container');
    const backButtons = document.querySelectorAll('.back-btn');

    // Initialize - Hide all activity containers
    activityContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Show activity when button is clicked
    activitySelector.forEach(button => {
        button.addEventListener('click', function() {
            const activity = this.dataset.activity;
            playSound('click');
            
            // Hide all activities
            activityContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // Show selected activity
            document.getElementById(activity + '-activity').classList.add('active');
            
            // Initialize the activity
            switch(activity) {
                case 'binary':
                    initBinaryActivity();
                    break;
                case 'grid':
                    initGridActivity();
                    break;
                case 'sequence':
                    initPatternActivity();
                    break;
            }
        });
    });

    // Back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            playSound('click');
            
            // Hide all activities
            activityContainers.forEach(container => {
                container.classList.remove('active');
            });
        });
    });

    // Show more binary letters button
    const showMoreBinaryBtn = document.querySelector('.show-more-binary');
    if (showMoreBinaryBtn) {
        showMoreBinaryBtn.addEventListener('click', function() {
            playSound('click');
            this.textContent = this.textContent === 'Show More Letters' ? 'Show Less Letters' : 'Show More Letters';
            
            const binaryReference = document.querySelector('.binary-reference .row');
            const moreLetters = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001001</div>
                        <div class="binary-letter">I</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001010</div>
                        <div class="binary-letter">J</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001011</div>
                        <div class="binary-letter">K</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001100</div>
                        <div class="binary-letter">L</div>
                    </div>
                </div>
            `;
            
            if (this.textContent === 'Show Less Letters') {
                binaryReference.innerHTML += moreLetters;
            } else {
                // Remove the additional cards
                const allCards = binaryReference.querySelectorAll('.col-12');
                for (let i = 8; i < allCards.length; i++) {
                    allCards[i].remove();
                }
            }
        });
    }

    // Binary Decoder Activity
    const binaryWords = [
        { binary: ['01001000', '01001001'], word: 'HI' },
        { binary: ['01000011', '01000001', '01010100'], word: 'CAT' },
        { binary: ['01000100', '01001111', '01000111'], word: 'DOG' },
        { binary: ['01010011', '01010101', '01001110'], word: 'SUN' },
        { binary: ['01010000', '01001100', '01000001', '01011001'], word: 'PLAY' },
        { binary: ['01000011', '01001111', '01000100', '01000101'], word: 'CODE' },
        { binary: ['01010011', '01010100', '01000001', '01010010'], word: 'STAR' },
        { binary: ['01001010', '01010101', '01001101', '01010000'], word: 'JUMP' },
        { binary: ['01000010', '01001111', '01001111', '01001011'], word: 'BOOK' },
        { binary: ['01010011', '01001101', '01001001', '01001100', '01000101'], word: 'SMILE' }
    ];

    let currentBinaryIndex = 0;
    let binarySolved = 0;
    let binaryLevel = 1;

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
            
            binarySolved++;
            updateBinaryProgress();
            updateBinaryStats();
            
            // Check if level up (every 3 solved words)
            if (binarySolved % 3 === 0 && binarySolved > 0) {
                binaryLevel++;
                resultMessage.textContent = `🎉 Level Up! You're now at Level ${binaryLevel}!`;
                updateBinaryStats();
            }
        } else {
            playSound('error');
            resultMessage.textContent = '❌ That\'s not quite right. Try again!';
            resultMessage.className = 'result-message error animated-feedback';
            binaryNextButton.disabled = true;
        }
    }

    function nextBinaryWord() {
        playSound('click');
        const resultMessage = document.getElementById('binary-result');
        
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
        
        currentBinaryIndex = (currentBinaryIndex + 1) % binaryWords.length;
        displayBinaryWord();
        
        binaryNextButton.disabled = true;
    }

    function updateBinaryProgress() {
        const progressBar = document.getElementById('binary-progress');
        if (progressBar) {
            const progressPercentage = (binarySolved % 3) / 3 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateBinaryStats() {
        const levelSpan = document.getElementById('binary-level');
        const solvedSpan = document.getElementById('binary-solved');
        const totalSpan = document.getElementById('binary-total');
        
        if (levelSpan) levelSpan.textContent = binaryLevel;
        if (solvedSpan) solvedSpan.textContent = binarySolved;
        if (totalSpan) totalSpan.textContent = binaryWords.length;
    }

    // Grid Explorer Activity
    let treasureLocation = { row: 0, col: '' };
    let gridLevel = 1;
    let treasuresFound = 0;

    function initGridActivity() {
        gridLevel = 1; // Always level 1 in simplified version
        treasuresFound = 0;
        updateGridStats();
        placeTreasure();
        
        // Setup grid cell click handlers - this needs to be called on initialization
        setupGridCellClickHandlers();
    }
    
    // This separate function allows us to reset click handlers when needed
    function setupGridCellClickHandlers() {
        // Add click handlers to grid cells
        const gridCells = document.querySelectorAll('.grid-cell');
        
        gridCells.forEach(cell => {
            // First remove any existing click listeners
            cell.removeEventListener('click', handleGridCellClick);
            
            // Then add fresh click listener
            cell.addEventListener('click', handleGridCellClick);
        });
    }
    
    // Separate the handler function for cleaner code
    function handleGridCellClick() {
        // First check if this cell has already been clicked (marked as searched or correct)
        if (this.classList.contains('searched') || this.classList.contains('correct')) {
            console.log('Cell already checked, skipping');
            return; // Skip already checked cells
        }
        
        // Get row and column from data attributes
        const row = this.getAttribute('data-row');
        const col = this.getAttribute('data-col');
        
        console.log(`Cell clicked: Row ${row}, Column ${col}`);
        
        // Set the hidden input values
        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        
        if (rowInput && colInput) {
            // FIXED: Explicitly set the input values and verify they're set correctly
            // Use the setAttribute method as an additional way to ensure values are set
            rowInput.value = row;
            rowInput.setAttribute('value', row);
            colInput.value = col;
            colInput.setAttribute('value', col);
            
            console.log(`Set input values: Row=${rowInput.value}, Col=${colInput.value}`);
            
            // Add digging animation to the clicked cell
            this.classList.add('digging');
            
            // Try playing sound with a fallback
            try {
                playSound('click');
            } catch (err) {
                console.log("Sound feedback skipped:", err);
            }
            
            // Check the answer after a short delay for animation
            setTimeout(() => {
                this.classList.remove('digging');
                
                // Store a reference to the clicked cell
                const clickedCell = this;
                console.log('Checking answer for cell:', row, col);
                     // Make sure to remove any background images
            clickedCell.style.backgroundImage = 'none';
            
            // FIXED: Pass the cell element and coordinates directly to checkGridAnswer
            // This ensures we're checking the correct cell even if input values somehow change
            checkGridAnswer(clickedCell, row, col);
            }, 300);
        }
    }

    function placeTreasure() {
        console.log("Setting up new treasure hunt and resetting grid...");
        
        // Clear previous grid state completely
        const gridCells = document.querySelectorAll('.grid-cell');
        
        // First remove all classes and content from cells
        gridCells.forEach(cell => {
            // Clear all content
            cell.textContent = '';
            cell.innerHTML = '';
            
            // Remove all special classes that might have been added
            cell.classList.remove('treasure', 'correct', 'highlighted', 'digging', 
                              'searched', 'shake-effect', 'treasure-found', 
                              'hint-highlight-row', 'hint-highlight-col');
            
            // Reset all inline styles completely
            cell.removeAttribute('style');
            
            // Specifically ensure these critical styles are reset
            cell.style.pointerEvents = 'auto';  // Make cells clickable again
            cell.style.animation = 'none';
            cell.style.backgroundImage = 'none';
            cell.style.backgroundColor = '';
            
            // Remove any existing event listeners by cloning and replacing
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        
        // Re-setup all click handlers
        setupGridCellClickHandlers();

        // Reset result and inputs
        const resultMessage = document.getElementById('grid-result');
        if (resultMessage) {
            resultMessage.innerHTML = 'Find the hidden treasure in the grid!';
            resultMessage.className = 'result-message info';
        }

        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        // Make sure we're completely resetting the input values
        if (rowInput) {
            rowInput.value = '';
            rowInput.setAttribute('value', '');
        }
        if (colInput) {
            colInput.value = ''; 
            colInput.setAttribute('value', '');
        }

        // Random treasure placement
        const rows = 7;
        const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        
        treasureLocation.row = Math.floor(Math.random() * rows) + 1;
        treasureLocation.col = cols[Math.floor(Math.random() * cols.length)];
        
        // Set treasure clue based on level
        const treasureClue = document.getElementById('treasure-clue');
        if (treasureClue) {
            // Provide clues based on the level
            const resultMessage = document.getElementById('grid-result');
            
            // Always provide a direct clue showing where the treasure is
            treasureClue.innerHTML = `
                <div class="treasure-hint">
                    <div>The treasure is hiding at Row ${treasureLocation.row}, Column ${treasureLocation.col}</div>
                    <div>Click on that square to dig for the treasure!</div>
                </div>
            `;
            
            // Clear the result message
            if (resultMessage) {
                resultMessage.innerHTML = '';
                resultMessage.className = 'result-message';
            }
            
            // Highlight the row and column briefly
            setTimeout(() => {
                // Highlight the row
                const rowCells = document.querySelectorAll(`.grid-cell[data-row="${treasureLocation.row}"]`);
                rowCells.forEach(cell => cell.classList.add('hint-highlight-row'));
                setTimeout(() => rowCells.forEach(cell => cell.classList.remove('hint-highlight-row')), 1500);
                
                // Then highlight the column
                setTimeout(() => {
                    const colCells = document.querySelectorAll(`.grid-cell[data-col="${treasureLocation.col}"]`);
                    colCells.forEach(cell => cell.classList.add('hint-highlight-col'));
                    setTimeout(() => colCells.forEach(cell => cell.classList.remove('hint-highlight-col')), 1500);
                }, 2000);
            }, 1000);
        }

        // In debug mode, console log the treasure location
        console.log(`Hidden treasure at: Row ${treasureLocation.row}, Column ${treasureLocation.col}`);
    }

    // We no longer need the Grid Check Button as we're using direct cell clicks

    // Function to check if the clicked coordinates match the target
    function checkGridAnswer(clickedCell = null, clickedRow = null, clickedCol = null) {
        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        const resultMessage = document.getElementById('grid-result');
        
        if (!resultMessage) return;
        
        // Use passed parameters if available, otherwise fall back to input values
        const userRow = clickedRow || (rowInput ? rowInput.value : "");
        const userCol = clickedCol || (colInput ? colInput.value : "");
        
        // Debug output to help diagnose the issue
        console.log(`Checking coordinates: Row=${userRow}, Col=${userCol}, Treasure at: Row=${treasureLocation.row}, Col=${treasureLocation.col}`);
        
        // Make sure we have valid input
        if (userRow === "" || userCol === "") {
            resultMessage.innerHTML = 'Click on a grid position to test your coordinates!';
            resultMessage.className = 'result-message info animated-feedback';
            console.log("No valid input detected");
            return;
        }
        
        // Get the selected cell - either use the passed cell or query for it
        const selectedCell = clickedCell || document.querySelector(`.grid-cell[data-row="${userRow}"][data-col="${userCol}"]`);
        console.log("Selected cell found:", selectedCell ? "Yes" : "No");
        
        // Clear previous highlights but not the correct cell
        document.querySelectorAll('.grid-cell:not(.correct)').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        if (selectedCell) {
            selectedCell.classList.add('highlighted');
            
            // Make cell non-clickable once it's been checked
            selectedCell.style.pointerEvents = 'none';
        }
        
        // Convert values for comparison
        const userRowNum = parseInt(userRow, 10);
        const treasureRowNum = parseInt(treasureLocation.row, 10);
        const userColStr = String(userCol).toUpperCase();
        const treasureColStr = String(treasureLocation.col).toUpperCase();
        
        console.log(`Comparing coordinates - userRow: ${userRowNum}, treasureRow: ${treasureRowNum}`);
        console.log(`Comparing coordinates - userCol: ${userColStr}, treasureCol: ${treasureColStr}`);
        
        // Check if the selection matches the treasure location
        const isCorrectRow = !isNaN(userRowNum) && !isNaN(treasureRowNum) && userRowNum === treasureRowNum;
        const isCorrectCol = userColStr && treasureColStr && userColStr === treasureColStr;
        
        console.log(`Coordinate match check: Row match: ${isCorrectRow}, Column match: ${isCorrectCol}`);
        
        console.log(`Comparing: ${isCorrectRow ? 'Row matches!' : 'Row does not match'}, ${isCorrectCol ? 'Column matches!' : 'Column does not match'}`);
        
        if (isCorrectRow && isCorrectCol) {
            console.log('✓✓✓ CORRECT COORDINATES FOUND! Executing success animation... ✓✓✓');
            try {
                playSound('success');
            } catch (err) {
                console.error('Failed to play success sound:', err);
            }
            
            // Use a treasure hunt themed success message
            resultMessage.innerHTML = `
                <div class="treasure-success">
                    <div>💰 TREASURE FOUND! 💰</div>
                    <div>X marks the spot at Row ${userRowNum}, Column ${userColStr}!</div>
                </div>
                <div class="mt-2">🎉 Great job! You found the hidden treasure! �</div>
            `;
            resultMessage.className = 'result-message success animated-feedback';
            
            // Create a treasure reveal animation
            if (selectedCell) {
                console.log('Animating selected cell:', selectedCell);
                
                // Ensure cell is marked as correct to prevent further clicking
                selectedCell.classList.add('correct');
                selectedCell.classList.add('treasure-found');
                
                // Remove any existing content
                selectedCell.innerHTML = '';
                
                // First show digging animation
                selectedCell.innerHTML = '<span class="digging-treasure">💰</span>';
                
                // Make sure the cell can't be clicked again during animation
                selectedCell.style.pointerEvents = 'none';
                
                // Then show treasure with celebration
                setTimeout(() => {
                    console.log('Showing treasure celebration');
                    if (selectedCell) {
                        selectedCell.innerHTML = '🏆';
                        
                        // Add treasure particles with a slight delay to ensure DOM is ready
                        setTimeout(() => createTreasureParticles(selectedCell), 100);
                    }
                }, 500);
            } else {
                console.error('Selected cell not found for treasure animation');
                
                // Try to find the correct cell directly
                const correctCell = document.querySelector(`.grid-cell[data-row="${treasureLocation.row}"][data-col="${treasureLocation.col}"]`);
                if (correctCell) {
                    console.log('Found correct cell manually, animating...');
                    correctCell.classList.add('correct');
                    correctCell.classList.add('treasure-found');
                    correctCell.innerHTML = '🏆';
                    createTreasureParticles(correctCell);
                }
            }
            
            // Increment treasures found counter if less than 10
            if (treasuresFound < 10) {
                treasuresFound++;
                updateGridProgress();
                updateGridStats();
            }
            
            // If we've reached 10 treasures, show completion message
            if (treasuresFound >= 10) {
                const gridContainer = document.querySelector('.grid-container');
                if (gridContainer) {
                    // Disable all cell clicks when game is completed
                    const allCells = document.querySelectorAll('.grid-cell');
                    allCells.forEach(cell => {
                        cell.style.pointerEvents = 'none';
                    });
                }
                
                // Show completion message
                resultMessage.innerHTML = `
                    <div class="completion-message">
                        <div>🎉 CONGRATULATIONS! 🎉</div>
                        <div>You've found all 10 treasures!</div>
                        <div class="mt-2">You're a master treasure hunter!</div>
                    </div>
                `;
                resultMessage.className = 'result-message success animated-feedback';
            }
            
            // Celebrate every 3 treasures found
            if (treasuresFound % 3 === 0 && treasuresFound > 0) {
                // Treasure hunt themed celebration message
                resultMessage.innerHTML = `
                    <div class="level-up-treasure">
                        <div>🏆 TREASURE MILESTONE! 🏆</div>
                        <div>Congratulations! You've found ${treasuresFound} treasures!</div>
                    </div>
                    <div class="mt-2">🗺️ Your treasure hunting skills are impressive!</div>
                `;
                updateGridStats();
            }
            
            // After a delay for celebration, set up a new treasure hunt
            // Display a treasure-themed message about the next challenge
            const treasureNextMessage = document.createElement('div');
            treasureNextMessage.className = 'treasure-next-message';
            treasureNextMessage.innerHTML = `
                <div>🗺️ New treasure map incoming...</div>
                <div>Get ready for your next adventure!</div>
            `;
            resultMessage.appendChild(treasureNextMessage);
            
            setTimeout(() => {
                // Clean up any remaining animations or particles before setting new treasure
                document.querySelectorAll('.treasure-particle, .treasure-marker').forEach(element => {
                    if (element.parentNode) element.parentNode.removeChild(element);
                });
                
                // Now set up a new treasure location challenge
                placeTreasure();
            }, 3000); // Give time to appreciate the success
        } else {
            playSound('error');
            resultMessage.className = 'result-message error';
            
            // Mark the cell as searched
            if (selectedCell) {
                selectedCell.classList.add('searched');
                
                // Add a digging mark to indicate searched location
                if (!selectedCell.classList.contains('correct')) {
                    selectedCell.innerHTML = '<span class="digging-mark">🔍</span>';
                    setTimeout(() => {
                        if (!selectedCell.classList.contains('correct')) {
                            selectedCell.innerHTML = ''; 
                        }
                    }, 2000);
                }
                
                // Add a small shake effect
                selectedCell.classList.add('shake-effect');
                setTimeout(() => {
                    selectedCell.classList.remove('shake-effect');
                }, 500);
            }
            
            // Calculate differences for hint calculation
            const rowDiff = parseInt(userRow) - treasureLocation.row;
            const colDiff = userCol.charCodeAt(0) - treasureLocation.col.charCodeAt(0);
            
            // Provide treasure hunt oriented hints based on level
            if (gridLevel === 1) {
                // Basic treasure map hint for beginners
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🗺️ Treasure Map Clue:</div>
                        <div>The treasure is at Row ${treasureLocation.row}, Column ${treasureLocation.col}</div>
                        <div>Your dig was at Row ${userRowNum}, Column ${userColStr}</div>
                        <div>Try again! Follow the map carefully!</div>
                    </div>
                `;
            } else if (gridLevel === 2) {
                // Directional hint - guide them with compass directions
                const rowDirection = rowDiff > 0 ? "You need to dig further north!" : (rowDiff < 0 ? "You need to dig further south!" : "Your row position is correct! ✓");
                const colDirection = colDiff > 0 ? "Move to the west!" : (colDiff < 0 ? "Move to the east!" : "Your column position is correct! ✓");
                
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🧭 Treasure Hunter's Compass:</div>
                        <div>${rowDirection}</div>
                        <div>${colDirection}</div>
                        <div>Move ${Math.abs(rowDiff)} row(s) ${rowDiff > 0 ? "up" : "down"} and ${Math.abs(colDiff)} column(s) ${colDiff > 0 ? "left" : "right"}</div>
                    </div>
                `;
            } else {
                // Advanced mysterious hint with distance
                const distance = Math.abs(rowDiff) + Math.abs(colDiff); 
                const percentClose = 100 - Math.floor((distance / 12) * 100);
                
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🔍 Treasure Hunter's Instinct:</div>
                        <div>You are ${percentClose}% close to the treasure!</div>
                        <div>The treasure lies ${rowDiff !== 0 ? `${Math.abs(rowDiff)} spaces ${rowDiff > 0 ? "north" : "south"}` : "in the same row"}</div> 
                        <div>and ${colDiff !== 0 ? `${Math.abs(colDiff)} spaces ${colDiff > 0 ? "west" : "east"}` : "in the same column"}</div>
                    </div>
                `;
            }
            
            // For added fun, put a digging mark in the wrong cell
            if (selectedCell && !selectedCell.textContent) {
                selectedCell.textContent = '🪙';
                setTimeout(() => {
                    if (selectedCell) selectedCell.textContent = '';
                }, 1500);
            }
        }
    }

    function updateGridProgress() {
        const progressBar = document.getElementById('grid-progress');
        if (progressBar) {
            const progressPercentage = (treasuresFound % 3) / 3 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateGridStats() {
        const levelSpan = document.getElementById('grid-level');
        const foundSpan = document.getElementById('grid-found');
        const totalSpan = document.getElementById('grid-total');
        
        if (levelSpan) levelSpan.textContent = '1'; // Always level 1 in simplified version
        if (foundSpan) foundSpan.textContent = treasuresFound;
        if (totalSpan) totalSpan.textContent = '10';
        
        // Update level info - simplified version with just Treasure Hunter label
        // Note: We keep the class name for backward compatibility but display treasure hunt terms
        const levelDescription = document.querySelector(".code-level-description");
        if (levelDescription) {
            levelDescription.textContent = "Treasure Hunter";
        }
    }

    // Pattern Sequencer Activity
    const patternTemplates = [
        { 
            pattern: ['🔴', '🔵', '🔴', '🔵'], 
            solution: ['🔴', '🔵'] 
        },
        { 
            pattern: ['🟢', '🟢', '🟡', '🟢', '🟢'], 
            solution: ['🟡'] 
        },
        { 
            pattern: ['🟡', '🔴', '🔴', '🟡', '🔴'], 
            solution: ['🔴', '🟡'] 
        },
        { 
            pattern: ['🔵', '🟢', '🔵', '🟢', '🟢'], 
            solution: ['🔵', '🟢', '🟢'] 
        },
        { 
            pattern: ['🔴', '🟡', '🟢', '🔴', '🟡'], 
            solution: ['🟢', '🔴'] 
        },
        { 
            pattern: ['🟢', '🔵', '🟢', '🔵', '🟢'], 
            solution: ['🔵', '🟢'] 
        },
        { 
            pattern: ['🟡', '🟡', '🔴', '🟡', '🟡'], 
            solution: ['🔴', '🟡'] 
        },
        { 
            pattern: ['🔴', '🔵', '🟢', '🟡', '🔴'], 
            solution: ['🔵', '🟢', '🟡'] 
        },
        { 
            pattern: ['🟢', '🔴', '🟢', '🔴', '🟢'], 
            solution: ['🔴', '🟢'] 
        },
        { 
            pattern: ['🔵', '🟡', '🔵', '🟡', '🔵'], 
            solution: ['🟡', '🔵'] 
        }
    ];

    let currentPatternIndex = 0;
    let patternsSolved = 0;
    let patternLevel = 1;
    let selectedPatterns = [];

    function initPatternActivity() {
        currentPatternIndex = 0;
        patternsSolved = 0;
        patternLevel = 1;
        updateSequenceStats();
        displayPattern();
    }

    function displayPattern() {
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        const patternResultMsg = document.getElementById('pattern-result');
        
        if (!patternSequence || !patternChoices || !patternSolution) return;
        
        // Check if all patterns are completed
        if (patternsSolved >= 10) {
            // Show completion message
            patternSequence.innerHTML = '<div class="completion-message">🎉 All patterns completed! 🎉</div>';
            patternChoices.innerHTML = '';
            patternSolution.innerHTML = '';
            
            if (patternResultMsg) {
                patternResultMsg.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
                patternResultMsg.className = 'result-message success animated-feedback';
            }
            return;
        }
        
        // Reset
        patternSequence.innerHTML = '';
        patternChoices.innerHTML = '';
        patternSolution.innerHTML = '';
        selectedPatterns = [];
        
        // Get current pattern
        const currentPattern = patternTemplates[currentPatternIndex];
        
        // Display pattern
        currentPattern.pattern.forEach(item => {
            const patternItem = document.createElement('div');
            patternItem.className = 'pattern-item';
            patternItem.textContent = item;
            patternSequence.appendChild(patternItem);
        });
        
        // Add question marks for solution slots
        for (let i = 0; i < currentPattern.solution.length; i++) {
            const questionItem = document.createElement('div');
            questionItem.className = 'pattern-item';
            questionItem.textContent = '?';
            patternSequence.appendChild(questionItem);
        }
        
        // Pattern choices
        const uniqueItems = Array.from(new Set([...currentPattern.pattern, ...currentPattern.solution]));
        
        // Add one distractor item that's not in the pattern
        const allPatternItems = ['🔴', '🔵', '🟢', '🟡'];
        const distractors = allPatternItems.filter(item => !uniqueItems.includes(item));
        
        if (distractors.length > 0) {
            uniqueItems.push(distractors[0]);
        }
        
        // Shuffle choices
        shuffleArray(uniqueItems);
        
        uniqueItems.forEach(item => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'btn pattern-choice';
            choiceButton.dataset.pattern = item;
            
            // Set button color based on item
            switch(item) {
                case '🔴':
                    choiceButton.classList.add('btn-outline-danger');
                    break;
                case '🔵':
                    choiceButton.classList.add('btn-outline-primary');
                    break;
                case '🟢':
                    choiceButton.classList.add('btn-outline-success');
                    break;
                case '🟡':
                    choiceButton.classList.add('btn-outline-warning');
                    break;
            }
            
            choiceButton.textContent = item;
            
            choiceButton.addEventListener('click', function() {
                if (selectedPatterns.length < currentPattern.solution.length) {
                    selectedPatterns.push(item);
                    updateSolutionDisplay();
                    playSound('click');
                }
            });
            
            patternChoices.appendChild(choiceButton);
        });
        
        // Create empty solution slots
        for (let i = 0; i < currentPattern.solution.length; i++) {
            const solutionSlot = document.createElement('div');
            solutionSlot.className = 'pattern-slot';
            solutionSlot.dataset.index = i;
            solutionSlot.textContent = '?';
            patternSolution.appendChild(solutionSlot);
        }
        
        // Reset result message
        const resultMessage = document.getElementById('pattern-result');
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
    }

    function updateSolutionDisplay() {
        const patternSolution = document.getElementById('pattern-solution');
        if (!patternSolution) return;
        
        const slots = patternSolution.querySelectorAll('.pattern-slot');
        
        slots.forEach((slot, index) => {
            if (index < selectedPatterns.length) {
                slot.textContent = selectedPatterns[index];
            } else {
                slot.textContent = '?';
            }
        });
    }

    // Pattern Check Button
    const patternCheckButton = document.getElementById('pattern-check');
    if (patternCheckButton) {
        patternCheckButton.addEventListener('click', function() {
            checkPatternAnswer();
        });
    }

    // Pattern Reset Button
    const patternResetButton = document.getElementById('pattern-reset');
    if (patternResetButton) {
        patternResetButton.addEventListener('click', function() {
            playSound('click');
            selectedPatterns = [];
            updateSolutionDisplay();
            
            // Reset result message
            const resultMessage = document.getElementById('pattern-result');
            if (resultMessage) {
                resultMessage.textContent = '';
                resultMessage.className = 'result-message';
            }
        });
    }

    function checkPatternAnswer() {
        const resultMessage = document.getElementById('pattern-result');
        if (!resultMessage) return;
        
        // Don't process if we've already completed all patterns
        if (patternsSolved >= 10) {
            resultMessage.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
            resultMessage.className = 'result-message success animated-feedback';
            return;
        }
        
        const currentPattern = patternTemplates[currentPatternIndex];
        
        if (selectedPatterns.length < currentPattern.solution.length) {
            resultMessage.textContent = 'Please fill in all the pattern slots.';
            resultMessage.className = 'result-message error';
            return;
        }
        
        const isCorrect = arraysEqual(selectedPatterns, currentPattern.solution);
        
        if (isCorrect) {
            playSound('success');
            resultMessage.textContent = '🎉 Correct! You found the pattern!';
            resultMessage.className = 'result-message success animated-feedback';
            
            patternsSolved++;
            updateSequenceProgress();
            updateSequenceStats();
            
            // Check if all patterns are completed
            if (patternsSolved >= 10) {
                setTimeout(() => {
                    resultMessage.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
                    resultMessage.className = 'result-message success animated-feedback';
                    displayPattern(); // This will show the completion message
                }, 2000);
                return;
            }
            
            // After a short delay, show next pattern
            setTimeout(() => {
                currentPatternIndex++;
                displayPattern();
            }, 2000);
        } else {
            playSound('error');
            resultMessage.textContent = '❌ That\'s not the right pattern. Try again!';
            resultMessage.className = 'result-message error';
        }
    }

    function updateSequenceProgress() {
        const progressBar = document.getElementById('sequence-progress');
        if (progressBar) {
            const progressPercentage = (patternsSolved % 2) / 2 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateSequenceStats() {
        const levelSpan = document.getElementById('sequence-level');
        const solvedSpan = document.getElementById('sequence-solved');
        const totalSpan = document.getElementById('sequence-total');
        
        if (levelSpan) levelSpan.textContent = patternLevel;
        if (solvedSpan) solvedSpan.textContent = patternsSolved;
        if (totalSpan) totalSpan.textContent = '10';
    }

    // Function to create treasure particles for celebration
    function createTreasureParticles(cell) {
        console.log('Creating treasure hunt celebration');
        
        // Create treasure-themed celebration elements with safe emojis
        // Using string literals for each emoji to avoid encoding issues
        const treasureEmojis = [
            String.fromCodePoint(0x1F4B0), // 💰 money bag
            String.fromCodePoint(0x1F3C6), // 🏆 trophy
            String.fromCodePoint(0x2B50),  // ⭐ star
            String.fromCodePoint(0x1F48E), // 💎 gem
            String.fromCodePoint(0x1F50D), // 🔍 magnifying glass
            String.fromCodePoint(0x1F5FA, 0xFE0F), // 🗺️ map
            String.fromCodePoint(0x1F511), // 🔑 key
            String.fromCodePoint(0x1F451), // 👑 crown
            String.fromCodePoint(0x1F9E9), // 🧩 puzzle piece
            String.fromCodePoint(0x1F3AF)  // 🎯 bullseye
        ];
        
        const treasurePhrases = ['GOLD', 'GEMS', 'FOUND', 'PRIZE', 'CHEST', 'MAP', 'X MARKS', 'LOOT', 'BOUNTY', 'TREASURE'];
        
        // Clear any previous content and set special class
        cell.innerHTML = ''; // Clear previous content
        cell.classList.add('treasure-found');
        
        // Simple celebration effect for the cell
        cell.style.animation = 'none'; // Reset animation
        setTimeout(() => {
            cell.style.animation = 'treasureFound 1s ease-out infinite';
        }, 10);
        
        // Show the trophy/treasure in the cell
        const treasure = document.createElement('div');
        treasure.className = 'treasure-icon';
        treasure.textContent = '🏆';
        treasure.style.fontSize = '2rem';
        cell.appendChild(treasure);
        
        // Add a "treasure found" marker
        const treasureMarker = document.createElement('div');
        treasureMarker.className = 'treasure-marker';
        treasureMarker.innerHTML = '<span>TREASURE!</span>';
        treasureMarker.style.position = 'absolute';
        treasureMarker.style.top = '-20px';
        treasureMarker.style.left = '50%';
        treasureMarker.style.transform = 'translateX(-50%)';
        treasureMarker.style.backgroundColor = 'gold';
        treasureMarker.style.color = '#8B4513';
        treasureMarker.style.padding = '2px 5px';
        treasureMarker.style.borderRadius = '4px';
        treasureMarker.style.fontSize = '0.8rem';
        treasureMarker.style.fontWeight = 'bold';
        treasureMarker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        cell.appendChild(treasureMarker);
        
        // Create treasure celebration particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                try {
                    // Create particle element
                    const particle = document.createElement('div');
                    
                    // Alternate between emoji and treasure text
                    if (i % 2 === 0) {
                        particle.className = 'treasure-particle emoji';
                        particle.textContent = treasureEmojis[i % treasureEmojis.length];
                    } else {
                        particle.className = 'treasure-particle text';
                        particle.textContent = treasurePhrases[i % treasurePhrases.length];
                    }
                    
                    // Apply inline styles to ensure they work without CSS class definitions
                    particle.style.position = 'absolute';
                    particle.style.zIndex = '100';
                    particle.style.fontWeight = 'bold';
                    particle.style.color = i % 2 === 0 ? 'goldenrod' : '#8B4513';
                    particle.style.textShadow = '0 0 3px white';
                    
                    // Size variation
                    const randomSize = 0.8 + Math.random() * 0.4;
                    particle.style.fontSize = `${randomSize}rem`;
                    
                    // Position particles in a circular pattern around the cell
                    const angle = (i / 8) * Math.PI * 2;
                    const distance = 30 + Math.random() * 20;
                    const x = Math.sin(angle) * distance;
                    const y = Math.cos(angle) * distance;
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                    
                    // Custom animation since we can't rely on CSS classes
                    particle.animate([
                        { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 },
                        { transform: `translate(${x}px, ${y}px) scale(1.2)`, opacity: 1, offset: 0.5 },
                        { transform: `translate(${x}px, ${y - 30}px) scale(1)`, opacity: 0 }
                    ], {
                        duration: 2000,
                        iterations: 1,
                        easing: 'ease-out'
                    });
                    
                    // Add to cell
                    if (cell) {
                        cell.appendChild(particle);
                        
                        // Remove after animation
                        setTimeout(() => {
                            if (particle && particle.parentNode) {
                                particle.parentNode.removeChild(particle);
                            }
                        }, 2500);
                    }
                } catch (err) {
                    console.error('Error in treasure particles:', err);
                }
            }, i * 250);
        }
    }

    // Helper function: Shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Helper function: Compare arrays
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
});
