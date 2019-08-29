# Sample stellar multisig account

Used as support for a [video](https://www.youtube.com/watch?v=72KqFyiMWa4).

## Prerequisites

- nodeJS 10+
- `accounts.json`: funded test accounts as shown in `accounts.sample.json`

Use the [stellar laboratory](https://www.stellar.org/laboratory/#account-creator?network=test) to create and fund the accounts.

## Steps

- Set Alice account to a multisig account: `$ node multisig.js`
- Attempt a payment from Alice to Bob: `$ node payment.js`
- Uncomment Bob's signature in `payment.js` and try again
