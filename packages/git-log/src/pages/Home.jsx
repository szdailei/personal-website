import React from 'react';
import PropTypes from 'prop-types';
import makeid from '../lib/makeid.js';
import { Loaded } from '../components/index.js';
import { Span } from '../styled/index.js';
import User from './User';
import { Article, Section, Header, Main } from '../sectioning/index.js';

function Home({ repo, locale, users }) {
  const children = [];
  users.forEach((user) => {
    children.push(<User key={makeid()} commits={user} locale={locale} />);
  });

  const gridTemplateAreas = `
  'header'
  'main'
  `;
  return (
    <Loaded>
      <Article>
        <Section gridTemplateColumns="1fr" gridTemplateRows="auto auto" gridTemplateAreas={gridTemplateAreas}>
          <Header fontSize="1.3em" width="30%" display="grid" gridTemplateColumns="auto auto">
            <Span>Repo name</Span>
            <Span>{repo}</Span>
          </Header>
          <Main marginTop="1em">{children}</Main>
        </Section>
      </Article>
    </Loaded>
  );
}

Home.propTypes = {
  repo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
};

export default Home;
