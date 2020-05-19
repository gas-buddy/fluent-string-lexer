import tap from 'tap';
import fixtures from './fixtures';
import parser from './parser';

tap.test('test_messages', (test) => {
  /*
  Lexer.events.on('step', (desc) => {
  });
  */
  fixtures.forEach(({ message, output }) => {
    test.deepEquals(parser.read(message), output, `Should match ${message}`);
  });
  test.end();
});
