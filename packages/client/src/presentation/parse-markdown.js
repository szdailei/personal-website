import debug from 'debug/src/browser.js';
import kuler from 'kuler';
import marked from 'marked';
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
  const DEBUG_NAME = '解析Markdown';
  const BLUE = '0000FF';
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
        debug(DEBUG_NAME)(kuler(`@require 待解析组件的文本：${node.text}`, BLUE));
        if (isStartingTag(node.text)) {
          debug(DEBUG_NAME)('@require 发现Starting Tag');
          debug(DEBUG_NAME)('@ensure 开始解析自定义组件');
          startReactCompenent(context, node.text);
        } else {
          if (!isClosingTagAtBeginning(node.text)) {
            // eslint-disable-next-line no-console
            console.assert(false, `Expect closing tag, got ${node}`);
          }
          debug(DEBUG_NAME)('@require 发现Closing Tag');
          debug(DEBUG_NAME)('@ensure 结束解析自定义组件');
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
