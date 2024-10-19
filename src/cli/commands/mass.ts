import { Command } from './command';
import type { AddVideoPayload } from 'csdm/common/types/video';
import { useWebSocketClient } from 'csdm/ui/hooks/use-web-socket-client';
import { RendererClientMessageName } from 'csdm/server/renderer-client-message-name';

export class MassCommand extends Command {
  public static Name = 'mass';

  public getDescription() {
    return 'Mass Video Extraction';
  }

  public printHelp(): void {
    console.log(this.getDescription());
    console.log('');
    console.log('Usage: csdm mass');
    console.log('');
    console.log('Extracts all videos from the database');
  }

  client = useWebSocketClient();
  public async run() {
    // You might want to dynamically generate or fetch these parameters
    try {
      const payload: AddVideoPayload = {
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
          videoContainer: 'avi',
          videoCodec: 'libx264',
          audioCodec: 'libmp3lame',
          inputParameters: '',
          outputParameters: '',
        },
        framerate: 30,
        generateOnlyRawFiles: false,
        height: 720,
        width: 1280,
        rawFilesFolderPath: 'C:\\Users\\admin\\Downloads\\test',
        outputFolderPath: 'C:\\Users\\admin\\Downloads\\test',
        hlae: {
          customLocationEnabled: true,
          customExecutableLocation: 'C:\\HLAE\\HLAE.exe',
          configFolderEnabled: false,
          configFolderPath: '',
        },
        checksum: '142c30c76458e732',
        game: 'CS2',
        tickrate: 64,
        demoPath: 'C:/Users/admin/Downloads/test/test.dem',
        mapName: 'de_dust2',
        sequences: [
          {
            number: 1,
            startTick: 7580,
            endTick: 14556,
            deathNotices: [
              {
                steamId: '76561198273670913',
                playerName: 'righi-',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198189600467',
                playerName: 'reversive',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198192191289',
                playerName: 'atarax1a',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198981301404',
                playerName: '-tom1jed',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198358309513',
                playerName: 'OwensinhoM-',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198192352118',
                playerName: 'laser_-',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561199030972198',
                playerName: 'maxxkor-',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561199116709063',
                playerName: 'alexerdeuS',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198272032394',
                playerName: 'deco',
                showKill: true,
                highlightKill: false,
              },
              {
                steamId: '76561198281767680',
                playerName: '1962K',
                showKill: true,
                highlightKill: false,
              },
            ],
            showXRay: false,
          },
        ],
      };

      await this.client.send({
        name: RendererClientMessageName.AddVideoToQueue,
        payload,
      });
    } catch (error) {
      console.error('Error during mass video extraction:', error);
    }
  }
}
