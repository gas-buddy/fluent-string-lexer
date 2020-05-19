fluent-string-lexer
===================

![Node CI](https://github.com/gas-buddy/fluent-string-lexer/workflows/Node%20CI/badge.svg)

A fluent-style lexer (a very simple one) that walks a string and outputs values. It was built
to handle a data format that had mostly fixed fields with some optionals, some length-prefixed
repeated elements, and other simple mechanisms. Hopefully it's useful to you.

See the tests for some examples, but here are some simple ones:

```
const tcpParser = new FluentStringLexer()
  .fixed(3, 'deviceType');

const parser = new FluentStringLexer()
  .fixed(3, 'messageGroup')
  .fixed(2, 'messageToken')
  .fixed(1, 'completionCode')
  .fixed(1, 'commandCode')
  .branchByValue('messageGroup', {
    TCP: tcpParser,
  });
```

This will parse the following message:

```
TCP00 BNXG
```

Into the following object:
```javascript
  {
    messageGroup: 'TCP',
    messageToken: '00',
    commandCode: 'B',
    completionCode: ' ',
    deviceType: 'NXG',
  }
```