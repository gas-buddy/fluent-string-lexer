export default [
  {
    message: 'TCP00 BNXG',
    output: {
      messageGroup: 'TCP',
      messageToken: '00',
      commandCode: 'B',
      deviceType: 'NXG',
    },
  },
  {
    message: 'SSC00 ASSC0008CRWDISDPTFIMFPSPCIPPERKD',
    output: {
      messageGroup: 'SSC',
      messageToken: '00',
      commandCode: 'A',
      deviceClass: 'SSC',
      deviceId: '00',
      serviceClasses: ['CRW', 'DIS', 'DPT', 'FIM', 'FPS', 'PCI', 'PPE', 'RKD'],
    },
  },
  {
    message: 'SSC00AF01BDPOS  02RSTLS  03KDCRW  04BDPOS  05AADIS-G06RSDIS-G07AADPT-G08RSDPT-W09RSDIS  10RSDPT-W11UUNON0012RSDPT-W13UUNON0014UUNON0015UUNON0016UUNON0017AARETJR18AAEPT0019XDRFACF20XDPOS  21XDPOS  22XDPOS  23XDPOS  24XDPOS  25UUNON0026fDLNQ  27UUNON0028UUNON0029UUNON0030SSSCR  31AATCP  32AACF   33XDPOS  34XDPOS  35XDPOS  36XDPOS  37XDPOS  38XDPOS  39XDPOS  40XDPOS  41XDPOS  42XDPOS  43XDPOS  44XDPOS  45XDPOS  46XDPOS  47XDPOS  48XDPOS  49UUNON0050UUNON0051UUNON0052UUNON0053UUNON0054UUNON0055UUNON0056UUNON0057UUNON0058UUNON0059UUNON0060UUNON0061UUNON0062UUNON0063UUNON0064UUNON00',
    output: {
      messageGroup: 'SSC',
      messageToken: '00',
      completionCode: 'A',
      commandCode: 'F',
      devicePorts: [{
        devicePort: '01',
        connectStatus: 'B',
        logicalStatus: 'D',
        deviceClass: 'POS',
        deviceId: '  ',
      }, {
        devicePort: '02',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'TLS',
        deviceId: '  ',
      }, {
        devicePort: '03',
        connectStatus: 'K',
        logicalStatus: 'D',
        deviceClass: 'CRW',
        deviceId: '  ',
      }, {
        devicePort: '04',
        connectStatus: 'B',
        logicalStatus: 'D',
        deviceClass: 'POS',
        deviceId: '  ',
      }, {
        devicePort: '05',
        connectStatus: 'A',
        logicalStatus: 'A',
        deviceClass: 'DIS',
        deviceId: '-G',
      }, {
        devicePort: '06',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'DIS',
        deviceId: '-G',
      }, {
        devicePort: '07',
        connectStatus: 'A',
        logicalStatus: 'A',
        deviceClass: 'DPT',
        deviceId: '-G',
      }, {
        devicePort: '08',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'DPT',
        deviceId: '-W',
      }, {
        devicePort: '09',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'DIS',
        deviceId: '  ',
      }, {
        devicePort: '10',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'DPT',
        deviceId: '-W',
      }, {
        devicePort: '11',
        connectStatus: 'U',
        logicalStatus: 'U',
        deviceClass: 'NON',
        deviceId: '00',
      }, {
        devicePort: '12',
        connectStatus: 'R',
        logicalStatus: 'S',
        deviceClass: 'DPT',
        deviceId: '-W',
      }, {
        devicePort: '13',
        connectStatus: 'U',
        logicalStatus: 'U',
        deviceClass: 'NON',
        deviceId: '00',
      }, {
        devicePort: '14',
        connectStatus: 'U',
        logicalStatus: 'U',
        deviceClass: 'NON',
        deviceId: '00',
      }, {
        devicePort: '15',
        connectStatus: 'U',
        logicalStatus: 'U',
        deviceClass: 'NON',
        deviceId: '00',
      }, {
        devicePort: '16',
        connectStatus: 'U',
        logicalStatus: 'U',
        deviceClass: 'NON',
        deviceId: '00',
      }],
    },
  },
];