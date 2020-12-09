import marked from 'marked';
import { debug, color, START_COLOR, REACT_PARSE } from '../lib/debug.js';
import recursiveParseMarkedToken from './recursive-parse-marked-token.js';
import { createNode, addNode } from './tree.js';
import { isStartingTag } from './parse-react-component-utils.js';
import finishReactComponent from './finish-react-component.js';

function startReactCompenent(ctx, text) {
  debug(REACT_PARSE)(color(`@require React Starting tag：${text}`, START_COLOR));
  const node = createNode(text);
  // Do nothing for empty tag
  if (node.foundClosingTag && !node.textContent) {
    return;
  }

  if (!ctx.reactRoot) {
    debug(REACT_PARSE)('@require ctx.reactRoot不存在 @ensure  新增ctx.reactRoot');
    ctx.reactRoot = node;
  } else {
    debug(REACT_PARSE)('@require ctx.reactRoot存在 @ensure  ctx.reactRoot添加子节点');
    addNode(ctx.reactRoot, node);
  }

  if (node.textContent) {
    const tokens = marked.lexer(node.textContent);
    debug(REACT_PARSE)('@require React tag里有MD ', node.textContent, '@ensure 解析为tokens', tokens);
    tokens.forEach((token) => {
      const subNode = recursiveParseMarkedToken(ctx, token);
      if (subNode) {
        if (subNode.error) {
          // React component
          if (isStartingTag(subNode.text)) {
            startReactCompenent(ctx, subNode.text);
          } else {
            finishReactComponent(ctx);
          }
        } else {
          node.children.push(subNode);
        }
      }
    });
  }

  if (node.foundClosingTag) {
    debug(REACT_PARSE)(
      `@require starting tag和closing tag在同一个token and ctx.reactRoot`,
      ctx.reactRoot,
      `不是null @ensure  结束解析React`
    );
    finishReactComponent(ctx);
  }
}

export default startReactCompenent;
