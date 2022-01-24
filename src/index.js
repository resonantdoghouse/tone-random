// import * as Tone from 'tone';
import './style.css';
import pianoSampler from './pianoSampler';
import p5 from 'p5';
import Point from './Point';
import Text from './Text';
import Line from './Line';
import notes from './notes';
import state from './state';

// object points, new Point
const points = [];
// array for random colors
const colors = [
  'skyblue',
  'magenta',
  'darkorchid',
  'blue',
  'coral',
  'forestgreen',
];

const renderPointsHighlight = (point, note, s) => {
  if (state.isPlaying && point.note === note) {
    state.currentNote = note;
    state.currentPoint = point;
    point.highlight();
  }
  if (state.prevPoint !== null) state.prevPoint.removeHighlight();
  point.render(s);
};

const playNote = (note, s) => {
  state.isPlaying && pianoSampler.triggerAttackRelease(note, 0.2);
  s.push();
  s.textSize(12);
  s.text(`Note: ${note}`, 24, 24);
  s.pop();

  if (state.prevPoint === null) {
    state.prevPoint = state.currentPoint;
  }
  if ((state.prevPoint !== null && state.prevPoint) !== state.currentPoint) {
    s.push();
    s.strokeWeight(3);
    s.stroke('rgba(10,60,200,0.2)');
    s.line(
      state.prevPoint.x,
      state.prevPoint.y,
      state.currentPoint.x,
      state.currentPoint.y
    );
    s.pop();
    state.prevPoint = state.currentPoint;
  }
};

const sketch = (s) => {
  s.setup = () => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    s.createCanvas(canvasWidth, canvasHeight);
    s.frameRate(state.bpm);

    let offsetX = 32;
    let offsetY = canvasHeight - 32;

    notes.forEach((note) => {
      let r = /\d+/;
      let noteOctave = note.match(r)[0];
      let pointX = noteOctave * 16 + offsetX;
      let pointY = noteOctave * 32 + (offsetY - canvasHeight / 2);
      let point = new Point(
        pointX,
        pointY,
        s.random(colors),
        note,
        s,
        canvasWidth,
        canvasHeight,
        state
      );
      offsetX += 14;
      offsetY -= 8;
      points.push(point);
    });
  };

  s.mousePressed = () => {
    state.isPlaying = !state.isPlaying;
  };

  /*
   * draw, animation loop
   */
  s.draw = () => {
    s.background(`rgba(255,255,255,1)`);

    if (pianoSampler.loaded) {
      let note = s.random(notes);

      points.forEach((point) => {
        renderPointsHighlight(point, note, s);
      });

      if (state.isPlaying) {
        if (state.framesPlayed % 5 === 0 || state.framesPlayed % 3 === 0) {
          playNote(note, s);
        } else if (state.framesPlayed % 3 === 0) {
          playNote(note, s);
        }
      } else {
        s.push();
        s.textSize(24);
        s.text('play', s.width * 0.5, s.height * 0.5);
        s.pop();
      }
    }
    state.framesPlayed++;
  };
};

const sketchInstance = new p5(sketch);
