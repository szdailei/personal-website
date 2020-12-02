import React from 'react';
import PropTypes from 'prop-types';
import { Span } from '../styled/index.js';
import { Section, Header, Main } from '../sectioning/index.js';

function Commit({ commit, locale }) {
  const date = new Date(commit.committerDate);
  const localeDate = `${date.toLocaleDateString(locale)} ${date.toLocaleTimeString(locale)}`;

  const files = commit.files;
  const status = commit.status;
  const gridTemplateAreas = `
  'header'
  'main'
  `;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Section      
      gridTemplateColumns="1fr"
      gridTemplateRows="auto auto"
      gridTemplateAreas={gridTemplateAreas}
    >
      <Header width="40%" fontSize="1.2em" display="grid" gridTemplateColumns="9fr 5fr" color='blue'>
        <Span>{localeDate}</Span>
        <Span>{commit.authorName}</Span>
      </Header>
      <Main display="grid" gridTemplateRows="auto auto">
        <Span fontSize="1.2em" fontWeight="600">
          {commit.subject}
        </Span>
        <Span>{commit.body}</Span>
      </Main>
    </Section>
  );
}

Commit.propTypes = {
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  commit: PropTypes.object.isRequired,
};

export default Commit;
