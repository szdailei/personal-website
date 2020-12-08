import debug from 'debug/src/browser.js';
import kuler from 'kuler';
import marked from 'marked';
import recursiveParseMarkedToken from './recursive-parse-marked-token.js';
import { createNode, addNode } from './tree.js';
import { isStartingTag } from './parse-react-component-utils.js';
import finishReactComponent from './finish-react-component.js';

const DEBUG_NAME = '解析自定义组件';
const BLUE = '0000FF';

function startReactCompenent(ctx, text) {
  debug(DEBUG_NAME)(kuler(`@require 待解析组件的文本：${text}`, BLUE));
  const node = createNode(text);
  // Do nothing for empty tag
  if (node.foundClosingTag && !node.textContent) {
    return;
  }

  if (!ctx.reactRoot) {
    ctx.reactRoot = node;
    debug(DEBUG_NAME)('@require 不存在ctx.reactRoot');
    debug(DEBUG_NAME)('@ensure  自定义组件作为ctx.reactRoot');
  } else {
    addNode(ctx.reactRoot, node);
    debug(DEBUG_NAME)('@require 存在ctx.reactRoot');
    debug(DEBUG_NAME)('@ensure  自定义组件\n作为当前组件的子节点');
  }

  if (node.textContent) {
    const tokens = marked.lexer(node.textContent);
    debug(DEBUG_NAME)('@require 除tag外，还有更多text');
    debug(DEBUG_NAME)('@ensure  调用marked解析text');
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
    finishReactComponent(ctx);
    debug(DEBUG_NAME)('@require 在marked的同一个token里面包含closing tag');
    debug(DEBUG_NAME)('@ensure  结束组件的解析');
  } else {
    debug(DEBUG_NAME)('@require 在marked的同一个token里面不包含closing tag');
    debug(DEBUG_NAME)('@ensure  ctx.reactRoot作为继续解析的标识');
  }
}

export default startReactCompenent;
