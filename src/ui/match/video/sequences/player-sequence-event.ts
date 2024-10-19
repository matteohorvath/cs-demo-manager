export const PlayerSequenceEvent = {
  Kills: 'kills',
  Deaths: 'deaths',
  Rounds: 'rounds',
  FullRounds: 'fullRounds',
} as const;
export type PlayerSequenceEvent = (typeof PlayerSequenceEvent)[keyof typeof PlayerSequenceEvent];
