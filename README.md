
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
HTTP_PROVIDER=wss://mainnet.infura.io/ws/v3/[api-key]
SOURCE_PRIV=[private-key]
```
