
const cliSelect = require('cli-select');

const CMD_PARSE_ADDRESSES = 'Parse Addresses';
const CMD_PARSE_AMOUNTS = 'Parse Amounts';
const CMD_GENERATE_TXS = 'Generate TXs';
const CMD_PUSH_TXS = 'Push TXs';
const CMDS = [CMD_PARSE_ADDRESSES, CMD_PARSE_AMOUNTS, CMD_GENERATE_TXS, CMD_PUSH_TXS];

console.log('Choose command:');
cliSelect({ values: CMDS }).then((...a) => {
  console.log(a);
});
