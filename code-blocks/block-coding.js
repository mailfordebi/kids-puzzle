// Block Coding for Kids - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // --- DATA DEFINITIONS ---
    
    // Challenges organized by category and level
    const challenges = {
        sequencing: {
            // Level 1 - Morning Routine (Very basic daily sequence for ages 5-6)
            1: {
                title: "Morning Routine",
                description: "Put your morning activities in the right order to start the day right.",
                goal: "Create a proper morning routine sequence.",
                image: "./images/morning-routine.svg",
                blocks: [
                    { id: 'wake-up', type: 'motion', text: 'Wake Up', icon: 'bell' },
                    { id: 'brush-teeth', type: 'motion', text: 'Brush Teeth', icon: 'tooth' },
                    { id: 'get-dressed', type: 'motion', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'motion', text: 'Eat Breakfast', icon: 'egg' },
                    { id: 'pack-bag', type: 'motion', text: 'Pack Bag', icon: 'backpack' },
                    { id: 'go-school', type: 'motion', text: 'Go to School', icon: 'school' }
                ],
                solution: ['wake-up', 'brush-teeth', 'get-dressed', 'eat-breakfast', 'pack-bag', 'go-school']
            },
            // Level 2 - Make a Sandwich (Simple food preparation)
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
            // Level 3 - Build a Snowman (Simple outdoor activity)
            3: {
                title: "Build a Snowman",
                description: "Build a friendly snowman by ordering the steps properly.",
                goal: "Create a perfect snowman with the correct sequence.",
                image: "./images/snowman.svg",
                blocks: [
                    { id: 'roll-large-ball', type: 'motion', text: 'Roll Large Ball', icon: 'circle' },
                    { id: 'roll-medium-ball', type: 'motion', text: 'Roll Medium Ball', icon: 'dot-circle' },
                    { id: 'roll-small-ball', type: 'motion', text: 'Roll Small Ball', icon: 'bullseye' },
                    { id: 'add-eyes', type: 'motion', text: 'Add Eyes', icon: 'eye' },
                    { id: 'add-nose', type: 'motion', text: 'Add Carrot Nose', icon: 'carrot' },
                    { id: 'add-hat', type: 'motion', text: 'Add Hat', icon: 'hat-wizard' }
                ],
                solution: ['roll-large-ball', 'roll-medium-ball', 'roll-small-ball', 'add-eyes', 'add-nose', 'add-hat']
            },
            // Level 4 - Plant a Flower (Simple nature activity)
            4: {
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
            },
            // Level 5 - Help the Robot Find Treasure (Simple maze navigation)
            5: {
                title: "Help the Robot Find Treasure",
                description: "Guide the robot through the maze to find the treasure by putting the right steps in order.",
                goal: "Get the robot to the treasure chest using the right sequence of steps.",
                image: "./images/robot-maze-improved.svg",
                blocks: [
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'pick-up']
            },
            // Level 6 - Pizza Time (More complex food preparation)
            6: {
                title: "Pizza Time",
                description: "Help make a delicious pizza by putting the steps in the right order.",
                goal: "Create a perfect pizza following the correct sequence.",
                image: "./images/pizza-time.svg",
                blocks: [
                    { id: 'prepare-dough', type: 'motion', text: 'Prepare Dough', icon: 'pizza-slice' },
                    { id: 'add-sauce', type: 'motion', text: 'Add Sauce', icon: 'mortar-pestle' },
                    { id: 'add-cheese', type: 'motion', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-toppings', type: 'motion', text: 'Add Toppings', icon: 'pepper-hot' },
                    { id: 'bake-pizza', type: 'motion', text: 'Bake Pizza', icon: 'temperature-high' },
                    { id: 'serve-pizza', type: 'motion', text: 'Serve Pizza', icon: 'utensils' }
                ],
                solution: ['prepare-dough', 'add-sauce', 'add-cheese', 'add-toppings', 'bake-pizza', 'serve-pizza']
            },
            // Level 7 - Car Wash Sequence (Practical sequence)
            7: {
                title: "Car Wash Sequence",
                description: "Run a successful car wash by putting the steps in the correct order.",
                goal: "Clean a car following the proper sequence of steps.",
                image: "./images/car-wash.svg",
                blocks: [
                    { id: 'rinse-car', type: 'motion', text: 'Rinse Car', icon: 'shower' },
                    { id: 'apply-soap', type: 'motion', text: 'Apply Soap', icon: 'soap' },
                    { id: 'scrub-car', type: 'motion', text: 'Scrub Car', icon: 'brush' },
                    { id: 'rinse-again', type: 'motion', text: 'Rinse Again', icon: 'tint' },
                    { id: 'dry-car', type: 'motion', text: 'Dry Car', icon: 'wind' },
                    { id: 'polish-car', type: 'motion', text: 'Polish Car', icon: 'sparkles' }
                ],
                solution: ['rinse-car', 'apply-soap', 'scrub-car', 'rinse-again', 'dry-car', 'polish-car']
            },
            // Level 8 - Library Book Return (Common experience with more steps)
            8: {
                title: "Library Book Return",
                description: "Return a library book by following the correct sequence of steps.",
                goal: "Successfully return a book to the library following proper procedures.",
                image: "./images/library-return.svg",
                blocks: [
                    { id: 'find-book', type: 'motion', text: 'Find Book', icon: 'search' },
                    { id: 'check-due-date', type: 'motion', text: 'Check Due Date', icon: 'calendar' },
                    { id: 'go-to-library', type: 'motion', text: 'Go to Library', icon: 'building' },
                    { id: 'scan-card', type: 'motion', text: 'Scan Library Card', icon: 'id-card' },
                    { id: 'return-book', type: 'motion', text: 'Return Book', icon: 'book' },
                    { id: 'get-receipt', type: 'motion', text: 'Get Receipt', icon: 'receipt' }
                ],
                solution: ['find-book', 'check-due-date', 'go-to-library', 'scan-card', 'return-book', 'get-receipt']
            },
            // Level 9 - Science Experiment (More detailed process)
            9: {
                title: "Science Experiment",
                description: "Conduct a baking soda and vinegar experiment by ordering the steps correctly.",
                goal: "Create a chemical reaction with the right sequence of steps.",
                image: "./images/science-experiment.svg",
                blocks: [
                    { id: 'get-supplies', type: 'motion', text: 'Get Supplies', icon: 'flask' },
                    { id: 'add-baking-soda', type: 'motion', text: 'Add Baking Soda', icon: 'vial' },
                    { id: 'add-food-coloring', type: 'motion', text: 'Add Food Coloring', icon: 'eye-dropper' },
                    { id: 'add-vinegar', type: 'motion', text: 'Add Vinegar', icon: 'fill' },
                    { id: 'observe-reaction', type: 'motion', text: 'Observe Reaction', icon: 'glasses' },
                    { id: 'clean-up', type: 'motion', text: 'Clean Up', icon: 'broom' }
                ],
                solution: ['get-supplies', 'add-baking-soda', 'add-food-coloring', 'add-vinegar', 'observe-reaction', 'clean-up']
            },
            // Level 10 - Museum Adventure (More planning involved)
            10: {
                title: "Museum Adventure",
                description: "Plan a museum visit by organizing the activities in the correct order.",
                goal: "Have a successful museum trip with properly sequenced activities.",
                image: "./images/museum-adventure.svg",
                blocks: [
                    { id: 'buy-tickets', type: 'motion', text: 'Buy Tickets', icon: 'ticket-alt' },
                    { id: 'check-map', type: 'motion', text: 'Check Map', icon: 'map' },
                    { id: 'visit-exhibits', type: 'motion', text: 'Visit Exhibits', icon: 'landmark' },
                    { id: 'take-photos', type: 'motion', text: 'Take Photos', icon: 'camera' },
                    { id: 'eat-lunch', type: 'motion', text: 'Eat Lunch', icon: 'utensils' },
                    { id: 'visit-gift-shop', type: 'motion', text: 'Visit Gift Shop', icon: 'shopping-bag' }
                ],
                solution: ['buy-tickets', 'check-map', 'visit-exhibits', 'take-photos', 'eat-lunch', 'visit-gift-shop']
            },
            // Level 11 - Birthday Party Planning (Complex planning)
            11: {
                title: "Birthday Party Planning",
                description: "Plan a birthday party by organizing the tasks in the correct order.",
                goal: "Create a successful birthday party with properly sequenced preparation steps.",
                image: "./images/birthday-party.svg",
                blocks: [
                    { id: 'create-guest-list', type: 'motion', text: 'Create Guest List', icon: 'users' },
                    { id: 'send-invitations', type: 'motion', text: 'Send Invitations', icon: 'envelope' },
                    { id: 'buy-decorations', type: 'motion', text: 'Buy Decorations', icon: 'birthday-cake' },
                    { id: 'decorate-room', type: 'motion', text: 'Decorate Room', icon: 'paint-roller' },
                    { id: 'prepare-food', type: 'motion', text: 'Prepare Food', icon: 'pizza-slice' },
                    { id: 'welcome-guests', type: 'motion', text: 'Welcome Guests', icon: 'door-open' }
                ],
                solution: ['create-guest-list', 'send-invitations', 'buy-decorations', 'decorate-room', 'prepare-food', 'welcome-guests']
            },
            // Level 12 - Robot Treasure Hunt (Complex navigation)
            12: {
                title: "Robot Treasure Hunt",
                description: "Help the advanced robot find hidden treasure through more complex movements.",
                goal: "Guide the robot through a more challenging maze to reach the treasure.",
                image: "./images/robot-treasure-hunt.svg",
                blocks: [
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'move-twice', type: 'motion', text: 'Move Twice', icon: 'forward' },
                    { id: 'check-path', type: 'motion', text: 'Check Path', icon: 'search' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-forward', 'check-path', 'turn-right', 'move-twice', 'turn-left', 'pick-up']
            },
            // Level 13 - Camping Adventure (Outdoor sequence with safety)
            13: {
                title: "Camping Adventure",
                description: "Set up a campsite by ordering the necessary steps correctly.",
                goal: "Create a proper campsite setup following the correct sequence of activities.",
                image: "./images/camping-adventure.svg",
                blocks: [
                    { id: 'find-spot', type: 'motion', text: 'Find Camping Spot', icon: 'map-marker-alt' },
                    { id: 'clear-area', type: 'motion', text: 'Clear Area', icon: 'broom' },
                    { id: 'set-up-tent', type: 'motion', text: 'Set Up Tent', icon: 'campground' },
                    { id: 'collect-wood', type: 'motion', text: 'Collect Firewood', icon: 'tree' },
                    { id: 'build-fire', type: 'motion', text: 'Build Fire', icon: 'fire' },
                    { id: 'cook-dinner', type: 'motion', text: 'Cook Dinner', icon: 'utensils' }
                ],
                solution: ['find-spot', 'clear-area', 'set-up-tent', 'collect-wood', 'build-fire', 'cook-dinner']
            },
            // Level 14 - Space Launch (Advanced technical sequence)
            14: {
                title: "Space Launch",
                description: "Prepare and launch a rocket by putting the steps in the correct order.",
                goal: "Successfully launch a rocket into space with the right sequence of operations.",
                image: "./images/space-launch.svg",
                blocks: [
                    { id: 'systems-check', type: 'motion', text: 'Systems Check', icon: 'clipboard-check' },
                    { id: 'fuel-rocket', type: 'motion', text: 'Fuel Rocket', icon: 'gas-pump' },
                    { id: 'crew-boarding', type: 'motion', text: 'Crew Boarding', icon: 'users' },
                    { id: 'countdown', type: 'motion', text: 'Countdown', icon: 'clock' },
                    { id: 'ignition', type: 'motion', text: 'Ignition', icon: 'fire' },
                    { id: 'liftoff', type: 'motion', text: 'Liftoff', icon: 'rocket' }
                ],
                solution: ['systems-check', 'fuel-rocket', 'crew-boarding', 'countdown', 'ignition', 'liftoff']
            },
            // Level 15 - Weather Report (Most abstract sequence)
            15: {
                title: "Weather Report",
                description: "Create a weather report by organizing the meteorological steps correctly.",
                goal: "Produce an accurate weather forecast with properly sequenced steps.",
                image: "./images/weather-report.svg",
                blocks: [
                    { id: 'collect-data', type: 'motion', text: 'Collect Data', icon: 'database' },
                    { id: 'analyze-patterns', type: 'motion', text: 'Analyze Patterns', icon: 'chart-line' },
                    { id: 'check-satellites', type: 'motion', text: 'Check Satellites', icon: 'satellite' },
                    { id: 'run-models', type: 'motion', text: 'Run Computer Models', icon: 'laptop-code' },
                    { id: 'create-forecast', type: 'motion', text: 'Create Forecast', icon: 'cloud-sun' },
                    { id: 'broadcast-report', type: 'motion', text: 'Broadcast Report', icon: 'tv' }
                ],
                solution: ['collect-data', 'check-satellites', 'analyze-patterns', 'run-models', 'create-forecast', 'broadcast-report']
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
    // currentLevelDisplay removed as it's no longer in the header
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

        // Set up image modal functionality
        document.getElementById('challenge-image').addEventListener('click', function() {
            const modalImage = document.getElementById('modal-challenge-image');
            modalImage.src = this.src;
            document.getElementById('imageModalLabel').textContent = taskTitle.textContent;
        });

        // Initialize first challenge
        loadChallenge();
        updateUI();
        
        // Set up drag-and-drop functionality
        setupDragAndDrop();
    }

    // --- CHALLENGE FUNCTIONS ---
    function loadChallenge() {
        // Clear existing blocks
        blockPalette.innerHTML = '';
        blocksContainer.innerHTML = '';
        userBlocks = [];
        
        // Clear any existing highlighting
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        
        // Update challenge information
        challengeTitle.textContent = `${capitalizeFirstLetter(currentCategory)} Challenge`;
        taskTitle.textContent = challenge.title;
        taskDescription.textContent = challenge.description;
        taskGoal.textContent = challenge.goal;
        challengeImage.src = challenge.image;
        challengeImage.alt = challenge.title;
        // Level number is now shown only in the sidebar
        
        // Create a shuffled copy of blocks
        let shuffledBlocks = [...challenge.blocks];
        shuffleArray(shuffledBlocks);
        
        // Add blocks to palette in shuffled order
        shuffledBlocks.forEach(block => {
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
    
    function setupDragAndDrop() {
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
        
        // Set up block selection and removal
        const removeBlockBtn = document.getElementById('remove-block-btn');
        let selectedBlock = null;
        
        // Initially disable the remove button
        removeBlockBtn.disabled = true;
        
        // Function to handle block selection
        blocksContainer.addEventListener('click', function(e) {
            const blockEl = e.target.closest('.block');
            if (!blockEl) return;
            
            // Clear previous selection
            document.querySelectorAll('.block-selected').forEach(el => {
                el.classList.remove('block-selected');
            });
            
            // Select new block
            blockEl.classList.add('block-selected');
            selectedBlock = blockEl;
            
            // Enable remove button
            removeBlockBtn.disabled = false;
            removeBlockBtn.classList.add('active');
            
            // Play sound
            playSound('click');
        });
        
        // Remove selected block when button is clicked
        removeBlockBtn.addEventListener('click', function() {
            if (selectedBlock) {
                // Get block name for feedback
                const blockName = selectedBlock.textContent.trim();
                
                // Remove the block
                selectedBlock.remove();
                selectedBlock = null;
                
                // Update user blocks array
                userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(el => el.dataset.id);
                
                // Play sound and show feedback
                playSound('error');
                setFeedback(`Removed "${blockName}" block`, 'running');
                
                // Disable remove button
                removeBlockBtn.disabled = true;
                removeBlockBtn.classList.remove('active');
            }
        });
        
        // Clear selection when clicking outside blocks
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.block') && !e.target.closest('#remove-block-btn')) {
                document.querySelectorAll('.block-selected').forEach(el => {
                    el.classList.remove('block-selected');
                });
                selectedBlock = null;
                removeBlockBtn.disabled = true;
                removeBlockBtn.classList.remove('active');
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
        
        // First, clear any existing highlighting
        document.querySelectorAll('#blocks-container .block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
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
            // Provide more detailed feedback with hints
            const blockElements = document.querySelectorAll('#blocks-container .block');
            let misplacedBlocks = [];
            
            blockElements.forEach((blockEl, index) => {
                const blockId = blockEl.dataset.id;
                if (index < solution.length) {
                    if (blockId === solution[index]) {
                        // Block is in the correct position
                        blockEl.classList.add('block-correct');
                    } else {
                        // Block is in the wrong position
                        blockEl.classList.add('block-incorrect');
                        
                        // Get the text content for the hint
                        const blockText = blockEl.textContent.trim();
                        misplacedBlocks.push(blockText);
                    }
                } else {
                    // Extra blocks that shouldn't be there
                    blockEl.classList.add('block-incorrect');
                }
            });
            
            let feedbackMessage = 'Not quite right. Try again!';
            if (misplacedBlocks.length > 0) {
                // Count correct and incorrect blocks
                const correctCount = document.querySelectorAll('.block-correct').length;
                const incorrectCount = document.querySelectorAll('.block-incorrect').length;
                
                feedbackMessage += `<br><span class="hint-text">
                    <i class="fas fa-lightbulb"></i> Hint: You have ${correctCount} block${correctCount !== 1 ? 's' : ''} in the correct position 
                    (green outline) and ${incorrectCount} block${incorrectCount !== 1 ? 's' : ''} that need attention (red outline).
                </span>`;
            }
            
            setFeedback(feedbackMessage, 'error');
            playSound('error');
        }
    }
    
    // --- HELPER FUNCTIONS ---
    function resetWorkspace() {
        // Clear all blocks in the workspace
        blocksContainer.innerHTML = '';
        userBlocks = [];
        
        // Remove any highlighting from blocks (in case there are any blocks left)
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
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
        // Create and show modal for better help display
        const helpModal = document.createElement('div');
        helpModal.className = 'custom-modal';
        helpModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h3>How to Use Brainy Blocks</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>Basic Steps:</h4>
                    <ol>
                        <li>Select blocks from the left panel</li>
                        <li>Drag them to your workspace or click to add them</li>
                        <li>Arrange them in the correct order</li>
                        <li>Click "Run Program" to see what happens</li>
                        <li>Click "Check Solution" to verify your answer</li>
                        <li>Use "Reset" to start over</li>
                    </ol>
                    
                    <h4>Working with Blocks:</h4>
                    <ul>
                        <li>Blocks can be dragged around to change their order</li>
                        <li>Select a block and click the remove button to delete it</li>
                        <li>When you check your solution, blocks will be highlighted:</li>
                        <ul>
                            <li><span style="color: #28a745; font-weight: bold;">Green pulsing</span> indicates blocks in the correct position</li>
                            <li><span style="color: #dc3545; font-weight: bold;">Red pulsing</span> indicates blocks that need to be moved</li>
                        </ul>
                    </ul>
                    
                    <h4>Level-specific Help:</h4>
                    <div id="level-specific-help">
                        ${getLevelSpecificHelp()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal-btn">Got it!</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(helpModal);
        
        // Show the modal
        setTimeout(() => {
            helpModal.classList.add('show');
        }, 10);
        
        // Handle close button
        const closeBtn = helpModal.querySelector('.close-btn');
        const closeModalBtn = helpModal.querySelector('.close-modal-btn');
        
        function closeModal() {
            helpModal.classList.remove('show');
            setTimeout(() => {
                helpModal.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close when clicking outside the modal content
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                closeModal();
            }
        });
    }
    
    // Function to get level-specific help
    function getLevelSpecificHelp() {
        const challenge = getCurrentChallenge();
        if (!challenge) return '';
        
        // Level-specific help text
        const helpTexts = {
            2: `
                <h5>Make a Sandwich Help:</h5>
                <p>Think about how you would make a sandwich in real life:</p>
                <ol>
                    <li>Start with a piece of bread as the base</li>
                    <li>Add ingredients in a logical order (cheese, lettuce, tomato)</li>
                    <li>Add the top bread to complete the sandwich</li>
                    <li>Finally, cut the sandwich in half</li>
                </ol>
            `,
            5: `
                <h5>Help the Robot Find Treasure:</h5>
                <p>Look closely at the maze image and follow these steps:</p>
                <ol>
                    <li>The robot starts at the beginning of the maze</li>
                    <li>First move forward to enter the maze</li>
                    <li>Turn right at the first intersection</li>
                    <li>Move forward along the path</li>
                    <li>Turn left when you reach the wall</li>
                    <li>Move forward to reach the treasure</li>
                    <li>Pick up the treasure once you reach it</li>
                </ol>
            `
        };
        
        return helpTexts[currentLevel] || '<p>Arrange the blocks in the correct logical order to complete this challenge.</p>';
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
    
    // Fisher-Yates shuffle algorithm to randomize blocks
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
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
