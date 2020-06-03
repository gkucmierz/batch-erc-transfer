
// mainnet config:
const config = {
  pushTimeout: 100
};
const WEI_AMOUNT = 14e18;
const GAS_LIMIT = 1e5;
const GAS_PRICE = 1e9;

require('dotenv').config();
const cliSelect = require('cli-select');
const fs = require('fs');

const ABI = [{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getCompanyAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseProposer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingCompanyTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"IS_SIGNATORY","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingPartnerTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingBountyTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_amount","type":"uint256"}],"name":"proposeBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approvePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposeCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"circulatingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectPartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_dest","type":"address"}],"name":"erc20TokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INIT_DATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"proposePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"approvePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getPartnerAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getBountyTransfers","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"rejectPauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"signatory0","type":"address"},{"name":"signatory1","type":"address"},{"name":"signatory2","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"}],"name":"LogPause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"ERC223Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const TOKEN_ADDRESS = '0x5c743a35e903f6c584514ec617acee0611cf44f3';
const SOURCE_ADDRESS = '0x406D9f19462b6De43FDa5a4Aef515e4A097E5a30';
const SOURCE_PRIV = process.env.SOURCE_PRIV;
const HTTP_PROVIDER = process.env.HTTP_PROVIDER;

const INPUT_FILE = 'addresses';
const OUTPUT_DIR = [__dirname, 'output'].join`/`;
const OUTPUT_FILE = [OUTPUT_DIR, 'addresses.json'].join`/`;
const OUTPUT_FILE_TXS = [OUTPUT_DIR, 'transfer-txs.json'].join`/`;

const CMD_PARSE_ADDRESSES = 'Parse Addresses';
const CMD_PARSE_AMOUNTS = 'Parse Amounts';
const CMD_GENERATE_TXS = 'Generate TXs';
const CMD_PUSH_TXS = 'Push TXs';
const CMDS = [CMD_PARSE_ADDRESSES, CMD_PARSE_AMOUNTS, CMD_GENERATE_TXS, CMD_PUSH_TXS];
const commands = {};

console.log('Choose command:');
cliSelect({ values: CMDS, defaultValue: 2 }).then(({ value }) => commands[value]());

commands[CMD_PARSE_ADDRESSES] = () => {
  console.log('Reading addresses file');
  const data = fs.readFileSync(INPUT_FILE);
  const unique = arr => [...new Set(arr.map(addr => addr.toLowerCase()))];
  
  const uniq = unique(((data+'').match(/0x[0-9a-f]{40}/ig))).map(address => ({address}));
  const output = JSON.stringify(uniq, null, '  ');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output.toString());
  console.log(`Addresses parsed (unique): ${OUTPUT_FILE}`);
};

commands[CMD_GENERATE_TXS] = async () => {
  console.log('Generating transactions');
  const destAddrs = require(OUTPUT_FILE);

  const Web3 = require('web3');
  const Tx = require('ethereumjs-tx');
  const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);

  const nonce = await web3.eth.getTransactionCount(SOURCE_ADDRESS);
  const contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

  const rawTxs = destAddrs.map((record, i) => {
    const amount = record.amount ? record.amount : WEI_AMOUNT;
    const destAddress = record.address.toString().toLowerCase();
    const transfer = contract.methods.transfer(destAddress, Web3.utils.toHex(amount));
    
    const txData = {
      nonce: Web3.utils.toHex(nonce + i),
      to: TOKEN_ADDRESS,
      data: transfer.encodeABI(),
      value: Web3.utils.toHex(0),
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    };

    const tx = new Tx(txData);
    tx.sign(Buffer.from(SOURCE_PRIV, 'hex'));

    return '0x' + tx.serialize().toString('hex');
  });

  fs.writeFileSync(OUTPUT_FILE_TXS, JSON.stringify(rawTxs, null, '  '));
  console.log(`Transfer transactions created: ${OUTPUT_FILE_TXS}`);
};



commands[CMD_PARSE_AMOUNTS] = () => {
  console.error(`Not implemented`);
  // fs.readFile('addresses', (err, data) => {
  //   if (err) throw err;
    
  //   let lines = (data+'').split(/\n/g);

  //   let records = lines.map(line => {
  //       let address = line.match(/0x[0-9a-f]{40}/i);
  //       let amount = line.match(/[\^|\s][0-9]+([\.\,][0-9]+(\s|$))?/);
  //       return {address: address && address[0] || '', amount: amount && parseFloat(amount[0]) || ''};
  //     })
  //     .filter(record => record.amount && record.address);

  //   let addrMap = records.reduce((addrMap, record) => {
  //     if (addrMap[record.address]) {
  //       addrMap[record.address] += record.amount;
  //     } else {
  //       addrMap[record.address] = record.amount;
  //     }
  //     return addrMap;
  //   }, {});

  //   let reducedRecords = Object.keys(addrMap).map(address => ({address, amount: addrMap[address]}));

  //   let sum = reducedRecords.reduce((acc, record) => acc + record.amount, 0);

  //   fs.writeFile('./output/addresses.json', JSON.stringify(records, null, '  ') + '', err => {
  //     if (err) throw err;
  //     console.log(`addresses (${records.length}) with amounts (sanity check: ${sum}) parsed: addresses.json`);
  //     process.nextTick(cb);
  //   });
  // });
};
