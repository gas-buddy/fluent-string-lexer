import { READ } from './constants';

function setter(input, output, handlerOrString, value, options) {
  let finalValue = value;
  if (options?.formatter) {
    if (Array.isArray(options.formatter)) {
      finalValue = options.formatter.reduce((prev, cur) => cur(prev, output, input), finalValue);
    } else {
      finalValue = options.formatter(value);
    }
  }
  if (typeof handlerOrString === 'function') {
    const shouldContinue = handlerOrString(finalValue, output, input);
    if (shouldContinue === false) {
      return false;
    }
  } else if (finalValue !== undefined) {
    output[handlerOrString] = finalValue;
  }
  return true;
}

export function fixedField(input, output, countOrFn, handlerOrString, options) {
  const count = typeof countOrFn === 'function' ? countOrFn(output, input) : countOrFn;
  const value = input.message.substring(input.position, input.position + count);
  input.position += count;
  return setter(input, output, handlerOrString, value, options);
}

export function branch(input, output, checkFn, subparser) {
  if (checkFn(output, input)) {
    return subparser[READ](input, output);
  }
  return true;
}

export function branchByValue(input, output, propOrGetterFn, lookupTable) {
  const value = typeof propOrGetterFn === 'function' ? propOrGetterFn(output) : output[propOrGetterFn];
  const subparser = lookupTable[value];
  if (subparser) {
    subparser[READ](input, output);
  }
}

export function repeat(input, output, countOrFn, subparser, handlerOrString, options) {
  const count = typeof countOrFn === 'function' ? countOrFn(output, input) : countOrFn;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    results.push(subparser[READ](input, {}));
  }
  return setter(input, output, handlerOrString, results, options);
}
