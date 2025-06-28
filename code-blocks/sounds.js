// Sound management for Block Coding
function playSound(soundType) {
    const soundMap = {
        'click': '../sounds/click.mp3',
        'success': '../sounds/success.mp3',
        'error': '../sounds/error.mp3'
    };
    
    const soundFile = soundMap[soundType];
    if (!soundFile) return;
    
    const audio = new Audio(soundFile);
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}

// Export the function
window.playSound = playSound;
