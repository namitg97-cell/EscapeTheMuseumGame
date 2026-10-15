import { RoomConfig } from './types';

export const LOBBY_IMAGE = '/src/assets/images/museum_lobby_1792089436971.jpg';

export const ROOMS: RoomConfig[] = [
  {
    id: 1,
    title: 'Room 1: The Neural Gallery',
    subtitle: 'Number-Sequence Puzzle',
    exhibitName: 'Synaptic Weight Matrix #409',
    lore: 'The museum AI calculates neural branch weights using an exponential sequence. The terminal is missing the 6th harmonic parameter to disengage the magnetic barricade.',
    backgroundUrl: '/src/assets/images/museum_room_sequences_1792089436745.jpg',
    clues: [
      'Clue 1: Observe the step differences between adjacent nodes: 7 - 3 = 4, 15 - 7 = 8, 31 - 15 = 16, 63 - 31 = 32...',
      'Clue 2: Each interval doubles: +4, +8, +16, +32, +64. Add 64 to 63 (or double 63 and add 1).'
    ],
    answer: ['127'],
    solutionExplanation: 'The sequence follows the recurrence xₙ₊₁ = 2xₙ + 1, with differences doubling (+4, +8, +16, +32, +64). 63 + 64 = 127.'
  },
  {
    id: 2,
    title: 'Room 2: Chamber of Synthetic Truths',
    subtitle: 'Curator Logic Riddle',
    exhibitName: 'The Council of Autonomous Curators',
    lore: 'Three holographic curator nodes guard the security archway. The museum protocol guarantees: Exactly ONE curator is speaking the truth, and TWO are outputting falsehoods.',
    backgroundUrl: '/src/assets/images/museum_room_riddle_1792089436962.jpg',
    clues: [
      'Clue 1: If Beta were true (word is SYNAPSE), then Alpha ("not ALGORITHM") would also be true! That causes two truths, which breaks the museum rule.',
      'Clue 2: Therefore Beta must be lying, which proves Gamma is TRUE. Since exactly one curator speaks truth, Alpha is LYING. Inverting Alpha\'s lie ("not ALGORITHM") reveals the keyword!'
    ],
    answer: ['ALGORITHM'],
    solutionExplanation: 'If Gamma is the sole truth-teller, Beta is lying (not SYNAPSE) and Alpha is lying. Alpha lying about "not ALGORITHM" means the secret access keyword is ALGORITHM.'
  },
  {
    id: 3,
    title: 'Room 3: The Quantum Vault',
    subtitle: 'Code-Breaking Cipher',
    exhibitName: 'Master Quarantine Iris Core',
    lore: 'The final exit vault is sealed by a Caesar encryption protocol. The lock mechanism shifted every letter in the master passcode forward by 3 positions.',
    backgroundUrl: '/src/assets/images/museum_room_cipher_1792089438173.jpg',
    clues: [
      'Clue 1: To decrypt the ciphertext HVFDSH, move each letter backward by 3 steps in the Latin alphabet (H → G → F → E).',
      'Clue 2: H - 3 = E, V - 3 = S, F - 3 = C, D - 3 = A, S - 3 = P, H - 3 = E. Put them together!'
    ],
    answer: ['ESCAPE'],
    solutionExplanation: 'Deciphering HVFDSH with a -3 reverse Caesar shift yields: H→E, V→S, F→C, D→A, S→P, H→E = ESCAPE.'
  }
];

export const TOTAL_GAME_TIME = 90; // 90 seconds
