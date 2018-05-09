import { regExpToken, tokens } from '../tokenTypes'
import { valuesFactory } from './util'
import camelizeStyleName from 'fbjs/lib/camelizeStyleName'

const { NONE, SPACE, COMMA, IDENT, TIME, TIMING } = tokens

let defaultTransition = {
  transitionProperty: null,
  transitionDuration: 0,
  transitionTimingFunction: 'ease',
  transitionDelay: 0,
}

let transitionProperties = {
  transitionProperty: [IDENT, camelizeStyleName],
  transitionDuration: [TIME, null],
  transitionTimingFunction: [TIMING, null],
  transitionDelay: [TIME, null],
}

function transition(tokenStream) {
  let transitions = [];

  let transition = Object.assign({}, defaultTransition);
  let transitionSeen = Object.assign({}, defaultTransition);
  Object.keys(transitionSeen).forEach(key => transitionSeen[key] = false);

  if (tokenStream.matches(NONE)) {
    return intoMergeStyle([]);
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    for (let key of Object.keys(transitionProperties)) {
      if (transitionSeen[key]===false) {
        if (tokenStream.matches(transitionProperties[key][0])) {
          transitionSeen[key] = true;
          transition[key] = transitionProperties[key][1] ? transitionProperties[key][1](tokenStream.lastValue) : tokenStream.lastValue;
          break;
        }
      }
    }

    didParseFirst = true;

    tokenStream.saveRewindPoint()
    if (tokenStream.matches(COMMA)) {
      if (transition.transitionProperty) {
        transitions.push(transition);
      }

      transition = Object.assign({}, defaultTransition);
      Object.keys(transitionSeen).forEach(key => transitionSeen[key] = false);
      didParseFirst = false;

    } else {
      tokenStream.rewind()
    }
  }

  tokenStream.expectEmpty();
  if (transition.transitionProperty) {
    transitions.push(transition);
  }

  return intoMergeStyle(transitions);
}


function intoMergeStyle(transitions) {
  const $merge = {}
  for (let key of Object.keys(defaultTransition)) {
    $merge[key] = [];
  }

  for (let transition of transitions) {
    for (let key of Object.keys(defaultTransition)) {
      $merge[key].push(transition[key]);
    }
  }

  return { $merge }
}


const transitions = { transition }

for (let key of Object.keys(transitionProperties)) {
  transitions[key] = valuesFactory(transitionProperties[key][0], COMMA, transitionProperties[key][1]);
}

export default transitions
