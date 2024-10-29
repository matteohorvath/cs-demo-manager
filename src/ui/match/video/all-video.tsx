import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { Button, ButtonVariant } from 'csdm/ui/components/buttons/button';
import { useCurrentMatchSequences } from './sequences/use-current-match-sequences';
import { useVideoSettings } from 'csdm/ui/settings/video/use-video-settings';
import { useCurrentMatch } from '../use-current-match';
import { useWebSocketClient } from 'csdm/ui/hooks/use-web-socket-client';
import { RendererClientMessageName } from 'csdm/server/renderer-client-message-name';
import { useDialog } from 'csdm/ui/components/dialogs/use-dialog';
import { useSequencesRequiredDiskSpace } from './sequences/use-sequences-required-disk-space';
import { ConfirmDialog } from 'csdm/ui/dialogs/confirm-dialog';
import { Game } from 'csdm/common/types/counter-strike';
import type { AddVideoPayload } from 'csdm/common/types/video';
import { isErrorCode } from 'csdm/common/is-error-code';
import { ErrorCode } from 'csdm/common/error-code';
import { AddVideoToQueueErrorDialog } from './add-video-to-queue-error-dialog';
import { getVideoErrorMessageFromErrorCode } from './get-video-error-from-error-code';
import { RoutePath } from 'csdm/ui/routes-paths';
import { generatePlayerSequences } from './sequences/sequences-actions';
import { Perspective } from 'csdm/common/types/perspective';
import { PlayerSequenceEvent } from './sequences/player-sequence-event';
import { useDispatch } from 'csdm/ui/store/use-dispatch';
import { buildPlayerFullRoundsSequences } from './sequences/build-player-full-rounds-sequences';
import type { Sequence } from 'csdm/common/types/sequence';

export function AllVideo() {
  const match = useCurrentMatch();
  const sequences = useCurrentMatchSequences();
  const { showDialog } = useDialog();
  const { settings } = useVideoSettings();
  const [isAddingVideoToQueue, setIsAddingVideoToQueue] = useState(false);
  const requiredDiskSpace = useSequencesRequiredDiskSpace();
  const client = useWebSocketClient();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addVideoToQueue = async (sequencesTest: Sequence[]) => {
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

  const addWholeDemToSeqs = async (sequencesTest: Sequence[]) => {
    setIsAddingVideoToQueue(true);
    logger.log(sequences);
    await addVideoToQueue(sequencesTest);
    setIsAddingVideoToQueue(false);
  };
  /*const delay = (time: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };*/
  const onClick = async () => {
    console.log(settings);
    return 0;
    try {
      for (const player of match.players) {
        // Await the dispatch if it returns a promise (e.g., if using redux-thunk)
        const sequencesTest = buildPlayerFullRoundsSequences(match, player.steamId);

        // Await the waitForLoad function to ensure that addWholeDemToSeqs runs after the sequences are generated
        //await delay(3000).then(async () => {
        await addWholeDemToSeqs(sequencesTest);
        //});
      }
    } catch (error) {
      console.error('Error during sequence generation:', error);
      // Optionally show an error dialog or handle the error appropriately
    }
  };

  return (
    <Button variant={ButtonVariant.Primary} onClick={onClick}>
      <Trans context="Button">AllVideo</Trans>
    </Button>
  );
}
