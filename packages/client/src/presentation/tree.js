/* eslint-disable no-param-reassign */
import {
  getAttributes,
  getTagName,
  isClosingTagAtEnd,
  parseTextExceptTheFirstTag,
  removeStartingAndClosingTag,
} from './parse-react-component-utils.js';
import { CreateComponent } from './Component.jsx';

function createRoot() {
  return {
    tagName: null,
    attributes: null,
    textContent: null,
    isFinished: false,
    foundClosingTag: null,
    parent: null,
    nodeList: [],
    children: [],
  };
}

function createNode(text) {
  const node = createRoot();
  node.tagName = getTagName(text);
  node.attributes = getAttributes(text);
  node.isFinished = false;

  if (isClosingTagAtEnd(text)) {
    node.foundClosingTag = true;
    node.textContent = removeStartingAndClosingTag(text);
  } else {
    node.foundClosingTag = false;
    node.textContent = parseTextExceptTheFirstTag(text);
  }
  return node;
}

function getCurrentNode(root) {
  if (root.current) return root.current;
  return root;
}

function addNode(root, node) {
  const current = getCurrentNode(root);
  node.parent = current;
  current.nodeList.push(node);
  root.current = node;
}

function finishNode(root, node) {
  node.isFinished = true;
  node.foundClosingTag = true;

  const component = CreateComponent(node);

  if (node.parent) node.parent.children.push(component);

  if (node.parent && node.parent.parent) {
    root.current = node.parent;
  } else {
    root.current = null;
  }
}

export { createNode, addNode, getCurrentNode, finishNode };
