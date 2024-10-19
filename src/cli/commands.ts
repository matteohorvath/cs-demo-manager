import { AnalyzeCommand } from './commands/analyze-command';
import { DownloadValveCommand } from './commands/download-valve-command';
import { DownloadFaceitCommand } from './commands/download-faceit-command';
import { HelpCommand } from './commands/help-command';
import { XlsxCommand } from './commands/xlsx-command';
import { JsonCommand } from './commands/json-command';
import { MassCommand } from './commands/mass';

export const commands = {
  [AnalyzeCommand.Name]: AnalyzeCommand,
  [DownloadFaceitCommand.Name]: DownloadFaceitCommand,
  [DownloadValveCommand.Name]: DownloadValveCommand,
  [HelpCommand.Name]: HelpCommand,
  [JsonCommand.Name]: JsonCommand,
  [XlsxCommand.Name]: XlsxCommand,
  [MassCommand.Name]: MassCommand,
};
