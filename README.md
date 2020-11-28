
## Batch ERC transfer

### how to use:
- create .env file with API & address config
- create addresses file with destionation addresses or destination addresses and amounts (it may by CSV file)
- run ```npm run start```
- run commands as follows:
  * ```Parse Addresses``` or ```Parse Amounts```
  * ```Generate TXs```
  * ```Push TXs```

### .env file
```
HTTP_PROVIDER = wss://mainnet.infura.io/ws/v3/[api-key]
SOURCE_PRIV = [private-key]
TOKEN_ADDRESS = 0xDecade1c6Bf2cD9fb89aFad73e4a519C867adcF5

GAS_PRICE = 15e9
FORCE_NONCE = 0
```
