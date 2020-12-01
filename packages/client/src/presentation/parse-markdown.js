import marked from 'marked';
import { trim } from '../lib/markdown';
import { isStartingTag, isClosingTagAtBeginning, parseTextExceptTheFirstTag } from './parse-react-component-utils';
import recursiveParseMarkedToken from './recursive-parse-marked-token';
import finishReactComponent from './finish-react-component';
import startReactCompenent from './start-react-component';
import { getCurrentNode } from './tree';
import Page from './Page';

function fixBugs(tokens) {
  tokens.forEach((token) => {
    if (token.type === 'paragraph') {
      if (token.text[0] === '<') {
        // eslint-disable-next-line no-param-reassign
        token.type = 'html';
      }
    }
  });
}

function createTotalPagesNum(tokens) {
  let totalCount = 1;
  tokens.forEach((token) => {
    if (token.type === 'hr') {
      totalCount += 1;
    }
  });
  return totalCount;
}

function finishOnePage(ctx, pages) {
  pages.push(Page(ctx));
}

function isParsingReactComponent(ctx) {
  return ctx.reactRoot;
}
function parseMarkdown(markdown) {
  const tokens = marked.lexer(markdown);

  // Fix bugs of marked
  fixBugs(tokens);

  const pages = [];
  const context = {
    pageChildren: [],
    reactRoot: null,
    hasHeaderInCurrentPage: false,
    currentPageNum: 1,
    totalPagesNum: createTotalPagesNum(tokens),
  };

  tokens.forEach((token) => {
    if (token.type === 'hr') {
      finishOnePage(context, pages);
      context.pageChildren = [];
      context.currentPageNum += 1;
      context.hasHeaderInCurrentPage = false;
    } else {
      const node = recursiveParseMarkedToken(context, token);
      if (!node) {
        return;
      }
      if (node.error) {
        // React component
        if (isStartingTag(node.text)) {
          startReactCompenent(context, node.text);
        } else {
          if (!isClosingTagAtBeginning(node.text)) {
            // eslint-disable-next-line no-console
            console.assert(false, `Expect closing tag, got ${node}`);
          }
          let { text } = node;

          while (isClosingTagAtBeginning(text)) {
            finishReactComponent(context);
            text = trim(parseTextExceptTheFirstTag(text));
            if (!text) break;
          }
        }
      } else if (isParsingReactComponent(context)) {
        // markdown inside react component.
        const currentNode = getCurrentNode(context.reactRoot);
        currentNode.children.push(node);
      } else {
        // markdown outside react component.
        context.pageChildren.push(node);
      }
    }
  });
  finishOnePage(context, pages);

  return pages;
}

export default parseMarkdown;
