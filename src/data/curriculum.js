// BlockBusters Phase 1, Layer A curriculum
// 15 LETTER_TAP + 15 PICTURE_MATCH tasks
//
// LETTER_TAP: hear a sound, tap the matching letter block
// PICTURE_MATCH: see an emoji picture, tap the matching word
//
// Distractors for LETTER_TAP are chosen to be visually dissimilar
// (avoid b/d, p/q confusion pairs per spec)

export const curriculum = [
  // ── LETTER_TAP ────────────────────────────────────────────────────────────
  // letterSound uses phonetic spellings so TTS speaks the sound, not the name.
  // e.g. C → "kuh" (not "see"), M → "mmm" (not "em")
  {
    id: 'lt_A',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'ah',       // short a, as in apple
    correctAnswer: 'A',
    options: ['A', 'H', 'V'],
  },
  {
    id: 'lt_B',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'buh',      // b sound
    correctAnswer: 'B',
    options: ['B', 'K', 'Z'],
  },
  {
    id: 'lt_C',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'kuh',      // hard c/k sound (not "see")
    correctAnswer: 'C',
    options: ['C', 'X', 'L'],
  },
  {
    id: 'lt_D',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'duh',      // d sound
    correctAnswer: 'D',
    options: ['D', 'Y', 'W'],
  },
  {
    id: 'lt_F',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'fff',      // f sound — TTS will sustain the fricative
    correctAnswer: 'F',
    options: ['F', 'J', 'Q'],
  },
  {
    id: 'lt_G',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'guh',      // hard g sound
    correctAnswer: 'G',
    options: ['G', 'U', 'Z'],
  },
  {
    id: 'lt_H',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'huh',      // h sound (breathy)
    correctAnswer: 'H',
    options: ['H', 'K', 'V'],
  },
  {
    id: 'lt_I',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'ih',       // short i, as in insect
    correctAnswer: 'I',
    options: ['I', 'L', 'Y'],
  },
  {
    id: 'lt_M',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'mmm',      // m sound — sustained nasal
    correctAnswer: 'M',
    options: ['M', 'W', 'X'],
  },
  {
    id: 'lt_N',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'nnn',      // n sound — sustained nasal
    correctAnswer: 'N',
    options: ['N', 'Z', 'U'],
  },
  {
    id: 'lt_O',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'oh',       // short o, as in octopus
    correctAnswer: 'O',
    options: ['O', 'Q', 'C'],
  },
  {
    id: 'lt_P',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'puh',      // p sound
    correctAnswer: 'P',
    options: ['P', 'F', 'J'],
  },
  {
    id: 'lt_R',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'rrr',      // r sound — sustained
    correctAnswer: 'R',
    options: ['R', 'K', 'B'],
  },
  {
    id: 'lt_S',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'sss',      // s sound — sustained sibilant
    correctAnswer: 'S',
    options: ['S', 'C', 'G'],
  },
  {
    id: 'lt_T',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'tuh',      // t sound
    correctAnswer: 'T',
    options: ['T', 'Y', 'I'],
  },

  // ── PICTURE_MATCH ──────────────────────────────────────────────────────────
  {
    id: 'pm_cat',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🐱',
    label: 'cat',
    correctAnswer: 'cat',
    options: ['cat', 'dog', 'sun'],
  },
  {
    id: 'pm_dog',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🐶',
    label: 'dog',
    correctAnswer: 'dog',
    options: ['dog', 'cat', 'hat'],
  },
  {
    id: 'pm_sun',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '☀️',
    label: 'sun',
    correctAnswer: 'sun',
    options: ['sun', 'bus', 'cup'],
  },
  {
    id: 'pm_hat',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🎩',
    label: 'hat',
    correctAnswer: 'hat',
    options: ['hat', 'bat', 'man'],
  },
  {
    id: 'pm_bat',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🦇',
    label: 'bat',
    correctAnswer: 'bat',
    options: ['bat', 'cat', 'map'],
  },
  {
    id: 'pm_man',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '👨',
    label: 'man',
    correctAnswer: 'man',
    options: ['man', 'ant', 'hen'],
  },
  {
    id: 'pm_ant',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🐜',
    label: 'ant',
    correctAnswer: 'ant',
    options: ['ant', 'hat', 'pig'],
  },
  {
    id: 'pm_bus',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🚌',
    label: 'bus',
    correctAnswer: 'bus',
    options: ['bus', 'cup', 'bed'],
  },
  {
    id: 'pm_cup',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '☕',
    label: 'cup',
    correctAnswer: 'cup',
    options: ['cup', 'bus', 'box'],
  },
  {
    id: 'pm_pig',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🐷',
    label: 'pig',
    correctAnswer: 'pig',
    options: ['pig', 'hen', 'bin'],
  },
  {
    id: 'pm_hen',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🐔',
    label: 'hen',
    correctAnswer: 'hen',
    options: ['hen', 'man', 'sun'],
  },
  {
    id: 'pm_map',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🗺️',
    label: 'map',
    correctAnswer: 'map',
    options: ['map', 'bat', 'ant'],
  },
  {
    id: 'pm_bed',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🛏️',
    label: 'bed',
    correctAnswer: 'bed',
    options: ['bed', 'box', 'bin'],
  },
  {
    id: 'pm_box',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '📦',
    label: 'box',
    correctAnswer: 'box',
    options: ['box', 'bed', 'cup'],
  },
  {
    id: 'pm_bin',
    type: 'PICTURE_MATCH',
    phase: 1,
    layer: 'A',
    emoji: '🗑️',
    label: 'bin',
    correctAnswer: 'bin',
    options: ['bin', 'bed', 'pig'],
  },
];
