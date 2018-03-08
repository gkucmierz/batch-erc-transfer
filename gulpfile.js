
// kovan config:
const config = {
  tokenAddr: '0xca97effc66445e59bf8be50207c3f5c7055e651b',
  network: 'kovan', // mainnet
  sourceAddr: '0x31c21FB18F24D7933b151FDBfE3A8C4b86f285c3',
  sourcePriv: '640e984188bed18abf4f41d6536c99a8068a16ab35f329b171a793fb8560b52a',
  gasPrice: 20e9,
  gasLimit: 1e5,
  amount: 0, // 1 token
  pushTimeout: 1e3
};

// // mainnet config:
// const config = {
//   tokenAddr: '0x5c743a35e903f6c584514ec617acee0611cf44f3',
//   network: 'mainnet',
//   sourceAddr: '',
//   sourcePriv: '',
//   gasPrice: 1e9,
//   gasLimit: 1e5,
//   amount: 1e20, // 100 tokens
//   pushTimeout: 1e3
// };

const gulp = require('gulp');
const fs = require('fs');

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const TOKEN_ADDRESS = config.tokenAddr;

const ABI = [{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getCompanyAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseProposer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingCompanyTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"IS_SIGNATORY","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingPartnerTokensAllocation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingBountyTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_amount","type":"uint256"}],"name":"proposeBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approvePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposeCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"circulatingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectPartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"},{"name":"_tokensPerPeriod","type":"uint256"}],"name":"proposePartnerAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_dest","type":"address"}],"name":"erc20TokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INIT_DATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"rejectBountyTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"proposePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dest","type":"address"}],"name":"approveCompanyAllocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"approvePauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getPartnerAllocation","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nr","type":"uint256"}],"name":"getBountyTransfers","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"status","type":"bool"}],"name":"rejectPauseChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"signatory0","type":"address"},{"name":"signatory1","type":"address"},{"name":"signatory2","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"}],"name":"LogPause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"ERC223Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];


let HTTP_PROVIDER = `https://${config.network}.infura.io/49cO6Bu58uaoA0tgS2Zi`;

let web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
let contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

gulp.task('parse-addresses', cb => {
  fs.readFile('addresses', (err, data) => {
    if (err) throw err;
    
    let addr = JSON.stringify(unique((data+'').match(/0x[0-9a-f]{40}/ig)), null, '  ');

    fs.writeFile('./output/addresses.json', addr + '', err => {
      if (err) throw err;
      console.log('addresses parsed (unique): addresses.json');
      process.nextTick(cb);
    });
  });
});


gulp.task('generate-transfer-txs', cb => {

  let destAddrs = require('./output/addresses.json');

  web3.eth.getTransactionCount(config.sourceAddr, (err, nonce) => {
    if (err) throw err;

    let rawTxs = destAddrs.map((destAddr, i) => {
      let transfer = contract.methods.transfer(destAddr, Web3.utils.toHex(config.amount));
      
      let txData = {
        nonce: Web3.utils.toHex(nonce + i + 1),
        to: config.tokenAddr,
        data: transfer.encodeABI(),
        value: Web3.utils.toHex(0),
        gas: Web3.utils.toHex(config.gasLimit),
        gasPrice: Web3.utils.toHex(config.gasPrice)
      };

      let tx = new Tx(txData);
      tx.sign(new Buffer(config.sourcePriv, 'hex'));
      
      let data = '0x' + tx.serialize().toString('hex');

      return data;
    });

    fs.writeFile('./output/transfer-txs.json', JSON.stringify(rawTxs, null, '  '), err => {
      if (err) throw err;
      console.log('transfer transactions created: transfer-txs.json');
      process.nextTick(cb);
    });

  });

});

gulp.task('push-txs', cb => {

  let rawTxs = require('./output/transfer-txs.json');

  (function loop(rawTxs) {
    let rawTx = rawTxs.shift();
    
    if (rawTx) {
      console.log('Pushing tx: ', rawTx);
      web3.eth.sendSignedTransaction(rawTx, (err, res) => {
        if (err) {
          console.error(err);
          rawTxs.unshift(rawTx);
        }

        setTimeout(() => loop(rawTxs), config.pushTimeout);
      });
    } else {
      console.log('Finished pushing all txs');
      process.nextTick(cb);
    }

  }(rawTxs));

});

gulp.task('default', ['parse-addresses', 'generate-transfer-txs', 'push-txs']);


function unique(arr) {
  return arr.reverse().filter(function(el, i){
    return arr.indexOf(el, i+1) === -1;
  }).reverse();
}
