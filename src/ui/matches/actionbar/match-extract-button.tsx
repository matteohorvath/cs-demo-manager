import { Button } from 'csdm/ui/components/buttons/button';
import React from 'react';
import { useSelectedMatches } from '../use-selected-matches';

export function MatchExtractButton() {
  const onClick = () => {
    return 0;
  };
  const selectedMatches = useSelectedMatches();

  if (selectedMatches.length === 0) {
    return null;
  }
  return (
    <Button onClick={onClick} isDisabled={false}>
      Hi
    </Button>
  );
}
