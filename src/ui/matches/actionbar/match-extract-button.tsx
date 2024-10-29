import { Button } from 'csdm/ui/components/buttons/button';
import React, { useEffect } from 'react';
import { useSelectedMatchChecksums } from '../use-selected-match-checksums';
import { useWebSocketClient } from 'csdm/ui/hooks/use-web-socket-client';
import { RendererClientMessageName } from 'csdm/server/renderer-client-message-name';
import { useDispatch } from 'csdm/ui/store/use-dispatch';

import { fetchMatchSuccess } from 'csdm/ui/match/match-actions';
import { isErrorCode } from 'csdm/common/is-error-code';
import { getVideoErrorMessageFromErrorCode } from 'csdm/ui/match/video/get-video-error-from-error-code';
import { ErrorCode } from 'csdm/common/error-code';
import type { Match } from 'csdm/common/types/match';
import type { Sequence } from 'csdm/common/types/sequence';
import type { AddVideoPayload } from 'csdm/common/types/video';
import { useVideoSettings } from 'csdm/ui/settings/video/use-video-settings';
import { AddVideoToQueueErrorDialog } from 'csdm/ui/match/video/add-video-to-queue-error-dialog';
import { useDialog } from 'csdm/ui/components/dialogs/use-dialog';
import { buildPlayerFullRoundsSequences } from 'csdm/ui/match/video/sequences/build-player-full-rounds-sequences';
import type { VideoSettings } from 'csdm/node/settings/settings';

export function MatchExtractButton() {
  const client = useWebSocketClient();
  const selectedMatches = useSelectedMatchChecksums();
  const dispatch = useDispatch();
  const settings: VideoSettings = {
    closeGameAfterRecording: true,
    concatenateSequences: false,
    deleteRawFilesAfterEncoding: true,
    showOnlyDeathNotices: true,
    deathNoticesDuration: 5,
    encoderSoftware: 'FFmpeg',
    ffmpegSettings: {
      audioBitrate: 256,
      constantRateFactor: 23,
      customLocationEnabled: true,
      customExecutableLocation: 'C:\\HLAE\\ffmpeg\\bin\\ffmpeg.exe',
      videoContainer: 'mp4',
      videoCodec: 'libx264',
      audioCodec: 'libmp3lame',
      inputParameters: '-hwaccel cuda',
      outputParameters: '',
    },
    framerate: 32,
    generateOnlyRawFiles: false,
    height: 600,
    width: 800,
    rawFilesFolderPath: 'D:\\dem-ext\\2\\vids',
    outputFolderPath: 'D:\\dem-ext\\2\\vids',
    hlae: {
      customLocationEnabled: false,
      customExecutableLocation: 'C:\\HLAE\\HLAE.exe',
      configFolderEnabled: false,
      configFolderPath: '',
    },
  };

  const { showDialog } = useDialog();

  const [isAddingVideoToQueue, setIsAddingVideoToQueue] = React.useState(false);

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
  };

  const onClick = async () => {
    if (selectedMatches.length === 0) {
      return;
    }

    for (const sm of selectedMatches) {
      console.log(sm);
      const match = await client.send({ name: RendererClientMessageName.FetchMatchByChecksum, payload: sm });
      dispatch(fetchMatchSuccess({ match }));
      for (const player of match.players) {
        const sequencesTest = buildPlayerFullRoundsSequences(match, player.steamId);
        await addWholeDemToSeqs(match, sequencesTest);
      }
    }
  };

  if (selectedMatches.length === 0) {
    return null;
  }
  return (
    <Button onClick={onClick} isDisabled={false}>
      Hia
    </Button>
  );
}
