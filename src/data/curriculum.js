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
  // Letters are lowercase (more common in early reading).
  // letterSound uses phonetic spellings tuned for en-GB TTS — the actual
  // sound the letter makes, not its name.
  {
    id: 'lt_A',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'ah',       // short a — apple
    correctAnswer: 'a',
    options: ['a', 'h', 'v'],
  },
  {
    id: 'lt_B',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'buh',      // b
    correctAnswer: 'b',
    options: ['b', 'k', 'z'],
  },
  {
    id: 'lt_C',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'kuh',      // hard c
    correctAnswer: 'c',
    options: ['c', 'x', 'l'],
  },
  {
    id: 'lt_D',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'duh',      // d
    correctAnswer: 'd',
    options: ['d', 'y', 'w'],
  },
  {
    id: 'lt_F',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'fuh',      // f
    correctAnswer: 'f',
    options: ['f', 'j', 'q'],
  },
  {
    id: 'lt_G',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'gah',      // hard g — "gah" is clearer than "guh" for TTS
    correctAnswer: 'g',
    options: ['g', 'u', 'z'],
  },
  {
    id: 'lt_H',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'hah',      // h — breathy, like a sigh
    correctAnswer: 'h',
    options: ['h', 'k', 'v'],
  },
  {
    id: 'lt_I',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'ih',       // short i — insect
    correctAnswer: 'i',
    options: ['i', 'l', 'y'],
  },
  {
    id: 'lt_M',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'mmm',      // m — lips-together hum
    correctAnswer: 'm',
    options: ['m', 'w', 'x'],
  },
  {
    id: 'lt_N',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'nuh',      // n — clearer than "nnn" for TTS
    correctAnswer: 'n',
    options: ['n', 'z', 'u'],
  },
  {
    id: 'lt_O',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'aw',       // short o — "aw" avoids TTS reading it as the letter O
    correctAnswer: 'o',
    options: ['o', 'q', 'c'],
  },
  {
    id: 'lt_P',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'pah',      // p — "pah" reads as one syllable, not spelled out
    correctAnswer: 'p',
    options: ['p', 'f', 'j'],
  },
  {
    id: 'lt_R',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'ruh',      // r — clearer than "rrr" for TTS
    correctAnswer: 'r',
    options: ['r', 'k', 'b'],
  },
  {
    id: 'lt_S',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'sah',      // s — "sah" avoids TTS spelling out S.S.S
    correctAnswer: 's',
    options: ['s', 'c', 'g'],
  },
  {
    id: 'lt_T',
    type: 'LETTER_TAP',
    phase: 1,
    layer: 'A',
    letterSound: 'tuh',      // t
    correctAnswer: 't',
    options: ['t', 'y', 'i'],
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
