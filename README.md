# Monero Wallet

A Monero wallet has one primary address, and it can generate multiple additional “subaddresses”.\
All funds sent to any of them end in the same wallet.\
This is useful when users share the wallet address publicly in multiple places and don’t want people to realise it’s all the same wallet.\
Another use case is merchants that accept Monero.\
They can generate a new subaddress for each customer to easily match payments with orders.


### Features:
- Generate new subaddresses.
- Label them.
- List existing subaddresses and their labels.
- Update existing labels.
- Search by both label and subaddress.

For the purpose of this project persistence is not implemented.\
We keep the Monero wallet in memory in the browser, so a refresh would destroy all the data.

I've used the following JavaScript library for creating Monero applications using RPC and WebAssembly:\
[https://github.com/monero-ecosystem/monero-javascript](https://github.com/monero-ecosystem/monero-javascript)

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For testing, you can use the following seed mnemonic (it’s a stagenet wallet):\
petals lagoon hickory wetsuit scamper nozzle unhappy tuesday language tawny neither oatmeal tuesday auburn agony unusual hamburger rugged pause hamburger dexterity chrome vulture abducts unhappy
