import marked from 'marked';
import { debug, color, START_COLOR, MD_PARSE, REACT_PARSE } from '../lib/debug.js';
import { trim } from '../lib/markdown.js';
import { isStartingTag, isClosingTagAtBeginning, parseTextExceptTheFirstTag } from './parse-react-component-utils.js';
import recursiveParseMarkedToken from './recursive-parse-marked-token.js';
import finishReactComponent from './finish-react-component.js';
import startReactCompenent from './start-react-component.js';
import { getCurrentNode } from './tree.js';
import Page from './Page.jsx';

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

  debug(MD_PARSE)(color(`@require MD\n${markdown}`, START_COLOR));
  debug(MD_PARSE)('@ensure 解析为tokens', tokens);
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
          debug(REACT_PARSE)(
            '@require React Closing Tag ',
            node.text,
            ' and ',
            context.reactRoot,
            '不是null ',
            '@ensure 结束解析',
            context.reactRoot.current
          );
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
