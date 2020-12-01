import React from 'react';
import makeid from '../lib/makeid';
import { useRemoteData } from '../lib/network';
import { PRESENTATION_PATH } from '../lib/path';
import { StyledContainer } from '../styled';
import { Article, Header, Main, Section } from '../sectioning';
import { Error, Loaded } from '../components';

function Courses() {
  const query = '{getCourses}';
  const { data, error } = useRemoteData(query);
  if (error) return <Error error={error} />;
  if (!data) return null;

  const children = [];

  data.getCourses.forEach((course) => {
    const href = `#${PRESENTATION_PATH}/${course.toString()}`;
    const child = (
      <StyledContainer key={makeid()} margin="0.3em 0 0 2em" fontSize="1.5em" letterSpacing="2px">
        <a href={href}>{course.toString()}</a>
      </StyledContainer>
    );
    children.push(child);
  });

  const gridTemplateAreas = `
  'header'
  'main'
  `;
  return (
    <Loaded>
      <Article>
        <Section gridTemplateColumns="1fr" gridTemplateRows="auto auto" gridTemplateAreas={gridTemplateAreas}>
          <Header>Courses List</Header>
          <Main marginTop="1em">{children}</Main>
        </Section>
      </Article>
    </Loaded>
  );
}

export default Courses;
