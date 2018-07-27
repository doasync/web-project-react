// @flow

import * as React from 'react';
import wavingHandEmoji from '~/assets/emoji/1f44b.png';

export type HomeProps = {
  greeting: string
}

// Root child
export function Home (props: HomeProps) {
  const { greeting } = props;
  return (
    <React.Fragment>
      <img src={wavingHandEmoji} alt="Waving Hand Emoji Sign" />
      {greeting}
    </React.Fragment>
  );
}
