import React from 'react';
import PropTypes from 'prop-types';
import makeid from '../lib/makeid.js';
import { Span } from '../styled/index.js';
import { Section, Header, Main } from '../sectioning/index.js';
import Commit from './Commit.jsx';

function User({ commits, locale }) {
  const name = commits[0].committerName;
  const email = commits[0].committerEmail;

  const children = [];
  commits.forEach((commit) => {
    children.push(<Commit key={makeid()} commit={commit} locale={locale} />);
  });

  const gridTemplateAreas = `
  'header'
  'main'
  `;
  return (
    <>
      <hr />
      <Section marginTop="24px" gridTemplateColumns="1fr" gridTemplateRows="auto auto" gridTemplateAreas={gridTemplateAreas}>
        <Header fontSize="1.3em" display="grid" gridTemplateColumns="1fr 1fr 4fr">
          <Span>Committer</Span>
          <Span color="red">{name}</Span>
          <Span color="red">{email}</Span>
        </Header>
        <Main marginLeft="1em" display="grid" gridTemplateRows="auto auto">
          <Span width="40%" display="grid" gridTemplateColumns="9fr 5fr">
            <Span justifySelf="center">Commit Date</Span>
            <Span justifySelf="center">Author</Span>
          </Span>
          <Span>{children}</Span>
        </Main>
      </Section>
    </>
  );
}

User.propTypes = {
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  commits: PropTypes.array.isRequired,
};

export default User;