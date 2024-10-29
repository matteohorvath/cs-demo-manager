import { useSelector } from 'csdm/ui/store/use-selector';
import { MatchesTable } from './table/matches-table';
import type { MatchTable } from 'csdm/common/types/match-table';
export function useSelectedMatchEntities() {
  const state: MatchTable[] = useSelector((state) => state.matches.entities);

  return state;
}
