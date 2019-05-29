import * as React from 'react';

import { IVoting, VotingDecision } from 'shared/types/models';
import VotingCard from 'shared/futureView/VotingCard/VotingCard';
import { usePagination } from 'shared/view/hooks';

import { StylesProps, provideStyles } from './Activities.style';

interface IOwnProps {
  votings: IVoting[];
  connectedAccountVotes: Record<string, VotingDecision>;
}

type Props = StylesProps & IOwnProps;

function Activities(props: Props) {
  const { classes, votings: votes, connectedAccountVotes } = props;

  const { items: paginatedVotings, paginationView } = usePagination(votes);

  return (
    <div className={classes.root}>
      <div className={classes.activities}>
        {paginatedVotings.map(voting => (
          <VotingCard
            key={voting.id}
            voting={voting}
            votingDecision={connectedAccountVotes[voting.id] || 'absent'}
          />
        ))}
      </div>
      <div className={classes.pagination}>
        {paginationView}
      </div>
    </div>
  );
}

export default provideStyles(Activities);
