import { bpmToFps } from './utils';
const state = {
  currentNote: null,
  currentPoint: null,
  prevNote: null,
  prevPoint: null,
  isPlaying: false,
  bpm: bpmToFps(400),
  framesPlayed: 0,
};

export default state;
