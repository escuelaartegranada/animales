export const getAudioContext = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return null;
  return new AudioContext();
};

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = getAudioContext();
  }
};

export const playSuccessSound = () => {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const playNote = (freq: number, timeOffset: number) => {
    const osc = audioCtx!.createOscillator();
    const gain = audioCtx!.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + timeOffset);
    
    gain.gain.setValueAtTime(0, now + timeOffset);
    gain.gain.linearRampToValueAtTime(0.3, now + timeOffset + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx!.destination);
    osc.start(now + timeOffset);
    osc.stop(now + timeOffset + 0.3);
  };

  playNote(440, 0);      // A4
  playNote(554.37, 0.1); // C#5
  playNote(659.25, 0.2); // E5
  playNote(880, 0.3);    // A5
};

export const playErrorSound = () => {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const playNote = (freq: number, timeOffset: number) => {
    const osc = audioCtx!.createOscillator();
    const gain = audioCtx!.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + timeOffset);
    
    gain.gain.setValueAtTime(0, now + timeOffset);
    gain.gain.linearRampToValueAtTime(0.3, now + timeOffset + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx!.destination);
    osc.start(now + timeOffset);
    osc.stop(now + timeOffset + 0.4);
  };

  playNote(300, 0);     // Low note
  playNote(250, 0.2);   // Lower note
};

export const playPopSound = () => {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.1);
};
