document.addEventListener('DOMContentLoaded', () => {
    // Define patterns and their sequences (5 numbers each)
    const patterns = [
        {
            sequence: [9, 4, 7, 3, 5],
            randomNumbers: [2, 1, 6, 9, 4, 7, 3, 5, 1, 8, 0, 2, 4, 6, 3, 8, 1]
        },
        {
            sequence: [6, 3, 8, 2, 4],
            randomNumbers: [1, 2, 5, 7, 9, 1, 6, 3, 8, 2, 4, 0, 7, 5, 3, 1, 9]
        },
        {
            sequence: [7, 5, 2, 9, 1],
            randomNumbers: [3, 4, 8, 2, 6, 0, 3, 7, 5, 2, 9, 1, 4, 8, 0, 6, 5]
        },
        {
            sequence: [3, 8, 4, 6, 2],
            randomNumbers: [5, 0, 7, 1, 9, 4, 3, 8, 4, 6, 2, 1, 7, 5, 0, 8, 3]
        }
    ];

    // Function that returns the predefined numbers for each row
    function getRowNumbers(pattern) {
        return { numbers: pattern.randomNumbers };
    }

    // Remove setupPatterns function as we don't need it anymore

    // Function to setup number rows
    function setupNumberRows() {
        const numberRows = document.querySelector('.number-rows');
        patterns.forEach((pattern, index) => {
            const { numbers } = getRowNumbers(pattern);
            
            // Create the row container
            const row = document.createElement('div');
            row.className = 'number-row';
            row.dataset.rowIndex = index;
            row.dataset.sequence = JSON.stringify(pattern.sequence);
            
            // Create random numbers section (left side)
            const randomNumbers = document.createElement('div');
            randomNumbers.className = 'random-numbers';
            numbers.forEach((num, numIndex) => {
                const numBox = document.createElement('div');
                numBox.className = 'number-box';
                numBox.textContent = num;
                numBox.dataset.position = numIndex;
                numBox.dataset.value = num;
                randomNumbers.appendChild(numBox);
            });
            
            // Create input numbers section (right side)
            const inputNumbers = document.createElement('div');
            inputNumbers.className = 'input-numbers';
            pattern.sequence.forEach(num => {
                const numBox = document.createElement('div');
                numBox.className = 'number-box pattern';
                numBox.textContent = num;
                inputNumbers.appendChild(numBox);
            });
            
            // Add both sections to the row
            row.appendChild(randomNumbers);
            row.appendChild(inputNumbers);
            numberRows.appendChild(row);
        });
    }

    // Function to handle number selection
    function setupNumberSelections() {
        const numberRows = document.querySelector('.number-rows');
        numberRows.addEventListener('click', (e) => {
            if (e.target.classList.contains('number-box') && 
                e.target.parentElement.classList.contains('random-numbers')) {
                const row = e.target.closest('.number-row');
                const expectedSequence = JSON.parse(row.dataset.sequence);
                const selectedBoxes = row.querySelectorAll('.random-numbers .number-box.selected');
                
                // If already selected, allow deselecting
                if (e.target.classList.contains('selected')) {
                    // When deselecting, also remove later selections
                    const selectedIndex = parseInt(e.target.dataset.selectedIndex);
                    row.querySelectorAll('.number-box.selected').forEach(box => {
                        if (parseInt(box.dataset.selectedIndex) >= selectedIndex) {
                            box.classList.remove('selected');
                            delete box.dataset.selectedIndex;
                        }
                    });
                    FeedbackSystem.showClick();
                    return;
                }
                
                // Only allow selecting if it's the next number in sequence
                if (selectedBoxes.length < expectedSequence.length) {
                    const nextExpectedNum = expectedSequence[selectedBoxes.length];
                    if (parseInt(e.target.dataset.value) === nextExpectedNum) {
                        e.target.classList.add('selected');
                        e.target.dataset.selectedIndex = selectedBoxes.length;
                        FeedbackSystem.showClick();
                    } else {
                        FeedbackSystem.showError('Try finding the numbers in order! 🎯');
                    }
                }
            }
        });
    }

    // Function to create celebration effects
    function celebrate() {
        const puzzle = document.querySelector('.puzzle-container');
        puzzle.classList.add('celebrate');

        // Create floating flowers and ribbons
        const flowers = ['🌸', '🌺', '🌹', '🌷', '🌻'];
        const ribbons = ['🎀', '🎉', '🎊'];

        for (let i = 0; i < 10; i++) {
            // Create flower
            const flower = document.createElement('div');
            flower.className = 'celebration flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.top = Math.random() * 100 + 'vh';
            flower.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(flower);

            // Create ribbon
            const ribbon = document.createElement('div');
            ribbon.className = 'celebration ribbon';
            ribbon.textContent = ribbons[Math.floor(Math.random() * ribbons.length)];
            ribbon.style.left = Math.random() * 100 + 'vw';
            ribbon.style.top = Math.random() * 100 + 'vh';
            ribbon.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(ribbon);

            // Remove after animation
            setTimeout(() => {
                flower.remove();
                ribbon.remove();
            }, 5000);
        }

        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    }

    // Function to check answers
    function checkAnswer() {
        const rows = document.querySelectorAll('.number-row');
        let allCorrect = true;

        rows.forEach(row => {
            const expectedSequence = JSON.parse(row.dataset.sequence);
            const selectedBoxes = Array.from(row.querySelectorAll('.random-numbers .number-box.selected'))
                .sort((a, b) => a.dataset.selectedIndex - b.dataset.selectedIndex);
            const selectedNumbers = selectedBoxes.map(box => parseInt(box.dataset.value));

            // Check if selected numbers match the sequence in order
            const isCorrect = selectedNumbers.length === expectedSequence.length &&
                selectedNumbers.every((num, index) => num === expectedSequence[index]);

            if (isCorrect) {
                selectedBoxes.forEach(box => {
                    box.classList.remove('selected', 'incorrect');
                    box.classList.add('correct');
                });
            } else {
                allCorrect = false;
                selectedBoxes.forEach(box => {
                    box.classList.remove('selected', 'correct');
                    box.classList.add('incorrect');
                });
            }
        });

        const resultMessage = document.querySelector('.result');
        if (allCorrect) {
            FeedbackSystem.showSuccess('🎯 Amazing! You found all the patterns! 🌟');
            resultMessage.textContent = 'Fantastic! You solved all the patterns!';
            resultMessage.className = 'result success';
            celebrate();
        } else {
            FeedbackSystem.showError('Keep trying! You can find these patterns! 💪');
            resultMessage.textContent = 'Some patterns are not quite right. Try again!';
            resultMessage.className = 'result error';
            
            // Clear error indicators after a delay
            setTimeout(() => {
                document.querySelectorAll('.number-box.incorrect').forEach(box => {
                    box.classList.remove('incorrect');
                });
                resultMessage.textContent = '';
                resultMessage.className = 'result';
            }, 2000);
        }
    }

    // Setup click handler for check button
    document.querySelector('#check-answer').addEventListener('click', checkAnswer);

    // Initialize the puzzle
    setupNumberRows();
    setupNumberSelections();
});
