const {
  Networks,
  Server,
  TransactionBuilder,
  Operation,
  Keypair
} = require("stellar-sdk");
const { alice, bob } = require("./accounts");

const server = new Server("https://horizon-testnet.stellar.org");

const setMultisigOnAliceAccount = async () => {
  const extraSigner = {
    signer: {
      ed25519PublicKey: bob.publicKey,
      weight: 1
    }
  };

  const thresholds = {
    masterWeight: 2, // master (alice) represents the account's private key
    lowThreshold: 2, // alice can sign on its own, but bob can't
    medThreshold: 3, // alice and bob both need to sign for payments or changes of trustlines
    highThreshold: 3 // same, for account merges and other account options
  };

  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };

  const aliceAccount = await server.loadAccount(alice.publicKey);

  const multiSigTx = new TransactionBuilder(aliceAccount, txOptions)
    .addOperation(Operation.setOptions(thresholds))
    .addOperation(Operation.setOptions(extraSigner))
    .setTimeout(0)
    .build();

  multiSigTx.sign(Keypair.fromSecret(alice.secret));

  await server.submitTransaction(multiSigTx);
};

setMultisigOnAliceAccount()
  .then(() => {
    console.log("ok");
  })
  .catch(e => {
    console.error(e);
    throw e;
  });
