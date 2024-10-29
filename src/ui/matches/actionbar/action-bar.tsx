import React from 'react';
import { WatchMatchButton } from 'csdm/ui/matches/actionbar/watch-match-button';
import { ActionBar } from 'csdm/ui/components/action-bar';
import { MatchesColumnsVisibility } from './matches-columns-visibility';
import { MatchDetailsButton } from './match-details-button';
import { FuzzySearchTextInput } from './fuzzy-search-text-input';
import { MatchesFilterDropdown } from './matches-filter-dropdown';
import { RevealMatchesInExplorerButton } from './reveal-matches-in-explorer-button';
import { MatchExtractButton } from './match-extract-button';

export function MatchesActionBar() {
  return (
    <ActionBar
      left={
        <>
          <MatchDetailsButton />
          <WatchMatchButton />
          <RevealMatchesInExplorerButton />
          <MatchExtractButton />
        </>
      }
      right={
        <>
          <MatchesColumnsVisibility />
          <MatchesFilterDropdown />
          <FuzzySearchTextInput />
        </>
      }
    />
  );
}
