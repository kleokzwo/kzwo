import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpClient } from '@angular/common/http';
import * as bitcoin from 'bitcoinjs-lib';
// import { ECPairFactory }  from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';
import * as crypto from 'crypto';
import { ECPairAPI, ECPairFactory } from 'ecpair';
import { networks } from 'bitcoinjs-lib';
// import { sha256 } from 'bitcoinjs-lib';
// const { sha256 } = require('bitcoinjs-lib');
// import { randomBytes } from 'tiny-secp256k1';
// const { sha256 } = require('bitcoinjs-lib');
// import * as CryptoJS from 'crypto-js';
// import { TinySecp256k1Interface } from 'bitcoinjs-lib/src/types';
export interface TransferDto {
  senderAddress: string; // Bitcoin address of the sender
  privateKey: string; // Private key associated with the sender's Bitcoin address
  recipientAddress: string; // Bitcoin address of the recipient
  amount: number; // Amount of Bitcoin to send (in satoshis)
}
// import tinysecp from 'tiny-secp256k1';
// const ECPair: ECPairAPI = ECPairFactory(tinysecp);

@Injectable()
export class TransferService {
  private readonly apiUrl = 'https://chainz.cryptoid.info';

  constructor() { }
  async sendBitcoin(transferData: TransferDto): Promise<any> {
    const network = {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bip32: {
        public: 76067358,
        private: 76066276,
      },
      pubKeyHash: 0,
      scriptHash: 5,
      wif: 128,
    };

    try {
      const keyPair = bitcoin.ECPair.fromWIF(transferData.privateKey, network);

      const txb = new bitcoin.TransactionBuilder(network);

      const utxo = await axios.get(`https://chainz.cryptoid.info/btc2/api.dws?q=unspent&active=${transferData.senderAddress}&key=c535662a5103`);

      if (utxo.data.length === 0) {
        throw new Error('No unspent outputs (UTXOs) found for the sender address');
      }
      console.log('utxo >>>', utxo.data)
      const txHash = utxo.data.unspent_outputs[0].tx_hash;
      const outputIndex = utxo.data.unspent_outputs[0].tx_ouput_n;
      const inputAmount = utxo.data.unspent_outputs[0].value;

      txb.addInput(txHash, outputIndex);
      txb.addOutput(transferData.recipientAddress, transferData.amount);

      // Calculate change amount and add change output
      const changeAmount = inputAmount - transferData.amount;
      txb.addOutput(transferData.senderAddress, changeAmount);

      txb.sign(0, keyPair);

      const tx = txb.build();

      const txHex = tx.toHex();

      const response = await axios.post(`https://www.bitc2.org/block-explorer/api/sendtx`, { txhex: txHex });

      return response.data;

    } catch (error) {
      console.error(error);
    }
  }
}
