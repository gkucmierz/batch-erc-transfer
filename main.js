
require('dotenv').config();

const WEI_AMOUNT = 14e18;
const WEI_AMOUNT_FACTOR = 1e18;
const GAS_LIMIT = 1e5;
const GAS_PRICE = process.env.GAS_PRICE && +process.env.GAS_PRICE || 1e9;
const FORCE_NONCE = process.env.FORCE_NONCE && +process.env.FORCE_NONCE || 0;
const BATCH_PUSH_TXS = 100;

const cliSelect = require('cli-select');
const privateKeyToAddress = require('ethereum-private-key-to-address')
const fs = require('fs');

const ABI = [{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getCompanyAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseProposer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingCompanyTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"IS_SIGNATORY","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingPartnerTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingBountyTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_amount","type":"uint256"}],"name":"proposeBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approvePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposeCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"circulatingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectPartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_dest","type":"address"}],"name":"erc20TokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INIT_DATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"proposePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"approvePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getPartnerAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getBountyTransfers","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"rejectPauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"signatory0","type":"address"},{"name":"signatory1","type":"address"},{"name":"signatory2","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"}],"name":"LogPause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"ERC223Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const SOURCE_PRIV = process.env.SOURCE_PRIV;
const SOURCE_ADDRESS = privateKeyToAddress(SOURCE_PRIV);
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

const mainLoop = () => {
  console.log({ SOURCE_ADDRESS, TOKEN_ADDRESS });
  console.log('Choose command:');
  cliSelect({ values: CMDS, defaultValue: 1 }).then(({ value }) => {
    commands[value]().then(mainLoop);
  });
};
mainLoop();

commands[CMD_PARSE_ADDRESSES] = async () => {
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
  console.log(`Generating transactions with gas: ${GAS_PRICE}`);
  const destAddrs = require(OUTPUT_FILE);

  const Web3 = require('web3');
  const Tx = require('ethereumjs-tx');
  const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);

  let nonce = FORCE_NONCE;
  // const nonce = await web3.eth.getTransactionCount(SOURCE_ADDRESS);
  const contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

  const rawTxs = destAddrs.map((record, i) => {
    const amount = record.amount;// ? record.amount * WEI_AMOUNT_FACTOR : WEI_AMOUNT;
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
    // tx.sign(Buffer.from(SOURCE_PRIV, 'hex'));

    return '0x' + tx.serialize().toString('hex');
  });

  fs.writeFileSync(OUTPUT_FILE_TXS, JSON.stringify(rawTxs, null, '  '));
  console.log(`Transfer transactions created: ${OUTPUT_FILE_TXS}`);
};

commands[CMD_PARSE_AMOUNTS] = async () => {
  const data = fs.readFileSync(INPUT_FILE);
  const lines = (data+'').split(/\n/g);
  const records = lines.map(line => {
      const address = line.match(/0x[0-9a-f]{40}/i);
      const lowerCased = (address && address[0] || '').toLowerCase();
      const a = line.replace(address && address[0] || '', '').match(/[0-9]+/);
      const amount = a && a[0] || '0';
      return { address: lowerCased, amount };
    })
    .filter(record => record.amount && record.address);

  const totalAmount = records.reduce((a, b) => a + BigInt(b.amount), 0n);
  const dups = new Set();
  const map = new Map();
  records.map(record => {
    let amount = 0;
    if (map.has(record.address)) {
      amount = map.get(record.address);
      dups.add(record.address);
    }
    map.set(record.address, amount + record.amount);
  });
  const mergedRecords = [...map].map(([address, amount]) => ({address, amount}));
  console.log(`Total records: ${records.length}`);
  console.log(`Total amount: ${totalAmount}`);
  console.log(`Total merged records: ${mergedRecords.length}`);
  console.log(`Duplicates:`, dups);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(records, null, '  '));
  console.log(`Saved to file: ${OUTPUT_FILE}`);
};

commands[CMD_PUSH_TXS] = async () => {
  const { promisify } = require('es6-promisify');
  const Web3 = require('web3');
  const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);

  while (1) {
    const nonce = await web3.eth.getTransactionCount(SOURCE_ADDRESS);
    const rawTxs = require(OUTPUT_FILE_TXS).slice(nonce).slice(0, BATCH_PUSH_TXS);
    if (rawTxs.length === 0) {
      break;
    }
    while (1) {
      const rawTx = rawTxs.shift();
      if (rawTx) {
        console.log('Pushing tx: ', rawTx);
        try {
          await promisify(web3.eth.sendSignedTransaction)(rawTx);
        } catch (err) {
          console.error('Error while pushing TX', err);
          // rawTxs.unshift(rawTx);
        }
      } else {
        console.log('Finished pushing all txs');
        break;
      }
    }
  }
};
