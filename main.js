
const cliSelect = require('cli-select');
const fs = require('fs');

const INPUT_FILE = 'addresses';
const OUTPUT_DIR = [__dirname, 'output'].join`/`;
const OUTPUT_FILE = [OUTPUT_DIR, 'addresses.json'].join`/`;

const CMD_PARSE_ADDRESSES = 'Parse Addresses';
const CMD_PARSE_AMOUNTS = 'Parse Amounts';
const CMD_GENERATE_TXS = 'Generate TXs';
const CMD_PUSH_TXS = 'Push TXs';
const CMDS = [CMD_PARSE_ADDRESSES, CMD_PARSE_AMOUNTS, CMD_GENERATE_TXS, CMD_PUSH_TXS];
const commands = {};

console.log('Choose command:');
cliSelect({ values: CMDS }).then(({ value }) => commands[value]());

commands[CMD_PARSE_ADDRESSES] = () => {
  console.log('Reading addresses file');
  const data = fs.readFileSync(INPUT_FILE);
  const uniq = ((data+'').match(/0x[0-9a-f]{40}/ig)).map(address => ({address}));
  const output = JSON.stringify(uniq, null, '  ');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output.toString());
  console.log(`Addresses parsed (unique): addresses.json`);
};
