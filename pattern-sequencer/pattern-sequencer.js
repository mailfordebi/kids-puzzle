// Pattern Sequencer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pattern Sequencer initialized');
    
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

    // Pattern Sequencer variables
    let currentPatternIndex = 0;
    let patternsSolved = 0;
    let patternLevel = 1;
    let selectedPatterns = [];
    
    // Pattern templates
    const patternTemplates = [
        // Level 1 - Simple patterns (ABAB, AABB, etc)
        {
            pattern: ['🔴', '🔵', '🔴', '🔵'],
            solution: ['🔴', '🔵']
        },
        {
            pattern: ['🟡', '🟡', '🔵', '🔵'],
            solution: ['🟡', '🟡']
        },
        {
            pattern: ['🟢', '🔴', '🔵', '🟢', '🔴'],
            solution: ['🔵']
        },
        {
            pattern: ['🔴', '🔴', '🔵', '🔴', '🔴', '🔵'],
            solution: ['🔴', '🔴']
        },
        {
            pattern: ['🟡', '🟢', '🟢', '🟡', '🟢', '🟢'],
            solution: ['🟡', '🟢', '🟢']
        },
        
        // Level 2 - Medium patterns
        {
            pattern: ['🔴', '🔵', '🔵', '🔴', '🔵', '🔵'],
            solution: ['🔴', '🔵', '🔵']
        },
        {
            pattern: ['🔵', '🟡', '🟡', '🟡', '🔵', '🟡', '🟡'],
            solution: ['🟡']
        },
        {
            pattern: ['🟢', '🟢', '🔴', '🟢', '🔴', '🔴'],
            solution: ['🟢', '🔴', '🔴', '🔴']
        },
        {
            pattern: ['🔴', '🟢', '🟢', '🔵', '🔴', '🟢', '🟢'],
            solution: ['🔵']
        },
        {
            pattern: ['🟡', '🟡', '🔵', '🟡', '🟡', '🔵', '🟡'],
            solution: ['🟡', '🔵']
        },
        
        // Level 3 - Complex patterns
        {
            pattern: ['🔴', '🔵', '🟡', '🔴', '🔵', '🟡', '🔴'],
            solution: ['🔵', '🟡']
        },
        {
            pattern: ['🟢', '🟢', '🔵', '🔴', '🔴', '🟢', '🟢', '🔵'],
            solution: ['🔴', '🔴']
        },
        {
            pattern: ['🔵', '🟡', '🟡', '🔵', '🔵', '🟡', '🟡', '🔵', '🔵'],
            solution: ['🟡', '🟡', '🔵']
        },
        {
            pattern: ['🔴', '🔴', '🟢', '🔵', '🔵', '🔴', '🔴', '🟢'],
            solution: ['🔵', '🔵']
        },
        {
            pattern: ['🟡', '🔵', '🔵', '🟢', '🟡', '🔵', '🔵', '🟢', '🟡'],
            solution: ['🔵', '🔵', '🟢']
        }
    ];

    // Initialize Pattern Activity
    initPatternActivity();

    function initPatternActivity() {
        console.log('Initializing pattern activity');
        currentPatternIndex = 0;
        patternsSolved = 0;
        patternLevel = 1;
        selectedPatterns = [];
        updateSequenceStats();
        displayPattern();
    }

    function displayPattern() {
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        const patternResultMsg = document.getElementById('pattern-result');
        
        if (!patternSequence || !patternChoices || !patternSolution) {
            console.error('Missing required pattern elements');
            return;
        }
        
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
        
        // Get current pattern based on level and progress
        const levelStartIndex = (patternLevel - 1) * 5;
        currentPatternIndex = levelStartIndex + (patternsSolved % 5);
        
        // Get current pattern
        const currentPattern = patternTemplates[currentPatternIndex];
        console.log('Current pattern:', currentPattern);
        
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
            solutionSlot.className = 'solution-item';
            solutionSlot.textContent = '';
            patternSolution.appendChild(solutionSlot);
        }
    }

    function updateSolutionDisplay() {
        const patternSolution = document.getElementById('pattern-solution');
        if (!patternSolution) return;
        
        // Clear solution display
        patternSolution.innerHTML = '';
        
        // Get current pattern
        const currentPattern = patternTemplates[currentPatternIndex];
        
        // Create solution slots (filled or empty)
        for (let i = 0; i < currentPattern.solution.length; i++) {
            const solutionSlot = document.createElement('div');
            solutionSlot.className = 'solution-item';
            
            if (i < selectedPatterns.length) {
                solutionSlot.textContent = selectedPatterns[i];
                
                // Add click handler to remove this item
                solutionSlot.addEventListener('click', function() {
                    const index = Array.from(patternSolution.children).indexOf(this);
                    if (index !== -1) {
                        selectedPatterns.splice(index, 1);
                        updateSolutionDisplay();
                        playSound('click');
                    }
                });
            } else {
                solutionSlot.textContent = '';
            }
            
            patternSolution.appendChild(solutionSlot);
        }
    }

    // Check Pattern Button
    const checkButton = document.getElementById('pattern-check');
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            checkPatternAnswer();
        });
    }

    // Reset Button
    const resetButton = document.getElementById('pattern-reset');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            selectedPatterns = [];
            updateSolutionDisplay();
            
            const patternResultMsg = document.getElementById('pattern-result');
            if (patternResultMsg) {
                patternResultMsg.textContent = '';
                patternResultMsg.className = 'result-message';
            }
            
            playSound('click');
        });
    }

    function checkPatternAnswer() {
        const patternResultMsg = document.getElementById('pattern-result');
        if (!patternResultMsg) return;
        
        const currentPattern = patternTemplates[currentPatternIndex];
        
        // Check if all solution slots are filled
        if (selectedPatterns.length < currentPattern.solution.length) {
            patternResultMsg.textContent = 'Please fill all solution slots first!';
            patternResultMsg.className = 'result-message error animated-feedback';
            return;
        }
        
        // Check if solution is correct
        let isCorrect = true;
        for (let i = 0; i < currentPattern.solution.length; i++) {
            if (selectedPatterns[i] !== currentPattern.solution[i]) {
                isCorrect = false;
                break;
            }
        }
        
        if (isCorrect) {
            playSound('success');
            patternResultMsg.textContent = '🎉 Correct! You completed the pattern!';
            patternResultMsg.className = 'result-message success animated-feedback';
            
            // Update progress
            patternsSolved++;
            updateSequenceStats();
            
            // Level up when appropriate
            if (patternsSolved % 5 === 0 && patternLevel < 3) {
                patternLevel++;
                patternResultMsg.textContent = `🎉 Level Up! You're now at level ${patternLevel}!`;
            }
            
            // Move to next pattern after a delay
            setTimeout(() => {
                displayPattern();
            }, 1500);
        } else {
            playSound('error');
            patternResultMsg.textContent = '❌ Not quite right. Try a different sequence!';
            patternResultMsg.className = 'result-message error animated-feedback';
            
            // Apply shake effect to solution items
            const solutionItems = document.querySelectorAll('.solution-item');
            solutionItems.forEach(item => {
                item.classList.add('shake-effect');
                setTimeout(() => {
                    item.classList.remove('shake-effect');
                }, 500);
            });
        }
    }

    function updateSequenceStats() {
        const levelElement = document.getElementById('sequence-level');
        const solvedElement = document.getElementById('sequence-solved');
        const totalElement = document.getElementById('sequence-total');
        const progressBar = document.getElementById('sequence-progress');
        
        if (levelElement) levelElement.textContent = patternLevel;
        if (solvedElement) solvedElement.textContent = patternsSolved;
        if (totalElement) totalElement.textContent = 10;
        
        // Update progress bar
        if (progressBar) {
            const progressPercentage = (patternsSolved / 10) * 100;
            progressBar.style.width = progressPercentage + '%';
            progressBar.setAttribute('aria-valuenow', progressPercentage);
        }
    }

    // Helper function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
