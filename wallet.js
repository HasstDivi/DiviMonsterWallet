import { HDNode, utils } from "@ethersproject/hdnode";
import bs58 from "bs58";
import * as bitcoin from "bitcoinjs-lib";

// Red Divi personalizada (similar a Bitcoin pero con otros prefixes)
const diviNetwork = {
  messagePrefix: '\x19Divi Signed Message:\n',
  bech32: 'divi',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x1e,    // Dirección P2PKH (comienza por 'D')
  scriptHash: 0x0d,    // Dirección P2SH
  wif: 0x9e            // WIF
};

export function generarBilleteraDivi() {
  const keyPair = bitcoin.ECPair.makeRandom({ network: diviNetwork });
  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: diviNetwork
  });
  const wif = keyPair.toWIF();

  return {
    direccion: address,
    clavePrivada: wif
  };
}

