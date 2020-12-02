import React from 'react';
import PropTypes from 'prop-types';
import { Span } from '../styled/index.js';
import { Section, Header, Main } from '../sectioning/index.js';
import Details from './Details';

function Commit({ commit, locale }) {
  function Popup() {
    return <Details files={commit.files} status={commit.status} />;
  }

  const date = new Date(commit.committerDate);
  const localeDate = `${date.toLocaleDateString(locale)} ${date.toLocaleTimeString(locale)}`;

  const gridTemplateAreas = `
  'header'
  'main'
  `;
  return (
    <Section gridTemplateColumns="1fr" gridTemplateRows="auto auto" gridTemplateAreas={gridTemplateAreas}>
      <Header
        width="50%"
        fontSize="1.2em"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        color="blue"
        gridColumnGap="40px"
      >
        <Span justifySelf="start">{localeDate}</Span>
        <Span justifySelf="start">{commit.authorName}</Span>
      </Header>
      <Main display="grid" gridTemplateRows="auto auto auto">
        <Span fontSize="1.2em" fontWeight="600">
          {commit.subject}
        </Span>
        <Span>{commit.body}</Span>
        <Popup />
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
