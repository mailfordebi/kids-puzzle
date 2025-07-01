// Grid Explorer JavaScript

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

    // Grid Explorer Variables
    let gridLevel = 1;
    let treasuresFound = 0;
    let currentTreasureLocation = { row: null, col: null };
    
    // Treasure clues - each level has its own clues
    const treasureClues = [
        // Level 1 - Exact Clues
        [
            { location: { row: 2, col: 'C' }, clue: "The treasure is at row 2, column C. Click directly on that square!" },
            { location: { row: 5, col: 'F' }, clue: "Dig at row 5, column F to find the hidden treasure!" },
            { location: { row: 3, col: 'D' }, clue: "X marks the spot at row 3, column D. Can you find it?" },
            { location: { row: 1, col: 'G' }, clue: "The treasure map says to look at row 1, column G!" },
            { location: { row: 6, col: 'B' }, clue: "Row 6, column B is where you'll find the treasure!" }
        ],
        // Level 2 - Row/Column Hints
        [
            { location: { row: 4, col: 'E' }, clue: "The treasure is in row 4, somewhere in the middle columns." },
            { location: { row: 2, col: 'A' }, clue: "Look for the treasure in column A, near the top of the grid." },
            { location: { row: 7, col: 'D' }, clue: "The treasure is at the bottom of the grid, in column D." },
            { location: { row: 5, col: 'G' }, clue: "Column G has a treasure, not at the top or bottom." },
            { location: { row: 1, col: 'C' }, clue: "The treasure is in the first row, but not at the edges." }
        ],
        // Level 3 - Riddle Clues
        [
            { location: { row: 3, col: 'F' }, clue: "I'm in a column that's after E but before G, and in a row that's after 2 but before 4." },
            { location: { row: 6, col: 'C' }, clue: "The row number is twice the column position (if A=1, B=2, etc)." },
            { location: { row: 4, col: 'B' }, clue: "The column letter comes early in the alphabet, and the row is in the middle of the grid." },
            { location: { row: 7, col: 'G' }, clue: "I'm hiding at the furthest corner from the start (row 1, column A)." },
            { location: { row: 2, col: 'D' }, clue: "My row number plus my column number (if A=1, B=2, etc.) equals 6." }
        ]
    ];

    // Initialize Grid Activity
    initGridActivity();

    function initGridActivity() {
        gridLevel = 1; // Always start at level 1
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
            // First remove any existing click listeners to prevent duplicates
            cell.removeEventListener('click', handleGridCellClick);
            
            // Then add fresh click listener
            cell.addEventListener('click', handleGridCellClick);
        });
    }
    
    // Separate the handler function for cleaner code
    function handleGridCellClick() {
        // First check if this cell has already been clicked
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
            // Explicitly set the input values
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
                
                // Remove any background images
                clickedCell.style.backgroundImage = 'none';
                
                // Pass the cell element and coordinates directly to checkGridAnswer
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
        });
        
        // Get a random treasure location for the current level
        const levelIndex = Math.min(gridLevel - 1, treasureClues.length - 1);
        const clueSet = treasureClues[levelIndex];
        const treasureIndex = treasuresFound % clueSet.length;
        
        // Set the current treasure location
        currentTreasureLocation = clueSet[treasureIndex].location;
        
        console.log("New treasure placed at:", currentTreasureLocation);
        
        // Display the clue
        const clueElement = document.getElementById('treasure-clue');
        if (clueElement) {
            clueElement.textContent = clueSet[treasureIndex].clue;
        }
        
        // For Level 2 (row/column hints), add visual hints
        if (gridLevel === 2) {
            highlightRowOrColumn();
        }
    }
    
    function highlightRowOrColumn() {
        const { row, col } = currentTreasureLocation;
        const hintType = Math.random() > 0.5 ? 'row' : 'column';
        
        if (hintType === 'row') {
            // Highlight the row
            const rowCells = document.querySelectorAll(`.grid-cell[data-row="${row}"]`);
            rowCells.forEach(cell => {
                cell.classList.add('hint-highlight-row');
            });
        } else {
            // Highlight the column
            const colCells = document.querySelectorAll(`.grid-cell[data-col="${col}"]`);
            colCells.forEach(cell => {
                cell.classList.add('hint-highlight-col');
            });
        }
    }
    
    function checkGridAnswer(clickedCell, row, col) {
        const resultMessage = document.getElementById('grid-result');
        
        if (!resultMessage) return;
        
        // Convert row to number for comparison (it's stored as a string from getAttribute)
        const numericRow = parseInt(row, 10);
        
        // Check if this is the correct cell
        if (numericRow === currentTreasureLocation.row && col === currentTreasureLocation.col) {
            // Found the treasure!
            playSound('success');
            clickedCell.classList.add('correct');
            
            // Update result message
            resultMessage.textContent = '🎉 You found the treasure!';
            resultMessage.className = 'result-message success animated-feedback';
            
            // Update progress
            treasuresFound++;
            updateGridStats();
            
            // Level up when appropriate (every 5 treasures)
            if (treasuresFound % 5 === 0 && gridLevel < 3) {
                gridLevel++;
                resultMessage.textContent = `🎉 Level Up! You're now at level ${gridLevel}!`;
                
                // Clear any row/column highlights
                document.querySelectorAll('.hint-highlight-row, .hint-highlight-col').forEach(cell => {
                    cell.classList.remove('hint-highlight-row', 'hint-highlight-col');
                });
            }
            
            // Show completion message if all treasures found
            if (treasuresFound >= 10) {
                resultMessage.textContent = '🎉 Congratulations! You found all the hidden treasures!';
                return;
            }
            
            // Place a new treasure after a delay
            setTimeout(() => {
                placeTreasure();
            }, 1500);
        } else {
            // Wrong guess
            playSound('error');
            clickedCell.classList.add('searched');
            
            // Calculate how close they are to the treasure
            const rowDistance = Math.abs(numericRow - currentTreasureLocation.row);
            const colDistance = Math.abs(col.charCodeAt(0) - currentTreasureLocation.col.charCodeAt(0));
            const totalDistance = rowDistance + colDistance;
            
            // Determine the hint message based on distance
            let hintMessage;
            if (totalDistance <= 2) {
                hintMessage = "You're very close! The treasure is nearby.";
            } else if (totalDistance <= 5) {
                hintMessage = "You're getting warmer! Keep searching.";
            } else {
                hintMessage = "You're pretty far from the treasure. Try a different area.";
            }
            
            resultMessage.textContent = `❌ No treasure here. ${hintMessage}`;
            resultMessage.className = 'result-message error animated-feedback';
            
            // For level 1, give direct hint after 3 failed tries
            const failedAttempts = document.querySelectorAll('.grid-cell.searched').length;
            if (gridLevel === 1 && failedAttempts >= 3) {
                const { row, col } = currentTreasureLocation;
                resultMessage.textContent = `❌ No treasure here. Hint: Try looking at row ${row}, column ${col}!`;
            }
        }
    }
    
    function updateGridStats() {
        const levelElement = document.getElementById('grid-level');
        const foundElement = document.getElementById('grid-found');
        const totalElement = document.getElementById('grid-total');
        const progressBar = document.getElementById('grid-progress');
        
        if (levelElement) levelElement.textContent = gridLevel;
        if (foundElement) foundElement.textContent = treasuresFound;
        if (totalElement) totalElement.textContent = 10;
        
        // Update progress bar
        if (progressBar) {
            const progressPercentage = (treasuresFound / 10) * 100;
            progressBar.style.width = progressPercentage + '%';
            progressBar.setAttribute('aria-valuenow', progressPercentage);
        }
    }
});
