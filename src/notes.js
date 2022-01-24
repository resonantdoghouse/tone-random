const generateNotesArray = (numOctaves) => {
  const notes = [];
  for (let i = 0; i < numOctaves; i++) {
    notes.push(`c${i}`, `eb${i}`, `f${i}`, `g${i}`, `bb${i}`);
  }
  return notes;
};

const notes = generateNotesArray(8);

export default notes;
