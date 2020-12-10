import marked from 'marked';
import { isStartingTag } from './parse-react-component-utils.js';
import { debug, color, START_COLOR, MD_PARSE } from '../lib/debug.js';
import recursiveParseMarkedToken from './recursive-parse-marked-token.js';
import startReactCompenent from './start-react-component.js';
import closingReactComponent from './closing-react-component.js';
import { getCurrentNode } from './tree.js';
import Page from './Page.jsx';

const contract = debug(MD_PARSE);

function preProcess(tokens) {
  tokens.forEach((token) => {
    if (token.type === 'paragraph' && token.text[0] === '<') {
      // eslint-disable-next-line no-param-reassign
      token.type = 'html';
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

  preProcess(tokens);

  const pages = [];
  const context = {
    pageChildren: [],
    reactRoot: null,
    hasHeaderInCurrentPage: false,
    currentPageNum: 1,
    totalPagesNum: createTotalPagesNum(tokens),
  };

  contract('@require MD \n%s\n@ensure 解析为%d个token%O', color(markdown, START_COLOR), tokens.length, tokens);

  tokens.forEach((token) => {
    if (token.type === 'hr') {
      finishOnePage(context, pages);

      context.pageChildren = [];
      context.currentPageNum += 1;
      context.hasHeaderInCurrentPage = false;
      return;
    }

    const node = recursiveParseMarkedToken(context, token);
    if (!node) return;

    if (node.error) {
      contract('@require 发现React组件\n%s\n@ensure 解析React文本', node.text);
      if (isStartingTag(node.text)) {
        startReactCompenent(context, node.text);
      } else {
        closingReactComponent(context, node.text);
      }
      return;
    }

    if (isParsingReactComponent(context)) {
      contract('@require React节点里面有MD节点 \n%O\n@ensure 把MD节点push进React节点', node.props);
      const currentNode = getCurrentNode(context.reactRoot);
      currentNode.children.push(node);
      return;
    }

    contract('@require 独立的MD节点 \n%O\n@ensure 把MD节点push进Page节点', node.props);
    context.pageChildren.push(node);
  });

  contract('@require 结束解析MD\n@ensure 把剩余节点push进Page节点');
  finishOnePage(context, pages);

  return pages;
}

export default parseMarkdown;
