# Monero Wallet

### Features:
- Generate new subaddresses.
- Label them.
- List existing subaddresses and their labels.
- Update existing labels.
- Search by both label and subaddress.

For the purpose of this project persistence is not implemented. 
We keep the Monero wallet in memory in the browser, so a refresh would destroy all the data.

I've used the following JavaScript library for creating Monero applications using RPC and WebAssembly:
[https://github.com/monero-ecosystem/monero-javascript](https://github.com/monero-ecosystem/monero-javascript)

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For testing, you can use the following seed mnemonic (it’s a stagenet wallet):
petals lagoon hickory wetsuit scamper nozzle unhappy tuesday language tawny neither oatmeal tuesday auburn agony unusual hamburger rugged pause hamburger dexterity chrome vulture abducts unhappy
