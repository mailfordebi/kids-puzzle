// Sound Generator for the puzzle game
class SoundGenerator {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume audio context after user interaction
    async resume() {
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    // Generate a success sound (wow excellent effect)
    async generateSuccessSound() {
        await this.resume();
        // First chord (major chord)
        const freqs1 = [523.25, 659.25, 783.99];
        freqs1.forEach(freq => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            
            gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.5);
        });

        // Rising "wow" effect
        setTimeout(() => {
            const sweep = this.audioContext.createOscillator();
            const sweepGain = this.audioContext.createGain();
            
            sweep.connect(sweepGain);
            sweepGain.connect(this.audioContext.destination);
            
            sweep.type = 'sine';
            sweep.frequency.setValueAtTime(400, this.audioContext.currentTime);
            sweep.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
            
            sweepGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            sweepGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            sweep.start();
            sweep.stop(this.audioContext.currentTime + 0.3);
        }, 200);
    }

    // Generate an error sound (gentle "try again" effect)
    async generateErrorSound() {
        await this.resume();
        // First beep
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        
        osc1.connect(gain1);
        gain1.connect(this.audioContext.destination);
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(400, this.audioContext.currentTime);
        
        gain1.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        osc1.start();
        osc1.stop(this.audioContext.currentTime + 0.2);

        // Second lower beep after a short delay
        setTimeout(() => {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);
            
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(300, this.audioContext.currentTime);
            
            gain2.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            osc2.start();
            osc2.stop(this.audioContext.currentTime + 0.2);
        }, 250);
    }

    // Generate a click sound (soft pop)
    async generateClickSound() {
        await this.resume();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
}
