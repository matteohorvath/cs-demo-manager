import React, { useState } from 'react';
import { useMatchesLoaded } from '../use-matches-loaded';
import { useMatchesTable } from '../table/use-matches-table';
import { DetailsButton } from 'csdm/ui/components/buttons/details-button';
import { fetchMatchesByChecksums } from 'csdm/node/database/matches/fetch-matches-by-checksums';
import type { Match } from 'csdm/common/types/match';

import type { Sequence } from 'csdm/common/types/sequence';
import { AddVideoToQueueErrorDialog } from 'csdm/ui/match/video/add-video-to-queue-error-dialog';
import { ErrorCode } from 'csdm/common/error-code';
import { isErrorCode } from 'csdm/common/is-error-code';
import { getVideoErrorMessageFromErrorCode } from 'csdm/ui/match/video/get-video-error-from-error-code';
import { useWebSocketClient } from 'csdm/ui/hooks/use-web-socket-client';
import type { AddVideoPayload } from 'csdm/common/types/video';
import { RendererClientMessageName } from 'csdm/server/renderer-client-message-name';
import { useVideoSettings } from 'csdm/ui/settings/video/use-video-settings';
import { useDialog } from 'csdm/ui/components/dialogs/use-dialog';

import { buildPlayerFullRoundsSequences } from 'csdm/ui/match/video/sequences/build-player-full-rounds-sequences';

export function MatchExtractButton() {
  /*const table = useMatchesTable();
  const selectedChecksums = table.getSelectedRowIds();
  const matchesLoaded = useMatchesLoaded();
  const client = useWebSocketClient();
  const { settings } = useVideoSettings();
  const [isAddingVideoToQueue, setIsAddingVideoToQueue] = useState(false);

  const { showDialog } = useDialog();

  if (selectedChecksums.length === 0) {
    return null;
  }
  const addVideoToQueue = async (match: Match, sequencesTest: Sequence[]) => {
    try {
      const payload: AddVideoPayload = {
        ...settings,
        checksum: match.checksum,
        game: match.game,
        tickrate: match.tickrate,
        demoPath: match.demoFilePath,
        mapName: match.mapName,
        sequences: sequencesTest.map((sequence) => {
          return {
            ...sequence,
            playerFocusName: match.players.find((player) => player.steamId === sequence.playerFocusSteamId)?.name,
          };
        }),
      };
      await client.send({
        name: RendererClientMessageName.AddVideoToQueue,
        payload,
      });
      //navigate(RoutePath.Videos);
    } catch (error) {
      const errorCode = isErrorCode(error) ? error : ErrorCode.UnknownError;
      const message = getVideoErrorMessageFromErrorCode(match.game, errorCode);

      showDialog(<AddVideoToQueueErrorDialog>{message}</AddVideoToQueueErrorDialog>);
    }
  };

  const addWholeDemToSeqs = async (match: Match, sequencesTest: Sequence[]) => {
    setIsAddingVideoToQueue(true);
    logger.log(sequencesTest);
    await addVideoToQueue(match, sequencesTest);
    setIsAddingVideoToQueue(false);
  };*/
  const onClick = () => {
    //get all filename in C:/dems and select every row in table
    /*const selectedRows = table.getSelectedRows();
    const selectedChecksums = selectedRows.map((row) => row.checksum);
    const matches: Match[] = await fetchMatchesByChecksums(selectedChecksums);

    for (const match of matches) {
      for (const player of match.players) {
        const sequences = buildPlayerFullRoundsSequences(match, player.steamId);
        await addWholeDemToSeqs(match, sequences);
      }
    }*/
    return 0;
  };
  return <button onClick={onClick}>Hi</button>;
}
