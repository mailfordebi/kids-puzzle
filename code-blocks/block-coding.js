// Block Coding for Kids - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // --- DATA DEFINITIONS ---
    
    // Challenges organized by category and level
    const challenges = {
        sequencing: {
            1: {
                title: "Help the Robot Find Treasure",
                description: "Guide the robot through the maze to find the treasure by putting the right steps in order.",
                goal: "Get the robot to the treasure chest using the right sequence of steps.",
                image: "./images/robot-maze.svg",
                blocks: [
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'pick-up']
            },
            2: {
                title: "Make a Sandwich",
                description: "Help make a tasty sandwich by putting the steps in the right order.",
                goal: "Create a perfect sandwich following the correct sequence of steps.",
                image: "./images/sandwich.svg",
                blocks: [
                    { id: 'place-bread', type: 'motion', text: 'Place Bread', icon: 'bread-slice' },
                    { id: 'add-cheese', type: 'motion', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-lettuce', type: 'motion', text: 'Add Lettuce', icon: 'leaf' },
                    { id: 'add-tomato', type: 'motion', text: 'Add Tomato', icon: 'apple-alt' },
                    { id: 'add-top-bread', type: 'motion', text: 'Add Top Bread', icon: 'bread-slice' },
                    { id: 'cut-sandwich', type: 'motion', text: 'Cut in Half', icon: 'cut' }
                ],
                solution: ['place-bread', 'add-cheese', 'add-lettuce', 'add-tomato', 'add-top-bread', 'cut-sandwich']
            },
            3: {
                title: "Plant a Flower",
                description: "Help plant a beautiful flower by putting the gardening steps in order.",
                goal: "Plant a flower by following the correct sequence of steps.",
                image: "./images/flower.svg",
                blocks: [
                    { id: 'dig-hole', type: 'motion', text: 'Dig a Hole', icon: 'shovel' },
                    { id: 'place-seed', type: 'motion', text: 'Place Seed', icon: 'seedling' },
                    { id: 'add-soil', type: 'motion', text: 'Cover with Soil', icon: 'mountain' },
                    { id: 'water-seed', type: 'motion', text: 'Water the Seed', icon: 'tint' },
                    { id: 'wait-sun', type: 'motion', text: 'Wait for Sunshine', icon: 'sun' },
                    { id: 'watch-grow', type: 'motion', text: 'Watch it Grow', icon: 'eye' }
                ],
                solution: ['dig-hole', 'place-seed', 'add-soil', 'water-seed', 'wait-sun', 'watch-grow']
            }
        },
        loops: {
            1: {
                title: "Paint a Fence",
                description: "Use loops to paint all 5 fence posts without repeating the same command.",
                goal: "Paint all 5 fence posts using the fewest blocks possible.",
                image: "./images/fence.svg",
                blocks: [
                    { id: 'repeat-5', type: 'loop', text: 'Repeat 5 times', icon: 'redo' },
                    { id: 'paint-post', type: 'motion', text: 'Paint Post', icon: 'paint-brush' }
                ],
                solution: ['repeat-5', 'paint-post'],
                isNested: true
            },
            2: {
                title: "Dance Routine",
                description: "Create a dance routine with 3 spins and 2 jumps using loops.",
                goal: "Make the dancer perform 3 spins followed by 2 jumps using loops.",
                image: "./images/dance.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'spin', type: 'motion', text: 'Spin', icon: 'sync' },
                    { id: 'jump', type: 'motion', text: 'Jump', icon: 'arrow-up' }
                ],
                solution: ['repeat-3', 'spin', 'repeat-2', 'jump'],
                isNested: true
            },
            3: {
                title: "Draw a Square",
                description: "Use loops to draw a square without repeating commands.",
                goal: "Draw a perfect square using a loop to repeat the sides.",
                image: "./images/fence.svg", // Replace with square image when available
                blocks: [
                    { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', icon: 'redo' },
                    { id: 'draw-line', type: 'motion', text: 'Draw Line', icon: 'pen' },
                    { id: 'turn-right-90', type: 'motion', text: 'Turn Right 90°', icon: 'arrow-right' }
                ],
                solution: ['repeat-4', 'draw-line', 'turn-right-90'],
                isNested: true
            }
        },
        logic: {
            1: {
                title: "Weather Checker",
                description: "Check the weather and decide what to wear.",
                goal: "Create a program that picks the right clothes based on the weather.",
                image: "./images/flower.svg", // Replace with weather image when available
                blocks: [
                    { id: 'if-sunny', type: 'logic', text: 'If Sunny', icon: 'sun' },
                    { id: 'if-rainy', type: 'logic', text: 'If Rainy', icon: 'cloud-rain' },
                    { id: 'wear-tshirt', type: 'motion', text: 'Wear T-shirt', icon: 'tshirt' },
                    { id: 'wear-raincoat', type: 'motion', text: 'Wear Raincoat', icon: 'umbrella' },
                ],
                solution: ['if-sunny', 'wear-tshirt', 'if-rainy', 'wear-raincoat'],
                isNested: true
            }
        },
        procedures: {
            1: {
                title: "Morning Routine",
                description: "Create a morning routine procedure and use it.",
                goal: "Define a 'Get Ready' procedure and use it in your program.",
                image: "./images/robot-maze.svg", // Replace with morning routine image when available
                blocks: [
                    { id: 'define-procedure', type: 'procedure', text: 'Define: Get Ready', icon: 'cube' },
                    { id: 'brush-teeth', type: 'motion', text: 'Brush Teeth', icon: 'toothbrush' },
                    { id: 'get-dressed', type: 'motion', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'motion', text: 'Eat Breakfast', icon: 'utensils' },
                    { id: 'call-procedure', type: 'procedure', text: 'Run: Get Ready', icon: 'play' },
                ],
                solution: ['define-procedure', 'brush-teeth', 'get-dressed', 'eat-breakfast', 'call-procedure'],
                isNested: true
            }
        }
    };

    // --- STATE VARIABLES ---
    let currentCategory = 'sequencing';
    let currentLevel = 1;
    let userBlocks = [];
    let completedChallenges = {
        sequencing: [],
        loops: [],
        logic: [],
        procedures: []
    };

    // --- DOM REFERENCES ---
    const blockPalette = document.getElementById('block-palette');
    const blocksContainer = document.getElementById('blocks-container');
    const challengeTitle = document.getElementById('challenge-title');
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskGoal = document.getElementById('task-goal');
    const challengeImage = document.getElementById('challenge-image');
    const currentLevelDisplay = document.getElementById('current-level');
    const animationArea = document.getElementById('animation-area');
    const feedbackArea = document.getElementById('feedback');
    const progressBar = document.getElementById('challenge-progress');
    const progressText = document.getElementById('progress-text');
    
    // --- INITIALIZATION ---
    function init() {
        // Set up challenge selection listeners
        document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.challenges-list .list-group-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentCategory = item.dataset.category;
                currentLevel = 1; // Reset level when changing categories
                loadChallenge();
                updateUI();
            });
        });

        // Set up level selection listeners
        document.querySelectorAll('.levels-list .list-group-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.levels-list .list-group-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentLevel = parseInt(item.dataset.level);
                loadChallenge();
                updateUI();
            });
        });

        // Set up button listeners
        document.getElementById('run-btn').addEventListener('click', runProgram);
        document.getElementById('check-btn').addEventListener('click', checkSolution);
        document.getElementById('reset-btn').addEventListener('click', resetWorkspace);
        document.getElementById('help-btn').addEventListener('click', showHelp);

        // Initialize first challenge
        loadChallenge();
        updateUI();
        
        // Set up Sortable for drag-and-drop
        setupSortable();
    }

    // --- CHALLENGE FUNCTIONS ---
    function loadChallenge() {
        // Clear existing blocks
        blockPalette.innerHTML = '';
        blocksContainer.innerHTML = '';
        userBlocks = [];
        
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        
        // Update challenge information
        challengeTitle.textContent = `${capitalizeFirstLetter(currentCategory)} Challenge`;
        taskTitle.textContent = challenge.title;
        taskDescription.textContent = challenge.description;
        taskGoal.textContent = challenge.goal;
        challengeImage.src = challenge.image;
        challengeImage.alt = challenge.title;
        currentLevelDisplay.textContent = currentLevel;
        
        // Add blocks to palette
        challenge.blocks.forEach(block => {
            const blockElement = createBlockElement(block);
            blockPalette.appendChild(blockElement);
        });
        
        // Reset feedback and animation areas
        resetFeedback();
        resetAnimationArea();
        
        // Update progress
        updateProgress();
    }
    
    function getCurrentChallenge() {
        if (!challenges[currentCategory] || !challenges[currentCategory][currentLevel]) {
            return null;
        }
        return challenges[currentCategory][currentLevel];
    }
    
    // --- UI FUNCTIONS ---
    function updateUI() {
        // Update category and level displays
        document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
            if (item.dataset.category === currentCategory) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.levels-list .list-group-item').forEach(item => {
            if (parseInt(item.dataset.level) === currentLevel) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function createBlockElement(block) {
        const blockElement = document.createElement('div');
        blockElement.className = `block block-${block.type}`;
        blockElement.dataset.id = block.id;
        blockElement.draggable = true;
        
        const icon = document.createElement('span');
        icon.className = `icon fas fa-${block.icon}`;
        blockElement.appendChild(icon);
        
        const text = document.createTextNode(block.text);
        blockElement.appendChild(text);
        
        // Add click handler for easier mobile use
        blockElement.addEventListener('click', () => {
            // Only allow clicking blocks in the palette, not ones already in the workspace
            if (blockElement.parentElement === blockPalette) {
                addBlockToWorkspace(block);
            }
        });
        
        return blockElement;
    }
    
    function addBlockToWorkspace(block) {
        const blockElement = createBlockElement(block);
        blocksContainer.appendChild(blockElement);
        userBlocks.push(block.id);
        
        // If this is a nested block (like a loop), add a container for nested blocks
        if (block.type === 'loop' || block.type === 'logic' || block.type === 'procedure') {
            const containerElement = document.createElement('div');
            containerElement.className = 'block-container';
            containerElement.dataset.parentId = block.id;
            blocksContainer.appendChild(containerElement);
        }
        
        playSound('click');
        resetFeedback();
    }
    
    function setupSortable() {
        // Make the block palette sortable
        new Sortable(blockPalette, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: false,
            ghostClass: 'block-placeholder'
        });
        
        // Make the workspace sortable
        new Sortable(blocksContainer, {
            group: {
                name: 'shared',
                pull: false
            },
            animation: 150,
            ghostClass: 'block-placeholder',
            onSort: function() {
                // Update userBlocks array based on the current DOM order
                userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(el => el.dataset.id);
                resetFeedback();
            }
        });
    }
    
    // --- EXECUTION FUNCTIONS ---
    function runProgram() {
        resetAnimationArea();
        setFeedback('Running your program...', 'running');
        
        if (userBlocks.length === 0) {
            setFeedback('Add some blocks to your program first!', 'error');
            return;
        }
        
        // Animate blocks being executed
        animateExecution();
    }
    
    function animateExecution() {
        const blocks = blocksContainer.querySelectorAll('.block');
        const animationSteps = [];
        
        // Create animation area content
        animationArea.innerHTML = '';
        const animationTitle = document.createElement('h5');
        animationTitle.textContent = 'Program Output:';
        animationArea.appendChild(animationTitle);
        
        // Run through each block and create animation steps
        blocks.forEach((block, index) => {
            setTimeout(() => {
                // Highlight current block
                blocks.forEach(b => b.classList.remove('block-running'));
                block.classList.add('block-running');
                
                // Add step to animation area
                const step = document.createElement('div');
                step.className = 'animation-step';
                step.innerHTML = `<i class="fas fa-${block.querySelector('.icon').className.split('fa-')[1]}"></i> ${block.textContent.trim()}`;
                animationArea.appendChild(step);
                animationArea.scrollTop = animationArea.scrollHeight;
                
                // Play sound
                playSound('click');
                
                // Last step - show completion
                if (index === blocks.length - 1) {
                    setTimeout(() => {
                        blocks.forEach(b => b.classList.remove('block-running'));
                        setFeedback('Program completed! Now check your solution.', 'success');
                    }, 1000);
                }
            }, index * 1000);
        });
    }
    
    function checkSolution() {
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        
        const solution = challenge.solution;
        const isCorrect = arraysEqual(userBlocks, solution);
        
        if (isCorrect) {
            setFeedback('🎉 Perfect! Your solution is correct!', 'success');
            playSound('success');
            
            // Mark challenge as completed
            if (!completedChallenges[currentCategory].includes(currentLevel)) {
                completedChallenges[currentCategory].push(currentLevel);
                updateProgress();
            }
            
            // Show next level button if available
            if (challenges[currentCategory][currentLevel + 1]) {
                const nextButton = document.createElement('button');
                nextButton.className = 'btn btn-primary mt-3';
                nextButton.innerHTML = '<i class="fas fa-forward"></i> Next Level';
                nextButton.addEventListener('click', () => {
                    currentLevel++;
                    loadChallenge();
                    updateUI();
                });
                feedbackArea.appendChild(nextButton);
            }
        } else {
            setFeedback('Not quite right. Try again!', 'error');
            playSound('error');
        }
    }
    
    // --- HELPER FUNCTIONS ---
    function resetWorkspace() {
        blocksContainer.innerHTML = '';
        userBlocks = [];
        resetFeedback();
        resetAnimationArea();
        playSound('click');
    }
    
    function resetFeedback() {
        feedbackArea.className = 'feedback mt-3 p-3 rounded';
        feedbackArea.innerHTML = '<p>Drag blocks from the left panel and drop them here to build your program!</p>';
    }
    
    function setFeedback(message, type) {
        feedbackArea.className = `feedback mt-3 p-3 rounded feedback-${type}`;
        feedbackArea.innerHTML = `<p>${message}</p>`;
    }
    
    function resetAnimationArea() {
        animationArea.innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-film fa-3x mb-2"></i>
                <p>Your program's output will be shown here when you run it.</p>
            </div>
        `;
    }
    
    function showHelp() {
        // Simple help dialog - could be improved with a proper modal
        alert(`Here's how to use the Block Coding tool:

1. Select blocks from the left panel
2. Drag them to your workspace or click to add them
3. Arrange them in the correct order
4. Click "Run Program" to see what happens
5. Click "Check Solution" to verify your answer
6. Use "Reset" to start over

Have fun coding!`);
    }
    
    function updateProgress() {
        const total = Object.keys(challenges[currentCategory]).length;
        const completed = completedChallenges[currentCategory].length;
        const percentage = Math.floor((completed / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completed} / ${total} completed`;
    }
    
    // --- UTILITY FUNCTIONS ---
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    
    function playSound(type) {
        // Use the globally available playSound function from sounds.js
        if (window.playSound) {
            window.playSound(type);
        } else {
            console.log(`Would play sound: ${type}`);
        }
        
        // Also use Grid Explorer sounds if available
        if (SoundEffects) {
            if (type === 'success') {
                SoundEffects.playSuccessSound();
            } else if (type === 'error') {
                SoundEffects.playErrorSound();
            } else if (type === 'click') {
                SoundEffects.playClickSound();
            }
        }
    }
    
    // Initialize everything
    init();
});
