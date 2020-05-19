import { EventEmitter } from 'events';
import { READ } from './constants';
import formatters from './formatters';
import { fixedField, branch, repeat, branchByValue } from './functions';

const noop = () => true;

interface InputMessage {
  message: String;
  position: Number;
}

interface LexerStepOptions {
  formatter: (any) => any;
}

const singletonEvents = new EventEmitter();

export default class FluentStringLexer {
  constructor() {
    this.flow = [];
  }

  static format = formatters;

  /**
   * Read a fixed length item and advance the read position
   *
   * @param countOrFn The number of times to run the lexer, or a function that returns that number based on the output and input message
   * @param handlerOrString The property name to set on the output, or a handler that takes the value,
   *  output object, and input message. If the handler returns false, the lexer will stop
   * @param options Options for the lexer step
   */
  fixed(
    countOrFn: Number | (any, InputMessage) => Number,
    handlerOrString: String | (value: any, output: any, input: InputMessage) => Boolean,
    options?: LexerStepOptions,
  ) : FluentStringLexer {
    const desc = `FIXED(${countOrFn.name || countOrFn})`;
    this.flow.push([desc, fixedField, countOrFn, handlerOrString, options]);
    return this;
  }

  /**
   * Based on a value test, engage a lexer (or don't)
   *
   * @param checkFn Takes the output object and input message, returns true to engage the lexer
   * @param lexer The lexer to run if the checkFn returns true
   */
  branch(checkFn: (any, InputMessage) => Boolean, lexer: FluentStringLexer) : FluentStringLexer {
    const desc = 'BRANCH';
    this.flow.push([desc, branch, checkFn, lexer]);
    return this;
  }

  /**
   * Based on a value or value function, engage a lexer from a map
   *
   * @param propOrGetterFn A string property (on the output object) or a function that extracts a value
   * @param lookupTable A map that contains keys corresponding the values of propOrGetterFn
   *  and values that are lexers to run when the key matches
   */
  branchByValue(propOrGetterFn: String | (any) => any, lookupTable: Map<String, FluentStringLexer>) : FluentStringLexer {
    const desc = `BRANCH_VALUE(${propOrGetterFn.name || propOrGetterFn})`;
    this.flow.push([desc, branchByValue, propOrGetterFn, lookupTable]);
    return this;
  }

  /**
   * Repeat a lexer a fixed number of times
   *
   * @param countOrFn The number of times to run the lexer, or a function that returns that number based on the output and input message
   * @param lexer The lexer to run
   * @param handlerOrString The property name to set on the output, or a handler that takes the value,
   *  output object, and input message. If the handler returns false, the lexer will stop
   * @param options Options for the lexer step
   */
  repeat(
    countOrFn: Number | (any, InputMessage) => Number,
    lexer: FluentStringLexer,
    handlerOrString: String | (value: any, output: any, input: InputMessage) => Boolean,
    options?: LexerStepOptions,
  ) : FluentStringLexer {
    const desc = `REPEAT(${countOrFn.name || countOrFn})`;
    this.flow.push([desc, repeat, countOrFn, lexer, handlerOrString, options]);
    return this;
  }

  /**
   * Ignore a fixed number of characters
   *
   * @param countOrFn The number of characters to ignore, or a function that returns that number based on the output and input message
   */
  ignore(countOrFn: Number | (any, InputMessage) => Number) : FluentStringLexer {
    const desc = `IGNORE(${countOrFn.name || countOrFn})`;
    this.flow.push([desc, fixedField, countOrFn, noop]);
    return this;
  }

  /**
   * Run a custom function which is passed the input message and output object
   */
  custom(fn: (InputMessage, any) => Boolean) : FluentStringLexer {
    const desc = fn.name;
    this.flow.push([desc, fn]);
    return this;
  }

  [READ](input, output) {
    let done = false;
    this.flow.reduce((outputObject, [desc, parser, ...args]) => {
      if (done) {
        return outputObject;
      }
      singletonEvents.emit('step', desc, parser, input, outputObject, args);
      const v = parser(input, outputObject, ...args);
      if (v === false) {
        done = true;
      }
      return outputObject;
    }, output);
    return output;
  }

  /**
   * Read a message and output an object (or write to one that you pass in)
   *
   * @param message A string to parse
   * @param output The object to write values into (optional)
   */
  read(message: String, output = {}) {
    const input = { message, position: 0 };
    return this[READ](input, output);
  }

  /**
   * Since the typical use case is to debug lexers, this is a single event source
   * for all lexers. You can add event handlers for 'step' events.
   */
  static events = singletonEvents;
}
