import elliptic from 'elliptic';
// const crypto = require('node:crypto');
const ec = new elliptic.ec('secp256k1');
import crypto from 'node:crypto';
import CryptoJS from 'crypto-js';
import axios from 'axios';

//////////////////////////////
// Handling wallets
//////////////////////////////


// generate private key
var pk = ec.genKeyPair()

// alternatively read private key
var pkhex = '347e965851d30e0d2bdcfe03227a8a6bff018af6c37df7d53f9f0cf766a89003'
var pk = ec.keyFromPrivate(pkhex);

// convert private key to hex
// var pkhex = pk.getPrivate().toString("hex")
while (pkhex.length < 64) {
  pkhex = "0" + pkhex;
}

// print private key:
console.log("private key:", pkhex)

// derive public key
var pubKey = pk.getPublic().encodeCompressed("hex");
// 62419fff4a6326443961a7e87ed3c2f233ef6857bb61ea7d0d7afc88f7a343a2 
// 027e81de8009cdac039528fd759e38ba10c9ae474fbabe1fc743941cbe99573389
// print public key
console.log("public key:", pubKey)

// convert public key to raw addresss
var sha = crypto.createHash('sha256').update(Buffer.from(pubKey, "hex")).digest()
var addrRaw = crypto.createHash('ripemd160').update(sha).digest()

// generate address by appending checksum
var checksum = crypto.createHash('sha256').update(addrRaw).digest().slice(0, 4)
console.log("sha", sha.toString("hex"))
console.log("addrRaw", addrRaw.toString("hex"))
console.log("checksum", checksum.toString("hex"))
var addr = Buffer.concat([addrRaw, checksum]).toString("hex")

// print address
console.log("address:", addr)



const get = async () => {
  const headResponse = (await axios.get(`http://193.218.118.57:3001/chain/head`)).data;
  const pinHash = headResponse.data.pinHash;
  const pinHeight = headResponse.data.pinHeight;
  console.log(`**** pinHash:`, pinHash);
  console.log(`**** pinHeight:`, pinHeight);
  const rawFeeE8 = "9999";
  const result = (await axios.get(`http://193.218.118.57:3001/tools/encode16bit/from_e8/` + rawFeeE8)).data;
  console.log(`**** result:`, result);
  const feeE8 = result.data.roundedE8;
  console.log(`**** feeE8:`, feeE8);
}

get();
