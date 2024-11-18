import { InlineLink } from '@/components/typography/inlineLink';
import React from 'react';
import { EventTypeIndicator } from '../events/[id]/eventTypeIndicator';

export const EventTypeKey: React.FC = () => {
  return (
    <div className="text-left border rounded-lg p-4 space-y-1 font-light text-gray-700">
      <div>There are three types of session...</div>
      <div>
        <EventTypeIndicator type="DROP IN" />{' '}
        <span className="text-green-500">DROP-IN</span> For these you can just
        turn up at the location – first come, first served.
      </div>
      <div>
        <EventTypeIndicator type="SIGN UP" />{' '}
        <span className="text-orange-500">SIGN UP AT THE FESTIVAL</span> Go to
        the session location and add your name to the sign-up list.
      </div>
      <div>
        <EventTypeIndicator type="PRE BOOK" />{' '}
        <span className="text-red-500">PRE-BOOK</span> Check on{' '}
        <InlineLink href="http://waitrosefestivals.com">
          waitrosefestivals.com
        </InlineLink>{' '}
        to see if there are spaces left.
      </div>
    </div>
  );
};
