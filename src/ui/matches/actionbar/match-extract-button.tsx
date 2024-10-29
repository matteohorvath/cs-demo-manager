import { Button } from 'csdm/ui/components/buttons/button';
import React from 'react';
import { useSelectedMatches } from '../use-selected-matches';
import { buildPlayerFullRoundsSequences } from 'csdm/ui/match/video/sequences/build-player-full-rounds-sequences';
import type { Match } from 'csdm/common/types/match';
import { fetchMatchesByChecksums } from 'csdm/node/database/matches/fetch-matches-by-checksums';

export function MatchExtractButton() {
  const selectedMatches = useSelectedMatches();

  const onClick = async () => {
    /*if (selectedMatches.length === 0) {
      return;
    }
    const matches: Match[] = await fetchMatchesByChecksums(selectedMatches.map((match) => match.checksum));
    for (const match of matches) {
      for (const player of match.players) {
        const sequences = buildPlayerFullRoundsSequences(match, player.steamId);
        console.log(sequences);
        //    await addWholeDemToSeqs(match, sequences);
      }
    }*/
  };

  if (selectedMatches.length === 0) {
    return null;
  }
  return (
    <Button onClick={onClick} isDisabled={false}>
      Hi
    </Button>
  );
}
