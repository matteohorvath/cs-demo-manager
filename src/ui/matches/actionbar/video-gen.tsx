import type { Match } from 'csdm/common/types/match';
import { fetchMatchesByChecksums } from 'csdm/node/database/matches/fetch-matches-by-checksums';

export class MatchVideoGen {
  private checksums: string[];
  public constructor(checksums: string[]) {
    this.checksums = checksums;
  }

  public async generate() {
    try {
      const matches: Match[] = await fetchMatchesByChecksums(this.checksums);
    } finally {
      console.log('done');
    }
  }
}
