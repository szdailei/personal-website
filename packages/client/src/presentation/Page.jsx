import React from 'react';
import makeid from '../lib/makeid';
import { Section, Main, Footer } from '../sectioning';

function createFooter(ctx) {
  const text = `page ${ctx.currentPageNum} / ${ctx.totalPagesNum}`;
  const visibility = ctx.hasHeaderInCurrentPage ? 'visible' : 'hidden';
  const footer = (
    <Footer key={makeid()} visibility={visibility} margin="0 48px 16px 16px">
      {text}
    </Footer>
  );
  return footer;
}

function createMain(ctx) {
  const main = (
    <Main key={makeid()} margin="16px 16px 0 24px">
      {ctx.pageChildren}
    </Main>
  );
  return main;
}

function Page(ctx) {
  const main = createMain(ctx);
  const footer = createFooter(ctx);

  const pageBreakAfter = ctx.currentPageNum === ctx.totalPagesNum ? 'avoid' : 'always';
  const gridTemplateAreas = `
      'main'
      'footer'
      `;
  const page = (
    <Section
      key={makeid()}
      minHeight="100vh"
      pageBreakAfter={pageBreakAfter}
      gridTemplateColumns="1fr"
      gridTemplateRows="1fr auto"
      gridTemplateAreas={gridTemplateAreas}
    >
      {main}
      {footer}
    </Section>
  );
  return page;
}

export default Page;
