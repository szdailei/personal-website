import React from 'react';
import makeid from '../lib/makeid.js';
import { convertSrcToLocal, convertSrcToServer, removeBlankLine, trim } from '../lib/markdown.js';
import { Div, Heading } from '../styled/index.js';
import { isReactComponent } from './parse-react-component-utils.js';
import HtmlNode from './HtmlNode.jsx';
import TableNode from './TableNode.jsx';

function MarkdownNode(token, children) {
  let node;
  const tokenText = trim(token.text);

  switch (token.type) {
    case 'blockquote':
      node = <blockquote key={makeid()}>{children}</blockquote>;
      break;
    case 'code':
      if (isReactComponent(tokenText)) {
        node = {
          error: 'react-component',
          type: token.type,
          text: tokenText,
        };
      } else {
        node = (
          <Div key={makeid()} borderStyle="solid">
            <pre key={makeid()}>{children}</pre>
          </Div>
        );
      }
      break;
    case 'em':
      node = <em key={makeid()}>{children}</em>;
      break;
    case 'heading':
      node = (
        <Heading key={makeid()} depth={token.depth}>
          {children}
        </Heading>
      );
      break;
    case 'image':
      node = (
        <Div key={makeid()} display="block" margin="0" textAlign="center">
          <img
            key={makeid()}
            src={
              window.location.protocol === 'file:'
                ? convertSrcToLocal(token.href, 'img')
                : convertSrcToServer(token.href, 'img')
            }
            alt={tokenText}
            title={token.title}
          />
        </Div>
      );
      break;
    case 'list':
      if (token.ordered) {
        node = <ol key={makeid()}>{children}</ol>;
      } else {
        node = <ul key={makeid()}>{children}</ul>;
      }
      break;
    case 'list_item':
      node = <li key={makeid()}>{children}</li>;
      break;
    case 'html':
      if (isReactComponent(tokenText)) {
        node = {
          error: 'react-component',
          type: token.type,
          text: tokenText,
        };
      } else {
        node = HtmlNode(tokenText);
      }
      break;
    case 'paragraph':
      if (children.length === 1) {
        if (children[0].type === 'span') {
          node = <p key={makeid()}>{removeBlankLine(tokenText)}</p>;
        } else {
          [node] = children;
        }
      } else {
        node = <p key={makeid()}>{children}</p>;
      }
      break;
    case 'space':
      node = <br key={makeid()} />;
      break;
    case 'strong':
      node = <strong key={makeid()}>{children}</strong>;
      break;
    case 'table':
      node = TableNode(token);
      break;
    case 'text':
      node = <span key={makeid()}>{children}</span>;
      break;
    default:
      // eslint-disable-next-line no-console
      console.assert(false, `Unknown tag of ${token.type}`);
      break;
  }
  return node;
}

export default MarkdownNode;
