import { regExpToken, tokens } from '../tokenTypes'
import { valuesFactory } from './util'

const { NONE, SPACE, COMMA, IDENT, TIME, TIMING } = tokens

let defaultAnimation = {
  animationName: null,
  animationDuration: 0,
  animationTimingFunction: 'ease',
  animationDelay: 0,
  animationIterationCount: 1,
  animationDirection: 'normal',
  animationFillMode: 'none',
  animationPlayState: 'running',
}

let animationProperties = {
  animationDuration: TIME,
  animationTimingFunction: TIMING,
  animationDelay: TIME,
  animationIterationCount: regExpToken(/^(infinite|[1-9][0-9]*)$/),
  animationDirection: regExpToken(/^(normal|reverse|alternate|alternate-reverse)$/),
  animationFillMode: regExpToken(/^(forwards|backwards|both)$/),
  animationPlayState: regExpToken(/^(running|paused)$/),
  animationName: IDENT,
}


function animation(tokenStream) {
  let animations = [];

  let animation = Object.assign({}, defaultAnimation);
  let animationSeen = Object.assign({}, defaultAnimation);
  Object.keys(animationSeen).forEach(key => animationSeen[key] = false);

  if (tokenStream.matches(NONE)) {
    return intoMergeStyle([]);
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    for (let key of Object.keys(animationProperties)) {
      if (animationSeen[key]===false) {
        if (tokenStream.matches(animationProperties[key])) {
          animationSeen[key] = true;
          animation[key] = tokenStream.lastValue;
          break;
        }
      }
    }

    didParseFirst = true;

    tokenStream.saveRewindPoint()
    if (tokenStream.matches(COMMA)) {
      if (animation.animationName) {
        animations.push(animation);
      }

      animation = Object.assign({}, defaultAnimation);
      Object.keys(animationSeen).forEach(key => animationSeen[key] = false);
      didParseFirst = false;

    } else {
      tokenStream.rewind()
    }
  }

  tokenStream.expectEmpty();
  if (animation.animationName) {
    animations.push(animation);
  }

  return intoMergeStyle(animations);
}


function intoMergeStyle(animations) {
  const $merge = {}
  for (let key of Object.keys(defaultAnimation)) {
    $merge[key] = [];
  }

  for (let animation of animations) {
    for (let key of Object.keys(defaultAnimation)) {
      $merge[key].push(animation[key]);
    }
  }

  return { $merge }
}


const animations = { animation }

for (let key of Object.keys(animationProperties)) {
  animations[key] = valuesFactory(animationProperties[key], COMMA);
}

export default animations
