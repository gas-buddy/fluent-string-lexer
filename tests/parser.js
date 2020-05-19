import Lexer from '../src';

const tcpParser = new Lexer()
  .fixed(3, 'deviceType');

const sscParser = new Lexer()
  .branchByValue('commandCode', {
    A: new Lexer()
      .fixed(3, 'deviceClass')
      .fixed(2, 'deviceId')
      .fixed(2, 'serviceCount')
      .repeat(m => m.serviceCount, new Lexer().fixed(3, 'serviceClass'), 'serviceClasses')
      .custom((input, output) => {
        delete output.serviceCount;
        output.serviceClasses = output.serviceClasses?.map(s => s.serviceClass);
      }),
    F: new Lexer()
      .repeat(16, new Lexer()
        .fixed(2, 'devicePort')
        .fixed(1, 'connectStatus')
        .fixed(1, 'logicalStatus')
        .fixed(3, 'deviceClass')
        .fixed(2, 'deviceId'), 'devicePorts'),
  });

export default new Lexer()
  .fixed(3, 'messageGroup')
  .fixed(2, 'messageToken')
  .fixed(1, 'completionCode', { formatter: [Lexer.format.trim, Lexer.format.removeIfFalsy] })
  .fixed(1, 'commandCode')
  .branchByValue('messageGroup', {
    SSC: sscParser,
    TCP: tcpParser,
  });
