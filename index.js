document.addEventListener('DOMContentLoaded', () => {
    // Add hover and click effects to puzzle cards
    const puzzleCards = document.querySelectorAll('.puzzle-card:not(.coming-soon)');
    puzzleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            SoundEffects.playClickSound();
        });

        card.addEventListener('click', () => {
            FeedbackSystem.showSuccess('Loading puzzle... 🎮');
        });
    });

    // Add feedback for coming soon cards
    const comingSoonCards = document.querySelectorAll('.puzzle-card.coming-soon');
    comingSoonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            FeedbackSystem.showError('Coming soon! Stay tuned! 🎯');
        });
    });
});
