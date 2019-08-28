const {
  Networks,
  Server,
  TransactionBuilder,
  Operation,
  Keypair,
  Asset
} = require("stellar-sdk");
const { alice, bob } = require("./accounts");

const server = new Server("https://horizon-testnet.stellar.org");

const alicePaymentToBob = async () => {
  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };

  const aliceAccount = await server.loadAccount(alice.publicKey);

  const paymentTx = new TransactionBuilder(aliceAccount, txOptions)
    .addOperation(
      Operation.payment({
        amount: "1",
        asset: Asset.native(),
        destination: bob.publicKey
      })
    )
    .setTimeout(0)
    .build();

  paymentTx.sign(Keypair.fromSecret(alice.secret));
  // paymentTx.sign(Keypair.fromSecret(bob.secret));

  await server.submitTransaction(paymentTx);
};

alicePaymentToBob()
  .then(() => {
    console.log("ok");
  })
  .catch(e => {
    console.log(e.response.data.extras.result_codes);
  });
